import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'

interface HomeScreenProps {
  completedCount: number
  puzzleCount: number
  totalStars: number
  dailyStreak: number
  onPlay: () => void
  onChapters: () => void
  onDaily: () => void
  onSettings: () => void
  onAccount: () => void
  accountState: 'guest' | 'synced' | 'error'
}

export function HomeScreen({ completedCount, puzzleCount, totalStars, dailyStreak, onPlay, onChapters, onDaily, onSettings, onAccount, accountState }: HomeScreenProps) {
  const percent = Math.round((completedCount / puzzleCount) * 100)
  const actionLabel = completedCount ? 'Continue solving' : 'Start playing'

  return (
    <main className="app-shell home-screen">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">CLUE CANVAS</span>
        <Button
          variant="icon"
          className={`account-button account-${accountState}`}
          aria-label={accountState === 'guest' ? 'Sign in or create an account' : accountState === 'error' ? 'Account sync needs attention' : 'Open your synced account'}
          onClick={onAccount}
        >
          <span aria-hidden="true">👤</span><i aria-hidden="true" />
        </Button>
        <Button variant="icon" className="settings-button" aria-label="Open settings" onClick={onSettings}>⚙</Button>
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
      <div className="home-stats" aria-label="Game statistics">
        <span><strong>{totalStars}</strong> stars earned</span>
        <span><strong>{dailyStreak}</strong> day streak</span>
      </div>
      <Button variant="secondary" className="chapter-map-button" onClick={onChapters}>View packs and puzzles</Button>
      <Button variant="secondary" className="daily-button" onClick={onDaily}>Today’s puzzle <span aria-hidden="true">☀</span></Button>
      <p className="trust-note"><span aria-hidden="true">✓</span> Optional account. No adverts. Just puzzles.</p>
    </main>
  )
}
