import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { puzzles } from '../data/puzzles'
import { loadProgress, saveProgress } from '../services/progress'
import type { GameSettings, SavedProgress } from '../types'

const SETTINGS_KEY = 'visual-rebus-settings-v1'

interface GameStoreValue {
  progress: SavedProgress
  setProgress: React.Dispatch<React.SetStateAction<SavedProgress>>
  settings: GameSettings
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
}

const GameStoreContext = createContext<GameStoreValue | null>(null)

function loadSettings(): GameSettings {
  const defaults: GameSettings = {
    soundEnabled: true,
    reducedCelebrations: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
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

  useEffect(() => saveProgress(progress), [progress])
  useEffect(() => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)), [settings])

  const value = useMemo(
    () => ({ progress, setProgress, settings, setSettings }),
    [progress, settings],
  )

  return <GameStoreContext.Provider value={value}>{children}</GameStoreContext.Provider>
}

export function useGameStore() {
  const store = useContext(GameStoreContext)
  if (!store) throw new Error('useGameStore must be used inside GameStoreProvider.')
  return store
}
