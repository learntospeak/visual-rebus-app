import { useState, type CSSProperties, type ReactNode } from 'react'
import { playHaptic } from '../services/audio'

const imageSources: Record<number, string> = {
  408: '/premium-408-living-v1.webp',
  413: '/premium-413-living-v1.webp',
  429: '/premium-429-living-v1.webp',
  431: '/premium-431-living-v1.webp',
  433: '/premium-433-living-v1.webp',
  437: '/premium-437-living-v1.webp',
  439: '/premium-439-living-v1.webp',
  441: '/premium-441-living-v1.webp',
}

const labels: Record<number, string> = {
  338: 'Sixes and sevens lie in a confused arrangement on a velvet games table.',
  350: 'INSULT is added and dropped directly on top of a cracked INJURY plaque.',
  408: 'A detective plot board has lost one of its connected picture cards.',
  413: 'A performer occupies the precise centre of a grand theatre stage.',
  429: 'A weary traveller sees the welcoming sight of a warm home.',
  431: 'A rescue action dominates while distant spoken words fade into the storm.',
  433: 'The word WORD comes to rest directly on a city street.',
  437: 'Musical notes fall uselessly onto ears that are completely blocked.',
  439: 'An entire audience is represented by attentive ears.',
  441: 'One person’s head and shoulders rise above everyone else in the group.',
}

const interactiveIds = new Set([338, 350, 413, 433])
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
  if (id === 408) return <><span className="plot-missing-slot" /><span className="plot-thread-end" /></>
  if (id === 413) return <span className="stage-focus-ring" />
  if (id === 429) return <><span className="sore-sight-glow" /><i className="sore-eye-glint glint-one" /><i className="sore-eye-glint glint-two" /></>
  if (id === 431) return <><span className="action-rescue-halo" /><span className="spoken-word-wisps"><i /><i /><i /></span></>
  if (id === 433) return <><span className="street-target-ring" /><b className="street-word">WORD</b></>
  if (id === 437) return <span className="falling-note-layer">{['♪', '♫', '♪', '♩', '♫'].map((note, index) => <i key={index} style={{ '--note-x': `${13 + index * 16}%`, '--note-delay': `${index * -.72}s` } as CSSProperties}>{note}</i>)}</span>
  if (id === 439) return <span className="all-ears-waves"><i /><i /><i /></span>
  if (id === 441) return <span className="above-rest-halo" />
  return null
}

export function hasCanonicalPremiumBatchArt(id: number) {
  return id === 338 || id === 350 || id in imageSources
}

export function CanonicalPremiumBatchArt({ id }: { id: number }) {
  const [activated, setActivated] = useState(false)
  const interactive = interactiveIds.has(id)

  function activate() {
    setActivated((value) => !value)
    playHaptic('success')
  }

  if (id === 338) return (
    <button type="button" className={`puzzle-visual canonical-premium-batch premium-batch-338${activated ? ' is-activated' : ''}`} aria-label={labels[id]} onClick={activate}>
      <span className="chaos-table-inlay" aria-hidden="true" />
      <span className="chaos-number-tiles" aria-hidden="true">
        {tiles.map((number, index) => {
          const [x, y, r, x2, y2, r2] = tileLayouts[index]
          return <b key={index} style={{ '--tile-x': `${x}px`, '--tile-y': `${y}px`, '--tile-r': `${r}deg`, '--tile-x2': `${x2}px`, '--tile-y2': `${y2}px`, '--tile-r2': `${r2}deg` } as CSSProperties}>{number}</b>
        })}
      </span>
    </button>
  )

  if (id === 350) return (
    <button type="button" className={`puzzle-visual canonical-premium-batch premium-batch-350${activated ? ' is-activated' : ''}`} aria-label={labels[id]} onClick={activate}>
      <span className="injury-backboard" aria-hidden="true"><i /><b>INJURY</b></span>
      <span className="addition-medallion" aria-hidden="true">+</span>
      <span className="insult-plaque" aria-hidden="true">INSULT</span>
      <span className="injury-cracks" aria-hidden="true"><i /><i /><i /></span>
    </button>
  )

  const content = <><img src={imageSources[id]} alt="" aria-hidden="true" width="1200" height="977" loading="eager" decoding="async" />{overlayFor(id)}</>
  const className = `puzzle-visual canonical-premium-batch premium-batch-${id}${activated ? ' is-activated' : ''}`

  return interactive
    ? <button type="button" className={className} aria-label={labels[id]} onClick={activate}>{content}</button>
    : <div className={className} role="img" aria-label={labels[id]}>{content}</div>
}
