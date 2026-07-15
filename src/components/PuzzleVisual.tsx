import { GiFootprint } from 'react-icons/gi'
import type { Puzzle } from '../types'

function TwoLeftFeet() {
  return (
    <div className="puzzle-visual two-left-feet" role="img" aria-label="Two identical bare footprints with their toes pointing left">
      <GiFootprint className="left-footprint-icon" aria-hidden="true" />
      <GiFootprint className="left-footprint-icon" aria-hidden="true" />
    </div>
  )
}

function ThreeBlindMice() {
  return (
    <div className="puzzle-visual three-blind-mice" role="img" aria-label="Three mice wearing blindfolds over their eyes">
      {[0, 1, 2].map((mouse) => (
        <svg className="blind-mouse-icon" viewBox="0 0 120 125" aria-hidden="true" key={mouse}>
          <circle className="mouse-ear" cx="30" cy="31" r="23" />
          <circle className="mouse-ear" cx="90" cy="31" r="23" />
          <path className="mouse-face" d="M60 16c-30 0-48 22-45 50 3 25 22 46 45 54 23-8 42-29 45-54 3-28-15-50-45-50Z" />
          <path className="mouse-blindfold" d="M17 48c27-10 59-10 86 0l-4 25c-26-8-52-8-78 0Z" />
          <path className="mouse-tie" d="M101 53l16-12-5 23 6 15-18-10Z" />
          <circle className="mouse-nose" cx="60" cy="94" r="7" />
          <path className="mouse-whiskers" d="M50 96 12 88m38 15-36 8m56-15 38-8m-38 15 36 8" />
        </svg>
      ))}
    </div>
  )
}

export function PuzzleVisual({ puzzle }: { puzzle: Puzzle }) {
  if (puzzle.id === 13) return <TwoLeftFeet />
  if (puzzle.id === 20) return <ThreeBlindMice />

  return (
    <div
      className={`puzzle-visual visual-${puzzle.id}`}
      role="img"
      aria-label={puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')}
    >
      {puzzle.elements.map((item, index) => (
        <span className={item.className} key={`${puzzle.id}-${index}`} aria-hidden="true">
          {item.content}
        </span>
      ))}
    </div>
  )
}
