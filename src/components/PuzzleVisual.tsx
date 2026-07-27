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
  123: '/heart-sleeve-123.png',
  126: '/bite-bullet-126.png',
  127: '/spill-beans-127.png',
  128: '/crack-smile-128.png',
  129: '/face-music-129.png',
  130: '/hit-nail-head-130.png',
  131: '/bury-hatchet-131.png',
  132: '/hold-horses-132.png',
  133: '/kick-bucket-133.png',
  134: '/cat-bag-134.png',
  137: '/fuel-fire-137.png',
  139: '/bandwagon-139.png',
  140: '/pull-plug-140.png',
  141: '/throw-towel-141.png',
  142: '/black-sheep-142.png',
  143: '/red-herring-143.png',
  146: '/red-handed-146.png',
  147: '/blind-spot-147.png',
  149: '/key-success-149.png',
  150: '/stepping-stone-150.png',
  153: '/tightrope-153.png',
  155: '/iceberg-155.png',
  157: '/storm-eye-157.png',
  159: '/rain-parade-159.png',
  160: '/out-limb-160.png',
  162: '/problem-root-162.png',
  164: '/new-leaf-164.png',
  165: '/over-moon-165.png',
  191: '/bull-china-191.png',
  192: '/crocodile-tears-192.png',
  193: '/snake-grass-193.png',
  194: '/fly-wall-194.png',
  195: '/birds-eye-195.png',
  196: '/cat-tongue-196.png',
  197: '/butterflies-stomach-197.png',
  198: '/ants-pants-198.png',
  199: '/early-bird-199.png',
  200: '/night-owl-200.png',
  201: '/busy-bee-201.png',
  202: '/duck-water-202.png',
  203: '/bull-horns-203.png',
  204: '/feather-cap-204.png',
  205: '/rabbit-hat-205.png',
  206: '/goose-chase-206.png',
  207: '/sitting-duck-207.png',
  208: '/monkey-back-208.png',
  209: '/lions-share-209.png',
  210: '/different-colour-horse-210.png',
  256: '/cloud-horizon-256.png',
  257: '/writing-wall-257.png',
  258: '/silver-spoon-258.png',
  259: '/golden-handshake-259.png',
  260: '/iron-fist-260.png',
  261: '/steel-nerves-261.png',
  262: '/glass-ceiling-262.png',
  263: '/burning-bridges-263.png',
  264: '/memory-lane-264.png',
  265: '/pot-kettle-265.png',
  266: '/bird-hand-266.png',
  267: '/break-ice-267.png',
  268: '/eggshells-268.png',
  269: '/eggs-basket-269.png',
  270: '/couch-potato-270.png',
  316: '/hole-in-one-316.png',
  317: '/ace-sleeve-317.png',
  319: '/house-cards-319.png',
  329: '/devil-deep-sea-329.png',
  331: '/can-worms-331.png',
  366: '/greener-side-366.png',
  370: '/ball-court-370.png',
  382: '/doors-close-open-382.png',
  393: '/blood-water-393.png',
  407: '/hanging-thread-407.png',
  416: '/rock-hard-place-416.png',
  417: '/wool-eyes-417.png',
  418: '/duck-water-418.png',
  419: '/square-peg-round-hole-419.png',
  420: '/world-shoulders-420.png',
  486: '/money-tree-486.png',
  492: '/pay-through-nose-492.png',
  526: '/smoke-mirrors-526.png',
  541: '/lock-stock-barrel-541.png',
  550: '/hook-line-sinker-550.png',
  556: '/spanner-works-556.png',
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
        <img src={generatedArt} alt="" aria-hidden="true" />
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
