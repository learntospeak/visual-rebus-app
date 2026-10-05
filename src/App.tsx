import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { useEffect, useRef, useState } from 'react'
import { puzzles } from './data/puzzles'
import { AccountScreen } from './screens/AccountScreen'
import { AccountPromptScreen } from './screens/AccountPromptScreen'
import { ChapterMapScreen } from './screens/ChapterMapScreen'
import { DailyScreen } from './screens/DailyScreen'
import { GamesScreen } from './screens/GamesScreen'
import { HomeScreen } from './screens/HomeScreen'
import { PicturePuzzlesMenuScreen } from './screens/PicturePuzzlesMenuScreen'
import { ProfileProgressScreen } from './screens/ProfileProgressScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { PuzzleScreen } from './screens/PuzzleScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { RewardsScreen } from './screens/RewardsScreen'
import { chapterRewards, newlyEarnedChapter } from './services/rewards'
import { SolvedScreen } from './screens/SolvedScreen'
import { startSolveCelebration } from './services/celebration'
import { playClueSound, playHaptic, playIncorrectSound, startBackgroundMusic, stopBackgroundMusic } from './services/audio'
import { disableDailyReminder, enableDailyReminder, listenForDailyReminder, refreshDailyReminder, supportsDailyReminders } from './services/reminders'
import { nextVariedPuzzleIndex } from './services/journey'
import { emptyProgress, hasRequestedPuzzle, localDateKey, previousDateKey, syncPuzzleUrl } from './services/progress'
import { useGameStore } from './state/GameStore'
import type { MiniGameMode } from './services/miniGameProgress'
import { answerFeedback, answerLetters, isCorrectAnswer } from './utils/answers'

type Screen = 'onboarding' | 'account-prompt' | 'home' | 'chapters' | 'daily' | 'settings' | 'account' | 'puzzle' | 'solved' | 'rewards' | 'games' | 'picture-menu' | 'profile'
type PlayMode = 'journey' | 'replay' | 'daily'
interface SolveOutcome { revealed: boolean; stars: number; cluesUsed: number; seconds: number; daily: boolean }

type MenuScreen = 'chapters' | 'daily' | 'rewards' | 'picture-menu' | 'profile'

function requestedMenu(): MenuScreen | null {
  const menu = new URLSearchParams(window.location.search).get('menu')
  return menu === 'chapters' || menu === 'daily' || menu === 'rewards' || menu === 'picture-menu' || menu === 'profile' ? menu : null
}

function requestedPlayMode(): PlayMode {
  const mode = new URLSearchParams(window.location.search).get('play')
  return mode === 'daily' || mode === 'replay' ? mode : 'journey'
}

function requestedPictureContext() {
  const params = new URLSearchParams(window.location.search)
  const index = puzzles.findIndex((item) => item.id === Number(params.get('returnPuzzle')))
  const mode = params.get('returnPlay')
  return { index: index >= 0 ? index : null, mode: (mode === 'daily' || mode === 'replay' ? mode : 'journey') as PlayMode }
}

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
  const [screen, setScreen] = useState<Screen>(() => new URLSearchParams(window.location.search).get('games') === 'preview' ? 'games' : new URLSearchParams(window.location.search).get('celebration') === 'preview' ? 'rewards' : hasRequestedPuzzle() ? 'puzzle' : requestedMenu() ?? (settings.onboardingComplete ? 'home' : 'onboarding'))
  const [accountReturn, setAccountReturn] = useState<Screen>('settings')
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(() => {
    const index = puzzles.findIndex((item) => item.id === Number(new URLSearchParams(window.location.search).get('puzzle')))
    return index >= 0 ? index : requestedMenu() === 'picture-menu' ? requestedPictureContext().index ?? progress.currentIndex : progress.currentIndex
  })
  const [playMode, setPlayMode] = useState<PlayMode>(() => hasRequestedPuzzle() ? requestedPlayMode() : requestedMenu() === 'picture-menu' ? requestedPictureContext().mode : 'journey')
  const [solveOutcome, setSolveOutcome] = useState<SolveOutcome | null>(null)
  const [rewardCelebration, setRewardCelebration] = useState<string | null>(null)
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

      if (screen === 'games') {
        window.dispatchEvent(new Event('cluecanvas-games-back'))
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
    navigatePicturePuzzle(progress.currentIndex, 'journey')
  }

  function openAccount(returnTo: Screen) {
    setAccountReturn(returnTo)
    setScreen('account')
  }

  useEffect(() => {
    syncPuzzleUrl(screen === 'puzzle' ? puzzle.id : null)
    const url = new URL(window.location.href)
    if (screen === 'puzzle' && playMode !== 'journey') url.searchParams.set('play', playMode)
    else url.searchParams.delete('play')
    if (url.href !== window.location.href) window.history.replaceState({}, '', url)
  }, [puzzle.id, screen, playMode])

  // Home destinations are refreshable; existing rebus IDs and game routes remain intact.
  useEffect(() => {
    const restoreGamesRoute = () => {
      if (new URLSearchParams(window.location.search).get('games') === 'preview') setScreen('games')
      else if (hasRequestedPuzzle()) {
        const id = Number(new URLSearchParams(window.location.search).get('puzzle'))
        const index = puzzles.findIndex((item) => item.id === id)
        if (index >= 0) setActivePuzzleIndex(index)
        setPlayMode(requestedPlayMode())
        setScreen('puzzle')
      } else {
        const menu = requestedMenu()
        if (menu === 'picture-menu') {
          const context = requestedPictureContext()
          if (context.index !== null) setActivePuzzleIndex(context.index)
          setPlayMode(context.mode)
        }
        setScreen(menu ?? 'home')
      }
    }
    window.addEventListener('popstate', restoreGamesRoute)
    return () => window.removeEventListener('popstate', restoreGamesRoute)
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (screen === 'chapters' || screen === 'daily' || screen === 'rewards' || screen === 'picture-menu' || screen === 'profile') url.searchParams.set('menu', screen)
    else url.searchParams.delete('menu')
    if (screen !== 'picture-menu') {
      url.searchParams.delete('returnPuzzle')
      url.searchParams.delete('returnPlay')
    }
    if (url.href !== window.location.href) window.history.replaceState({}, '', url)
  }, [screen])

  function navigateMenu(target: 'home' | MenuScreen) {
    const url = new URL(window.location.href)
    for (const key of ['puzzle', 'play', 'games', 'gameMode', 'gameRound', 'menu', 'returnPuzzle', 'returnPlay']) url.searchParams.delete(key)
    if (target !== 'home') url.searchParams.set('menu', target)
    if (target === 'picture-menu') {
      url.searchParams.set('returnPuzzle', String(puzzle.id))
      if (playMode !== 'journey') url.searchParams.set('returnPlay', playMode)
    }
    window.history.pushState({}, '', url)
    setScreen(target)
  }

  function navigatePicturePuzzle(index: number, mode: PlayMode) {
    const url = new URL(window.location.href)
    for (const key of ['games', 'gameMode', 'gameRound', 'menu', 'play', 'returnPuzzle', 'returnPlay']) url.searchParams.delete(key)
    url.searchParams.set('puzzle', String(puzzles[index].id))
    if (mode !== 'journey') url.searchParams.set('play', mode)
    window.history.pushState({}, '', url)
    setActivePuzzleIndex(index)
    setPlayMode(mode)
    setScreen('puzzle')
  }

  function navigateGames(open: boolean, mode?: MiniGameMode | 'daily', round = 0) {
    const url = new URL(window.location.href)
    url.searchParams.delete('puzzle')
    for (const key of ['games', 'gameMode', 'gameRound', 'menu', 'play', 'returnPuzzle', 'returnPlay']) url.searchParams.delete(key)
    if (open) url.searchParams.set('games', 'preview')
    if (open && mode) url.searchParams.set('gameMode', mode)
    if (open && round) url.searchParams.set('gameRound', String(round))
    window.history.pushState({}, '', url)
    setScreen(open ? 'games' : 'home')
  }

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
    const earnedChapter = !revealed && playMode !== 'daily'
      ? newlyEarnedChapter(progress.completedIds, [...progress.completedIds, puzzle.id]) : null
    setRewardCelebration(earnedChapter)
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
      master: Boolean(earnedChapter) && chapterRewards([...progress.completedIds, puzzle.id]).every(chapter => chapter.earned),
      onComplete: () => setScreen(earnedChapter ? 'rewards' : 'solved'),
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
    navigatePicturePuzzle(dayNumber % puzzles.length, 'daily')
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

  if (screen === 'rewards') {
    return <RewardsScreen completedIds={progress.completedIds} celebration={rewardCelebration} reducedMotion={settings.reducedCelebrations}
      onHome={() => navigateMenu('home')} onContinue={() => { setRewardCelebration(null); nextPuzzle() }}
      onCollection={() => setRewardCelebration(null)} onChapters={() => navigateMenu('chapters')} />
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        journeyStarted={progress.currentIndex > 0 || progress.completedIds.length > 0 || progress.revealedIds.length > 0}
        onPlay={startJourney}
        onGames={(mode) => navigateGames(true, mode)}
        onDailyMix={() => navigateGames(true, 'daily', 1)}
        onProfile={() => navigateMenu('profile')}
        onSettings={() => setScreen('settings')}
      />
    )
  }

  if (screen === 'picture-menu') {
    return <PicturePuzzlesMenuScreen
      onHome={() => navigateMenu('home')}
      onResume={() => navigatePicturePuzzle(activePuzzleIndex, playMode)}
      onBrowse={() => navigateMenu('chapters')}
      onDaily={() => navigateMenu('daily')} />
  }

  if (screen === 'profile') {
    return <ProfileProgressScreen progress={progress} puzzleCount={puzzles.length}
      totalStars={totalStars} dailyStreak={displayedStreak}
      dailyRebusStatus={progress.daily.completedDates.includes(todayKey) ? 'solved' : progress.daily.revealedDates.includes(todayKey) ? 'revealed' : 'not-played'}
      accountState={!account ? 'guest' : syncState === 'error' ? 'error' : 'synced'}
      onHome={() => navigateMenu('home')}
      onRewards={() => { setRewardCelebration(null); navigateMenu('rewards') }}
      onAccount={() => openAccount('profile')} />
  }

  if (screen === 'games') return <GamesScreen onHome={() => navigateGames(false)} />

  if (screen === 'daily') {
    return <DailyScreen progress={progress.daily} onHome={() => navigateMenu('home')} onPlay={startDailyPuzzle} />
  }

  if (screen === 'settings') {
    return (
      <SettingsScreen
        settings={settings}
        onChange={setSettings}
        onHome={() => navigateMenu('home')}
        onReplayTutorial={() => setScreen('onboarding')}
        onAccount={() => openAccount('settings')}
        accountEmail={account?.email ?? null}
        syncState={syncState}
        onResetProgress={() => {
          if (window.confirm('Reset all rebus and mini-game progress on this device?')) {
            setProgress({ ...emptyProgress, daily: { ...emptyProgress.daily } })
            localStorage.removeItem('cluecanvas-games-progress-v1')
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
        onHome={() => navigateMenu('home')}
        onOpenPuzzle={(index) => {
          navigatePicturePuzzle(index, progress.completedIds.includes(puzzles[index].id) || progress.revealedIds.includes(puzzles[index].id) ? 'replay' : 'journey')
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
        onHome={() => navigateMenu('home')}
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
      onHome={() => navigateMenu('home')}
      onMenu={() => navigateMenu('picture-menu')}
      onGuessChange={updateGuess}
      onSubmit={submitAnswer}
      onClue={showClue}
      onReveal={() => completePuzzle(true)}
      onInteractionSolved={() => completePuzzle(false)}
      soundEnabled={settings.soundEnabled}
    />
  )
}

