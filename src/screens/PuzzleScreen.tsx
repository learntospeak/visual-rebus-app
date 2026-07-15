import type { FormEvent } from 'react'
import { AnswerPattern } from '../components/AnswerPattern'
import { PuzzleVisual } from '../components/PuzzleVisual'
import type { Puzzle } from '../types'

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
}: PuzzleScreenProps) {
  return (
    <main className="app-shell puzzle-screen">
      <header className="puzzle-header">
        <button className="icon-button" aria-label="Return home" onClick={onHome}>←</button>
        <div>
          <span className="eyebrow">PUZZLE {puzzleNumber} OF {puzzleCount}</span>
          <div className="mini-track"><span style={{ width: `${(puzzleNumber / puzzleCount) * 100}%` }} /></div>
        </div>
        <span className={`difficulty difficulty-${puzzle.difficulty.toLowerCase()}`}>{puzzle.difficulty}</span>
      </header>

      <section className="puzzle-card">
        <p>{puzzle.prompt}</p>
        <PuzzleVisual puzzle={puzzle} />
      </section>

      <form className="answer-form" onSubmit={onSubmit}>
        <label htmlFor="answer">Your answer</label>
        <AnswerPattern pattern={puzzle.wordPattern} answer={puzzle.answer} locked={lockedLetters} celebrating={celebrating} />
        <input
          id="answer"
          value={guess}
          onChange={(event) => onGuessChange(event.target.value)}
          disabled={celebrating}
          autoComplete="off"
          autoCapitalize="none"
          placeholder="Type the phrase…"
        />
        <p className="feedback" role="status">{message || '\u00a0'}</p>
        <div className="action-row">
          <button className="secondary-button" type="button" onClick={onClue} disabled={celebrating || clueCount === puzzle.clues.length}>
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
