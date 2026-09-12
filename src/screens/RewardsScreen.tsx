import { useEffect, useRef } from 'react'
import { Button } from '../components/Button'
import { ChapterMedallion } from '../components/ChapterMedallion'
import { chapterRewards } from '../services/rewards'
import './RewardsScreen.css'

export function RewardsScreen({ completedIds, celebration, reducedMotion, onHome, onContinue, onCollection, onChapters }: {
  completedIds: number[]; celebration?: string | null; reducedMotion: boolean;
  onHome: () => void; onContinue: () => void; onCollection: () => void; onChapters: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    heading.current?.focus({ preventScroll: true })
  }, [celebration])
  const chapters = chapterRewards(completedIds)
  const count = chapters.filter(chapter => chapter.earned).length
  const master = count === chapters.length
  const chapter = chapters.find(item => item.id === celebration)
  return <main className={`app-shell rewards-screen ${celebration && !reducedMotion ? 'rewards-celebrating' : ''}`}>
    <header className="brand-row"><span className="eyebrow">CLUE CANVAS · REWARDS</span><Button variant="secondary" onClick={onHome}>Home</Button></header>
    <section className="rewards-hero" aria-labelledby="reward-title">
      <p className="kicker">{celebration ? master ? 'EVERY PIECE. EVERY AHA.' : 'A NEW PIECE OF YOUR JOURNEY' : 'YOUR CHAPTER COLLECTION'}</p>
      <h1 ref={heading} tabIndex={-1} id="reward-title">{master ? 'Clue Canvas Master' : celebration ? 'Chapter complete!' : 'Piece by piece.'}</h1>
      <p>{celebration ? master ? 'You’ve solved every puzzle in all ten chapters. Your golden medallion is complete.' : `${chapter?.title}: complete. Your chapter piece is now part of your medallion.` : 'Every completed chapter adds a piece to your medallion.'}</p>
      <ChapterMedallion earned={chapters.map(item => item.earned)} highlight={chapter ? chapter.order - 1 : undefined}/>
      <strong className="reward-count">{count} of {chapters.length} chapters complete</strong>
      {celebration ? <div className="reward-actions"><Button onClick={master ? onCollection : onContinue}>{master ? 'View my collection' : 'Continue solving'}</Button><Button variant="secondary" onClick={master ? onChapters : onCollection}>{master ? 'Revisit puzzles' : 'View collection'}</Button><button className="reward-skip" onClick={onHome}>Skip to home</button></div> : <Button onClick={onChapters}>Explore chapters</Button>}
    </section>
    {!celebration && <><p className="reward-note">Clues are welcome. Solve every puzzle in a chapter to earn its piece; revealed answers can be revisited and solved. Stars are a separate achievement.</p><ol className="reward-chapters">{chapters.map(item => <li key={item.id} className={item.earned ? 'earned' : ''}><span className="reward-chapter-number">{item.order}</span><div><strong>{item.title}</strong><span>{item.earned ? 'Piece earned' : `${item.solved} / ${item.total} solved`}</span></div><span aria-label={item.earned ? 'Complete' : 'In progress'}>{item.earned ? '✓' : '○'}</span></li>)}</ol></>}
  </main>
}
