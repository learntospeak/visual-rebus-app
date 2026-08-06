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
    cloudEnabled,
    syncState,
    signIn,
    signUp,
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
    if (revealed) {
      setLockedLetters(Array(answerLetters(puzzle.answer).length).fill(true))
      setScreen('solved')
      return
    }
    setCelebrating(true)
    cancelCelebration.current = startSolveCelebration({
      soundEnabled: settings.soundEnabled,
      reducedCelebrations: settings.reducedCelebrations,
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
  }

  function nextPuzzle() {
    if (playMode === 'daily') {
      setScreen('home')
      return
    }
    if (activePuzzleIndex === puzzles.length - 1) {
      setScreen('home')
      return
    }
    const nextIndex = activePuzzleIndex + 1
    setActivePuzzleIndex(nextIndex)
    if (activePuzzleIndex === progress.currentIndex) {
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
      />
    )
  }

  if (screen === 'account') {
    return (
      <AccountScreen
        account={account}
        authReady={authReady}
        cloudEnabled={cloudEnabled}
        syncState={syncState}
        onBack={() => setScreen(accountReturn)}
        onSignIn={signIn}
        onSignUp={signUp}
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
          setPlayMode(index < progress.currentIndex ? 'replay' : 'journey')
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
      onClue={() => setClueCount((count) => Math.min(count + 1, puzzle.clues.length))}
      onReveal={() => completePuzzle(true)}
    />
  )
}
