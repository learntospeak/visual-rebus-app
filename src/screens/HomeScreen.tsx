import { Button } from '../components/Button'


interface HomeScreenProps {
  completedCount: number
  puzzleCount: number
  totalStars: number
  dailyStreak: number
  onPlay: () => void
  onGames: () => void
  onRewards: () => void
  onChapters: () => void
  onDaily: () => void
  onSettings: () => void
  onProfile: () => void
  accountState: 'guest' | 'synced' | 'error'
}

export function HomeScreen({ onPlay, onGames, onDaily, onSettings, onProfile, accountState }: HomeScreenProps) {
  const actionLabel = 'Picture Puzzles'

  return (
    <main className="app-shell home-screen">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">CLUE CANVAS</span>
        <Button
          variant="icon"
          className={`account-button account-${accountState}`}
          aria-label="Progress and medallions"
          onClick={onProfile}
        >
          <span aria-hidden="true">🏅</span><i aria-hidden="true" />
        </Button>
        <Button variant="icon" className="settings-button" aria-label="Open settings" onClick={onSettings}>⚙</Button>
      </header>
      <section className="hero">
        <p className="kicker">A LITTLE PUZZLE. A BIG AHA!</p>
        <h1>See words<br />differently.</h1>
        <p className="hero-copy">Fair visual riddles, clues that genuinely help, and fascinating stories behind familiar phrases.</p>
        <Button className="hero-button" onClick={onPlay}>{actionLabel}<span aria-hidden="true">→</span></Button>
      </section>
      <button className="home-games-card" onClick={onGames}><span className="home-games-icon" aria-hidden="true">◈</span><span><strong>More games</strong><small>4 games · 400 puzzles · a fresh daily mix</small></span><span aria-hidden="true">→</span></button>
      <Button variant="secondary" className="daily-button" onClick={onDaily}>Today’s puzzle <span aria-hidden="true">☀</span></Button>
      <p className="trust-note"><span aria-hidden="true">✓</span> Optional account. No adverts. Just puzzles.</p>
    </main>
  )
}

