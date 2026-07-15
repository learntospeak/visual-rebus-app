import type { Puzzle } from '../types'

function TwoLeftFeet() {
  return (
    <div className="puzzle-visual two-left-feet" role="img" aria-label="Two left-facing shoes, each marked with the letter L">
      {[0, 1].map((foot) => (
        <svg className="left-shoe-icon" viewBox="0 0 210 105" aria-hidden="true" key={foot}>
          <path className="shoe-upper" d="M194 20h-54l-17 38-35 12-61 2C14 72 7 79 9 89h187c5-22 4-45-2-69Z" />
          <path className="shoe-sole" d="M9 88c0 8 6 12 16 12h169c5 0 8-4 8-10v-5H31c-9 0-16 1-22 3Z" />
          <path className="shoe-toe-cap" d="M28 72c18 0 31 4 39 13H17c-8 0-7-10 11-13Z" />
          <path className="shoe-panel" d="M123 58 96 69l-29 2 19-30h46Z" />
          <path className="shoe-laces" d="m91 48 29 13M84 56l27 12M78 64l20 8" />
          <circle className="left-marker" cx="162" cy="50" r="20" />
          <text className="left-marker-text" x="162" y="58" textAnchor="middle">L</text>
        </svg>
      ))}
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
