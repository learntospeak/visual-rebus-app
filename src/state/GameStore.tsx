import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { puzzles } from '../data/puzzles'
import { clearLocalProgress, emptyProgress, loadProgress, mergeProgress, saveProgress } from '../services/progress'
import {
  deleteCloudAccount,
  isSupabaseConfigured,
  loadCloudProgress,
  saveCloudProgress,
  supabase,
} from '../services/supabase'
import type { GameSettings, SavedProgress } from '../types'

const SETTINGS_KEY = 'visual-rebus-settings-v1'

export type CloudSyncState = 'offline' | 'connecting' | 'saving' | 'synced' | 'error'
export interface PlayerAccount {
  id: string
  email: string | null
}

interface GameStoreValue {
  progress: SavedProgress
  setProgress: React.Dispatch<React.SetStateAction<SavedProgress>>
  settings: GameSettings
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
  account: PlayerAccount | null
  authReady: boolean
  passwordRecovery: boolean
  cloudEnabled: boolean
  syncState: CloudSyncState
  signIn: (email: string, password: string) => Promise<string>
  signUp: (email: string, password: string) => Promise<string>
  requestPasswordReset: (email: string) => Promise<string>
  updatePassword: (password: string) => Promise<string>
  signOut: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const GameStoreContext = createContext<GameStoreValue | null>(null)

function loadSettings(): GameSettings {
  const defaults: GameSettings = {
    soundEnabled: true,
    musicEnabled: true,
    dailyReminderEnabled: false,
    dailyReminderTime: '19:00',
    dailyReminderPrompted: false,
    hapticsEnabled: true,
    reducedCelebrations: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    largeText: false,
    highContrast: false,
    onboardingComplete: false,
  }

  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? { ...defaults, ...(JSON.parse(raw) as Partial<GameSettings>) } : defaults
  } catch {
    return defaults
  }
}

export function GameStoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<SavedProgress>(() => loadProgress(puzzles))
  const [settings, setSettings] = useState<GameSettings>(loadSettings)
  const [account, setAccount] = useState<PlayerAccount | null>(null)
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured)
  const [passwordRecovery, setPasswordRecovery] = useState(false)
  const [syncState, setSyncState] = useState<CloudSyncState>(isSupabaseConfigured ? 'connecting' : 'offline')
  const progressRef = useRef(progress)
  const hydratedUserId = useRef<string | null>(null)
  const activatingUserId = useRef<string | null>(null)

  const activateUser = useCallback(async (user: { id: string; email?: string | null }) => {
    if (activatingUserId.current === user.id || hydratedUserId.current === user.id) {
      setAccount({ id: user.id, email: user.email ?? null })
      setAuthReady(true)
      return
    }

    activatingUserId.current = user.id
    setAccount({ id: user.id, email: user.email ?? null })
    setSyncState('connecting')
    try {
      const cloudProgress = await loadCloudProgress(user.id)
      const merged = mergeProgress(progressRef.current, cloudProgress)
      hydratedUserId.current = user.id
      progressRef.current = merged
      setProgress(merged)
      await saveCloudProgress(user.id, merged)
      setSyncState('synced')
    } catch (error) {
      console.error('Unable to synchronize player progress.', error)
      setSyncState('error')
    } finally {
      activatingUserId.current = null
      setAuthReady(true)
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    let active = true

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        console.error('Unable to restore the player session.', error)
        setSyncState('error')
        setAuthReady(true)
        return
      }
      if (data.session?.user) void activateUser(data.session.user)
      else {
        setSyncState('offline')
        setAuthReady(true)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return
      if (event === 'PASSWORD_RECOVERY') setPasswordRecovery(true)
      if (session?.user) {
        window.setTimeout(() => void activateUser(session.user), 0)
      } else {
        hydratedUserId.current = null
        activatingUserId.current = null
        setAccount(null)
        setSyncState('offline')
        setAuthReady(true)
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [activateUser])

  useEffect(() => {
    progressRef.current = progress
    saveProgress(progress)
    if (!account || hydratedUserId.current !== account.id) return

    setSyncState('saving')
    const timeout = window.setTimeout(() => {
      void saveCloudProgress(account.id, progress)
        .then(() => setSyncState('synced'))
        .catch((error) => {
          console.error('Unable to save player progress.', error)
          setSyncState('error')
        })
    }, 700)
    return () => window.clearTimeout(timeout)
  }, [account, progress])

  useEffect(() => {
    if (!account || !supabase) return
    let active = true

    const retryCloudSave = () => {
      if (!active || !navigator.onLine) return
      setSyncState('saving')
      void saveCloudProgress(account.id, progressRef.current)
        .then(() => {
          if (active) setSyncState('synced')
        })
        .catch((error) => {
          console.error('Unable to save progress after reconnecting.', error)
          if (active) setSyncState('error')
        })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') retryCloudSave()
    }

    window.addEventListener('online', retryCloudSave)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    const appStateListener = Capacitor.isNativePlatform()
      ? CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          if (isActive) retryCloudSave()
        })
      : null

    return () => {
      active = false
      window.removeEventListener('online', retryCloudSave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (appStateListener) void appStateListener.then((handle) => handle.remove())
    }
  }, [account])

  useEffect(() => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)), [settings])
  useEffect(() => {
    document.documentElement.classList.toggle('large-text', settings.largeText)
    document.documentElement.classList.toggle('high-contrast', settings.highContrast)
  }, [settings.highContrast, settings.largeText])

  const value = useMemo(() => ({
    progress,
    setProgress,
    settings,
    setSettings,
    account,
    authReady,
    passwordRecovery,
    cloudEnabled: isSupabaseConfigured,
    syncState,
    signIn: async (email: string, password: string) => {
      if (!supabase) throw new Error('Cloud accounts are not configured yet.')
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) await activateUser(data.user)
      return 'Signed in. Your progress is synchronized.'
    },
    signUp: async (email: string, password: string) => {
      if (!supabase) throw new Error('Cloud accounts are not configured yet.')
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: Capacitor.isNativePlatform() ? 'https://cluecanvas.games/' : window.location.origin,
        },
      })
      if (error) throw error
      if (data.session?.user) {
        await activateUser(data.session.user)
        return 'Account created. Your progress is synchronized.'
      }
      return 'Account created. Check your email to confirm it, then sign in.'
    },
    requestPasswordReset: async (email: string) => {
      if (!supabase) throw new Error('Cloud accounts are not configured yet.')
      const redirectTo = Capacitor.isNativePlatform()
        ? 'https://cluecanvas.games/?password-recovery=1'
        : `${window.location.origin}/?password-recovery=1`
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) throw error
      return 'If an account exists for that email, a password-reset link is on its way.'
    },
    updatePassword: async (password: string) => {
      if (!supabase) throw new Error('Cloud accounts are not configured yet.')
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setPasswordRecovery(false)
      const cleanedUrl = new URL(window.location.href)
      cleanedUrl.searchParams.delete('password-recovery')
      window.history.replaceState({}, '', `${cleanedUrl.pathname}${cleanedUrl.search}`)
      return 'Password updated. You are signed in.'
    },
    signOut: async () => {
      if (!supabase) return
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      hydratedUserId.current = null
      setAccount(null)
      setSyncState('offline')
    },
    deleteAccount: async () => {
      if (!supabase || !account) throw new Error('Sign in before deleting your account.')
      await deleteCloudAccount()
      hydratedUserId.current = null
      activatingUserId.current = null
      setAccount(null)
      setSyncState('offline')
      clearLocalProgress()
      progressRef.current = { ...emptyProgress, daily: { ...emptyProgress.daily } }
      setProgress(progressRef.current)
      await supabase.auth.signOut({ scope: 'local' })
    },
  }), [account, activateUser, authReady, passwordRecovery, progress, settings, syncState])

  return <GameStoreContext.Provider value={value}>{children}</GameStoreContext.Provider>
}

export function useGameStore() {
  const store = useContext(GameStoreContext)
  if (!store) throw new Error('useGameStore must be used inside GameStoreProvider.')
  return store
}
