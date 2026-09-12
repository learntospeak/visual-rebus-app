import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PuzzleVisual } from '../components/PuzzleVisual'
import { puzzles } from '../data/puzzles'
import { puzzlePacks } from '../data/catalog'
import type { Puzzle } from '../types'
import './ArtworkGallery.css'

type Selection = { selected: boolean; note: string }
type Selections = Record<number, Selection>
const storageKey = 'cluecanvas-all-artwork-selection-v1'
const emptySelection: Selection = { selected: false, note: '' }

function readSelections(): Selections {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const valid: Selections = {}
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return valid
    for (const puzzle of puzzles) {
      const value = parsed[puzzle.id]
      if (value && typeof value === 'object') valid[puzzle.id] = {
        selected: value.selected === true,
        note: typeof value.note === 'string' ? value.note.slice(0, 2000) : '',
      }
    }
    return valid
  } catch { return {} }
}

// Scale the complete mobile renderer, including fixed-position lettering and layers.
// Resizing only the source image would lose those overlays and code-drawn puzzles.
function Artwork({ puzzle, eager = false }: { puzzle: Puzzle; eager?: boolean }) {
  const frame = useRef<HTMLDivElement>(null)
  const [nearby, setNearby] = useState(eager)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const element = frame.current
    if (!element) return
    if (eager || typeof IntersectionObserver === 'undefined') { setNearby(true); return }
    const observer = new IntersectionObserver(([entry]) => setNearby(entry.isIntersecting), { rootMargin: '600px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [eager])
  useEffect(() => {
    const element = frame.current
    if (!element) return
    const update = () => setScale(element.getBoundingClientRect().width / 320 || 1)
    update()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div className="ag-art-frame" ref={frame}>
    {nearby ? <div className="ag-art-stage" style={{ transform: `scale(${scale})` }}>
      <PuzzleVisual key={puzzle.id} puzzle={puzzle} soundEnabled={false} />
    </div> : <span className="ag-placeholder">Puzzle {puzzle.id}</span>}
  </div>
}

export default function ArtworkGallery() {
  const [search, setSearch] = useState('')
  const [chapter, setChapter] = useState('all')
  const [onlySelected, setOnlySelected] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [selections, setSelections] = useState<Selections>(readSelections)
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [expanded, setExpanded] = useState<Puzzle | null>(null)
  const [previewVersion, setPreviewVersion] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const selectedCount = puzzles.filter(p => selections[p.id]?.selected).length
  const reviewedPuzzles = puzzles.filter(p => selections[p.id]?.selected || selections[p.id]?.note.trim())
  useEffect(() => {
    document.title = 'Clue Canvas · All artwork'
    const robots = document.createElement('meta')
    robots.name = 'robots'; robots.content = 'noindex,nofollow'
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(selections)) }
    catch { setStorageAvailable(false) }
  }, [selections])
  useEffect(() => {
    if (expanded && dialog.current && !dialog.current.open) dialog.current.showModal()
  }, [expanded])
  const updateSelection = useCallback((id: number, patch: Partial<Selection>) => {
    setSelections(current => ({ ...current, [id]: { ...(current[id] || emptySelection), ...patch } }))
  }, [])
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return puzzles.filter(p => (chapter === 'all' || p.chapterId === chapter)
      && (!onlySelected || selections[p.id]?.selected)
      && (!query || (/^\d+$/.test(query) ? p.id === Number(query) : p.answer.toLowerCase().includes(query))))
  }, [search, chapter, onlySelected, selections])
  const download = () => {
    const chosen = reviewedPuzzles.map(p => ({ puzzle: p.id, answer: p.answer, flagged: selections[p.id].selected, note: selections[p.id].note }))
    const url = URL.createObjectURL(new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), selections: chosen }, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url; link.download = 'ClueCanvas-Selected-Artworks.json'; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const closePreview = () => {
    setExpanded(null)
    opener.current?.focus()
  }
  return <div className="artwork-gallery">
    <header className="ag-header"><div><a href="/" className="ag-brand">Clue Canvas</a><h1>Every artwork. Your choice.</h1>
      <p>All {puzzles.length} puzzles currently in the game, in number order. Mark the ones you want improved and add a note.</p>
      <p className="ag-tip">Tap artwork to try its interaction. Use “Inspect” for a larger view.</p></div></header>
    <main className="ag-main">
      <section className="ag-toolbar" aria-label="Gallery controls">
        <label className="ag-search">Find a puzzle<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Number or answer phrase" /></label>
        <label>Chapter<select value={chapter} onChange={e => setChapter(e.target.value)}><option value="all">All chapters</option>{puzzlePacks.map(p => <option key={p.id} value={p.id}>{p.order}. {p.title}</option>)}</select></label>
        <label className="ag-check"><input type="checkbox" checked={onlySelected} onChange={e => setOnlySelected(e.target.checked)} />Selected only</label>
        <label className="ag-check"><input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} />Show answers</label>
        <button className="ag-download" disabled={!reviewedPuzzles.length} onClick={download}>Download comments & flags ({reviewedPuzzles.length})</button>
      </section>
      <div className="ag-status" role="status">{filtered.length} of {puzzles.length} shown · {selectedCount} selected</div>
      <p className="ag-storage">{storageAvailable ? 'Selections and notes stay in this browser. Download them and send me the file when you’re ready.' : 'Browser storage is unavailable. Download your selections before leaving this page.'}</p>
      <section className="ag-grid" aria-label="All current puzzle artworks">
        {filtered.map(puzzle => {
          const selection = selections[puzzle.id] || emptySelection
          return <article className={`ag-card${selection.selected ? ' ag-selected' : ''}`} key={puzzle.id} id={`artwork-${puzzle.id}`}>
            <div className="ag-card-header"><h2>Puzzle {puzzle.id}</h2><button onClick={e => { opener.current = e.currentTarget; setPreviewVersion(0); setExpanded(puzzle) }} aria-label={`Inspect puzzle ${puzzle.id}`}>Inspect ↗</button></div>
            <Artwork puzzle={puzzle} />
            <div className="ag-card-footer">{showAnswers && <p className="ag-answer">{puzzle.answer}</p>}
              <label className="ag-check"><input type="checkbox" checked={selection.selected} onChange={e => updateSelection(puzzle.id, { selected: e.target.checked })} />Flag this artwork</label>
              <label className="ag-note" htmlFor={`art-note-${puzzle.id}`}>Your note<textarea id={`art-note-${puzzle.id}`} rows={2} maxLength={2000} value={selection.note} onChange={e => updateSelection(puzzle.id, { note: e.target.value })} placeholder="What should change?" /></label>
              <a href={`/?puzzle=${puzzle.id}`} target="_blank" rel="noopener">Open in the game ↗</a>
            </div>
          </article>
        })}
      </section>
      {!filtered.length && <p className="ag-empty">No puzzles match. Clear the search or change the filters.</p>}
      <footer className="ag-footer">Artwork previews use the same components as the game, including text overlays and code-drawn scenes. Preview interactions do not change your game progress. Artwork loads as you scroll.</footer>
    </main>
    <dialog className="ag-dialog" ref={dialog} onClose={closePreview} onClick={e => {
      if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.currentTarget.close() }
    }} aria-label={expanded ? `Inspect puzzle ${expanded.id}` : 'Inspect artwork'}>
      {expanded && <><div className="ag-dialog-toolbar"><h2>Puzzle {expanded.id}</h2><button onClick={() => setPreviewVersion(v => v + 1)}>Reset preview</button><button onClick={() => dialog.current?.close()}>Close</button></div>
        <div className="ag-expanded"><Artwork key={`${expanded.id}-${previewVersion}`} puzzle={expanded} eager /></div>
        <p className="ag-dialog-hint">Tap or drag within the artwork where an interaction is available.</p>
        <div className="ag-dialog-bottom"><label className="ag-check"><input type="checkbox" checked={selections[expanded.id]?.selected || false} onChange={e => updateSelection(expanded.id, { selected: e.target.checked })} />Flag this artwork</label><a href={`/?puzzle=${expanded.id}`} target="_blank" rel="noopener">Open in the game ↗</a></div></>}
    </dialog>
  </div>
}
