import { Button } from '../components/Button'
import { miniGames, readMiniGameProgress } from '../services/miniGameProgress'
import type { MiniGameMode } from '../services/miniGameProgress'
import './HomeScreen.css'
import { MdPersonOutline } from 'react-icons/md'

interface HomeScreenProps {
  onPlay: () => void
  onGames: (mode: MiniGameMode) => void
  onDailyMix: () => void
  onProfile: () => void
  onSettings: () => void
}

function Cue({ mode }: { mode: MiniGameMode }) {
  const p = { viewBox: '0 0 40 40', width: 40, height: 40, 'aria-hidden': true, focusable: false } as const
  if (mode === 'odd') return (
    <svg {...p}><circle cx="9" cy="11" r="5" fill="#2cb1a6" /><circle cx="20" cy="11" r="5" fill="#2cb1a6" /><circle cx="31" cy="11" r="5" fill="#2cb1a6" /><circle cx="9" cy="29" r="5" fill="#2cb1a6" /><rect x="15" y="24" width="10" height="10" rx="2" fill="#ff6b5f" /><circle cx="31" cy="29" r="5" fill="#2cb1a6" /></svg>
  )
  if (mode === 'memory') return (
    <svg {...p}><rect x="4" y="4" width="14" height="14" rx="4" fill="#183b56" /><rect x="22" y="4" width="14" height="14" rx="4" fill="#2cb1a6" /><rect x="4" y="22" width="14" height="14" rx="4" fill="#2cb1a6" /><rect x="22" y="22" width="14" height="14" rx="4" fill="#ff6b5f" /></svg>
  )
  if (mode === 'next') return (
    <svg {...p}><circle cx="7" cy="20" r="4" fill="#183b56" /><circle cx="19" cy="20" r="6" fill="#2cb1a6" /><circle cx="33" cy="20" r="7" fill="none" stroke="#ff6b5f" strokeWidth="3" strokeDasharray="4 3" /></svg>
  )
  return (
    <svg {...p}><path d="M5 31 15 9l10 22z" fill="#2cb1a6" /><rect x="22" y="6" width="13" height="13" rx="3" fill="#183b56" /><circle cx="29" cy="30" r="6" fill="#ff6b5f" /></svg>
  )
}

export function HomeScreen({ onPlay, onGames, onDailyMix, onProfile, onSettings }: HomeScreenProps) {
  const games = readMiniGameProgress()
  return (
    <main className="app-shell home-screen puzzle-hub">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <h1 className="eyebrow">CLUE CANVAS</h1>
        <Button variant="icon" className="settings-button hv3-icon" aria-label="Open settings" onClick={onSettings}>⚙</Button>
      </header>

      <p className="hub-kicker">A LITTLE SOMETHING FOR EVERY MIND</p>
      <h2>Your puzzle<br />corner.</h2>
      <p className="hub-intro">Notice something. Remember something. Work something out. Pick your next little challenge.</p>
      <section className="hub-daily">
        <span className="eyebrow">TODAY’S FOUR</span>
        <h3>A fresh little mix.</h3>
        <p>One round of each game. No rush. A different mix tomorrow.</p>
        <Button onClick={onDailyMix}>Play today’s mix →</Button>
        {games.dailyScore !== null && <p className="hub-score">Today: {games.dailyScore} of 4 solved. Replay whenever you like.</p>}
      </section>
      <Button variant="secondary" className="hub-rebus" onClick={onPlay}>
        <span>Rebus Puzzles</span><span aria-hidden="true">→</span>
      </Button>
      <p className="hub-rebus-note">565 picture puzzles · Sign in or play without an account</p>
      <p className="hub-label">PICK YOUR NEXT GAME</p>
      <ul className="hub-shelf">
        {miniGames.map((g) => (
          <li key={g.id}>
            <button type="button" className="hub-card" onClick={() => onGames(g.id)}>
              <span className="hub-icon"><Cue mode={g.id} /></span>
              <span><strong>{g.title}</strong><span className="hub-description">{g.description}</span><span className="hub-tag">{games.solved[g.id]} / 100 solved</span></span>
              <span aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>

      <Button variant="text" className="hv3-profile" onClick={onProfile}>
        <MdPersonOutline aria-hidden="true" size={20} />Profile &amp; progress
      </Button>
    </main>
  )
}

