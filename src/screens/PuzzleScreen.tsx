import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnswerPattern } from '../components/AnswerPattern'
import { Button } from '../components/Button'
import { CluePanel } from '../components/CluePanel'
import { ProgressBar } from '../components/ProgressBar'
import { PuzzleVisual } from '../components/PuzzleVisual'
import type { Puzzle } from '../types'

const compactKeyRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SPACE', 'BACKSPACE'],
]

function CompactAnswerKeyboard({ onKey }: { onKey: (key: string) => void }) {
  return (
    <div className="compact-answer-keyboard" aria-label="Compact answer keyboard">
      {compactKeyRows.map((row, rowIndex) => (
        <div className={`compact-key-row compact-key-row-${rowIndex + 1}`} key={rowIndex}>
          {row.map((key) => (
            <button
              className={`compact-key compact-key-${key.toLowerCase()}`}
              type="button"
              aria-label={key === 'BACKSPACE' ? 'Delete last character' : key === 'SPACE' ? 'Space' : key}
              onClick={() => onKey(key)}
              key={key}
            >
              {key === 'BACKSPACE' ? '⌫' : key === 'SPACE' ? 'SPACE' : key}
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
  const [answerFocused, setAnswerFocused] = useState(false)
  const [useCompactKeyboard, setUseCompactKeyboard] = useState(() => window.matchMedia('(max-width: 600px) and (pointer: coarse)').matches)

  function handleAnswerFocus() {
    setAnswerFocused(true)
  }

  useEffect(() => {
    if (!useCompactKeyboard) answerInput.current?.focus()
  }, [puzzle.id, useCompactKeyboard])

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

    onGuessChange(nextGuess)
    window.requestAnimationFrame(() => {
      input?.focus({ preventScroll: true })
      input?.setSelectionRange(nextCursor, nextCursor)
    })
  }

  function usePhoneKeyboard() {
    setUseCompactKeyboard(false)
    window.setTimeout(() => answerInput.current?.focus(), 0)
  }

  return (
    <main className={`app-shell puzzle-screen${answerFocused ? ' is-answering' : ''}${useCompactKeyboard ? ' has-compact-keyboard' : ''}`}>
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

      <form className="answer-form" onSubmit={onSubmit}>
        <label htmlFor="answer">Your answer</label>
        <AnswerPattern pattern={puzzle.wordPattern} answer={puzzle.answer} locked={lockedLetters} celebrating={celebrating} />
        <input
          ref={answerInput}
          id="answer"
          value={guess}
          onChange={(event) => onGuessChange(event.target.value)}
          onFocus={() => { if (!useCompactKeyboard) handleAnswerFocus() }}
          onBlur={() => window.setTimeout(() => setAnswerFocused(false), 180)}
          disabled={celebrating}
          inputMode={useCompactKeyboard ? 'none' : 'text'}
          autoComplete="off"
          autoCapitalize="none"
          enterKeyHint="done"
          placeholder="Type the phrase…"
        />
        {useCompactKeyboard && (
          <>
            <CompactAnswerKeyboard onKey={handleCompactKey} />
            <button className="phone-keyboard-button" type="button" onClick={usePhoneKeyboard}>Use phone keyboard instead</button>
          </>
        )}
        <p className="feedback" role="status">{message || '\u00a0'}</p>
        <div className="action-row">
          <Button variant="secondary" type="button" onClick={onClue} disabled={celebrating || clueCount === puzzle.clues.length}>
            {clueCount === puzzle.clues.length ? 'All clues shown' : `Clue ${clueCount + 1}`}
          </Button>
          <Button type="submit" disabled={celebrating}>{celebrating ? 'Correct!' : 'Submit'}</Button>
        </div>
      </form>

      {clueCount > 0 && (
        <CluePanel clueNumber={clueCount} clue={puzzle.clues[clueCount - 1]} />
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
