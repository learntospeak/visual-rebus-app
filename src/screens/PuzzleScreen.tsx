import type { FormEvent } from 'react'
import { AnswerPattern } from '../components/AnswerPattern'
import { Button } from '../components/Button'
import { CluePanel } from '../components/CluePanel'
import { ProgressBar } from '../components/ProgressBar'
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
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div>
          <span className="eyebrow">PUZZLE {puzzleNumber} OF {puzzleCount}</span>
          <ProgressBar value={puzzleNumber} max={puzzleCount} compact label={`Puzzle ${puzzleNumber} of ${puzzleCount}`} />
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
          <Button variant="secondary" type="button" onClick={onClue} disabled={celebrating || clueCount === puzzle.clues.length}>
            {clueCount === puzzle.clues.length ? 'All clues shown' : `Clue ${clueCount + 1}`}
          </Button>
          <Button type="submit" disabled={celebrating}>{celebrating ? 'Correct!' : 'Submit'}</Button>
        </div>
      </form>

      {clueCount > 0 && (
        <CluePanel clueNumber={clueCount} clue={puzzle.clues[clueCount - 1]} />
      )}
    </main>
  )
}
