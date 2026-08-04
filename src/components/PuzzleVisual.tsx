import React, { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { GiFootprint } from 'react-icons/gi'
import type { Puzzle } from '../types'
import { hasReviewedPuzzleArt, ReviewedPuzzleArt } from './ReviewedPuzzleArt'
import { hasPremiumTextPuzzleArt, PremiumTextPuzzleArt } from './PremiumTextPuzzleArt'
import { hasPremiumWordPuzzleArt, PremiumWordPuzzleArt } from './PremiumWordPuzzleArt'

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
  222: '/premium-222-v1.webp',
  223: '/premium-223-v1.webp',
  227: '/premium-227-v1.webp',
  230: '/premium-230-v1.webp',
  233: '/premium-233-v1.webp',
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

function GeneratedPuzzleArt({ puzzle, src }: { puzzle: Puzzle; src: string }) {
  return (
    <div
      className={`puzzle-visual generated-puzzle-visual premium-puzzle-${puzzle.id}`}
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
    </div>
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

  if (puzzle.id === 516) return <RaisedEyebrowsPuzzleArt puzzle={puzzle} />

  const premiumArt = premiumPuzzleArt[puzzle.id]
  if (premiumArt) return <GeneratedPuzzleArt puzzle={puzzle} src={premiumArt} />

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
