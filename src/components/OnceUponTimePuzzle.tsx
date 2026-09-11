import { useEffect, useRef, useState } from 'react'
import { playHaptic, playOnceChimeAccent } from '../services/audio'

type AnimationPhase = 'waiting' | 'orbiting' | 'rising' | 'landed'

export function OnceUponTimePuzzle({ soundEnabled = false }: { soundEnabled?: boolean }) {
  const [phase, setPhase] = useState<AnimationPhase>('waiting')
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  function begin() {
    if (phase !== 'waiting') return
    setPhase('orbiting')
    playHaptic('success')
    if (soundEnabled) playOnceChimeAccent()
    timers.current.push(window.setTimeout(() => setPhase('rising'), 1420))
    timers.current.push(window.setTimeout(() => {
      setPhase('landed')
      playHaptic('success')
    }, 2020))
  }

  const completed = phase === 'landed'
  return (
    <button
      type="button"
      className={`puzzle-visual once-upon-time-puzzle phase-${phase}`}
      aria-label={completed ? 'A single golden one rests directly upon the word TIME' : 'A single golden one waits beneath a clock marked TIME. Tap to set it moving once.'}
      disabled={phase !== 'waiting'}
      onClick={begin}
    >
      <span className="once-book-cover" aria-hidden="true" />
      <span className="once-clock" aria-hidden="true">
        <i className="once-clock-ticks" />
        <i className="once-clock-hand" />
        <span className="once-time-plaque">TIME</span>
      </span>
      <span className="once-orbit" aria-hidden="true"><b>1</b></span>
      <span className="once-motion-trail" aria-hidden="true" />
      <small className="once-status">{completed ? 'One has come to rest upon time.' : phase === 'waiting' ? 'The clock is waiting for a single touch.' : phase === 'orbiting' ? 'One journey. One chime.' : 'One rises above time…'}</small>
    </button>
  )
}
