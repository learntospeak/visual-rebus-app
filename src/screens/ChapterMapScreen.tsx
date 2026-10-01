import { useState } from 'react'
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
  const [chapter, setChapter] = useState<'original' | 'assembly' | null>(() => new URLSearchParams(window.location.search).get('chapters') === '2' ? 'assembly' : null)
  const assemblyIds = ['absence', 'molehill', 'ducks', 'pocket', 'future', 'cooks', 'better-late', 'birds-feather', 'spilled-milk', 'look-before-leap', 'pen-sword', 'knowledge-power', 'practice-perfect', 'haste-waste', 'great-minds']
  const openAssembly = (id = 'absence') => { window.location.href = new URL(`prototypes/assembly-chapter-01/?puzzle=${id}&chapter=2`, window.location.href).href }

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

  if (chapter === null) return (
    <main className="app-shell chapter-map-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div><span className="eyebrow">YOUR JOURNEY</span><h1>Chapters</h1></div>
      </header>
      <section className="chapter-list" aria-label="Choose a chapter">
        <article className="chapter-card chapter-current">
          <div className="chapter-number">01</div>
          <div className="chapter-card-copy">
            <span className="chapter-state">CHAPTER ONE</span><h2>Original Puzzles</h2>
            <p>All your existing packs and visual riddles, together in one chapter.</p>
            <ProgressBar value={completedIds.length} max={puzzleCount} label={`${completedIds.length} of ${puzzleCount} puzzles solved`} />
            <strong>{completedIds.length} / {puzzleCount} solved</strong>
          </div>
          <Button className="chapter-play" onClick={() => setChapter('original')}>View packs & puzzles <span aria-hidden="true">→</span></Button>
        </article>
        <article className="chapter-card chapter-draft">
          <div className="chapter-number">02</div>
          <div className="chapter-card-copy">
            <span className="chapter-state">CHAPTER TWO</span><h2>Assembly</h2>
            <p>Piece the picture together, then solve the phrase.</p><strong>15 puzzles ready to play</strong>
          </div>
          <Button className="chapter-play" onClick={() => setChapter('assembly')}>View Assembly puzzles <span aria-hidden="true">→</span></Button>
        </article>
      </section>
    </main>
  )

  if (chapter === 'assembly') return (
    <main className="app-shell chapter-map-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return to chapters" onClick={() => setChapter(null)}>←</Button>
        <div><span className="eyebrow">CHAPTER TWO</span><h1>Assembly</h1></div>
      </header>
      <section className="chapter-list" aria-label="Assembly puzzle packs">
        <article className="chapter-card chapter-current">
          <div className="chapter-number">01</div>
          <div className="chapter-card-copy"><span className="chapter-state">ASSEMBLY PACK</span><h2>Hidden Meanings</h2><p>Swap and rotate the pieces. Once the picture is complete, uncover its hidden phrase.</p></div>
          <div className="puzzle-grid" aria-label="Assembly puzzles">
            {assemblyIds.map((id, index) => <button type="button" className="puzzle-tile" aria-label={`Assembly puzzle ${index + 1}, play`} onClick={() => openAssembly(id)} key={id}>{index + 1}</button>)}
          </div>
          <Button className="chapter-play" onClick={() => openAssembly()}>Play Assembly <span aria-hidden="true">→</span></Button>
        </article>
      </section>
    </main>
  )

  return (
    <main className="app-shell chapter-map-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return to chapters" onClick={() => setChapter(null)}>←</Button>
        <div>
          <span className="eyebrow">CHAPTER ONE · ORIGINAL PUZZLES</span>
          <h1>Packs & puzzles</h1>
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
                <span className="chapter-state">{isStarter ? 'STARTER PACK' : 'PLAYTEST DRAFTS'}</span>
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
