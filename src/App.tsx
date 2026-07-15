import { useEffect, useMemo, useRef, useState } from 'react'
import { puzzles } from './data/puzzles'
import type { Puzzle, SavedProgress } from './types'

type Screen = 'home' | 'puzzle' | 'solved'

const STORAGE_KEY = 'visual-rebus-progress-v1'
const emptyProgress: SavedProgress = { completedIds: [], currentIndex: 0 }

function loadProgress(): SavedProgress {
  const requestedPuzzle = Number(new URLSearchParams(window.location.search).get('puzzle'))
  const requestedIndex = puzzles.findIndex((puzzle) => puzzle.id === requestedPuzzle)

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return requestedIndex >= 0 ? { ...emptyProgress, currentIndex: requestedIndex } : emptyProgress
    const saved = JSON.parse(raw) as SavedProgress
    return {
      completedIds: Array.isArray(saved.completedIds) ? saved.completedIds : [],
      currentIndex: requestedIndex >= 0
        ? requestedIndex
        : Math.min(Math.max(saved.currentIndex ?? 0, 0), puzzles.length - 1),
    }
  } catch {
    return requestedIndex >= 0 ? { ...emptyProgress, currentIndex: requestedIndex } : emptyProgress
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
  if (puzzle.id === 13) {
    return (
      <div className="puzzle-visual two-left-feet" role="img" aria-label="Two footprints pointing left">
        {[0, 1].map((foot) => (
          <svg className="footprint-icon" viewBox="0 0 105 175" aria-hidden="true" key={foot}>
            <path className="foot-sole" d="M35 57c-10 14-10 34-4 49 4 11 1 20-1 30-3 17 5 31 19 34 14 3 28-7 31-24 2-12-5-23-4-36 1-12 10-23 11-36 2-18-8-29-23-32-12-2-22 4-29 15Z" />
            <path className="foot-arch-cutout" d="M35 101c9 5 18 5 27-2-5 14-3 24 1 35 3 10-1 21-10 23-9 1-16-7-14-18 3-15 3-25-4-38Z" />
            <circle className="foot-toe foot-big-toe" cx="25" cy="39" r="15" />
            <circle className="foot-toe" cx="47" cy="25" r="12" />
            <circle className="foot-toe" cx="67" cy="25" r="10" />
            <circle className="foot-toe" cx="83" cy="34" r="8" />
            <circle className="foot-toe" cx="94" cy="47" r="6.5" />
          </svg>
        ))}
      </div>
    )
  }

  if (puzzle.id === 20) {
    return (
      <div className="puzzle-visual three-blind-mice" role="img" aria-label="Three mice wearing blindfolds over their eyes">
        {[0, 1, 2].map((mouse) => (
          <svg className="blind-mouse-icon" viewBox="0 0 120 125" aria-hidden="true" key={mouse}>
            <circle className="mouse-ear" cx="30" cy="31" r="23" />
            <circle className="mouse-ear" cx="90" cy="31" r="23" />
            <path className="mouse-face" d="M60 16c-30 0-48 22-45 50 3 25 22 46 45 54 23-8 42-29 45-54 3-28-15-50-45-50Z" />
            <path className="mouse-blindfold" d="M17 48c27-10 59-10 86 0l-4 25c-26-8-52-8-78 0Z" />
            <path className="mouse-tie" d="M101 53l16-12-5 23 6 15-18-10Z" />
            <circle className="mouse-nose" cx="60" cy="94" r="7" />
            <path className="mouse-whiskers" d="M50 96 12 88m38 15-36 8m56-15 38-8m-38 15 36 8" />
          </svg>
        ))}
      </div>
    )
  }

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
  const [screen, setScreen] = useState<Screen>(() => new URLSearchParams(window.location.search).has('puzzle') ? 'puzzle' : 'home')
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
    if (screen === 'puzzle') {
      const url = new URL(window.location.href)
      url.searchParams.set('puzzle', String(puzzle.id))
      window.history.replaceState({}, '', url)
    } else {
      const url = new URL(window.location.href)
      url.searchParams.delete('puzzle')
      window.history.replaceState({}, '', url)
    }
  }, [puzzle.id, screen])

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
