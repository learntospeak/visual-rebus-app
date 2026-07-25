import { Button } from '../components/Button'
import { localDateKey, previousDateKey } from '../services/progress'
import type { DailyProgress } from '../types'

interface DailyScreenProps { progress: DailyProgress; onHome: () => void; onPlay: () => void }

export function DailyScreen({ progress, onHome, onPlay }: DailyScreenProps) {
  const today = new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  const todayKey = localDateKey()
  const completed = progress.completedDates.includes(todayKey)
  const revealed = progress.revealedDates.includes(todayKey)
  const activeStreak = progress.lastCompletedDate === todayKey || progress.lastCompletedDate === previousDateKey(todayKey) ? progress.currentStreak : 0
  return (
    <main className="app-shell daily-screen-shell">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div><span className="eyebrow">DAILY PUZZLE</span><h1>Today</h1></div>
      </header>
      <section className="daily-card">
        <span className="daily-sun" aria-hidden="true">☀</span>
        <p className="kicker">{today.toUpperCase()}</p>
        <h2>A fresh little<br />aha moment.</h2>
        <p>{completed ? 'Today’s puzzle is complete. Nicely done!' : revealed ? 'You revealed today’s answer. Come back tomorrow for a fresh puzzle.' : 'The same daily puzzle for everyone. Clues are welcome and missing a day is no drama.'}</p>
        {completed || revealed ? (
          <Button className="full-button" onClick={onHome}>Return home <span aria-hidden="true">→</span></Button>
        ) : (
          <Button className="full-button" onClick={onPlay}>Play today’s puzzle <span aria-hidden="true">→</span></Button>
        )}
      </section>
      <div className="streak-preview">
        <span>Current streak</span><strong>{activeStreak} {activeStreak === 1 ? 'day' : 'days'}</strong>
        <small>Longest streak: {progress.longestStreak} {progress.longestStreak === 1 ? 'day' : 'days'}. Missing a day simply starts a fresh streak.</small>
      </div>
    </main>
  )
}
