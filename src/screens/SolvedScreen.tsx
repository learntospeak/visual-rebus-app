import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import type { Puzzle } from '../types'

interface SolvedScreenProps {
  puzzle: Puzzle
  outcome: { revealed: boolean; stars: number; cluesUsed: number; seconds: number; daily: boolean }
  isLastPuzzle: boolean
  onHome: () => void
  onNext: () => void
}

export function SolvedScreen({ puzzle, outcome, isLastPuzzle, onHome, onNext }: SolvedScreenProps) {
  const [shareMessage, setShareMessage] = useState('')
  const stars = '★'.repeat(outcome.stars) + '☆'.repeat(3 - outcome.stars)

  useEffect(() => {
    function advanceOnEnter(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat || event.defaultPrevented) return
      const target = event.target
      if (
        target instanceof HTMLElement
        && (target.isContentEditable || ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) return
      event.preventDefault()
      onNext()
    }

    window.addEventListener('keydown', advanceOnEnter)
    return () => window.removeEventListener('keydown', advanceOnEnter)
  }, [onNext])

  async function shareResult() {
    const text = [
      `Clue Canvas ${outcome.daily ? 'Daily Puzzle' : `Puzzle ${puzzle.id}`}`,
      outcome.revealed ? 'Answer revealed — I’ll try again!' : `${stars} · ${outcome.cluesUsed} ${outcome.cluesUsed === 1 ? 'clue' : 'clues'} · ${outcome.seconds}s`,
      'Can you picture the phrase?',
    ].join('\n')
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Clue Canvas', text })
        setShareMessage('Shared!')
      } else {
        await navigator.clipboard.writeText(text)
        setShareMessage('Result copied to clipboard.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(text)
        setShareMessage('Result copied to clipboard.')
      } catch {
        setShareMessage('Sharing is not available on this device yet.')
      }
    }
  }

  return (
    <main className="app-shell solved-screen">
      <Button variant="text" className="back-button" onClick={onHome}>← Home</Button>
      <section className="solved-content">
        <div className="success-mark" aria-hidden="true">✓</div>
        <p className="kicker">{outcome.revealed ? 'ANSWER REVEALED' : 'THAT’S IT!'}</p>
        <h1>{puzzle.answer}</h1>
        <div className={`solve-rating${outcome.revealed ? ' is-revealed' : ''}`}>
          <strong>{outcome.revealed ? 'Revealed · no stars' : stars}</strong>
          <span>{outcome.revealed ? 'Replay this puzzle later to earn stars.' : `${outcome.stars} of 3 stars · ${outcome.cluesUsed} ${outcome.cluesUsed === 1 ? 'clue' : 'clues'} used`}</span>
        </div>
        {puzzle.origin && (
          <div className="origin-card">
            <span className="eyebrow">WHERE IT CAME FROM</span>
            <p>{puzzle.origin}</p>
          </div>
        )}
        <Button variant="secondary" className="share-button" onClick={shareResult}>Share result <span aria-hidden="true">↗</span></Button>
        <p className="share-status" role="status">{shareMessage}</p>
        <Button onClick={onNext}>
          {outcome.daily ? 'Done' : isLastPuzzle ? 'Finish pack' : 'Next puzzle'} <span aria-hidden="true">→</span>
        </Button>
      </section>
    </main>
  )
}
