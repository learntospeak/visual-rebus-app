import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { puzzlePacks } from '../data/catalog'

interface ChapterMapScreenProps {
  completedCount: number
  puzzleCount: number
  completedIds: number[]
  revealedIds: number[]
  starsByPuzzle: Record<number, number>
  currentIndex: number
  onHome: () => void
  onOpenPuzzle: (index: number) => void
}

const plannedChapters = puzzlePacks.filter((pack) => pack.status === 'planned')
const availableChapters = puzzlePacks.filter((pack) => pack.status === 'available')

export function ChapterMapScreen({ puzzleCount, completedIds, revealedIds, starsByPuzzle, currentIndex, onHome, onOpenPuzzle }: ChapterMapScreenProps) {
  function puzzleTile(index: number, alwaysAvailable = false) {
    const puzzleId = index + 1
    const completed = completedIds.includes(puzzleId)
    const revealed = revealedIds.includes(puzzleId) && !completed
    const current = index === currentIndex
    const available = alwaysAvailable || completed || revealed || index <= currentIndex
    const label = completed ? `Puzzle ${puzzleId}, completed with ${starsByPuzzle[puzzleId] ?? 0} stars, replay` : revealed ? `Puzzle ${puzzleId}, answer revealed, replay` : current ? `Puzzle ${puzzleId}, current` : alwaysAvailable ? `Draft puzzle ${puzzleId}, available for testing` : `Puzzle ${puzzleId}, locked`
    return (
      <button type="button" className={`puzzle-tile${completed ? ' is-complete' : ''}${revealed ? ' is-revealed' : ''}${current ? ' is-current' : ''}`} disabled={!available} aria-label={label} onClick={() => onOpenPuzzle(index)} key={puzzleId}>
        {completed ? `★${starsByPuzzle[puzzleId] ?? 0}` : revealed ? 'R' : puzzleId}
      </button>
    )
  }

  return (
    <main className="app-shell chapter-map-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h1>Packs</h1>
        </div>
      </header>

      <section className="chapter-list" aria-label="Puzzle chapters">
        {availableChapters.map((pack) => {
          const firstIndex = pack.firstPuzzle - 1
          const lastPuzzle = Math.min(pack.lastPuzzle, puzzleCount)
          const count = Math.max(0, lastPuzzle - pack.firstPuzzle + 1)
          if (count === 0) return null
          const solved = completedIds.filter((id) => id >= pack.firstPuzzle && id <= lastPuzzle).length
          const isStarter = pack.order === 1
          return (
            <article className={`chapter-card ${isStarter ? 'chapter-current' : 'chapter-draft'}`} key={pack.id}>
              <div className="chapter-number">{String(pack.order).padStart(2, '0')}</div>
              <div className="chapter-card-copy">
                <span className="chapter-state">{isStarter ? 'CURRENT CHAPTER' : 'PLAYTEST DRAFTS'}</span>
                <h2>{pack.title}</h2>
                <p>{pack.description} · puzzles {pack.firstPuzzle}–{lastPuzzle}</p>
                <ProgressBar value={solved} max={count} label={`${solved} of ${count} puzzles solved`} />
                <strong>{solved} / {count} {isStarter ? 'solved' : 'tested'}</strong>
              </div>
              <div className="puzzle-grid" aria-label={`${pack.title} puzzles ${pack.firstPuzzle} to ${lastPuzzle}`}>
                {Array.from({ length: count }, (_, offset) => puzzleTile(firstIndex + offset, !isStarter))}
              </div>
              <Button className="chapter-play" onClick={() => onOpenPuzzle(isStarter ? Math.min(currentIndex, lastPuzzle - 1) : firstIndex)}>
                {isStarter ? 'Continue' : `Test puzzle ${pack.firstPuzzle}`} <span aria-hidden="true">→</span>
              </Button>
            </article>
          )
        })}

        {plannedChapters.map((pack) => (
          <article className="chapter-card chapter-locked" key={pack.id} aria-label={`${pack.title}, planned`}>
            <div className="chapter-number">0{pack.order}</div>
            <div className="chapter-card-copy">
              <span className="chapter-state">COMING NEXT</span>
              <h2>{pack.title}</h2>
              <p>Levels {pack.firstPuzzle}–{pack.lastPuzzle} · difficulty {pack.difficultyRange[0]}–{pack.difficultyRange[1]}</p>
            </div>
            <span className="chapter-lock" aria-hidden="true">◇</span>
          </article>
        ))}
      </section>
    </main>
  )
}
