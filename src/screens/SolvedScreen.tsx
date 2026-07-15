import { Button } from '../components/Button'
import type { Puzzle } from '../types'

interface SolvedScreenProps {
  puzzle: Puzzle
  isLastPuzzle: boolean
  onHome: () => void
  onNext: () => void
}

export function SolvedScreen({ puzzle, isLastPuzzle, onHome, onNext }: SolvedScreenProps) {
  return (
    <main className="app-shell solved-screen">
      <Button variant="text" className="back-button" onClick={onHome}>← Home</Button>
      <section className="solved-content">
        <div className="success-mark" aria-hidden="true">✓</div>
        <p className="kicker">THAT'S IT!</p>
        <h1>{puzzle.answer}</h1>
        <div className="explanation-card">
          <span className="eyebrow">WHY IT WORKS</span>
          {puzzle.explanation.map((line) => <p key={line}>{line}</p>)}
        </div>
        <Button onClick={onNext}>
          {isLastPuzzle ? 'Finish pack' : 'Next puzzle'} <span aria-hidden="true">→</span>
        </Button>
      </section>
    </main>
  )
}
