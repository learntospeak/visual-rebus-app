import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import './HomeScreen.css'
interface Props { completedCount: number; puzzleCount: number; totalStars: number; dailyStreak: number; onHome: () => void; onResume: () => void; onBrowse: () => void; onRewards: () => void; onDaily: () => void }
export function PicturePuzzlesMenuScreen({ completedCount, puzzleCount, totalStars, dailyStreak, onHome, onResume, onBrowse, onRewards, onDaily }: Props) {
  return <main className="app-shell pp-screen rebus-menu">
    <header><div><p className="eyebrow">YOUR REBUS JOURNEY</p><h1>Picture Puzzles</h1></div><Button variant="text" onClick={onHome}>Main menu</Button></header>
    <p className="rebus-menu-intro">Pick up where you left off, explore a chapter, or see what you’ve earned.</p>
    <section className="pp-card rebus-menu-stats" aria-label="Your puzzle stats">
      <div className="rebus-menu-solved"><strong>{completedCount} of {puzzleCount} solved</strong><span>{Math.round(completedCount / puzzleCount * 100)}%</span></div>
      <ProgressBar value={completedCount} max={puzzleCount} label={completedCount + ' of ' + puzzleCount + ' puzzles solved'} />
      <div className="rebus-stat-row"><span><strong>{totalStars}</strong> stars earned</span><span><strong>{dailyStreak}</strong> day streak</span></div>
    </section>
    <nav className="rebus-menu-actions" aria-label="Picture puzzle options">
      <Button onClick={onResume}>{completedCount ? 'Continue solving' : 'Start playing'} <span aria-hidden="true">→</span></Button>
      <Button variant="secondary" onClick={onBrowse}><span>Chapters</span><span aria-hidden="true">→</span></Button>
      <Button variant="secondary" onClick={onRewards}><span>My chapter medallion</span><span aria-hidden="true">→</span></Button>
      <Button variant="secondary" onClick={onDaily}><span>Today’s picture puzzle</span><span aria-hidden="true">→</span></Button>
    </nav>
  </main>
}
