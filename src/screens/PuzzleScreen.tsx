import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { AnswerPattern } from '../components/AnswerPattern'
import { Button } from '../components/Button'
import { CluePanel } from '../components/CluePanel'
import { ProgressBar } from '../components/ProgressBar'
import { PuzzleVisual } from '../components/PuzzleVisual'
import type { Puzzle } from '../types'

const compactKeyRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['SPACE', 'BACKSPACE'],
]

function CompactAnswerKeyboard({ onKey }: { onKey: (key: string) => void }) {
  const onKeyRef = useRef(onKey)
  const repeatDelay = useRef<number | null>(null)
  const repeatInterval = useRef<number | null>(null)
  const lastPointerBackspaceAt = useRef(0)

  useEffect(() => {
    onKeyRef.current = onKey
  }, [onKey])

  function stopBackspaceRepeat() {
    if (repeatDelay.current !== null) window.clearTimeout(repeatDelay.current)
    if (repeatInterval.current !== null) window.clearInterval(repeatInterval.current)
    repeatDelay.current = null
    repeatInterval.current = null
    lastPointerBackspaceAt.current = performance.now()
  }

  useEffect(() => stopBackspaceRepeat, [])

  function startBackspaceRepeat(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    lastPointerBackspaceAt.current = performance.now()
    onKeyRef.current('BACKSPACE')
    repeatDelay.current = window.setTimeout(() => {
      onKeyRef.current('BACKSPACE')
      repeatInterval.current = window.setInterval(() => onKeyRef.current('BACKSPACE'), 70)
    }, 360)
  }

  function handleBackspaceClick(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (performance.now() - lastPointerBackspaceAt.current < 750) return
    onKeyRef.current('BACKSPACE')
  }

  return (
    <div className="compact-answer-keyboard" aria-label="On-screen answer keyboard">
      {compactKeyRows.map((row, rowIndex) => (
        <div className={`compact-key-row compact-key-row-${rowIndex + 1}`} key={rowIndex}>
          {row.map((key) => (
            <button
              className={`compact-key compact-key-${key.toLowerCase()}`}
              type="button"
              aria-label={key === 'BACKSPACE' ? 'Delete previous character' : key === 'SPACE' ? 'Space' : key}
              onPointerDown={key === 'BACKSPACE' ? startBackspaceRepeat : (event) => event.preventDefault()}
              onPointerUp={key === 'BACKSPACE' ? stopBackspaceRepeat : undefined}
              onPointerCancel={key === 'BACKSPACE' ? stopBackspaceRepeat : undefined}
              onLostPointerCapture={key === 'BACKSPACE' ? stopBackspaceRepeat : undefined}
              onContextMenu={key === 'BACKSPACE' ? (event) => event.preventDefault() : undefined}
              onClick={key === 'BACKSPACE' ? handleBackspaceClick : () => onKey(key)}
              key={key}
            >
              {key === 'BACKSPACE' ? '⌫' : key === 'SPACE' ? 'space' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

interface PuzzleScreenProps {
  puzzle: Puzzle
  puzzleNumber: number
  puzzleCount: number
  guess: string
  clueCount: number
  message: string
  lockedLetters: boolean[]
  celebrating: boolean
  onHome: () => void
  onGuessChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  onClue: () => void
  onReveal: () => void
}

export function PuzzleScreen({
  puzzle,
  puzzleNumber,
  puzzleCount,
  guess,
  clueCount,
  message,
  lockedLetters,
  celebrating,
  onHome,
  onGuessChange,
  onSubmit,
  onClue,
  onReveal,
}: PuzzleScreenProps) {
  const answerInput = useRef<HTMLInputElement>(null)
  const feedbackTarget = useRef<HTMLParagraphElement>(null)
  const clueTarget = useRef<HTMLDivElement>(null)
  const [useCompactKeyboard] = useState(() => window.matchMedia('(max-width: 600px)').matches)

  function scrollToResult(target: RefObject<HTMLElement | null>, block: ScrollLogicalPosition = 'nearest') {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      target.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block,
      })
    }))
  }

  function handleSubmit(event: FormEvent) {
    onSubmit(event)
    scrollToResult(feedbackTarget)
  }

  function handleClue() {
    onClue()
    scrollToResult(clueTarget, 'start')
  }

  function handleCompactKey(key: string) {
    const input = answerInput.current
    const selectionStart = input?.selectionStart ?? guess.length
    const selectionEnd = input?.selectionEnd ?? selectionStart
    let nextGuess = guess
    let nextCursor = selectionStart

    if (key === 'BACKSPACE') {
      if (selectionStart !== selectionEnd) {
        nextGuess = `${guess.slice(0, selectionStart)}${guess.slice(selectionEnd)}`
      } else if (selectionStart > 0) {
        nextGuess = `${guess.slice(0, selectionStart - 1)}${guess.slice(selectionEnd)}`
        nextCursor -= 1
      }
    } else {
      const character = key === 'SPACE' ? ' ' : key.toLowerCase()
      nextGuess = `${guess.slice(0, selectionStart)}${character}${guess.slice(selectionEnd)}`
      nextCursor += character.length
    }

    if (nextGuess !== guess) onGuessChange(nextGuess)
    window.requestAnimationFrame(() => {
      input?.focus({ preventScroll: true })
      input?.setSelectionRange(nextCursor, nextCursor)
    })
  }

  return (
    <main className={`app-shell puzzle-screen${useCompactKeyboard ? ' has-compact-keyboard' : ''}`}>
      {celebrating && (
        <div className="solve-celebration" role="status" aria-live="assertive">
          <div className="celebration-confetti" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
          </div>
          <div className="celebration-badge">
            <span aria-hidden="true">✓</span>
            <strong>Correct!</strong>
          </div>
        </div>
      )}
      <header className="puzzle-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div>
          <span className="eyebrow">PUZZLE {puzzleNumber} OF {puzzleCount}</span>
          <ProgressBar value={puzzleNumber} max={puzzleCount} compact label={`Puzzle ${puzzleNumber} of ${puzzleCount}`} />
        </div>
        <span className={`difficulty difficulty-${puzzle.difficulty.toLowerCase()}`}>{puzzle.difficulty}</span>
      </header>

      <section className="puzzle-card">
        <p>{puzzle.prompt}</p>
        <div className="puzzle-art-frame">
          <PuzzleVisual puzzle={puzzle} />
        </div>
      </section>

      <form className="answer-form" onSubmit={handleSubmit}>
        <label htmlFor="answer">Your answer</label>
        <AnswerPattern pattern={puzzle.wordPattern} answer={puzzle.answer} locked={lockedLetters} celebrating={celebrating} />
        <input
          ref={answerInput}
          id="answer"
          value={guess}
          onChange={(event) => onGuessChange(event.target.value)}
          disabled={celebrating}
          inputMode={useCompactKeyboard ? 'none' : 'text'}
          autoComplete="off"
          autoCapitalize="none"
          enterKeyHint="done"
          placeholder="Type the phrase…"
        />
        {useCompactKeyboard && (
          <CompactAnswerKeyboard onKey={handleCompactKey} />
        )}
        <p ref={feedbackTarget} className="feedback" role="status">{message || '\u00a0'}</p>
        <div className="action-row">
          <Button variant="secondary" type="button" onClick={handleClue} disabled={celebrating || clueCount === puzzle.clues.length}>
            {clueCount === puzzle.clues.length ? 'All clues shown' : `Clue ${clueCount + 1}`}
          </Button>
          <Button type="submit" disabled={celebrating}>{celebrating ? 'Correct!' : 'Submit'}</Button>
        </div>
      </form>

      {clueCount > 0 && (
        <div ref={clueTarget} className="clue-scroll-target">
          <CluePanel clueNumber={clueCount} clue={puzzle.clues[clueCount - 1]} />
        </div>
      )}
      {clueCount === puzzle.clues.length && !celebrating && (
        <div className="reveal-panel">
          <p>Still stuck? You can reveal the answer and replay later to earn stars.</p>
          <Button variant="text" type="button" onClick={onReveal}>Reveal answer</Button>
        </div>
      )}
    </main>
  )
}
