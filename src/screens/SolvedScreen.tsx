import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import type { DifficultyFeedback, Puzzle } from '../types'

interface SolvedScreenProps {
  puzzle: Puzzle
  outcome: { revealed: boolean; stars: number; cluesUsed: number; seconds: number; daily: boolean }
  isLastPuzzle: boolean
  onHome: () => void
  onNext: () => void
  showReminderOffer: boolean
  onEnableReminder: () => Promise<boolean>
  onDismissReminder: () => void
  difficultyFeedback?: DifficultyFeedback
  onDifficultyFeedback: (feedback: DifficultyFeedback) => void
}

export function SolvedScreen({ puzzle, outcome, isLastPuzzle, onHome, onNext, showReminderOffer, onEnableReminder, onDismissReminder, difficultyFeedback, onDifficultyFeedback }: SolvedScreenProps) {
  const [shareMessage, setShareMessage] = useState('')
  const [reminderMessage, setReminderMessage] = useState('')
  const stars = '★'.repeat(outcome.stars) + '☆'.repeat(3 - outcome.stars)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

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
        {showReminderOffer && <div className="daily-reminder-offer">
          <span className="eyebrow">COME BACK TOMORROW</span>
          <strong>Would you like a reminder?</strong>
          <p>Clue Canvas can send one reminder when tomorrow’s daily puzzle is ready.</p>
          {reminderMessage && <p className="account-error" role="alert">{reminderMessage}</p>}
          <Button onClick={() => void onEnableReminder().then((enabled) => {
            if (!enabled) setReminderMessage('Notifications weren’t enabled. You can try again later in Settings.')
          })}>Remind me at 7:00 pm</Button>
          <button type="button" className="forgot-password-link" onClick={onDismissReminder}>Not now</button>
        </div>}
        <div className="difficulty-feedback">
          <span>How difficult was this puzzle?</span>
          <div role="group" aria-label="Rate this puzzle’s difficulty">
            {([
              ['too-easy', 'Too easy'],
              ['about-right', 'About right'],
              ['too-hard', 'Too hard'],
            ] as const).map(([value, label]) => (
              <button type="button" className={difficultyFeedback === value ? 'is-selected' : ''} aria-pressed={difficultyFeedback === value} onClick={() => onDifficultyFeedback(value)} key={value}>{label}</button>
            ))}
          </div>
        </div>
        <Button variant="secondary" className="share-button" onClick={shareResult}>Share result <span aria-hidden="true">↗</span></Button>
        <p className="share-status" role="status">{shareMessage}</p>
        <Button onClick={onNext}>
          {outcome.daily ? 'Done' : isLastPuzzle ? 'Finish pack' : 'Next puzzle'} <span aria-hidden="true">→</span>
        </Button>
      </section>
    </main>
  )
}
