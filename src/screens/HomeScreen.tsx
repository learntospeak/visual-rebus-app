import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { miniGames, readMiniGameProgress } from '../services/miniGameProgress'
import type { MiniGameMode } from '../services/miniGameProgress'
import './HomeScreen.css'
import { MdPersonOutline } from 'react-icons/md'

interface HomeScreenProps {
  completedCount: number
  puzzleCount: number
  totalStars: number
  dailyStreak: number
  journeyStarted: boolean
  onPlay: () => void
  onGames: (mode: MiniGameMode) => void
  onDailyMix: () => void
  onRewards: () => void
  onChapters: () => void
  onDaily: () => void
  onSettings: () => void
  onAccount: () => void
  accountState: 'guest' | 'synced' | 'error'
  dailyRebusStatus: 'solved' | 'revealed' | 'not-played'
}

const rebusText = {
  solved: 'Solved today',
  revealed: 'Answer revealed today',
  'not-played': 'Not played today',
}

export function HomeScreen({ completedCount, puzzleCount, totalStars, dailyStreak, journeyStarted, onPlay, onGames, onDailyMix, onRewards, onChapters, onDaily, onSettings, onAccount, accountState, dailyRebusStatus }: HomeScreenProps) {
  const [progress, setProgress] = useState(() => readMiniGameProgress())
  useEffect(() => {
    const refresh = () => setProgress(readMiniGameProgress())
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  const percent = puzzleCount > 0 ? Math.round((completedCount / puzzleCount) * 100) : 0
  const started = journeyStarted || completedCount > 0
  const unavailable = progress.unavailable

  return (
    <main className="app-shell home-screen home-v2">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">CLUE CANVAS</span>
        <Button
          variant="icon"
          className={`account-button account-${accountState}`}
          aria-label={accountState === 'guest' ? 'Sign in or create an account' : accountState === 'error' ? 'Account sync needs attention' : 'Open your synced account'}
          onClick={onAccount}
        >
          <MdPersonOutline aria-hidden="true" size={23} /><i aria-hidden="true" />
        </Button>
        <Button variant="icon" className="settings-button" aria-label="Open settings" onClick={onSettings}>⚙</Button>
      </header>

      <section className="hv-card hv-journey" aria-labelledby="hv-pp-h">
        <p className="kicker">SEE WORDS DIFFERENTLY</p>
        <h1 id="hv-pp-h">Picture Puzzles</h1>
        <p className="hv-copy">The original rebus journey: visual riddles with clues that genuinely help.</p>
        <Button className="hv-main" onClick={onPlay}>{started ? 'Continue journey' : 'Start journey'}<span aria-hidden="true">→</span></Button>
        <div className="hv-progress">
          <strong>{completedCount} of {puzzleCount} picture puzzles solved</strong>
          <ProgressBar value={completedCount} max={puzzleCount} label={`${completedCount} of ${puzzleCount} picture puzzles solved`} />
          <span className="hv-meta">{percent}% · {totalStars} stars earned</span>
        </div>
        <Button variant="secondary" className="hv-sub" onClick={onChapters}>Browse puzzles</Button>
      </section>

      <section className="hv-card" aria-labelledby="hv-mg-h">
        <h2 id="hv-mg-h">More Games</h2>
        <p className="hv-copy">Four quick games, each with its own puzzles.</p>
        <ul className="hv-games">
          {miniGames.map((g) => (
            <li key={g.id}>
              <div>
                <strong>{g.title}</strong>
                <small>{g.description}</small>
                <span className="hv-meta">
                  {unavailable ? 'Progress unavailable' : `${progress.solved[g.id]} of 100 solved`}
                </span>
              </div>
              <Button variant="secondary" onClick={() => onGames(g.id)} aria-label={`Play ${g.title}`}>Play</Button>
            </li>
          ))}
        </ul>
        <p className="hv-note">
          {unavailable ? 'Saved progress could not be read on this device.' : 'Solved counts are saved on this device.'}
        </p>
      </section>

      <section className="hv-card" aria-labelledby="hv-d-h">
        <h2 id="hv-d-h">Daily Challenge</h2>
        <div className="hv-daily">
          <div>
            <strong>Single picture puzzle</strong>
            <small>One original daily rebus. {rebusText[dailyRebusStatus]}.</small>
            <span className="hv-meta">{dailyStreak} day picture-puzzle streak</span>
          </div>
          <Button variant="secondary" onClick={onDaily} aria-label="Play single picture puzzle">Play puzzle</Button>
        </div>
        <div className="hv-daily">
          <div>
            <strong>Four-game daily mix</strong>
            <small>One round of each game. {unavailable ? 'Score unavailable.' : progress.dailyScore === null ? 'Not played today.' : `Today: ${progress.dailyScore} of 4 solved.`}</small>
            <span className="hv-meta">Daily mix progress is saved on this device.</span>
          </div>
          <Button variant="secondary" onClick={onDailyMix} aria-label="Play four-game daily mix">Play mix</Button>
        </div>
      </section>

      <section className="hv-achievements" aria-labelledby="hv-achievements-h">
        <h2 id="hv-achievements-h">Achievements</h2>
        <Button variant="secondary" className="hv-sub" onClick={onRewards}>View chapter medallions</Button>
      </section>
      <p className="trust-note"><span aria-hidden="true">✓</span> Optional account. No adverts. Just puzzles.</p>
    </main>
  )
}
