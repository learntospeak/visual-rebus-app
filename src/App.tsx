import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { useEffect, useRef, useState } from 'react'
import { puzzles } from './data/puzzles'
import { AccountScreen } from './screens/AccountScreen'
import { AccountPromptScreen } from './screens/AccountPromptScreen'
import { ChapterMapScreen } from './screens/ChapterMapScreen'
import { DailyScreen } from './screens/DailyScreen'
import { HomeScreen } from './screens/HomeScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { PuzzleScreen } from './screens/PuzzleScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { SolvedScreen } from './screens/SolvedScreen'
import { startSolveCelebration } from './services/celebration'
import { playClueSound, playHaptic, playIncorrectSound, startBackgroundMusic, stopBackgroundMusic } from './services/audio'
import { disableDailyReminder, enableDailyReminder, listenForDailyReminder, refreshDailyReminder, supportsDailyReminders } from './services/reminders'
import { nextVariedPuzzleIndex } from './services/journey'
import { emptyProgress, hasRequestedPuzzle, localDateKey, previousDateKey, syncPuzzleUrl } from './services/progress'
import { useGameStore } from './state/GameStore'
import { answerFeedback, answerLetters, isCorrectAnswer } from './utils/answers'

type Screen = 'onboarding' | 'account-prompt' | 'home' | 'chapters' | 'daily' | 'settings' | 'account' | 'puzzle' | 'solved'
type PlayMode = 'journey' | 'replay' | 'daily'
interface SolveOutcome { revealed: boolean; stars: number; cluesUsed: number; seconds: number; daily: boolean }

export default function App() {
  const {
    progress,
    setProgress,
    settings,
    setSettings,
    account,
    authReady,
    passwordRecovery,
    cloudEnabled,
    syncState,
    signIn,
    signUp,
    requestPasswordReset,
    updatePassword,
    signOut,
    deleteAccount,
  } = useGameStore()
  const [screen, setScreen] = useState<Screen>(() => hasRequestedPuzzle() ? 'puzzle' : settings.onboardingComplete ? 'home' : 'onboarding')
  const [accountReturn, setAccountReturn] = useState<Screen>('settings')
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(progress.currentIndex)
  const [playMode, setPlayMode] = useState<PlayMode>('journey')
  const [solveOutcome, setSolveOutcome] = useState<SolveOutcome | null>(null)
  const [guess, setGuess] = useState('')
  const [clueCount, setClueCount] = useState(0)
  const [message, setMessage] = useState('')
  const [lockedLetters, setLockedLetters] = useState<boolean[]>([])
  const [celebrating, setCelebrating] = useState(false)
  const cancelCelebration = useRef<(() => void) | null>(null)
  const isCompleting = useRef(false)
  const startedAt = useRef(Date.now())
  const puzzle = puzzles[activePuzzleIndex]
  const todayKey = localDateKey()
  const displayedStreak = progress.daily.lastCompletedDate === todayKey || progress.daily.lastCompletedDate === previousDateKey(todayKey)
    ? progress.daily.currentStreak
    : 0
  const totalStars = Object.values(progress.starsByPuzzle).reduce((total, stars) => total + stars, 0)

  useEffect(() => {
    if (passwordRecovery) {
      setAccountReturn('home')
      setScreen('account')
    }
  }, [passwordRecovery])

  useEffect(() => listenForDailyReminder(() => setScreen('daily')), [])

  useEffect(() => {
    if (!settings.musicEnabled) {
      stopBackgroundMusic()
      return
    }

    const startMusic = () => {
      if (document.visibilityState === 'visible') startBackgroundMusic()
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') startMusic()
      else stopBackgroundMusic()
    }
    window.addEventListener('pointerdown', startMusic, { once: true })
    window.addEventListener('keydown', startMusic, { once: true })
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
      document.removeEventListener('visibilitychange', handleVisibility)
      stopBackgroundMusic()
    }
  }, [settings.musicEnabled])

  useEffect(() => {
    const viewport = window.visualViewport
    const updateVisibleHeight = () => {
      const visibleHeight = Math.round(viewport?.height ?? window.innerHeight)
      document.documentElement.style.setProperty('--visible-viewport-height', `${visibleHeight}px`)
    }

    updateVisibleHeight()
    viewport?.addEventListener('resize', updateVisibleHeight)
    window.addEventListener('resize', updateVisibleHeight)
    return () => {
      viewport?.removeEventListener('resize', updateVisibleHeight)
      window.removeEventListener('resize', updateVisibleHeight)
    }
  }, [])

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const listener = CapacitorApp.addListener('backButton', () => {
      if (screen === 'home' || screen === 'onboarding' || screen === 'account-prompt') {
        void CapacitorApp.minimizeApp()
        return
      }

      cancelCelebration.current?.()
      setCelebrating(false)
      if (screen === 'account') setScreen(accountReturn)
      else setScreen('home')
    })

    return () => {
      void listener.then((handle) => handle.remove())
    }
  }, [accountReturn, screen])

  function startJourney() {
    setActivePuzzleIndex(progress.currentIndex)
    setPlayMode('journey')
    setScreen('puzzle')
  }

  function openAccount(returnTo: Screen) {
    setAccountReturn(returnTo)
    setScreen('account')
  }

  useEffect(() => {
    syncPuzzleUrl(screen === 'puzzle' ? puzzle.id : null)
  }, [puzzle.id, screen])

  useEffect(() => {
    setGuess('')
    setClueCount(0)
    setMessage('')
    setLockedLetters(Array(answerLetters(puzzle.answer).length).fill(false))
    setCelebrating(false)
    setSolveOutcome(null)
    isCompleting.current = false
    startedAt.current = Date.now()
  }, [activePuzzleIndex, puzzle.answer])

  useEffect(() => () => {
    cancelCelebration.current?.()
  }, [])

  function completePuzzle(revealed = false) {
    if (isCompleting.current) return
    isCompleting.current = true
    const stars = revealed ? 0 : clueCount === 0 ? 3 : clueCount === 1 ? 2 : 1
    const dateKey = localDateKey()
    const outcome = { revealed, stars, cluesUsed: clueCount, seconds: Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)), daily: playMode === 'daily' }
    setSolveOutcome(outcome)
    setProgress((current) => {
      const next = { ...current }
      if (playMode === 'daily') {
        if (revealed) {
          next.daily = {
            ...current.daily,
            revealedDates: current.daily.revealedDates.includes(dateKey) ? current.daily.revealedDates : [...current.daily.revealedDates, dateKey],
          }
        } else if (!current.daily.completedDates.includes(dateKey)) {
          const continuesStreak = current.daily.lastCompletedDate === previousDateKey(dateKey)
          const currentStreak = continuesStreak ? current.daily.currentStreak + 1 : 1
          next.daily = {
            ...current.daily,
            completedDates: [...current.daily.completedDates, dateKey],
            currentStreak,
            longestStreak: Math.max(current.daily.longestStreak, currentStreak),
            lastCompletedDate: dateKey,
          }
        }
      } else if (revealed) {
        next.revealedIds = current.revealedIds.includes(puzzle.id) ? current.revealedIds : [...current.revealedIds, puzzle.id]
      } else {
        next.completedIds = current.completedIds.includes(puzzle.id) ? current.completedIds : [...current.completedIds, puzzle.id]
        next.starsByPuzzle = { ...current.starsByPuzzle, [puzzle.id]: Math.max(current.starsByPuzzle[puzzle.id] ?? 0, stars) }
      }
      return next
    })
    if (playMode === 'daily' && settings.dailyReminderEnabled) {
      void refreshDailyReminder(settings.dailyReminderTime, true)
    }
    if (revealed) {
      setLockedLetters(Array(answerLetters(puzzle.answer).length).fill(true))
      setScreen('solved')
      return
    }
    setCelebrating(true)
    cancelCelebration.current = startSolveCelebration({
      soundEnabled: settings.soundEnabled,
      hapticsEnabled: settings.hapticsEnabled,
      reducedCelebrations: settings.reducedCelebrations,
      daily: playMode === 'daily',
      onComplete: () => setScreen('solved'),
    })
  }

  function updateGuess(value: string) {
    if (celebrating) return
    setGuess(value)
    setMessage('')

    const typed = answerLetters(value)
    const answer = answerLetters(puzzle.answer)
    setLockedLetters((current) => {
      const next = answer.map((letter, index) => current[index] || typed[index] === letter)
      if (next.length > 0 && next.every(Boolean)) window.setTimeout(completePuzzle, 0)
      return next
    })
  }

  function submitAnswer(event: React.FormEvent) {
    event.preventDefault()
    if (!guess.trim()) {
      setMessage('Enter your answer first.')
      return
    }
    if (isCorrectAnswer(puzzle, guess)) {
      setLockedLetters(Array(answerLetters(puzzle.answer).length).fill(true))
      window.setTimeout(completePuzzle, 0)
      return
    }
    setMessage(answerFeedback(puzzle, guess))
    if (settings.soundEnabled) playIncorrectSound()
    if (settings.hapticsEnabled) playHaptic('wrong')
  }

  function showClue() {
    if (clueCount >= puzzle.clues.length) return
    if (settings.soundEnabled) playClueSound()
    setClueCount((count) => Math.min(count + 1, puzzle.clues.length))
  }

  function nextPuzzle() {
    if (playMode === 'daily') {
      setScreen('home')
      return
    }
    if (progress.completedIds.length >= puzzles.length) {
      setScreen('home')
      return
    }
    const nextIndex = activePuzzleIndex < 24
      ? activePuzzleIndex + 1
      : nextVariedPuzzleIndex(puzzles, activePuzzleIndex, [...progress.completedIds, ...progress.revealedIds])
    setActivePuzzleIndex(nextIndex)
    if (playMode === 'journey') {
      setProgress((current) => ({ ...current, currentIndex: nextIndex }))
      setPlayMode('journey')
    }
    setScreen('puzzle')
  }

  function startDailyPuzzle() {
    const dateKey = localDateKey()
    if (progress.daily.completedDates.includes(dateKey) || progress.daily.revealedDates.includes(dateKey)) {
      setScreen('home')
      return
    }
    const now = new Date()
    const dayNumber = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86_400_000)
    setActivePuzzleIndex(dayNumber % puzzles.length)
    setPlayMode('daily')
    setScreen('puzzle')
  }

  async function changeDailyReminder(enabled: boolean) {
    if (!enabled) {
      await disableDailyReminder()
      setSettings((current) => ({ ...current, dailyReminderEnabled: false, dailyReminderPrompted: true }))
      return false
    }
    const completedToday = progress.daily.completedDates.includes(localDateKey()) || progress.daily.revealedDates.includes(localDateKey())
    const granted = await enableDailyReminder(settings.dailyReminderTime, completedToday)
    setSettings((current) => ({ ...current, dailyReminderEnabled: granted, dailyReminderPrompted: true }))
    return granted
  }

  function changeDailyReminderTime(time: string) {
    setSettings((current) => ({ ...current, dailyReminderTime: time }))
    if (settings.dailyReminderEnabled) {
      const completedToday = progress.daily.completedDates.includes(localDateKey()) || progress.daily.revealedDates.includes(localDateKey())
      void refreshDailyReminder(time, completedToday)
    }
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onComplete={() => {
      setSettings((current) => ({ ...current, onboardingComplete: true }))
      if (account) startJourney()
      else setScreen('account-prompt')
    }} />
  }

  if (screen === 'account-prompt') {
    return (
      <AccountPromptScreen
        signedIn={Boolean(account)}
        onSaveProgress={() => openAccount('account-prompt')}
        onContinue={startJourney}
      />
    )
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        completedCount={progress.completedIds.length}
        puzzleCount={puzzles.length}
        totalStars={totalStars}
        dailyStreak={displayedStreak}
        onPlay={startJourney}
        onChapters={() => setScreen('chapters')}
        onDaily={() => setScreen('daily')}
        onSettings={() => setScreen('settings')}
        onAccount={() => openAccount('home')}
        accountState={!account ? 'guest' : syncState === 'error' ? 'error' : 'synced'}
      />
    )
  }

  if (screen === 'daily') {
    return <DailyScreen progress={progress.daily} onHome={() => setScreen('home')} onPlay={startDailyPuzzle} />
  }

  if (screen === 'settings') {
    return (
      <SettingsScreen
        settings={settings}
        onChange={setSettings}
        onHome={() => setScreen('home')}
        onReplayTutorial={() => setScreen('onboarding')}
        onAccount={() => openAccount('settings')}
        accountEmail={account?.email ?? null}
        syncState={syncState}
        onResetProgress={() => {
          if (window.confirm('Reset all solved puzzles and return to puzzle one?')) {
            setProgress({ ...emptyProgress, daily: { ...emptyProgress.daily } })
            setActivePuzzleIndex(0)
          }
        }}
        onReminderChange={(enabled) => void changeDailyReminder(enabled)}
        onReminderTimeChange={changeDailyReminderTime}
      />
    )
  }

  if (screen === 'account') {
    return (
      <AccountScreen
        account={account}
        authReady={authReady}
        passwordRecovery={passwordRecovery}
        cloudEnabled={cloudEnabled}
        syncState={syncState}
        onBack={() => setScreen(accountReturn)}
        onSignIn={signIn}
        onSignUp={signUp}
        onRequestPasswordReset={requestPasswordReset}
        onUpdatePassword={updatePassword}
        onSignOut={signOut}
        onDeleteAccount={deleteAccount}
      />
    )
  }

  if (screen === 'chapters') {
    return (
      <ChapterMapScreen
        completedCount={progress.completedIds.length}
        puzzleCount={puzzles.length}
        completedIds={progress.completedIds}
        revealedIds={progress.revealedIds}
        starsByPuzzle={progress.starsByPuzzle}
        currentIndex={progress.currentIndex}
        onHome={() => setScreen('home')}
        onOpenPuzzle={(index) => {
          setActivePuzzleIndex(index)
          setPlayMode(progress.completedIds.includes(puzzles[index].id) || progress.revealedIds.includes(puzzles[index].id) ? 'replay' : 'journey')
          setScreen('puzzle')
        }}
      />
    )
  }

  if (screen === 'solved') {
    return (
      <SolvedScreen
        puzzle={puzzle}
        outcome={solveOutcome ?? { revealed: false, stars: 0, cluesUsed: clueCount, seconds: 0, daily: playMode === 'daily' }}
        isLastPuzzle={activePuzzleIndex === puzzles.length - 1}
        onHome={() => setScreen('home')}
        onNext={nextPuzzle}
        showReminderOffer={Boolean(solveOutcome?.daily) && !settings.dailyReminderPrompted && supportsDailyReminders()}
        onEnableReminder={() => changeDailyReminder(true)}
        onDismissReminder={() => setSettings((current) => ({ ...current, dailyReminderPrompted: true }))}
        difficultyFeedback={progress.difficultyFeedbackByPuzzle[puzzle.id]}
        onDifficultyFeedback={(feedback) => setProgress((current) => ({
          ...current,
          difficultyFeedbackByPuzzle: { ...current.difficultyFeedbackByPuzzle, [puzzle.id]: feedback },
        }))}
      />
    )
  }

  return (
    <PuzzleScreen
      puzzle={puzzle}
      puzzleNumber={activePuzzleIndex + 1}
      puzzleCount={puzzles.length}
      guess={guess}
      clueCount={clueCount}
      message={message}
      lockedLetters={lockedLetters}
      celebrating={celebrating}
      onHome={() => setScreen('home')}
      onGuessChange={updateGuess}
      onSubmit={submitAnswer}
      onClue={showClue}
      onReveal={() => completePuzzle(true)}
    />
  )
}
