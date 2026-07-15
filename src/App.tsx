import { useEffect, useMemo, useRef, useState } from 'react'
import { puzzles } from './data/puzzles'
import type { Puzzle, SavedProgress } from './types'

type Screen = 'home' | 'puzzle' | 'solved'

const STORAGE_KEY = 'visual-rebus-progress-v1'
const emptyProgress: SavedProgress = { completedIds: [], currentIndex: 0 }

function loadProgress(): SavedProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const saved = JSON.parse(raw) as SavedProgress
    return {
      completedIds: Array.isArray(saved.completedIds) ? saved.completedIds : [],
      currentIndex: Math.min(Math.max(saved.currentIndex ?? 0, 0), puzzles.length - 1),
    }
  } catch {
    return emptyProgress
  }
}

function normalise(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, '')
}

function isCorrect(puzzle: Puzzle, guess: string) {
  const accepted = [puzzle.answer, ...puzzle.acceptedAnswers].map(normalise)
  return accepted.includes(normalise(guess))
}

function PuzzleVisual({ puzzle }: { puzzle: Puzzle }) {
  return (
    <div className={`puzzle-visual visual-${puzzle.id}`} role="img" aria-label={puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')}>
      {puzzle.elements.map((item, index) => (
        <span className={item.className} key={`${puzzle.id}-${index}`} aria-hidden="true">
          {item.content}
        </span>
      ))}
    </div>
  )
}

function AnswerPattern({ pattern, answer, locked, celebrating }: { pattern: string; answer: string; locked: boolean[]; celebrating: boolean }) {
  const letters = answer.replace(/[^a-z0-9]/gi, '').toUpperCase().split('')
  let answerIndex = 0

  return (
    <div className={`answer-pattern${celebrating ? ' is-celebrating' : ''}`} aria-label={`Answer pattern: ${pattern}`}>
      {pattern.split(/[-\s]+/).map((length, wordIndex) => (
        <span className="answer-word" key={`${length}-${wordIndex}`}>
          {Array.from({ length: Number(length) }, (_, letterIndex) => {
            const index = answerIndex++
            return (
              <span className={`letter-slot${locked[index] ? ' is-locked' : ''}`} key={letterIndex} aria-hidden="true">
                <span className="locked-letter">{locked[index] ? letters[index] : ''}</span>
              </span>
            )
          })}
        </span>
      ))}
    </div>
  )
}

function playHarpChime() {
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return

  const context = new AudioContextClass()
  const notes = [523.25, 659.25, 783.99, 1046.5]
  const start = context.currentTime

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const noteStart = start + index * 0.105
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, noteStart)
    gain.gain.setValueAtTime(0.0001, noteStart)
    gain.gain.exponentialRampToValueAtTime(0.2, noteStart + 0.018)
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.15)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(noteStart)
    oscillator.stop(noteStart + 1.2)
  })

  window.setTimeout(() => void context.close(), 1800)
}

export default function App() {
  const [progress, setProgress] = useState<SavedProgress>(loadProgress)
  const [screen, setScreen] = useState<Screen>('home')
  const [guess, setGuess] = useState('')
  const [clueCount, setClueCount] = useState(0)
  const [message, setMessage] = useState('')
  const [lockedLetters, setLockedLetters] = useState<boolean[]>([])
  const [celebrating, setCelebrating] = useState(false)
  const solveTimer = useRef<number | null>(null)
  const isCompleting = useRef(false)
  const puzzle = puzzles[progress.currentIndex]
  const percent = Math.round((progress.completedIds.length / puzzles.length) * 100)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    setGuess('')
    setClueCount(0)
    setMessage('')
    setLockedLetters(Array(puzzle.answer.replace(/[^a-z0-9]/gi, '').length).fill(false))
    setCelebrating(false)
    isCompleting.current = false
  }, [progress.currentIndex])

  useEffect(() => () => {
    if (solveTimer.current) window.clearTimeout(solveTimer.current)
  }, [])

  const actionLabel = useMemo(
    () => (progress.completedIds.length ? 'Continue solving' : 'Start playing'),
    [progress.completedIds.length],
  )

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
    playHarpChime()
    solveTimer.current = window.setTimeout(() => setScreen('solved'), 1650)
  }

  function updateGuess(value: string) {
    if (celebrating) return
    setGuess(value)
    setMessage('')

    const typed = value.replace(/[^a-z0-9]/gi, '').toUpperCase().split('')
    const answer = puzzle.answer.replace(/[^a-z0-9]/gi, '').toUpperCase().split('')
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
    if (isCorrect(puzzle, guess)) {
      setLockedLetters(Array(puzzle.answer.replace(/[^a-z0-9]/gi, '').length).fill(true))
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
      <main className="app-shell home-screen">
        <header className="brand-row">
          <div className="brand-mark" aria-hidden="true">R</div>
          <span className="eyebrow">VISUAL REBUS</span>
        </header>
        <section className="hero">
          <p className="kicker">A LITTLE PUZZLE. A BIG AHA!</p>
          <h1>See words<br />differently.</h1>
          <p className="hero-copy">Fair visual riddles, clues that genuinely help, and explanations that make every answer click.</p>
          <button className="primary-button hero-button" onClick={() => setScreen('puzzle')}>{actionLabel}<span aria-hidden="true">→</span></button>
        </section>
        <section className="progress-card" aria-label={`${percent}% complete`}>
          <div>
            <span className="eyebrow">STARTER PACK</span>
            <strong>{progress.completedIds.length} of {puzzles.length} solved</strong>
          </div>
          <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
          <span className="progress-number">{percent}%</span>
        </section>
        <p className="trust-note"><span aria-hidden="true">✓</span> No account. No adverts. Just puzzles.</p>
      </main>
    )
  }

  if (screen === 'solved') {
    return (
      <main className="app-shell solved-screen">
        <button className="text-button back-button" onClick={() => setScreen('home')}>← Home</button>
        <section className="solved-content">
          <div className="success-mark" aria-hidden="true">✓</div>
          <p className="kicker">THAT'S IT!</p>
          <h1>{puzzle.answer}</h1>
          <div className="explanation-card">
            <span className="eyebrow">WHY IT WORKS</span>
            {puzzle.explanation.map((line) => <p key={line}>{line}</p>)}
          </div>
          <button className="primary-button" onClick={nextPuzzle}>
            {progress.currentIndex === puzzles.length - 1 ? 'Finish pack' : 'Next puzzle'} <span aria-hidden="true">→</span>
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell puzzle-screen">
      <header className="puzzle-header">
        <button className="icon-button" aria-label="Return home" onClick={() => setScreen('home')}>←</button>
        <div>
          <span className="eyebrow">PUZZLE {progress.currentIndex + 1} OF {puzzles.length}</span>
          <div className="mini-track"><span style={{ width: `${((progress.currentIndex + 1) / puzzles.length) * 100}%` }} /></div>
        </div>
        <span className={`difficulty difficulty-${puzzle.difficulty.toLowerCase()}`}>{puzzle.difficulty}</span>
      </header>

      <section className="puzzle-card">
        <p>{puzzle.prompt}</p>
        <PuzzleVisual puzzle={puzzle} />
      </section>

      <form className="answer-form" onSubmit={submitAnswer}>
        <label htmlFor="answer">Your answer</label>
        <AnswerPattern pattern={puzzle.wordPattern} answer={puzzle.answer} locked={lockedLetters} celebrating={celebrating} />
        <input id="answer" value={guess} onChange={(event) => updateGuess(event.target.value)} disabled={celebrating} autoComplete="off" autoCapitalize="none" placeholder="Type the phrase…" />
        <p className="feedback" role="status">{message || '\u00a0'}</p>
        <div className="action-row">
          <button className="secondary-button" type="button" onClick={() => setClueCount((count) => Math.min(count + 1, puzzle.clues.length))} disabled={celebrating || clueCount === puzzle.clues.length}>
            {clueCount === puzzle.clues.length ? 'All clues shown' : `Clue ${clueCount + 1}`}
          </button>
          <button className="primary-button" type="submit" disabled={celebrating}>{celebrating ? 'Correct!' : 'Submit'}</button>
        </div>
      </form>

      {clueCount > 0 && (
        <aside className="clue-panel" aria-live="polite">
          <span className="eyebrow">CLUE {clueCount}</span>
          <p>{puzzle.clues[clueCount - 1]}</p>
        </aside>
      )}
    </main>
  )
}
