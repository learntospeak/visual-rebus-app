import { useEffect, useState, type ReactNode } from 'react'
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

function DoubleEndedCandle() {
  return (
    <div className="puzzle-visual" role="img" aria-label="One horizontal candle with a lit wick and flame at both ends">
      <span className="generated-rebus-art candle-both-ends-generated" aria-hidden="true" />
    </div>
  )
}

function AppleEye() {
  return (
    <div className="puzzle-visual" role="img" aria-label="A clear human eye with a bright red apple in place of its iris and pupil">
      <span className="generated-rebus-art apple-eye-generated" aria-hidden="true" />
    </div>
  )
}

function ChipOnShoulder() {
  return (
    <div className="puzzle-visual" role="img" aria-label="One thin potato chip balanced directly on a person's right shoulder">
      <span className="chip-shoulder-generated" aria-hidden="true" />
    </div>
  )
}

function TongueTied() {
  return (
    <div className="puzzle-visual" role="img" aria-label="A tongue visibly bound with a rope tied in a bow knot">
      <span className="generated-rebus-art tongue-tied-generated" aria-hidden="true" />
    </div>
  )
}

function FootInMouth() {
  return (
    <div className="puzzle-visual" role="img" aria-label="A socked foot positioned visibly inside a cartoon person's open mouth">
      <span className="generated-rebus-art foot-mouth-generated" aria-hidden="true" />
    </div>
  )
}

const assetRenderers: Partial<Record<NonNullable<Puzzle['assetKey']>, () => ReactNode>> = {
  footprints: TwoLeftFeet,
  'blind-mice': ThreeBlindMice,
  'double-ended-candle': DoubleEndedCandle,
  'apple-eye': AppleEye,
  'chip-shoulder': ChipOnShoulder,
  'tongue-tied': TongueTied,
  'foot-mouth': FootInMouth,
}

const generatedPuzzleArt: Partial<Record<number, string>> = {
  123: '/heart-sleeve-123.webp',
  126: '/bite-bullet-126.webp',
  127: '/spill-beans-127.webp',
  128: '/crack-smile-128.webp',
  129: '/face-music-129.webp',
  130: '/hit-nail-head-130.webp',
  131: '/bury-hatchet-131.webp',
  132: '/hold-horses-132.webp',
  133: '/kick-bucket-133.webp',
  134: '/cat-bag-134.webp',
  137: '/fuel-fire-137.webp',
  139: '/bandwagon-139.webp',
  140: '/pull-plug-140.webp',
  141: '/throw-towel-141.webp',
  142: '/black-sheep-142.webp',
  143: '/red-herring-143.webp',
  146: '/red-handed-146.webp',
  147: '/blind-spot-147.webp',
  149: '/key-success-149.webp',
  150: '/stepping-stone-150.webp',
  153: '/tightrope-153.webp',
  155: '/iceberg-155.webp',
  157: '/storm-eye-157.webp',
  159: '/rain-parade-159.webp',
  160: '/out-limb-160.webp',
  162: '/problem-root-162.webp',
  164: '/new-leaf-164.webp',
  165: '/over-moon-165.webp',
  191: '/bull-china-191.webp',
  192: '/crocodile-tears-192.webp',
  193: '/snake-grass-193.webp',
  194: '/fly-wall-194.webp',
  195: '/birds-eye-195.webp',
  196: '/cat-tongue-196.webp',
  197: '/butterflies-stomach-197.webp',
  198: '/ants-pants-198.webp',
  199: '/early-bird-199.webp',
  200: '/night-owl-200.webp',
  201: '/busy-bee-201.webp',
  202: '/duck-water-202.webp',
  203: '/bull-horns-203.webp',
  204: '/feather-cap-204.webp',
  205: '/rabbit-hat-205.webp',
  206: '/goose-chase-206.webp',
  207: '/sitting-duck-207.webp',
  208: '/monkey-back-208.webp',
  209: '/lions-share-209.webp',
  210: '/different-colour-horse-210.webp',
  256: '/cloud-horizon-256.webp',
  257: '/writing-wall-257.webp',
  258: '/silver-spoon-258.webp',
  259: '/golden-handshake-259.webp',
  260: '/iron-fist-260.webp',
  261: '/steel-nerves-261.webp',
  262: '/glass-ceiling-262.webp',
  263: '/burning-bridges-263.webp',
  264: '/memory-lane-264.webp',
  265: '/pot-kettle-265.webp',
  266: '/bird-hand-266.webp',
  267: '/break-ice-267.webp',
  268: '/eggshells-268.webp',
  269: '/eggs-basket-269.webp',
  270: '/couch-potato-270.webp',
  316: '/hole-in-one-316.webp',
  317: '/ace-sleeve-317.webp',
  319: '/house-cards-319.webp',
  329: '/devil-deep-sea-329.webp',
  331: '/can-worms-331.webp',
  366: '/greener-side-366.webp',
  370: '/ball-court-370.webp',
  382: '/doors-close-open-382.webp',
  393: '/blood-water-393.webp',
  407: '/hanging-thread-407.webp',
  416: '/rock-hard-place-416.webp',
  417: '/wool-eyes-417.webp',
  418: '/duck-water-418.webp',
  419: '/square-peg-round-hole-419.webp',
  420: '/world-shoulders-420.webp',
  486: '/money-tree-486.webp',
  492: '/pay-through-nose-492.webp',
  526: '/smoke-mirrors-526.webp',
  541: '/lock-stock-barrel-541.webp',
  550: '/hook-line-sinker-550.webp',
  556: '/spanner-works-556.webp',
}

export function PuzzleVisual({ puzzle }: { puzzle: Puzzle }) {
  const [activated, setActivated] = useState(false)
  useEffect(() => setActivated(false), [puzzle.id])

  if (puzzle.assetKey === 'closet-skeleton') {
    return (
      <button
        type="button"
        className={`puzzle-visual interactive-visual closet-reveal${activated ? ' is-activated' : ''}`}
        aria-label={activated ? 'An open wooden wardrobe containing a full skeleton' : 'A closed wooden wardrobe. Tap to open it.'}
        onClick={() => setActivated(true)}
      >
        <span className="closet-reveal-art" aria-hidden="true" />
        <small>{activated ? 'Now, name what you see.' : 'Tap the closet to open it.'}</small>
      </button>
    )
  }

  const generatedArt = generatedPuzzleArt[puzzle.id]
  if (generatedArt) {
    return (
      <div
        className="puzzle-visual generated-puzzle-visual"
        role="img"
        aria-label={puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')}
      >
        <img
          src={generatedArt}
          alt=""
          aria-hidden="true"
          width="320"
          height="260"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    )
  }

  if (puzzle.assetKey) return assetRenderers[puzzle.assetKey]?.() ?? null

  const content = puzzle.elements.map((item, index) => (
    <span className={item.className} key={`${puzzle.id}-${index}`} aria-hidden="true">
      {activated && item.activatedContent ? item.activatedContent : item.content}
    </span>
  ))

  if (puzzle.interaction?.type === 'tap') {
    return (
      <button
        type="button"
        className={`puzzle-visual interactive-visual template-${puzzle.visualTemplate} visual-${puzzle.id}${activated ? ' is-activated' : ''}`}
        aria-label={`${puzzle.interaction.instruction} ${activated ? puzzle.interaction.completionCondition : ''}`.trim()}
        onClick={() => setActivated(true)}
      >
        {content}
        <small>{activated ? 'Now, name what you see.' : puzzle.interaction.instruction}</small>
      </button>
    )
  }

  return (
    <div
      className={`puzzle-visual template-${puzzle.visualTemplate} visual-${puzzle.id}${puzzle.motion ? ' has-puzzle-motion' : ''}`}
      role="img"
      aria-label={puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')}
    >
      {content}
    </div>
  )
}
