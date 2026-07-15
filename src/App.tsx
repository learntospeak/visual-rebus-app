import { useEffect, useRef, useState } from 'react'
import { puzzles } from './data/puzzles'
import { ChapterMapScreen } from './screens/ChapterMapScreen'
import { HomeScreen } from './screens/HomeScreen'
import { PuzzleScreen } from './screens/PuzzleScreen'
import { SolvedScreen } from './screens/SolvedScreen'
import { startSolveCelebration } from './services/celebration'
import { hasRequestedPuzzle, syncPuzzleUrl } from './services/progress'
import { useGameStore } from './state/GameStore'
import { answerLetters, isCorrectAnswer } from './utils/answers'

type Screen = 'home' | 'chapters' | 'puzzle' | 'solved'

export default function App() {
  const { progress, setProgress, settings } = useGameStore()
  const [screen, setScreen] = useState<Screen>(() => hasRequestedPuzzle() ? 'puzzle' : 'home')
  const [guess, setGuess] = useState('')
  const [clueCount, setClueCount] = useState(0)
  const [message, setMessage] = useState('')
  const [lockedLetters, setLockedLetters] = useState<boolean[]>([])
  const [celebrating, setCelebrating] = useState(false)
  const cancelCelebration = useRef<(() => void) | null>(null)
  const isCompleting = useRef(false)
  const puzzle = puzzles[progress.currentIndex]

  useEffect(() => {
    syncPuzzleUrl(screen === 'puzzle' ? puzzle.id : null)
  }, [puzzle.id, screen])

  useEffect(() => {
    setGuess('')
    setClueCount(0)
    setMessage('')
    setLockedLetters(Array(answerLetters(puzzle.answer).length).fill(false))
    setCelebrating(false)
    isCompleting.current = false
  }, [progress.currentIndex, puzzle.answer])

  useEffect(() => () => {
    cancelCelebration.current?.()
  }, [])

  function completePuzzle() {
    if (isCompleting.current) return
    isCompleting.current = true
    setProgress((current) => ({
      ...current,
      completedIds: current.completedIds.includes(puzzle.id)
        ? current.completedIds
        : [...current.completedIds, puzzle.id],
    }))
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
    setMessage('Not quite. Correct letters have been locked in place.')
  }

  function nextPuzzle() {
    if (progress.currentIndex === puzzles.length - 1) {
      setScreen('home')
      return
    }
    setProgress((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))
    setScreen('puzzle')
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        completedCount={progress.completedIds.length}
        puzzleCount={puzzles.length}
        onPlay={() => setScreen('puzzle')}
        onChapters={() => setScreen('chapters')}
      />
    )
  }

  if (screen === 'chapters') {
    return (
      <ChapterMapScreen
        completedCount={progress.completedIds.length}
        puzzleCount={puzzles.length}
        onHome={() => setScreen('home')}
        onOpenChapter={() => setScreen('puzzle')}
      />
    )
  }

  if (screen === 'solved') {
    return (
      <SolvedScreen
        puzzle={puzzle}
        isLastPuzzle={progress.currentIndex === puzzles.length - 1}
        onHome={() => setScreen('home')}
        onNext={nextPuzzle}
      />
    )
  }

  return (
    <PuzzleScreen
      puzzle={puzzle}
      puzzleNumber={progress.currentIndex + 1}
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
    />
  )
}
