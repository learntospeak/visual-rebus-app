import { Button } from '../components/Button'
import { miniGames } from '../services/miniGameProgress'
import type { MiniGameMode } from '../services/miniGameProgress'
import './HomeScreen.css'
import { MdPersonOutline } from 'react-icons/md'

interface HomeScreenProps {
  journeyStarted: boolean
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

export function HomeScreen({ journeyStarted, onPlay, onGames, onDailyMix, onProfile, onSettings }: HomeScreenProps) {
  return (
    <main className="app-shell home-screen home-v3">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <h1 className="eyebrow">CLUE CANVAS</h1>
        <Button variant="icon" className="settings-button hv3-icon" aria-label="Open settings" onClick={onSettings}>⚙</Button>
      </header>

      <Button className="hv3-main" onClick={onPlay}>
        <span>{journeyStarted ? 'Continue Picture Puzzles' : 'Start Picture Puzzles'}</span>
        <span aria-hidden="true">→</span>
      </Button>

      <ul className="hv3-grid">
        {miniGames.map((g) => (
          <li key={g.id}>
            <button type="button" className="hv3-tile" onClick={() => onGames(g.id)}>
              <Cue mode={g.id} />
              <span>{g.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <Button variant="secondary" className="hv3-today" onClick={onDailyMix}>
        <span className="hv3-dot" aria-hidden="true" />Today’s Challenge
      </Button>
      <Button variant="text" className="hv3-profile" onClick={onProfile}>
        <MdPersonOutline aria-hidden="true" size={20} />Profile &amp; progress
      </Button>
    </main>
  )
}
