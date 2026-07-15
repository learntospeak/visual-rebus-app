import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'

interface ChapterMapScreenProps {
  completedCount: number
  puzzleCount: number
  onHome: () => void
  onOpenChapter: () => void
}

const plannedChapters = [
  ['2', 'Between the Lines', 'Levels 26–75'],
  ['3', 'Picture This', 'Levels 76–150'],
  ['4', 'Twist Your Thinking', 'Levels 151–225'],
]

export function ChapterMapScreen({ completedCount, puzzleCount, onHome, onOpenChapter }: ChapterMapScreenProps) {
  return (
    <main className="app-shell chapter-map-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h1>Chapters</h1>
        </div>
      </header>

      <section className="chapter-list" aria-label="Puzzle chapters">
        <article className="chapter-card chapter-current">
          <div className="chapter-number">01</div>
          <div className="chapter-card-copy">
            <span className="chapter-state">CURRENT CHAPTER</span>
            <h2>First Steps</h2>
            <p>Placement, scale, icons and rotation</p>
            <ProgressBar value={completedCount} max={puzzleCount} label={`${completedCount} of ${puzzleCount} puzzles solved`} />
            <strong>{completedCount} / {puzzleCount} solved</strong>
          </div>
          <Button className="chapter-play" onClick={onOpenChapter}>Play <span aria-hidden="true">→</span></Button>
        </article>

        {plannedChapters.map(([number, title, levels]) => (
          <article className="chapter-card chapter-locked" key={number} aria-label={`${title}, planned`}>
            <div className="chapter-number">0{number}</div>
            <div className="chapter-card-copy">
              <span className="chapter-state">COMING NEXT</span>
              <h2>{title}</h2>
              <p>{levels}</p>
            </div>
            <span className="chapter-lock" aria-hidden="true">◇</span>
          </article>
        ))}
      </section>
    </main>
  )
}
