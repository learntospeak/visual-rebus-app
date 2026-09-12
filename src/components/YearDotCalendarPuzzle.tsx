import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { playHaptic, playPaperFlipAccent } from '../services/audio'

interface FlyingPage {
  id: number
  label: number
  direction: number
  delay: number
  spin: number
}

const pageRuns = [
  { to: 2000, count: 5 },
  { to: 1900, count: 7 },
  { to: 1000, count: 9 },
  { to: 100, count: 11 },
  { to: 1, count: 13 },
  { to: 0, count: 15 },
]

function pageLabel(from: number, to: number, index: number, total: number) {
  if (to === 0) return Math.max(1, Math.round(from - (from - 1) * ((index + 1) / total)))
  const progress = (index + 1) / total
  return Math.max(to, Math.round(from - (from - to) * progress * progress))
}

export function YearDotCalendarPuzzle({ soundEnabled = false }: { soundEnabled?: boolean }) {
  const [runIndex, setRunIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState(2026)
  const [pages, setPages] = useState<FlyingPage[]>([])
  const [busy, setBusy] = useState(false)
  const [atDot, setAtDot] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  function turnPages() {
    if (busy || atDot || runIndex >= pageRuns.length) return
    const run = pageRuns[runIndex]
    const nextPages = Array.from({ length: run.count }, (_, index) => ({
      id: runIndex * 100 + index,
      label: pageLabel(currentYear, run.to, index, run.count),
      direction: index % 2 === 0 ? 1 : -1,
      delay: index * Math.max(32, 67 - runIndex * 6),
      spin: 12 + (index % 5) * 4,
    }))
    const duration = nextPages.at(-1)!.delay + 720

    setBusy(true)
    setPages(nextPages)
    if (soundEnabled) playPaperFlipAccent(runIndex)
    playHaptic('success')

    timer.current = window.setTimeout(() => {
      setPages([])
      setBusy(false)
      setRunIndex((value) => value + 1)
      if (run.to === 0) {
        setAtDot(true)
      } else {
        setCurrentYear(run.to)
      }
    }, duration)
  }

  const status = atDot
    ? 'The years have run out. Only the final mark remains.'
    : busy
      ? runIndex < 2 ? 'The years are falling away…' : 'The calendar is accelerating into the past…'
      : currentYear === 1 ? 'Only the first numbered year remains.' : runIndex === 0 ? 'The top page will not lie still.' : 'More years wait beneath the page.'

  return (
    <div className={`puzzle-visual year-dot-calendar-puzzle${atDot ? ' is-at-dot' : ''}`} role="group" aria-label="A calendar travelling backwards through years">
      <span className="calendar-desk-light" aria-hidden="true" />
      <button
        type="button"
        className={`year-dot-calendar${busy ? ' is-turning' : ''}`}
        aria-label={atDot ? 'The last calendar page contains only a dot' : `Calendar showing year ${currentYear}. Tap to turn back more pages.`}
        disabled={busy || atDot}
        onClick={turnPages}
      >
        <span className="calendar-board" aria-hidden="true" />
        <span className="calendar-paper-stack" aria-hidden="true" />
        <span className="calendar-rings" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="calendar-sheet" aria-hidden="true">
          {!atDot && <span className="calendar-year-label">YEAR</span>}
          <strong className="calendar-year-value">{atDot ? '' : currentYear}</strong>
          {atDot && <span className="calendar-final-dot" />}
          {!atDot && <small>ARCHIVE No. {String(runIndex + 1).padStart(3, '0')}</small>}
          {!atDot && <span className="calendar-lifted-corner" />}
        </span>
        <span className="calendar-flying-pages" aria-hidden="true">
          {pages.map((page) => {
            const style = {
              '--page-delay': `${page.delay}ms`,
              '--page-x': `${page.direction * (42 + page.spin)}%`,
              '--page-spin': `${page.direction * page.spin}deg`,
            } as CSSProperties
            return <i className="calendar-flying-page" style={style} key={page.id}><small>YEAR</small>{page.label}</i>
          })}
        </span>
      </button>
      <p className="year-dot-sr-status" aria-live="polite"><i aria-hidden="true" />{status}</p>
    </div>
  )
}
