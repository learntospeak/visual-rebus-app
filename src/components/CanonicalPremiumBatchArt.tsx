import { useState, type CSSProperties, type ReactNode } from 'react'
import { playHaptic } from '../services/audio'

const imageSources: Record<number, string> = {
  413: '/premium-413-living-v1.webp',
  429: '/premium-429-living-v1.webp',
  433: '/premium-433-living-v1.webp',
  437: '/premium-437-living-v1.webp',
  439: '/premium-439-all-ears-v2.webp',
  443: '/premium-443-level-head-v1.webp',
  444: '/premium-444-head-to-toe-v1.webp',
  445: '/premium-445-thinking-foot-v2.webp',
  446: '/premium-446-bestov-chain-v3.webp',
  447: '/premium-447-worlds-apart-v1.webp',
  449: '/premium-449-world-equation-v2.webp',
  451: '/premium-451-company-crowd-v1.webp',
  452: '/premium-452-six-dozen-v1.webp',
  453: '/premium-453-third-lucky-v1.webp',
}

const labels: Record<number, string> = {
  338: 'Sixes and sevens lie in a confused arrangement on a velvet games table.',
  350: 'An enamel INSULT seal has been physically added to a fractured marble INJURY tablet.',
  408: 'A reader loses the PLOT page from their book through an open window.',
  413: 'A performer occupies the precise centre of a grand theatre stage.',
  429: 'A weary traveller sees the welcoming sight of a warm home.',
  431: 'Quiet words fail to carry, but the snap of a film action board is heard by everyone.',
  433: 'The word WORD is painted directly onto a city street.',
  437: 'Musical notes fall uselessly onto ears that are completely blocked.',
  439: 'An entire audience is represented by attentive ears.',
  441: 'One unusually tall person stands with their head and shoulders above the surrounding group.',
  443: 'A calm tightrope walker keeps a carpenter’s level perfectly balanced across their head.',
  444: 'A gold route travels the full length of a person from their head to their toe.',
  445: 'A bronze foot has a thought bubble containing an animated loading symbol.',
  446: 'A person wearing a gold chain with a BESTOV nameplate holds one world above each raised hand.',
  447: 'Two magnificent worlds sit an enormous distance apart.',
  449: 'A teacher points to the chalkboard equation x minus y equals world.',
  450: 'A cancelled END marker fails to stop the path before it reaches the world.',
  451: 'Two people converse comfortably while three people are tightly crowded together.',
  452: 'The number six balances exactly against six individual tokens.',
  453: 'The third of three doors alone opens onto a lucky golden light.',
}

const interactiveIds = new Set([408, 431, 433, 441, 453])
const tiles = [6, 7, 6, 7, 7, 6, 7, 6]
const tileLayouts = [
  [-112, -62, -12, -13, -87, -48],
  [-38, -78, 9, 36, -51, -75],
  [48, -63, -8, 88, -86, 13],
  [104, -24, 13, 103, -39, -9],
  [-93, 28, 10, -107, 56, -15],
  [-24, 37, -14, -54, 14, 11],
  [57, 32, 16, 29, 70, -12],
  [103, 65, -9, 94, 38, 14],
]

function overlayFor(id: number): ReactNode {
  if (id === 413) return <span className="stage-focus-ring" />
  if (id === 429) return <><span className="sore-sight-glow" /><i className="sore-eye-glint glint-one" /><i className="sore-eye-glint glint-two" /></>
  if (id === 433) return <><span className="street-target-ring" /><b className="street-word">WORD</b></>
  if (id === 437) return <span className="falling-note-layer">{['♪', '♫', '♪', '♩', '♫'].map((note, index) => <i key={index} style={{ '--note-x': `${13 + index * 16}%`, '--note-delay': `${index * -.72}s` } as CSSProperties}>{note}</i>)}</span>
  if (id === 443) return <span className="level-head-glint" aria-hidden="true" />
  if (id === 445) return <span className="thinking-foot-loader" aria-hidden="true" />
  if (id === 447) return <span className="worlds-apart-depth" aria-hidden="true" />
  if (id === 449) return <b className="chalk-equation">x − y = world</b>
  if (id === 453) return <span className="third-lucky-light" aria-hidden="true" />
  return null
}

export function hasCanonicalPremiumBatchArt(id: number) {
  return id === 338 || id === 350 || id === 408 || id === 431 || id === 441 || id === 449 || id === 450 || id in imageSources
}

export function CanonicalPremiumBatchArt({ id }: { id: number }) {
  const [activated, setActivated] = useState(false)
  const [motionCycle, setMotionCycle] = useState(0)
  const interactive = interactiveIds.has(id)

  function activate() {
    if (id === 441) setMotionCycle((value) => value + 1)
    else setActivated((value) => !value)
    playHaptic('success')
  }

  if (id === 338) return (
    <div className="puzzle-visual canonical-premium-batch premium-batch-338" role="img" aria-label={labels[id]}>
      <span className="chaos-table-inlay" aria-hidden="true" />
      <span className="chaos-number-tiles" aria-hidden="true">
        {tiles.map((number, index) => {
          const [x, y, r, x2, y2, r2] = tileLayouts[index]
          return <b key={index} style={{ '--tile-x': `${x}px`, '--tile-y': `${y}px`, '--tile-r': `${r}deg`, '--tile-x2': `${x2}px`, '--tile-y2': `${y2}px`, '--tile-r2': `${r2}deg` } as CSSProperties}>{number}</b>
        })}
      </span>
    </div>
  )

  if (id === 350) return (
    <div className="puzzle-visual canonical-premium-batch premium-batch-350" role="img" aria-label={labels[id]}>
      <span className="injury-display-rail" aria-hidden="true"><i /><i /></span>
      <span className="injury-marble" aria-hidden="true"><b>INJURY</b><i /><i /><i /></span>
      <span className="insult-enamel-seal" aria-hidden="true"><i>+</i><b>INSULT</b></span>
    </div>
  )

  if (id === 408) return (
    <button type="button" className={`puzzle-visual canonical-premium-batch premium-batch-408${activated ? ' is-activated' : ''}`} aria-label={labels[id]} onClick={activate}>
      <img className="plot-reader-frame" src="/premium-408-reader-v2.webp" alt="" aria-hidden="true" width="1000" height="1000" loading="eager" decoding="async" />
      <img className="plot-wind-frame" src="/premium-408-reader-wind-v2.webp" alt="" aria-hidden="true" width="1000" height="1000" loading="eager" decoding="async" />
      <span className="plot-gust" aria-hidden="true"><i /><i /><i /></span>
    </button>
  )

  if (id === 431) return (
    <button type="button" className={`puzzle-visual canonical-premium-batch premium-batch-431${activated ? ' is-activated' : ''}`} aria-label={labels[id]} onClick={activate}>
      <img className="quiet-words-frame" src="/premium-431-words-v2.webp" alt="" aria-hidden="true" width="1000" height="1000" loading="eager" decoding="async" />
      <img className="loud-actions-frame" src="/premium-431-actions-v2.webp" alt="" aria-hidden="true" width="1000" height="1000" loading="eager" decoding="async" />
      <span className="clapper-impact" aria-hidden="true" />
    </button>
  )

  if (id === 441) return (
    <button type="button" className="puzzle-visual canonical-premium-batch premium-batch-441" aria-label={labels[id]} onClick={activate}>
      <span key={motionCycle} className={`above-rest-sequence${motionCycle > 0 ? ' is-playing' : ''}`} aria-hidden="true">
        <img className="above-rest-frame above-rest-neutral-frame" src="/premium-441-neutral-v6.webp" alt="" width="1200" height="780" loading="eager" decoding="async" />
        <img className="above-rest-frame above-rest-left-frame" src="/premium-441-shoulder-left-v6.webp" alt="" width="1200" height="780" decoding="async" />
        <img className="above-rest-frame above-rest-right-frame" src="/premium-441-shoulder-right-v6.webp" alt="" width="1200" height="780" decoding="async" />
      </span>
    </button>
  )

  if (id === 450) return (
    <div className="puzzle-visual canonical-premium-batch premium-batch-450" role="img" aria-label={labels[id]}>
      <span className="end-world-track" aria-hidden="true" />
      <span className="cancelled-end" aria-hidden="true"><b>END</b><i /><i /></span>
      <span className="continued-world" aria-hidden="true"><i /><i /><i /></span>
    </div>
  )

  const content = <><img src={imageSources[id]} alt="" aria-hidden="true" width="1200" height="977" loading="eager" decoding="async" />{overlayFor(id)}</>
  const className = `puzzle-visual canonical-premium-batch premium-batch-${id}${activated ? ' is-activated' : ''}`

  return interactive
    ? <button type="button" className={className} aria-label={labels[id]} onClick={activate}>{content}</button>
    : <div className={className} role="img" aria-label={labels[id]}>{content}</div>
}
