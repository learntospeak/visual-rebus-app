import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'

interface HomeScreenProps {
  completedCount: number
  puzzleCount: number
  onPlay: () => void
  onChapters: () => void
}

export function HomeScreen({ completedCount, puzzleCount, onPlay, onChapters }: HomeScreenProps) {
  const percent = Math.round((completedCount / puzzleCount) * 100)
  const actionLabel = completedCount ? 'Continue solving' : 'Start playing'

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
        <Button className="hero-button" onClick={onPlay}>{actionLabel}<span aria-hidden="true">→</span></Button>
      </section>
      <section className="progress-card" aria-label={`${percent}% complete`}>
        <div>
          <span className="eyebrow">STARTER PACK</span>
          <strong>{completedCount} of {puzzleCount} solved</strong>
        </div>
        <ProgressBar value={completedCount} max={puzzleCount} label={`${completedCount} of ${puzzleCount} puzzles solved`} />
        <span className="progress-number">{percent}%</span>
      </section>
      <Button variant="secondary" className="chapter-map-button" onClick={onChapters}>View chapters</Button>
      <p className="trust-note"><span aria-hidden="true">✓</span> No account. No adverts. Just puzzles.</p>
    </main>
  )
}
