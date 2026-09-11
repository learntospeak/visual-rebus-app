import React, { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { GiFootprint } from 'react-icons/gi'
import type { Puzzle } from '../types'
import { hasLivingPuzzleSound, playLivingPuzzleAccent } from '../services/audio'
import { hasReviewedPuzzleArt, ReviewedPuzzleArt } from './ReviewedPuzzleArt'
import { hasPremiumTextPuzzleArt, PremiumTextPuzzleArt } from './PremiumTextPuzzleArt'
import { hasPremiumWordPuzzleArt, PremiumWordPuzzleArt } from './PremiumWordPuzzleArt'
import { getSequentialPuzzleDefinition } from '../interactions/definitions'
import { SequentialPuzzle } from './SequentialPuzzle'
import { YearDotCalendarPuzzle } from './YearDotCalendarPuzzle'

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

function ReworkedPuzzleArt({ id }: { id: number }) {
  if (id === 148) return (
    <div className="puzzle-visual opportunity-window-art" role="img" aria-label="An open window briefly revealing a golden trophy while an hourglass runs down">
      <span className="window-wall" aria-hidden="true"><i className="window-open-pane" /><b>★</b></span><span className="window-hourglass" aria-hidden="true">⌛</span>
    </div>
  )
  if (id === 151) return (
    <div className="puzzle-visual fork-road-art" role="img" aria-label="One road dividing into three narrow routes shaped like the tines of a fork">
      <span className="fork-road-stem" aria-hidden="true" /><span className="fork-road-left" aria-hidden="true" /><span className="fork-road-middle" aria-hidden="true" /><span className="fork-road-right" aria-hidden="true" />
    </div>
  )
  if (id === 158) return (
    <div className="puzzle-visual cloud-nine-art" role="img" aria-label="Nine ascending clouds with a delighted person standing on the highest cloud">
      <span className="cloud-stair" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} style={{ '--cloud-index': index } as CSSProperties} />)}</span>
      <b aria-hidden="true"><i /></b>
    </div>
  )
  if (id === 161) return (
    <div className="puzzle-visual branching-out-art" role="img" aria-label="One central path growing into several branches that spread outward">
      <svg viewBox="0 0 320 230" aria-hidden="true"><path d="M160 210V128M160 133 75 62M160 133l85-71M160 142 39 125M160 142l121-17" /><circle cx="160" cy="210" r="13" /><circle cx="75" cy="62" r="15" /><circle cx="245" cy="62" r="15" /><circle cx="39" cy="125" r="15" /><circle cx="281" cy="125" r="15" /><text x="160" y="118">OUT</text></svg>
    </div>
  )
  if (id === 162) return (
    <div className="puzzle-visual root-problem-art" role="img" aria-label="A tree whose central root contains the word problem">
      <svg viewBox="0 0 320 240" aria-hidden="true"><path className="root-ground" d="M22 105h276" /><path className="root-trunk" d="M145 105c4-35-8-59-35-79m65 79c-4-35 8-59 35-79m-49 79V30" /><path className="root-lines" d="M160 102v56m0-30-62 48m62-28 72 42m-72-20-24 51m24-51 33 51m-61-61-77 25m133-28 78 18" /><rect x="106" y="127" width="108" height="40" rx="19" /><text x="160" y="153">PROBLEM</text></svg>
    </div>
  )
  if (id === 167) return (
    <div className="puzzle-visual cross-purposes-art" role="img" aria-label="Two purpose arrows travelling across one another in conflicting directions">
      <span className="purpose-horizontal" aria-hidden="true">PURPOSE</span><span className="purpose-vertical" aria-hidden="true">PURPOSE</span>
    </div>
  )
  if (id === 177) return (
    <div className="puzzle-visual repeat-after-art" role="img" aria-label="The word me speaks first and repeated echoes follow after it">
      <span className="repeat-speaker" aria-hidden="true">ME</span><span className="repeat-arrow" aria-hidden="true">→</span><span className="repeat-echoes" aria-hidden="true"><i>ME</i><i>ME</i><i>ME</i></span>
    </div>
  )
  if (id === 180) return (
    <div className="puzzle-visual nowhere-found-art" role="img" aria-label="A magnifying glass searches an empty map where every location marker has disappeared">
      <span className="search-map" aria-hidden="true"><i /><i /><i /><b>?</b></span><span className="search-glass" aria-hidden="true" />
    </div>
  )
  if (id === 183) return (
    <div className="puzzle-visual falling-apart-art" role="img" aria-label="The letters in the word apart separate and fall away from one another">
      <span aria-hidden="true">FALLING</span><b aria-hidden="true">{'APART'.split('').map((letter, index) => <i key={`${letter}-${index}`} style={{ '--fall-index': index } as CSSProperties}>{letter}</i>)}</b>
    </div>
  )
  if (id === 184) return (
    <div className="puzzle-visual step-ahead-art" role="img" aria-label="One bright footprint is a single pace ahead of a group of footsteps">
      <span className="step-pack" aria-hidden="true">● ● ●</span><span className="step-leader" aria-hidden="true">●</span><i aria-hidden="true" />
    </div>
  )
  if (id === 185) return (
    <div className="puzzle-visual step-behind-art" role="img" aria-label="Exactly one footprint trails behind the others on a path">
      <span className="behind-step" aria-hidden="true">●</span><span className="ahead-steps" aria-hidden="true">● ● ●</span><i aria-hidden="true" />
    </div>
  )
  if (id === 186) return (
    <div className="puzzle-visual loose-strings-art" role="img" aria-label="Two gift tags float separately with their strings visibly cut and unattached">
      <span className="string-tag tag-one" aria-hidden="true"><i /></span><span className="string-cut" aria-hidden="true">✂</span><span className="string-tag tag-two" aria-hidden="true"><i /></span>
    </div>
  )
  if (id === 190) return (
    <div className="puzzle-visual pandora-box-art" role="img" aria-label="An ornate ancient box opens and releases mysterious glowing shapes">
      <span className="pandora-glow" aria-hidden="true"><i /><i /><i /></span><span className="pandora-lid" aria-hidden="true" /><span className="pandora-chest" aria-hidden="true">◇</span>
    </div>
  )
  if (id === 211) return (
    <div className="puzzle-visual first-things-art" role="img" aria-label="A number one badge stands before a collection of assorted things">
      <b aria-hidden="true">1</b><span aria-hidden="true">◆</span><span aria-hidden="true">●</span><span aria-hidden="true">▲</span><span aria-hidden="true">★</span>
    </div>
  )
  if (id === 212) return (
    <div className="puzzle-visual last-not-least-art" role="img" aria-label="The final shape in a sequence is much larger and brighter than all the others">
      <span aria-hidden="true">●</span><span aria-hidden="true">●</span><span aria-hidden="true">●</span><b aria-hidden="true">★</b>
    </div>
  )
  if (id === 213) return (
    <div className="puzzle-visual zero-tolerance-art" role="img" aria-label="A precision gauge shows absolutely no gap between two measured blocks">
      <span className="tolerance-block left" aria-hidden="true" /><span className="zero-gap" aria-hidden="true">0</span><span className="tolerance-block right" aria-hidden="true" /><i aria-hidden="true">↔</i>
    </div>
  )
  if (id === 214) return (
    <div className="puzzle-visual last-straw-art" role="img" aria-label="One final straw descends toward the overloaded back of a camel">
      <svg viewBox="0 0 320 240" aria-hidden="true"><path className="camel" d="M45 168c18-8 28-31 43-54 13-20 32-20 47 2 17-39 47-41 69-5 9 15 18 19 32 13l23-10 17 10-18 16-18 2-10 65h-18l-2-51-67 4-5 47h-18l-7-51-47-3-10 54H61l-1-64-28-5Z" /><path className="straws" d="m91 116 100-8m-94-7 91 18m-84-34 72 40m-54-56 42 51" /><path className="final-straw" d="m174 15-20 68" /></svg>
    </div>
  )
  if (id === 215) return (
    <div className="puzzle-visual final-countdown-art" role="img" aria-label="A launch countdown reaches its final illuminated number">
      <span aria-hidden="true"><i>3</i><i>2</i><b>1</b></span><em aria-hidden="true">◆</em><small aria-hidden="true">FINAL</small>
    </div>
  )
  if (id === 216) return (
    <div className="puzzle-visual against-clock-art" role="img" aria-label="A runner races directly against an oncoming clock">
      <svg viewBox="0 0 320 220" aria-hidden="true"><circle className="runner-head" cx="73" cy="63" r="14" /><path className="runner-body" d="m78 82 31 22 29-7m-58-15-12 48-30 30m42-30 33 42m-51-62-28 3" /><path className="race-motion" d="M18 74h28M10 96h32M139 111h37" /><circle className="race-clock" cx="238" cy="111" r="58" /><path className="race-hands" d="M238 68v43h34" /></svg>
    </div>
  )
  if (id === 217) return (
    <div className="puzzle-visual nick-time-art" role="img" aria-label="A tiny nick appears at the very last minute on a clock face">
      <span className="nicked-clock" aria-hidden="true"><i /><b>⌁</b></span><span className="nick-magnifier" aria-hidden="true" />
    </div>
  )
  if (id === 220) return (
    <div className="puzzle-visual earth-corners-art" role="img" aria-label="Four separate sheets of paper each show one corner piece of the Earth">
      <svg viewBox="0 0 340 250" aria-hidden="true">
        <g className="earth-paper paper-one"><rect x="22" y="18" width="128" height="92" rx="5" /><path className="earth-sea" d="M150 110H76a74 74 0 0 1 74-74Z" /><path className="earth-land" d="m116 73 16-18 16 8-7 17-13 4-5 19-25-5Z" /></g>
        <g className="earth-paper paper-two"><rect x="190" y="18" width="128" height="92" rx="5" /><path className="earth-sea" d="M190 110h74a74 74 0 0 0-74-74Z" /><path className="earth-land" d="m210 54 20 7 8 16-13 12-4 16-26-8Z" /></g>
        <g className="earth-paper paper-three"><rect x="22" y="140" width="128" height="92" rx="5" /><path className="earth-sea" d="M150 140H76a74 74 0 0 0 74 74Z" /><path className="earth-land" d="m105 153 27 10 8 25-17 17-24-12 8-16-13-12Z" /></g>
        <g className="earth-paper paper-four"><rect x="190" y="140" width="128" height="92" rx="5" /><path className="earth-sea" d="M190 140h74a74 74 0 0 1-74 74Z" /><path className="earth-land" d="m205 158 25-8 18 16-7 14 13 15-30 8-18-19Z" /></g>
      </svg>
    </div>
  )
  if (id === 221) return (
    <div className="puzzle-visual blank-cheque-art" role="img" aria-label="A detailed bank cheque with blank payee, amount and signature lines">
      <svg viewBox="0 0 340 210" aria-hidden="true"><rect className="cheque-paper" x="13" y="17" width="314" height="176" rx="10" /><circle className="cheque-logo" cx="44" cy="49" r="16" /><path className="cheque-wave" d="M68 39h228M28 82h282M92 119h205M187 154h110" /><text x="68" y="52">CLUE BANK</text><text x="28" y="76">PAY</text><text x="28" y="113">AMOUNT</text><text x="187" y="148">SIGNATURE</text><rect className="cheque-amount" x="245" y="60" width="64" height="39" rx="4" /><text className="cheque-dollar" x="254" y="86">$</text><text className="cheque-code" x="28" y="174">⑆  012345  ⑆  000000  ⑈</text></svg>
    </div>
  )
  return null
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

const premiumPuzzleArt: Partial<Record<number, string>> = {
  1: '/premium-001-living-v1.webp',
  2: '/premium-002-living-v1.webp',
  4: '/premium-004-living-v1.webp',
  5: '/premium-005-living-v1.webp',
  6: '/premium-006-living-v1.webp',
  7: '/premium-007-living-v1.webp',
  8: '/premium-008-living-v1.webp',
  9: '/premium-009-living-v1.webp',
  11: '/premium-011-living-v1.webp',
  12: '/premium-012-living-v1.webp',
  13: '/premium-013-living-v1.webp',
  14: '/premium-014-living-v1.webp',
  15: '/premium-015-living-v1.webp',
  16: '/premium-016-living-v1.webp',
  17: '/premium-017-living-v1.webp',
  18: '/premium-018-living-v1.webp',
  19: '/premium-019-living-v1.webp',
  20: '/premium-020-living-v1.webp',
  22: '/premium-022-v2.webp',
  26: '/premium-026-v2.webp',
  29: '/premium-029-v2.webp',
  30: '/premium-030-v2.webp',
  31: '/premium-031-v3.webp',
  32: '/premium-032-v2.webp',
  33: '/premium-033-v2.webp',
  34: '/premium-034-v2.webp',
  35: '/premium-035-v2.webp',
  36: '/premium-036-v2.webp',
  40: '/premium-040-v2.webp',
  42: '/premium-042-v2.webp',
  43: '/premium-043-v2.webp',
  46: '/premium-046-v3.webp',
  47: '/premium-047-v2.webp',
  48: '/premium-048-v2.webp',
  49: '/premium-049-v2.webp',
  52: '/premium-052-v3.webp',
  53: '/premium-053-v2.webp',
  54: '/premium-054-v2.webp',
  55: '/premium-055-v3.webp',
  58: '/premium-058-v2.webp',
  60: '/premium-060-v2.webp',
  66: '/premium-066-v2.webp',
  67: '/premium-067-v2.webp',
  68: '/premium-068-v2.webp',
  69: '/premium-069-v2.webp',
  70: '/premium-070-v2.webp',
  71: '/premium-071-v2.webp',
  72: '/premium-072-v2.webp',
  73: '/premium-073-v2.webp',
  74: '/premium-074-v2.webp',
  76: '/premium-076-v2.webp',
  79: '/premium-079-v2.webp',
  144: '/premium-144-v2.webp',
  145: '/premium-145-v2.webp',
  168: '/premium-168-v2.webp',
  172: '/premium-172-v2.webp',
  173: '/premium-173-v2.webp',
  174: '/premium-174-v2.webp',
  175: '/premium-175-v2.webp',
  176: '/premium-176-lookback-v3.webp',
  178: '/premium-178-v2.webp',
  179: '/premium-179-v2.webp',
  181: '/premium-181-v2.webp',
  182: '/premium-182-v2.webp',
  187: '/premium-187-v2.webp',
  188: '/premium-188-v2.webp',
  189: '/premium-189-v2.webp',
  107: '/premium-107-v2.webp',
  113: '/premium-113-v2.webp',
  136: '/premium-136-v2.webp',
  151: '/premium-151-v1.webp',
  152: '/premium-152-v1.webp',
  158: '/premium-158-v1.webp',
  161: '/premium-161-v1.webp',
  162: '/premium-162-v1.webp',
  166: '/premium-166-v1.webp',
  167: '/premium-167-v1.webp',
  169: '/premium-169-v1.webp',
  170: '/premium-170-v1.webp',
  171: '/premium-171-v1.webp',
  177: '/premium-177-v2.webp',
  180: '/premium-180-v2.webp',
  183: '/premium-183-v2.webp',
  184: '/premium-184-v1.webp',
  185: '/premium-185-v1.webp',
  186: '/premium-186-v1.webp',
  190: '/premium-190-v1.webp',
  211: '/premium-211-v2.webp',
  212: '/premium-212-v1.webp',
  213: '/premium-213-v1.webp',
  214: '/premium-214-v1.webp',
  215: '/premium-215-v1.webp',
  216: '/premium-216-v1.webp',
  217: '/premium-217-v1.webp',
  219: '/premium-219-v1.webp',
  218: '/premium-218-v2.webp',
  220: '/premium-220-v2.webp',
  221: '/premium-221-v2.webp',
  222: '/premium-222-v1.webp',
  223: '/premium-223-v1.webp',
  224: '/premium-224-v2.webp',
  225: '/premium-225-v2.webp',
  226: '/premium-226-drop-v3.webp',
  228: '/premium-228-v2.webp',
  229: '/premium-229-v2.webp',
  231: '/premium-231-v2.webp',
  232: '/premium-232-v2.webp',
  227: '/premium-227-v1.webp',
  230: '/premium-230-v1.webp',
  233: '/premium-233-v2.webp',
  234: '/premium-234-v2.webp',
  235: '/premium-235-v2.webp',
  236: '/premium-236-v1.webp',
  237: '/premium-237-v1.webp',
  238: '/premium-238-v1.webp',
  239: '/premium-239-v1.webp',
  240: '/premium-240-v1.webp',
  241: '/premium-241-v1.webp',
  242: '/premium-242-v1.webp',
  243: '/premium-243-v1.webp',
  244: '/premium-244-v1.webp',
  245: '/premium-245-v1.webp',
  246: '/premium-246-v2.webp',
  248: '/premium-248-v1.webp',
  249: '/premium-249-v2.webp',
  250: '/premium-250-v1.webp',
  247: '/premium-247-v3.webp',
  251: '/premium-251-v3.png',
  252: '/premium-252-v2.webp',
  253: '/premium-253-v1.webp',
  255: '/premium-255-v1.webp',
  257: '/premium-257-v2.webp',
  258: '/premium-258-v1.webp',
  260: '/premium-260-v1.webp',
  261: '/premium-261-v1.webp',
  267: '/premium-267-v4.webp',
  271: '/premium-271-v1.webp',
  272: '/premium-272-v1.webp',
  273: '/premium-273-v1.webp',
  274: '/premium-274-v1.webp',
  275: '/premium-275-v1.webp',
  281: '/premium-281-v2.webp',
  282: '/premium-282-v2.webp',
  283: '/premium-283-v2.webp',
  284: '/premium-284-v2.webp',
  285: '/premium-285-v2.webp',
  286: '/premium-286-v2.webp',
  288: '/premium-288-v2.webp',
  289: '/premium-289-v2.webp',
  294: '/premium-294-v2.webp',
  296: '/premium-296-v2.webp',
  320: '/premium-320-v2.webp',
  321: '/premium-321-v2.webp',
  328: '/premium-328-v2.webp',
  335: '/premium-335-v2.webp',
  337: '/premium-337-v2.webp',
  276: '/premium-276-v1.webp',
  277: '/premium-277-v1.webp',
  278: '/premium-278-v1.webp',
  279: '/premium-279-v1.webp',
  280: '/premium-280-v1.webp',
  287: '/premium-287-v1.webp?v=1',
  290: '/premium-290-v2.webp',
  291: '/premium-291-v1.webp',
  292: '/premium-292-v1.webp',
  293: '/premium-293-v1.webp',
  408: '/premium-408-living-v1.webp',
  410: '/premium-410-living-v1.webp',
  411: '/premium-411-living-v1.webp',
  412: '/premium-412-living-v1.webp',
  413: '/premium-413-living-v1.webp',
  429: '/premium-429-living-v1.webp',
  431: '/premium-431-living-v1.webp',
  433: '/premium-433-living-v1.webp',
  437: '/premium-437-living-v1.webp',
  439: '/premium-439-living-v1.webp',
  441: '/premium-441-living-v1.webp',
  443: '/premium-443-living-v1.webp',
  444: '/premium-444-living-v1.webp',
  445: '/premium-445-living-v1.webp',
  446: '/premium-446-living-v1.webp',
  447: '/premium-447-living-v1.webp',
  449: '/premium-449-living-v1.webp',
  450: '/premium-450-living-v1.webp',
  451: '/premium-451-living-v1.webp',
  452: '/premium-452-living-v1.webp',
  453: '/premium-453-living-v1.webp',
  454: '/premium-454-living-v1.webp',
  455: '/premium-455-living-v1.webp',
  456: '/premium-456-living-v1.webp',
  457: '/premium-457-living-v1.webp',
  463: '/premium-463-living-v1.webp',
  466: '/premium-466-living-v1.webp',
  467: '/premium-467-living-v1.webp',
  468: '/premium-468-living-v1.webp',
  469: '/premium-469-living-v1.webp',
  470: '/premium-470-living-v1.webp',
  471: '/premium-471-living-v1.webp',
  473: '/premium-473-living-v1.webp',
  474: '/premium-474-living-v1.webp',
  476: '/premium-476-living-v1.webp',
  477: '/premium-477-living-v1.webp',
  478: '/premium-478-living-v1.webp',
  479: '/premium-479-living-v1.webp',
  485: '/premium-485-living-v1.webp',
  489: '/premium-489-living-v1.webp',
  490: '/premium-490-living-v1.webp',
  491: '/premium-491-living-v1.webp',
  494: '/premium-494-living-v1.webp',
  497: '/premium-497-living-v1.webp',
  499: '/premium-499-living-v1.webp',
  508: '/premium-508-living-v1.webp',
  509: '/premium-509-living-v1.webp',
  512: '/premium-512-living-v1.webp',
  515: '/premium-515-living-v1.webp',
  295: '/premium-295-v1.webp',
  297: '/premium-297-v1.webp?v=2',
  298: '/premium-298-v1.webp?v=2',
  299: '/premium-299-v1.webp?v=2',
  300: '/premium-300-v1.webp?v=2',
  301: '/premium-301-v1.webp?v=2',
  302: '/premium-302-v1.webp?v=2',
  303: '/premium-303-v1.webp?v=2',
  304: '/premium-304-v1.webp?v=2',
  305: '/premium-305-v1.webp?v=2',
  306: '/premium-306-v1.webp?v=2',
  307: '/premium-307-v1.webp?v=2',
  308: '/premium-308-v1.webp?v=2',
  309: '/premium-309-v1.webp?v=2',
  310: '/premium-310-v1.webp?v=2',
  311: '/premium-311-v1.webp?v=3',
  312: '/premium-312-v1.webp?v=3',
  313: '/premium-313-v1.webp?v=3',
  314: '/premium-314-v1.webp?v=3',
  315: '/premium-315-v1.webp?v=3',
  318: '/premium-318-v1.webp?v=3',
  322: '/premium-322-v1.webp?v=3',
  323: '/premium-323-v1.webp?v=3',
  324: '/premium-324-v1.webp?v=3',
  325: '/premium-325-v1.webp?v=3',
  326: '/premium-326-v1.webp?v=3',
  327: '/premium-327-v1.webp?v=3',
  330: '/premium-330-v1.webp?v=3',
  332: '/premium-332-v1.webp?v=3',
  336: '/premium-336-v2.webp?v=10',
  339: '/premium-339-v1.webp?v=3',
  340: '/premium-340-v2.webp?v=10',
  341: '/premium-341-v1.webp?v=3',
  342: '/premium-342-v1.webp?v=3',
  343: '/premium-343-v2.webp?v=10',
  344: '/premium-344-v1.webp?v=3',
  345: '/premium-345-v1.webp?v=3',
  346: '/premium-346-v1.webp?v=3',
  347: '/premium-347-v1.webp?v=3',
  348: '/premium-348-v1.webp?v=3',
  349: '/premium-349-v1.webp?v=3',
  351: '/premium-351-v1.webp?v=4',
  352: '/premium-352-v1.webp?v=4',
  353: '/premium-353-v1.webp?v=4',
  354: '/premium-354-v1.webp?v=4',
  355: '/premium-355-v1.webp?v=4',
  356: '/premium-356-v1.webp?v=4',
  357: '/premium-357-v2.webp?v=10',
  358: '/premium-358-v1.webp?v=4',
  359: '/premium-359-v1.webp?v=4',
  360: '/premium-360-v1.webp?v=4',
  361: '/premium-361-v2.webp?v=10',
  362: '/premium-362-v2.webp?v=10',
  363: '/premium-363-v1.webp?v=4',
  364: '/premium-364-v1.webp?v=4',
  365: '/premium-365-v1.webp?v=4',
  367: '/premium-367-v1.webp?v=4',
  368: '/premium-368-v1.webp?v=4',
  369: '/premium-369-v1.webp?v=4',
  370: '/premium-370-v2.webp?v=10',
  371: '/premium-371-v1.webp?v=4',
  372: '/premium-372-v1.webp?v=4',
  373: '/premium-373-v1.webp?v=4',
  374: '/premium-374-v1.webp?v=4',
  375: '/premium-375-v1.webp?v=4',
  376: '/premium-376-v2.webp?v=10',
  377: '/premium-377-v2.webp?v=10',
  378: '/premium-378-v2.webp?v=10',
  379: '/premium-379-v1.webp?v=4',
  380: '/premium-380-v1.webp?v=4',
  381: '/premium-381-v1.webp?v=4',
  383: '/premium-383-v2.webp?v=10',
  384: '/premium-384-v1.webp?v=4',
  385: '/premium-385-v1.webp?v=4',
  386: '/premium-386-v1.webp?v=4',
  387: '/premium-387-v1.webp?v=4',
  388: '/premium-388-v1.webp?v=4',
  389: '/premium-389-v1.webp?v=4',
  390: '/premium-390-v1.webp?v=4',
  391: '/premium-391-v1.webp?v=4',
  392: '/premium-392-v2.webp?v=10',
  394: '/premium-394-v1.webp?v=4',
  395: '/premium-395-v1.webp?v=4',
  396: '/premium-396-v2.webp?v=10',
  398: '/premium-398-v1.webp?v=4',
  399: '/premium-399-v1.webp?v=4',
  400: '/premium-400-v1.webp?v=4',
  401: '/premium-401-v2.webp?v=10',
  402: '/premium-402-v2.webp?v=10',
  403: '/premium-403-v2.webp?v=10',
  404: '/premium-404-v2.webp?v=10',
  405: '/premium-405-v2.webp?v=10',
  406: '/premium-406-v1.webp?v=5',
  414: '/premium-414-v2.webp?v=10',
  415: '/premium-415-v1.webp?v=5',
  421: '/premium-421-v2.webp?v=10',
  422: '/premium-422-v2.webp?v=10',
  423: '/premium-423-v2.webp?v=10',
  424: '/premium-424-v2.webp?v=10',
  425: '/premium-425-v1.webp?v=5',
  426: '/premium-426-v1.webp?v=5',
  427: '/premium-427-v2.webp?v=10',
  428: '/premium-428-v1.webp?v=5',
  430: '/premium-430-v1.webp?v=5',
  432: '/premium-432-v2.webp?v=10',
  434: '/premium-434-v2.webp?v=10',
  435: '/premium-435-v2.webp?v=10',
  436: '/premium-436-v1.webp?v=5',
  438: '/premium-438-v1.webp?v=5',
  440: '/premium-440-v1.webp?v=5',
  442: '/premium-442-v2.webp?v=10',
  448: '/premium-448-v1.webp?v=5',
  458: '/premium-458-v1.webp?v=6',
  459: '/premium-459-v2.webp?v=10',
  460: '/premium-460-v2.webp?v=10',
  461: '/premium-461-v1.webp?v=6',
  462: '/premium-462-v1.webp?v=6',
  464: '/premium-464-v1.webp?v=6',
  465: '/premium-465-v1.webp?v=6',
  472: '/premium-472-v1.webp?v=6',
  475: '/premium-475-v1.webp?v=6',
  480: '/premium-480-v1.webp?v=6',
  481: '/premium-481-v1.webp?v=6',
  482: '/premium-482-v2.webp?v=10',
  483: '/premium-483-v2.webp?v=10',
  484: '/premium-484-v1.webp?v=6',
  487: '/premium-487-v2.webp?v=10',
  488: '/premium-488-v2.webp?v=10',
  493: '/premium-493-v1.webp?v=6',
  495: '/premium-495-v1.webp?v=6',
  496: '/premium-496-v1.webp?v=6',
  498: '/premium-498-v1.webp?v=6',
  500: '/premium-500-v1.webp?v=6',
  501: '/premium-501-v1.webp?v=7',
  502: '/premium-502-v1.webp?v=7',
  503: '/premium-503-v1.webp?v=7',
  504: '/premium-504-v2.webp?v=10',
  505: '/premium-505-v1.webp?v=7',
  506: '/premium-506-v1.webp?v=7',
  507: '/premium-507-v1.webp?v=7',
  510: '/premium-510-v1.webp?v=7',
  511: '/premium-511-v2.webp?v=10',
  513: '/premium-513-v2.webp?v=10',
  514: '/premium-514-v1.webp?v=7',
  517: '/premium-517-v1.webp?v=7',
  518: '/premium-518-v1.webp?v=7',
  519: '/premium-519-v1.webp?v=7',
  520: '/premium-520-v1.webp?v=7',
  521: '/premium-521-v2.webp?v=10',
  522: '/premium-522-v1.webp?v=7',
  523: '/premium-523-v1.webp?v=7',
  524: '/premium-524-v1.webp?v=7',
  525: '/premium-525-v1.webp?v=7',
  527: '/premium-527-v1.webp?v=7',
  528: '/premium-528-v2.webp?v=10',
  529: '/premium-529-v1.webp?v=7',
  530: '/premium-530-v1.webp?v=7',
  531: '/premium-531-v1.webp?v=7',
  532: '/premium-532-v1.webp?v=7',
  533: '/premium-533-v1.webp?v=7',
  534: '/premium-534-v1.webp?v=7',
  535: '/premium-535-v1.webp?v=7',
  536: '/premium-536-v2.webp?v=10',
  537: '/premium-537-v1.webp?v=7',
  538: '/premium-538-v1.webp?v=7',
  539: '/premium-539-v1.webp?v=7',
  540: '/premium-540-v1.webp?v=7',
  542: '/premium-542-v1.webp?v=7',
  543: '/premium-543-v1.webp?v=7',
  544: '/premium-544-v1.webp?v=7',
  545: '/premium-545-v1.webp?v=7',
  546: '/premium-546-v1.webp?v=7',
  547: '/premium-547-v1.webp?v=7',
  548: '/premium-548-v1.webp?v=7',
  549: '/premium-549-v1.webp?v=7',
  551: '/premium-551-v1.webp?v=8',
  552: '/premium-552-v1.webp?v=8',
  553: '/premium-553-v1.webp?v=8',
  554: '/premium-554-v2.webp?v=10',
  555: '/premium-555-v1.webp?v=8',
  557: '/premium-557-v1.webp?v=8',
  558: '/premium-558-v2.webp?v=10',
  559: '/premium-559-v2.webp?v=10',
  560: '/premium-560-v1.webp?v=8',
  561: '/premium-561-v1.webp?v=9',
  562: '/premium-562-v1.webp?v=8',
  563: '/premium-563-v1.webp?v=8',
  564: '/premium-564-v1.webp?v=8',
  565: '/premium-565-v1.webp?v=8',
}

const livingPuzzleIds = new Set([
  408, 410, 411, 412, 413, 429, 431, 433, 437, 439, 441, 443, 444, 445, 446, 447, 449,
  450, 451, 452, 453, 454, 455, 456, 457, 463, 466, 467, 468, 469, 470, 471, 473, 474,
  476, 477, 478, 479, 485, 489, 490, 491, 494, 497, 499, 508, 509, 512, 515,
])

const openingPremiumPuzzleIds = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
])

const editorialPremiumPuzzleIds = new Set([
  22, 26, 29, 30, 31, 32, 33, 34, 35, 36, 40, 42, 43, 46, 47, 48, 49, 52, 53, 54, 55, 58, 60, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 79, 95, 107, 113, 136, 144, 145, 168, 172, 173, 174, 175, 176, 178, 179, 181, 182, 187, 188, 189, 218, 220, 221, 224, 225, 226, 228, 229, 231, 232, 233, 234, 235, 247, 249, 251, 281, 282, 283, 284, 285, 286, 288, 289, 294, 296, 320, 321, 328, 335, 337,
])

function GeneratedPuzzleArt({ puzzle, src, soundEnabled = false }: { puzzle: Puzzle; src: string; soundEnabled?: boolean }) {
  const living = livingPuzzleIds.has(puzzle.id)
  const openingPremium = openingPremiumPuzzleIds.has(puzzle.id)
  const editorialPremium = editorialPremiumPuzzleIds.has(puzzle.id)
  const artwork = (
    <div
      className={`puzzle-visual generated-puzzle-visual premium-puzzle-${puzzle.id}${living ? ' living-puzzle-art' : ''}${openingPremium ? ' opening-premium-art' : ''}${editorialPremium ? ' editorial-premium-art' : ''}`}
      role="img"
      aria-label={puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width="320"
        height="260"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      {(living || openingPremium) && <span className="living-light" aria-hidden="true" />}
    </div>
  )

  if (!living || !soundEnabled || !hasLivingPuzzleSound(puzzle.id)) return artwork
  return (
    <div className="living-puzzle-shell">
      {artwork}
      <button className="living-sound-button" type="button" onClick={() => playLivingPuzzleAccent(puzzle.id)} aria-label="Play this artwork's subtle sound">
        <span aria-hidden="true">♪</span> Hear the scene
      </button>
    </div>
  )
}

function PremiumBrokenHeart({ puzzle, activated, onActivate }: { puzzle: Puzzle; activated: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      className={`puzzle-visual generated-puzzle-visual opening-premium-art premium-broken-heart${activated ? ' is-activated' : ''}`}
      aria-label={activated ? 'A sculptural red heart broken into two separated halves' : puzzle.interaction?.instruction}
      onClick={onActivate}
    >
      <span className="premium-heart-image" aria-hidden="true">
        <img className="premium-heart-left" src="/premium-006-living-v1.webp" alt="" width="320" height="260" loading="eager" decoding="async" />
        <img className="premium-heart-right" src="/premium-006-living-v1.webp" alt="" width="320" height="260" loading="eager" decoding="async" />
      </span>
      <span className="living-light" aria-hidden="true" />
      <small>{activated ? 'Now, name what you see.' : puzzle.interaction?.instruction}</small>
    </button>
  )
}

function PremiumSplitDecision() {
  return (
    <div className="puzzle-visual premium-split-decision" role="img" aria-label="The word DECISION split into two separated pieces">
      <span className="decision-glow" aria-hidden="true" />
      <span className="decision-half decision-left" aria-hidden="true">DECI</span>
      <span className="decision-fracture" aria-hidden="true" />
      <span className="decision-half decision-right" aria-hidden="true">SION</span>
    </div>
  )
}

function PremiumTopSecret({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      className={`puzzle-visual generated-puzzle-visual opening-premium-art premium-top-secret${activated ? ' is-activated' : ''}`}
      aria-label={activated ? 'An open envelope with SECRET revealed inside its dark lining' : 'A sealed envelope. Tap it to open it.'}
      onClick={onActivate}
    >
      <img className="secret-envelope-closed" src="/premium-019-living-v1.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="secret-envelope-open" src="/premium-019-open-secret-v3.png" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="living-light" aria-hidden="true" />
    </button>
  )
}

function RaisedEyebrowsPuzzleArt({ puzzle }: { puzzle: Puzzle }) {
  const ariaLabel = puzzle.elements.map((item) => item.ariaLabel ?? item.content).join(', ')
  return (
    <div
      className="puzzle-visual generated-puzzle-visual animated-eyebrows-art premium-puzzle-516"
      role="img"
      aria-label={ariaLabel}
    >
      <img
        className="eyebrows-neutral-frame"
        src="/premium-516-neutral-v2.webp?v=10"
        alt=""
        aria-hidden="true"
        width="320"
        height="260"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <img
        className="eyebrows-raised-frame"
        src="/premium-516-raised-v2.webp?v=10"
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

function PremiumGrowingApartPrototype() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-growing-apart" role="img" aria-label="Two seedlings sprouting from separate pots, growing upward and away from one another">
      <img className="growing-apart-background" src="/premium-070-background-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <svg className="growing-apart-animation" viewBox="0 0 900 900" aria-hidden="true">
        <defs>
          <linearGradient id="growing-pot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4d27b" /><stop offset=".42" stopColor="#a96d21" /><stop offset="1" stopColor="#523011" />
          </linearGradient>
          <linearGradient id="growing-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9c969" /><stop offset=".38" stopColor="#477448" /><stop offset="1" stopColor="#173c35" />
          </linearGradient>
          <filter id="growing-shadow" x="-50%" y="-50%" width="200%" height="220%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#031b1e" floodOpacity=".55" />
          </filter>
        </defs>

        <g className="growing-pot growing-pot-left" filter="url(#growing-shadow)">
          <ellipse cx="316" cy="728" rx="92" ry="24" fill="#392515" />
          <path d="M234 741h164l-20 112q-62 28-124 0z" fill="url(#growing-pot)" stroke="#efcf75" strokeWidth="4" />
          <rect x="220" y="713" width="192" height="45" rx="15" fill="url(#growing-pot)" stroke="#efcf75" strokeWidth="4" />
          <path d="M238 729h156" stroke="#ffe6a0" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        </g>
        <g className="growing-pot growing-pot-right" filter="url(#growing-shadow)">
          <ellipse cx="584" cy="728" rx="92" ry="24" fill="#392515" />
          <path d="M502 741h164l-20 112q-62 28-124 0z" fill="url(#growing-pot)" stroke="#efcf75" strokeWidth="4" />
          <rect x="488" y="713" width="192" height="45" rx="15" fill="url(#growing-pot)" stroke="#efcf75" strokeWidth="4" />
          <path d="M506 729h156" stroke="#ffe6a0" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        </g>

        <g className="growing-plant growing-plant-left">
          <path className="growing-stem growing-stem-shadow" pathLength="1" d="M316 724 C314 625 284 548 235 476 C185 403 145 318 126 190" />
          <path className="growing-stem growing-stem-highlight" pathLength="1" d="M316 724 C314 625 284 548 235 476 C185 403 145 318 126 190" />
          <path className="growing-branch growing-branch-early" pathLength="1" d="M286 584 C238 570 205 541 180 505" />
          <path className="growing-branch growing-branch-mid" pathLength="1" d="M237 478 C286 447 309 414 318 374" />
          <path className="growing-branch growing-branch-late" pathLength="1" d="M185 395 C139 382 102 350 78 315" />
          <path className="growing-branch growing-branch-top" pathLength="1" d="M145 290 C184 266 205 237 212 207" />
          <g className="growing-leaf leaf-early" transform="translate(179 505) rotate(-42)"><ellipse rx="43" ry="22" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-early" transform="translate(274 550) rotate(28)"><ellipse rx="39" ry="20" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-mid" transform="translate(318 374) rotate(-45)"><ellipse rx="46" ry="23" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-mid" transform="translate(208 438) rotate(24)"><ellipse rx="42" ry="21" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-late" transform="translate(78 315) rotate(-30)"><ellipse rx="48" ry="24" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-late" transform="translate(166 340) rotate(32)"><ellipse rx="44" ry="22" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-top" transform="translate(212 207) rotate(-46)"><ellipse rx="47" ry="23" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-top" transform="translate(126 190) rotate(-25)"><ellipse rx="50" ry="25" fill="url(#growing-leaf)" /></g>
        </g>

        <g className="growing-plant growing-plant-right">
          <path className="growing-stem growing-stem-shadow" pathLength="1" d="M584 724 C586 625 616 548 665 476 C715 403 755 318 774 190" />
          <path className="growing-stem growing-stem-highlight" pathLength="1" d="M584 724 C586 625 616 548 665 476 C715 403 755 318 774 190" />
          <path className="growing-branch growing-branch-early" pathLength="1" d="M614 584 C662 570 695 541 720 505" />
          <path className="growing-branch growing-branch-mid" pathLength="1" d="M663 478 C614 447 591 414 582 374" />
          <path className="growing-branch growing-branch-late" pathLength="1" d="M715 395 C761 382 798 350 822 315" />
          <path className="growing-branch growing-branch-top" pathLength="1" d="M755 290 C716 266 695 237 688 207" />
          <g className="growing-leaf leaf-early" transform="translate(721 505) rotate(42)"><ellipse rx="43" ry="22" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-early" transform="translate(626 550) rotate(-28)"><ellipse rx="39" ry="20" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-mid" transform="translate(582 374) rotate(45)"><ellipse rx="46" ry="23" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-mid" transform="translate(692 438) rotate(-24)"><ellipse rx="42" ry="21" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-late" transform="translate(822 315) rotate(30)"><ellipse rx="48" ry="24" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-late" transform="translate(734 340) rotate(-32)"><ellipse rx="44" ry="22" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-top" transform="translate(688 207) rotate(46)"><ellipse rx="47" ry="23" fill="url(#growing-leaf)" /></g>
          <g className="growing-leaf leaf-top" transform="translate(774 190) rotate(25)"><ellipse rx="50" ry="25" fill="url(#growing-leaf)" /></g>
        </g>
      </svg>
    </div>
  )
}

function PremiumGrowingApart() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-growing-apart" role="img" aria-label="Identical twin sisters ageing while their appearance and the distance between them become increasingly different">
      <img className="apart-twins-frame apart-twins-frame-1" src="/premium-070-twins-1-v6.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="apart-twins-frame apart-twins-frame-2" src="/premium-070-twins-2-v6.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="apart-twins-frame apart-twins-frame-3" src="/premium-070-twins-3-v6.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="apart-twins-frame apart-twins-frame-4" src="/premium-070-twins-4-v6.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </div>
  )
}

function PremiumBeatAroundBush() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-beat-bush" role="img" aria-label="The word BEAT moving in a circle around a central bush">
      <img src="/premium-136-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="premium-beat-orbit" aria-hidden="true">
        <span className="premium-beat-word beat-north"><b>BEAT</b></span>
        <span className="premium-beat-word beat-east"><b>BEAT</b></span>
        <span className="premium-beat-word beat-south"><b>BEAT</b></span>
        <span className="premium-beat-word beat-west"><b>BEAT</b></span>
      </span>
    </div>
  )
}

function PremiumLookingBack() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-looking-back" role="img" aria-label="A woman walking away and then turning her head to look back">
      <img className="looking-back-forward" src="/premium-176-forward-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="looking-back-turned" src="/premium-176-lookback-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </div>
  )
}

function PremiumAroundClock() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-around-clock" role="img" aria-label="A continuous gold arrow orbit travelling around an antique clock">
      <img className="around-clock-background" src="/premium-095-clock-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="around-clock-orbit" src="/premium-095-orbit-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </div>
  )
}

function PremiumCloseCall() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-close-call" role="img" aria-label="Two CALL plaques moving extremely close together">
      <img className="close-call-left" src="/premium-189-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="close-call-right" src="/premium-189-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </div>
  )
}

function PremiumSplitSecond({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-split-second${activated ? ' is-activated' : ''}`} aria-label="The word SECOND split into SEC and OND. Tap to split it farther." onClick={onActivate}>
      <img className="split-second-left" src="/premium-218-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="split-second-right" src="/premium-218-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </button>
  )
}

function PremiumGreenLight({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-green-light${activated ? ' is-activated' : ''}`} aria-label="An antique traffic signal with a green light. Tap to switch the green light on." onClick={onActivate}>
      <img src="/premium-224-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="green-light-glow" aria-hidden="true" />
    </button>
  )
}

function PremiumPageTurner({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-page-turner${activated ? ' is-activated' : ''}`} aria-label={activated ? 'An antique book with its page turned. Tap to raise the page again.' : 'An antique book with a page turning. Tap to complete the page turn.'} onClick={onActivate}>
      <img className="page-turn-raised" src="/premium-231-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="page-turn-early" src="/premium-231-early-crossing-v5.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="page-turn-crossing" src="/premium-231-crossing-v4.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="page-turn-late" src="/premium-231-late-crossing-v5.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="page-turn-complete" src="/premium-231-complete-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </button>
  )
}

function PremiumBlueBlood({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-blue-blood${activated ? ' is-activated' : ''}`} aria-label="A blue liquid drop. Tap it to reveal a faint police officer inside." onClick={onActivate}>
      <img className="blue-blood-drop" src="/premium-226-drop-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <img className="blue-blood-officer" src="/premium-226-officer-v3.png" alt="" aria-hidden="true" width="200" height="300" loading="eager" decoding="async" />
    </button>
  )
}

function PremiumFillBlanks({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  const slots = ['B', 'L', '', '', 'N', 'K', 'S']
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-fill-blanks${activated ? ' is-activated' : ''}`} aria-label={activated ? 'FILL has moved into the blanks between BL and NKS.' : 'BL, two blank spaces, and NKS sit above a FILL tile. Tap the tile.'} onClick={onActivate}>
      <img src="/premium-235-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="fill-blank-slots" aria-hidden="true">
        {slots.map((letter, index) => <b key={`${letter}-${index}`}>{letter}</b>)}
      </span>
      <span className="fill-moving-tile" aria-hidden="true">FILL</span>
    </button>
  )
}

function PremiumBehindTimes() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-behind-times" role="img" aria-label="A person stands behind an edition of The Times displayed on a golden platform">
      <img src="/premium-247-v3.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
    </div>
  )
}

function PremiumDayInDayOut() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-day-in-out" role="img" aria-label="One DAY calendar pad is inside while another DAY calendar pad is outside the doorway">
      <img src="/premium-249-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="day-pad-label day-pad-outside" aria-hidden="true">DAY</span>
      <span className="day-pad-label day-pad-inside" aria-hidden="true">DAY</span>
    </div>
  )
}

function PremiumMonthOfSundays() {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-month-sundays" role="img" aria-label="Every day in a February calendar is SUN">
      <img src="/premium-251-v3.png" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <strong className="sunday-month-title" aria-hidden="true">FEBRUARY</strong>
      <span className="sunday-weekdays" aria-hidden="true">
        {weekdays.map((day, index) => <b key={`${day}-${index}`}>{day}</b>)}
      </span>
      <span className="sunday-calendar" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => <b key={index} style={{ '--sun-index': index } as CSSProperties}>SUN</b>)}
      </span>
    </div>
  )
}

function PremiumUnfinishedBusiness({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-unfinished-business${activated ? ' is-activated' : ''}`} aria-label={activated ? 'The two loose S tiles have completed BUSINESS.' : 'BUSINE is unfinished, with two loose S tiles waiting below. Tap to finish it.'} onClick={onActivate}>
      <img src="/premium-281-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="business-letter-slots" aria-hidden="true">
        {'BUSINESS'.split('').map((letter, index) => <b className={index > 5 ? 'loose-business-letter' : ''} key={`${letter}-${index}`}>{letter}</b>)}
      </span>
    </button>
  )
}

function PremiumTwoTogether({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-two-together${activated ? ' is-activated' : ''}`} aria-label={activated ? 'Two and two have moved together at the centre.' : 'Two separate numeral twos wait on rails. Tap to put them together.'} onClick={onActivate}>
      <img src="/premium-282-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="together-two together-two-left" aria-hidden="true">2</span>
      <span className="together-two together-two-right" aria-hidden="true">2</span>
    </button>
  )
}

function PremiumThingAfterThing() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-thing-sequence" role="img" aria-label="One THING follows directly after another in a gallery">
      <img src="/premium-283-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="thing-plaque thing-plaque-front" aria-hidden="true">THING</span>
      <span className="thing-plaque thing-plaque-middle" aria-hidden="true">THING</span>
      <span className="thing-plaque thing-plaque-back" aria-hidden="true">THING</span>
    </div>
  )
}

function PremiumPlayOnWords({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-play-words${activated ? ' is-activated' : ''}`} aria-label={activated ? 'A PLAY is revealed on a stage resting above WORDS.' : 'A closed miniature theatre rests above WORDS. Tap the curtains.'} onClick={onActivate}>
      <img src="/premium-285-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="play-stage-reveal" aria-hidden="true"><b>PLAY</b></span>
      <span className="play-curtain play-curtain-left" aria-hidden="true" />
      <span className="play-curtain play-curtain-right" aria-hidden="true" />
      <span className="words-pedestal" aria-hidden="true">WORDS</span>
    </button>
  )
}

function PremiumWordForWord() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-word-for-word" role="img" aria-label="WORD appears on each side of the number four">
      <img src="/premium-286-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="word-for-word word-for-left" aria-hidden="true">WORD</span>
      <span className="word-for-four" aria-hidden="true">4</span>
      <span className="word-for-word word-for-right" aria-hidden="true">WORD</span>
    </div>
  )
}

function PremiumMindGap() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-mind-gap" role="img" aria-label="MIND occupies the physical gap between G and AP">
      <img src="/premium-288-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="mind-gap-left" aria-hidden="true">G</span>
      <span className="mind-gap-centre" aria-hidden="true">MIND</span>
      <span className="mind-gap-right" aria-hidden="true">AP</span>
    </div>
  )
}

function PremiumBusinessPleasure() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-business-pleasure" role="img" aria-label="BUSINESS is positioned before PLEASURE">
      <img src="/premium-289-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="business-before" aria-hidden="true">BUSINESS</span>
      <span className="pleasure-behind" aria-hidden="true">PLEASURE</span>
    </div>
  )
}

function PremiumSinkSwim() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-sink-swim" role="img" aria-label="SWIM remains at the waterline while SINK hangs deep below it">
      <img src="/premium-294-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="swim-label" aria-hidden="true">SWIM</span>
      <span className="sink-label" aria-hidden="true">SINK</span>
      <span className="sink-bubbles" aria-hidden="true"><i /><i /><i /></span>
    </div>
  )
}

function PremiumGoFlow({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-go-flow${activated ? ' is-activated' : ''}`} aria-label={activated ? 'GO is travelling downstream with the water flow.' : 'GO rests in a flowing channel. Tap it to go with the flow.'} onClick={onActivate}>
      <img src="/premium-296-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="flow-go" aria-hidden="true">GO</span>
    </button>
  )
}

function PremiumDealBreaker({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-deal-breaker${activated ? ' is-activated' : ''}`} aria-label={activated ? 'The broken halves of DEAL have pulled farther apart.' : 'DEAL is broken through its centre. Tap the halves.'} onClick={onActivate}>
      <img src="/premium-320-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="deal-half deal-half-left" aria-hidden="true">DE</span>
      <span className="deal-half deal-half-right" aria-hidden="true">AL</span>
    </button>
  )
}

function PremiumBlessingDisguise({ activated, onActivate }: { activated: boolean; onActivate: () => void }) {
  return (
    <button type="button" className={`puzzle-visual generated-puzzle-visual editorial-premium-art premium-easter-egg premium-blessing-disguise${activated ? ' is-activated' : ''}`} aria-label={activated ? 'The DISGUISE has lifted to reveal BLESSING inside.' : 'A DISGUISE conceals something glowing. Tap to lift it.'} onClick={onActivate}>
      <img src="/premium-321-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="hidden-blessing" aria-hidden="true">BLESSING</span>
      <span className="disguise-mask" aria-hidden="true"><i /><b>DISGUISE</b><i /></span>
    </button>
  )
}

function PremiumRedLetterDay() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'DAY', 'SAT', 'SUN']
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-red-letter-day" role="img" aria-label="One DAY in a seven-day calendar is displayed in red">
      <img src="/premium-328-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="red-day-labels" aria-hidden="true">{days.map((day) => <b key={day}>{day}</b>)}</span>
    </div>
  )
}

function PremiumSlimChance() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-slim-chance" role="img" aria-label="CHANCE is compressed into an extremely slim display case">
      <img src="/premium-335-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="slim-chance-word" aria-hidden="true">CHANCE</span>
    </div>
  )
}

function PremiumOddsEnds() {
  return (
    <div className="puzzle-visual generated-puzzle-visual editorial-premium-art premium-odds-ends" role="img" aria-label="Odd numbers sit at both ends around END">
      <img src="/premium-337-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="odd-number odd-one" aria-hidden="true">1</span>
      <span className="odd-number odd-three" aria-hidden="true">3</span>
      <span className="odd-number odd-five" aria-hidden="true">5</span>
      <span className="odds-end-word" aria-hidden="true">END</span>
      <span className="odd-number odd-seven" aria-hidden="true">7</span>
      <span className="odd-number odd-nine" aria-hidden="true">9</span>
    </div>
  )
}

export function PuzzleVisual({ puzzle, soundEnabled = false, onSolved }: { puzzle: Puzzle; soundEnabled?: boolean; onSolved?: () => void }) {
  const [activated, setActivated] = useState(false)
  useEffect(() => setActivated(false), [puzzle.id])

  if (puzzle.id === 252) return <YearDotCalendarPuzzle soundEnabled={soundEnabled} />

  const sequentialDefinition = getSequentialPuzzleDefinition(puzzle.interactionSequenceKey)
  if (sequentialDefinition) return <SequentialPuzzle definition={sequentialDefinition} onSolved={onSolved} />

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

  if (puzzle.id === 6) {
    return <PremiumBrokenHeart puzzle={puzzle} activated={activated} onActivate={() => setActivated(true)} />
  }

  if (puzzle.id === 3) return <PremiumSplitDecision />

  if (puzzle.id === 19) {
    return <PremiumTopSecret activated={activated} onActivate={() => setActivated(true)} />
  }

  if (puzzle.id === 516) return <RaisedEyebrowsPuzzleArt puzzle={puzzle} />

  if (puzzle.id === 70) return <PremiumGrowingApart />

  if (puzzle.id === 136) return <PremiumBeatAroundBush />

  if (puzzle.id === 95) return <PremiumAroundClock />

  if (puzzle.id === 176) return <PremiumLookingBack />

  if (puzzle.id === 189) return <PremiumCloseCall />

  if (puzzle.id === 218) return <PremiumSplitSecond activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 224) return <PremiumGreenLight activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 226) return <PremiumBlueBlood activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 231) return <PremiumPageTurner activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 235) return <PremiumFillBlanks activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 247) return <PremiumBehindTimes />

  if (puzzle.id === 249) return <PremiumDayInDayOut />

  if (puzzle.id === 251) return <PremiumMonthOfSundays />

  if (puzzle.id === 281) return <PremiumUnfinishedBusiness activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 282) return <PremiumTwoTogether activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 283) return <PremiumThingAfterThing />

  if (puzzle.id === 285) return <PremiumPlayOnWords activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 286) return <PremiumWordForWord />

  if (puzzle.id === 288) return <PremiumMindGap />

  if (puzzle.id === 289) return <PremiumBusinessPleasure />

  if (puzzle.id === 294) return <PremiumSinkSwim />

  if (puzzle.id === 296) return <PremiumGoFlow activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 320) return <PremiumDealBreaker activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 321) return <PremiumBlessingDisguise activated={activated} onActivate={() => setActivated((value) => !value)} />

  if (puzzle.id === 328) return <PremiumRedLetterDay />

  if (puzzle.id === 335) return <PremiumSlimChance />

  if (puzzle.id === 337) return <PremiumOddsEnds />

  const premiumArt = premiumPuzzleArt[puzzle.id]
  if (premiumArt) return <GeneratedPuzzleArt puzzle={puzzle} src={premiumArt} soundEnabled={soundEnabled} />

  if (hasPremiumTextPuzzleArt(puzzle.id)) return <PremiumTextPuzzleArt id={puzzle.id} />

  if (hasPremiumWordPuzzleArt(puzzle.id)) return <PremiumWordPuzzleArt id={puzzle.id} />

  const reworkedArt = <ReworkedPuzzleArt id={puzzle.id} />
  if ([148, 151, 158, 161, 162, 167, 177, 180, 183, 184, 185, 186, 190, 211, 212, 213, 214, 215, 216, 217, 220, 221].includes(puzzle.id)) {
    return reworkedArt
  }

  if (hasReviewedPuzzleArt(puzzle.id)) return <ReviewedPuzzleArt id={puzzle.id} />

  const generatedArt = generatedPuzzleArt[puzzle.id]
  if (generatedArt) return <GeneratedPuzzleArt puzzle={puzzle} src={generatedArt} />

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
