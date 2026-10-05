import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { miniGames, readMiniGameProgress } from '../services/miniGameProgress'
import type { SavedProgress } from '../types'
import './HomeScreen.css'

interface Props {
  progress: SavedProgress
  puzzleCount: number
  totalStars: number
  dailyStreak: number
  dailyRebusStatus: 'solved' | 'revealed' | 'not-played'
  accountState: 'guest' | 'synced' | 'error'
  onHome: () => void
  onRewards: () => void
  onAccount: () => void
}

const rebusText = { solved: 'Solved today', revealed: 'Answer revealed today', 'not-played': 'Not played today' }
const accountText = { guest: 'Sign in or create an account', synced: 'Open your account', error: 'Account sync needs attention' }

export function ProfileProgressScreen({ progress, puzzleCount, totalStars, dailyStreak, dailyRebusStatus, accountState, onHome, onRewards, onAccount }: Props) {
  const [games, setGames] = useState(() => readMiniGameProgress())
  useEffect(() => {
    const refresh = () => setGames(readMiniGameProgress())
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  return (
    <main className="app-shell pp-screen">
      <header>
        <h1>Profile &amp; progress</h1>
        <Button variant="secondary" onClick={onHome}>Return home</Button>
      </header>

      <section className="pp-card" aria-labelledby="pr-pp">
        <h2 id="pr-pp">Starter pack · Picture Puzzles</h2>
        <ul className="pp-list">
          <li><span>Solved</span><b>{progress.completedIds.length} of {puzzleCount}</b></li>
          <li><span>Stars earned</span><b>{totalStars}</b></li>
          <li><span>Daily streak</span><b>{dailyStreak} days</b></li>
        </ul>
        <ProgressBar value={progress.completedIds.length} max={puzzleCount} label={`${progress.completedIds.length} of ${puzzleCount} puzzles solved`} />
        <Button variant="secondary" onClick={onRewards}>My chapter medallion</Button>
      </section>

      <section className="pp-card" aria-labelledby="pr-mg">
        <h2 id="pr-mg">More Games</h2>
        <p>Saved on this device.</p>
        {games.unavailable ? <p>Progress unavailable. Saved progress could not be read on this device.</p> : (
          <ul className="pp-list">
            {miniGames.map((g) => <li key={g.id}><span>{g.title}</span><b>{games.solved[g.id]} of 100 solved</b></li>)}
          </ul>
        )}
      </section>

      <section className="pp-card" aria-labelledby="pr-d">
        <h2 id="pr-d">Daily picture puzzle</h2>
        <ul className="pp-list">
          <li><span>{rebusText[dailyRebusStatus]}</span><b>{dailyStreak} day streak</b></li>
        </ul>
      </section>

      <section className="pp-card" aria-labelledby="pr-m">
        <h2 id="pr-m">Today’s Challenge (four-game mix)</h2>
        <p>Daily mix progress is saved on this device.</p>
        <p>{games.unavailable ? 'Score unavailable.' : games.dailyScore === null ? 'Not played today.' : `Today: ${games.dailyScore} of 4 solved.`}</p>
      </section>

      <Button onClick={onAccount} className={`account-${accountState}`}>{accountText[accountState]}</Button>
    </main>
  )
}
