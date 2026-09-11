import { useState } from 'react'
import { playHaptic, playOnceChimeAccent } from '../services/audio'

const ones = [-2, -1, 0, 1, 2]

export function OnceUponTimePuzzle({ soundEnabled = false }: { soundEnabled?: boolean }) {
  const [revealed, setRevealed] = useState(false)

  function begin() {
    if (revealed) return
    setRevealed(true)
    playHaptic('success')
    if (soundEnabled) playOnceChimeAccent()
  }

  return (
    <button
      type="button"
      className={`puzzle-visual once-upon-time-puzzle${revealed ? ' is-revealed' : ''}`}
      aria-label={revealed ? 'Five golden number ones have moved from underneath the clock to above it.' : 'Five golden number ones wait underneath a traditional clock face. Tap the clock to move them.'}
      onClick={begin}
    >
      <span className="once-stage-glow" aria-hidden="true" />
      <span className="once-ones" aria-hidden="true">
        {ones.map((position) => (
          <b
            key={position}
            style={{
              '--one-x': `${position * 38}px`,
              '--one-curve': `${position * -12}px`,
              '--one-arc': `${Math.abs(position) * 3}px`,
              '--one-tilt': `${position * -7}deg`,
              '--one-delay': `${(position + 2) * 85}ms`,
            } as React.CSSProperties}
          >1</b>
        ))}
      </span>
      <span className="once-clock" aria-hidden="true">
        <i className="once-clock-minute-marks" />
        <i className="once-clock-inner-ring" />
        <span className="once-clock-number once-clock-twelve">12</span>
        <span className="once-clock-number once-clock-three">3</span>
        <span className="once-clock-number once-clock-six">6</span>
        <span className="once-clock-number once-clock-nine">9</span>
        <i className="once-clock-hand once-clock-hour-hand" />
        <i className="once-clock-hand once-clock-minute-hand" />
        <i className="once-clock-pin" />
      </span>
    </button>
  )
}
