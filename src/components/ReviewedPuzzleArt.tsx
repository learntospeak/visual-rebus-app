import type { ReactNode } from 'react'

const reviewedPuzzleIds = new Set([
  222, 223, 224, 225, 227, 228, 229, 230, 233, 235, 236, 237, 238, 239, 241, 242, 243, 246, 251, 252, 254, 255,
  257, 258, 261, 277, 284, 308, 310, 328, 337, 357, 392, 400, 435, 477, 497, 554,
])

export function hasReviewedPuzzleArt(id: number) {
  return reviewedPuzzleIds.has(id)
}

function Frame({ id, label, children }: { id: number; label: string; children: ReactNode }) {
  return (
    <div className={`puzzle-visual reviewed-puzzle-art reviewed-${id}`} role="img" aria-label={label}>
      <svg viewBox="0 0 340 240" aria-hidden="true">{children}</svg>
    </div>
  )
}

export function ReviewedPuzzleArt({ id }: { id: number }) {
  if (id === 222) return <Frame id={id} label="A winding trail made from overlapping sheets of paper">
    <path className="trail-line" d="M38 190C65 112 111 217 160 135s96-62 143-111" />
    {[[43, 176, -18], [91, 155, 14], [143, 145, -12], [191, 101, 15], [246, 70, -10], [292, 33, 13]].map(([x, y, r], i) => <g className="paper-sheet" transform={`translate(${x} ${y}) rotate(${r})`} key={i}><rect x="-22" y="-28" width="44" height="56" rx="4" /><path d="M-13-13h26M-13-3h21M-13 7h25" /></g>)}
  </Frame>
  if (id === 223) return <Frame id={id} label="A barrier formed from crossed rolls of bright red tape">
    <path className="tape-roll" d="M36 183h268M47 56l247 151M295 55 48 207" /><circle className="tape-spool" cx="45" cy="55" r="25" /><circle className="tape-hole" cx="45" cy="55" r="9" /><circle className="tape-spool" cx="295" cy="55" r="25" /><circle className="tape-hole" cx="295" cy="55" r="9" /><path className="barrier-leg" d="M61 178v40m218-40v40" />
  </Frame>
  if (id === 224) return <Frame id={id} label="A traffic signal with its green light glowing brightly">
    <rect className="signal-body" x="113" y="20" width="114" height="180" rx="23" /><circle className="signal-off" cx="170" cy="61" r="25" /><circle className="signal-off" cx="170" cy="111" r="25" /><circle className="signal-green-glow" cx="170" cy="161" r="38" /><circle className="signal-green" cx="170" cy="161" r="25" /><path className="signal-stand" d="M170 200v25M132 225h76" />
  </Frame>
  if (id === 225) return <Frame id={id} label="An uncertain area covered by overlapping grey shades">
    <defs><pattern id="grey-hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M-3 3 3-3M0 12 12 0M9 15l6-6" /></pattern></defs><path className="grey-zone" d="M43 75c35-54 90-42 121-15 42-42 113-20 133 31 18 47-20 96-73 91-42 36-103 22-119-17-56 5-89-46-62-90Z" /><path className="grey-hatch" d="M43 75c35-54 90-42 121-15 42-42 113-20 133 31 18 47-20 96-73 91-42 36-103 22-119-17-56 5-89-46-62-90Z" /><text className="scene-label" x="170" y="129">AREA</text>
  </Frame>
  if (id === 227) return <Frame id={id} label="A bent jacket sleeve repaired with a vivid purple patch stitched over its elbow">
    <path className="jacket-upper-sleeve" d="M21 49C67 28 119 34 177 72l23 17-42 70-24-15c-42-27-76-30-113-18Z" /><path className="jacket-forearm" d="m177 72 145 87-40 67-148-82Z" /><path className="jacket-seam" d="M31 63c42-16 87-8 137 25m-32 54 40-68m99 147 40-66" /><path className="purple-elbow-patch" d="M137 72c18-14 52-7 69 14 17 22 11 53-11 71-21 17-54 12-70-10-16-23-9-57 12-75Z" /><path className="elbow-stitch" d="M143 82c15-10 41-5 54 12 13 18 8 42-9 55-17 12-42 8-54-9-12-18-8-45 9-58Z" />
  </Frame>
  if (id === 228) return <Frame id={id} label="A book lying fully open with readable pages exposed">
    <path className="book-page" d="M29 61c54-23 104-13 141 17v129c-40-31-90-38-141-14Z" /><path className="book-page" d="M311 61c-54-23-104-13-141 17v129c40-31 90-38 141-14Z" /><path className="book-spine" d="M170 79v128" /><path className="book-lines" d="M52 91h88M52 113h95M52 135h84M200 91h88M193 113h95M205 135h83" />
  </Frame>
  if (id === 229) return <Frame id={id} label="A substantial hardback book fully closed and secured by a fastened leather clasp">
    <path className="closed-book-pages" d="m59 62 224-17 30 132-226 25Z" /><path className="closed-book-page-lines" d="m88 178 216-23m-214 34 216-24" /><path className="closed-book-cover" d="M43 42 280 24l31 131-239 24Z" /><path className="closed-book-spine" d="M43 42 72 179l17 23L59 63Z" /><path className="closed-book-detail" d="m77 62 176-14m-168 94 184-19" /><path className="book-clasp" d="m207 31 27-2 32 135-28 3Z" /><rect className="clasp-fastener" x="229" y="94" width="31" height="28" rx="7" transform="rotate(-7 244.5 108)" /><circle className="clasp-button" cx="245" cy="107" r="5" />
  </Frame>
  if (id === 230) return <Frame id={id} label="A cheerful worm curls across the scene with a body made entirely from miniature hardback books">
    <path className="bookworm-guide" d="M37 145c55 64 132 53 178-16 18-27 28-54 50-66" />
    {[[43, 141, -24], [77, 163, -13], [114, 173, 2], [151, 165, 15], [184, 145, 25], [211, 116, 34], [232, 84, 42]].map(([x, y, r], index) => <g className={`bookworm-book bookworm-book-${index}`} transform={`translate(${x} ${y}) rotate(${r})`} key={index}><rect x="-21" y="-15" width="42" height="30" rx="4" /><path d="M-14-8h26M-14-1h22M-14 6h25" /><path className="mini-book-spine" d="M-21-14v29" /></g>)}
    <g className="bookworm-head" transform="translate(273 55) rotate(18)"><circle r="27" /><path className="worm-antennae" d="M-11-23c-9-20-20-18-25-8m48 9c11-19 22-15 25-5" /><circle className="worm-eye" cx="-9" cy="-5" r="4" /><circle className="worm-eye" cx="9" cy="-5" r="4" /><path className="worm-smile" d="M-10 8q10 12 20 0" /></g>
  </Frame>
  if (id === 233) return <Frame id={id} label="Oversized reading glasses scan the expressions of people gathered inside a furnished room">
    <path className="room-walls" d="M27 27h286v186H27V27Zm0 73h22m-22 43h22" /><rect className="room-rug" x="104" y="69" width="133" height="106" rx="18" /><path className="room-sofa" d="M72 48h105v37H72Zm9 37v15m87-15v15" /><circle className="room-table" cx="268" cy="149" r="32" /><path className="room-chair" d="M250 195h39m-30-14 9 14m12-14-9 14" />
    <g className="room-face room-face-one" transform="translate(91 125)"><circle r="18" /><circle cx="-6" cy="-4" r="2" /><circle cx="6" cy="-4" r="2" /><path d="M-7 7q7 8 14 0" /></g><g className="room-face room-face-two" transform="translate(171 126)"><circle r="18" /><circle cx="-6" cy="-4" r="2" /><circle cx="6" cy="-4" r="2" /><path d="M-7 11q7-8 14 0" /></g><g className="room-face room-face-three" transform="translate(259 71)"><circle r="18" /><circle cx="-6" cy="-4" r="2" /><circle cx="6" cy="-4" r="2" /><path d="M-7 8h14" /></g>
    <g className="reading-glasses"><circle cx="126" cy="126" r="49" /><circle cx="220" cy="126" r="49" /><path d="M175 121q-4-12-10 0M77 116 41 98m228 18 33-20" /></g><path className="scan-glow" d="M78 126h191" />
  </Frame>
  if (id === 235) return <Frame id={id} label="Letter tiles move into the missing spaces of an incomplete word">
    <text className="blank-word" x="51" y="112">BL</text><path className="blank-slot" d="M104 119h31m13 0h31" /><text className="blank-word" x="194" y="112">NKS</text><g className="fill-tiles"><rect x="109" y="158" width="29" height="34" rx="5" /><text x="123.5" y="182">A</text><rect x="148" y="158" width="29" height="34" rx="5" /><text x="162.5" y="182">A</text></g><path className="fill-arrow" d="M143 151 126 132m35 19 2-22" />
  </Frame>
  if (id === 236) return <Frame id={id} label="A sturdy bridge spans a deep gap between two cliffs">
    <path className="cliff" d="M0 45h99l18 36-20 29 13 32-21 98H0Zm340 0h-99l-18 36 20 29-13 32 21 98h89Z" /><path className="bridge-deck" d="M82 91h176M89 107h162" /><path className="bridge-cable" d="M96 91c36-64 112-64 148 0M108 91v-23m30 23V45m32 46V34m32 57V45m30 46V68" /><path className="gap-depth" d="m139 216 31-28 31 28" />
  </Frame>
  if (id === 237) return <Frame id={id} label="A crowded, heavily worn road continues right while one narrow overgrown path branches left with only a single set of footprints">
    <path className="travel-land" d="M0 0h340v240H0Z" /><path className="busy-road" d="M165 240c-7-55 8-91 46-121 34-27 63-56 80-119" /><path className="quiet-road" d="M169 220c-16-62-50-80-87-107C55 93 40 62 39 21" /><path className="busy-road-line" d="M168 230c-2-49 17-79 52-106 34-27 57-58 67-112" /><g className="busy-footprints">{[[191,194,-22],[215,174,-30],[226,145,-39],[249,126,-36],[261,94,-25],[280,70,-18],[286,37,-10],[202,215,14],[234,163,4],[254,143,18],[270,110,8],[294,88,22]].map(([x,y,r],index)=><g transform={`translate(${x} ${y}) rotate(${r})`} key={index}><ellipse cx="0" cy="0" rx="5" ry="9" /><circle cx="-4" cy="-9" r="2" /><circle cx="1" cy="-11" r="2" /><circle cx="5" cy="-8" r="2" /></g>)}</g><g className="lone-footprints">{[[145,190,-25],[124,164,-32],[99,139,-38],[76,108,-27],[57,78,-18],[45,43,-8]].map(([x,y,r],index)=><g transform={`translate(${x} ${y}) rotate(${r})`} key={index}><ellipse cx="0" cy="0" rx="6" ry="11" /><circle cx="-5" cy="-11" r="2.5" /><circle cx="1" cy="-14" r="2.5" /><circle cx="6" cy="-10" r="2.5" /></g>)}</g><path className="overgrowth" d="M22 41 8 26m31 6 7-22M54 77 37 63m58 50-6-24m-22 13-19-5m74 52-5-23" />
  </Frame>
  if (id === 238) return <Frame id={id} label="A winding road reaches the torn outer edge of a map and physically stops, with empty space beyond">
    <path className="torn-map" d="M19 27h270v28l17 13-18 16 18 17-17 17 17 17-18 17 18 17-17 15v29H19Z" /><path className="map-contours" d="M38 61c35-20 61-15 89 5m-74 121c31-15 55-12 78 3M188 48c26 13 46 11 75-1" /><path className="ending-road" d="M33 193c34-49 78-22 96-69 17-43 60-19 81-57 15-26 42-8 79 12" /><path className="ending-centre" d="M38 190c33-37 67-18 85-65 17-45 62-20 81-59 14-27 44-3 82 14" /><path className="road-cut" d="m282 66 17 12-17 14" /><g className="stopped-car" transform="translate(242 65) rotate(21)"><path d="M-22 8h44l-5-18h-30Z" /><rect x="-25" y="6" width="50" height="22" rx="7" /><circle cx="-15" cy="29" r="6" /><circle cx="15" cy="29" r="6" /></g><path className="empty-beyond" d="M315 49v142" />
  </Frame>
  if (id === 239) return <Frame id={id} label="A small car is thrown into the air while driving over a dramatically rising and falling road">
    <path className="bumpy-road" d="M8 174c34 0 35-73 70-73s35 73 70 73 35-73 70-73 35 73 70 73 35-73 44-73" /><path className="bumpy-centre" d="M8 174c34 0 35-73 70-73s35 73 70 73 35-73 70-73 35 73 70 73 35-73 44-73" /><g className="bouncing-car" transform="translate(176 62) rotate(-8)"><path d="M-29 8h58l-8-22h-35Z" /><rect x="-34" y="5" width="68" height="28" rx="9" /><circle cx="-22" cy="35" r="8" /><circle cx="22" cy="35" r="8" /><path className="car-window" d="m-10-9-5 16h31L10-9Z" /></g><path className="bounce-lines" d="M146 31 132 12m42 14V3m29 28 14-19M158 111l-9 17m44-19 10 17" />
  </Frame>
  if (id === 241) return <Frame id={id} label="A single fresh footprint leaves a heavily worn track">
    <path className="beaten-track" d="M25 186C87 118 113 158 170 101s85-53 145-70" /><g className="track-prints">{[[53,170],[88,146],[126,139],[160,112],[197,84],[238,63],[277,42]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="10" ry="17" transform={`rotate(45 ${x} ${y})`} />)}</g><g className="off-print" transform="translate(226 157) rotate(-18)"><ellipse cx="0" cy="0" rx="18" ry="29" /><circle cx="-16" cy="-31" r="6" /><circle cx="-5" cy="-38" r="6" /><circle cx="7" cy="-38" r="6" /><circle cx="18" cy="-31" r="6" /></g>
  </Frame>
  if (id === 242) return <Frame id={id} label="A small cart travels along an exceptionally long winding road">
    <path className="long-road" d="M18 203C45 112 117 197 156 117S248 78 321 27" /><path className="road-dashes" d="M28 191c31-55 75-8 110-47s74-40 112-64 46-34 65-45" /><g className="haul-cart" transform="translate(36 168)"><rect x="0" y="0" width="48" height="31" rx="5" /><path d="M8 0 16-21h26L48 0" /><circle cx="11" cy="35" r="7" /><circle cx="39" cy="35" r="7" /></g>
  </Frame>
  if (id === 243) return <Frame id={id} label="A short direct path cuts across a much longer winding route">
    <path className="long-route" d="M37 194C15 84 127 185 116 76S248 153 302 38" /><path className="short-route" d="m55 187 225-131" /><path className="route-arrow" d="m265 48 18 7-5 18" /><circle className="route-start" cx="55" cy="187" r="10" />
  </Frame>
  if (id === 246) return <Frame id={id} label="An analogue clock is one minute away from the eleventh hour">
    <circle className="clock-face" cx="170" cy="120" r="92" /><g className="clock-ticks">{Array.from({length:12},(_,i)=><line key={i} x1="170" y1="38" x2="170" y2="52" transform={`rotate(${i*30} 170 120)`} />)}</g><text className="clock-eleven" x="123" y="64">11</text><path className="clock-hands" d="m170 120-42-44m42 44-8-72" /><circle className="clock-pin" cx="170" cy="120" r="7" />
  </Frame>
  if (id === 251) return <Frame id={id} label="A monthly calendar whose Sunday column dominates the page">
    <rect className="calendar-page" x="39" y="23" width="262" height="194" rx="12" /><path className="calendar-top" d="M39 62h262M88 23v25m203-25v25" /><g className="calendar-grid"><path d="M76 62v155m38-155v155m38-155v155m38-155v155m38-155v155m38-155v155M39 95h262M39 127h262M39 159h262M39 191h262" /></g><g className="sunday-column"><rect x="266" y="63" width="34" height="153" /><text x="283" y="86">S</text><text x="283" y="118">S</text><text x="283" y="150">S</text><text x="283" y="182">S</text><text x="283" y="211">S</text></g><text className="calendar-month" x="170" y="50">MONTH</text>
  </Frame>
  if (id === 252) return <Frame id={id} label="The word YEAR recedes along history until it becomes a tiny dot">
    <path className="year-line" d="M35 176h270" /><circle className="year-dot" cx="287" cy="176" r="4" /><text className="year-large" x="45" y="111">YEAR</text><text className="year-mid" x="152" y="137">YR</text><text className="year-small" x="231" y="157">Y</text><path className="year-arrows" d="m109 121 27 8m48 14 25 7m43 13 23 8" />
  </Frame>
  if (id === 254) return <Frame id={id} label="A clock rests directly across two open hands">
    <path className="palm" d="M23 176c30-22 54-25 83-9l39 20-13 30-54-14-38 5Z" /><path className="palm" d="M317 176c-30-22-54-25-83-9l-39 20 13 30 54-14 38 5Z" /><circle className="small-clock" cx="170" cy="120" r="67" /><path className="small-clock-hands" d="M170 76v44l31 21" /><g className="clock-ticks">{Array.from({length:12},(_,i)=><line key={i} x1="170" y1="60" x2="170" y2="70" transform={`rotate(${i*30} 170 120)`} />)}</g>
  </Frame>
  if (id === 255) return <Frame id={id} label="A runner crosses the finish line just ahead of a racing clock">
    <path className="finish-line" d="M96 34v177" /><path className="finish-checks" d="M96 40h19v19H96m19 0h19v19h-19M96 78h19v19H96m19 0h19v19h-19M96 116h19v19H96m19 0h19v19h-19" /><g className="scene-runner"><circle cx="70" cy="84" r="12" /><path d="m72 99 22 25 25-8m-28 8-17 39-28 20m28-20 29 31m-36-77-28 5" /></g><circle className="racing-clock" cx="239" cy="139" r="52" /><path className="racing-hands" d="M239 103v36h27" /><path className="motion-lines" d="M286 105h34m-28 23h35m-34 23h27" />
  </Frame>
  if (id === 257) return <Frame id={id} label="Mysterious glowing writing appears directly across a brick wall">
    <path className="brick-wall" d="M22 42h296v168H22Z" /><path className="brick-lines" d="M22 76h296M22 110h296M22 144h296M22 178h296M72 42v34m62-34v34m62-34v34m62-34v34M46 76v34m62-34v34m62-34v34m62-34v34m62-34v34M72 110v34m62-34v34m62-34v34m62-34v34M46 144v34m62-34v34m62-34v34m62-34v34m62-34v34M72 178v32m62-32v32m62-32v32m62-32v32" /><path className="wall-writing" d="M72 142c23-51 36 48 60-10 17-41 31 36 49-7 13-30 25 24 39-6 13-29 24 18 46-14" /><circle className="writing-glow" cx="72" cy="142" r="6" /><circle className="writing-glow" cx="266" cy="105" r="6" />
  </Frame>
  if (id === 258) return <Frame id={id} label="A newborn baby clearly grips an oversized silver spoon">
    <path className="baby-blanket" d="M44 172c22-84 83-122 151-90 45 22 70 67 67 121H61Z" /><circle className="baby-head" cx="136" cy="92" r="43" /><path className="baby-curl" d="M113 52c5-18 28-22 37-4m-29 1c4-12 18-15 26-4" /><circle className="baby-eye" cx="123" cy="91" r="3" /><circle className="baby-eye" cx="148" cy="91" r="3" /><path className="baby-smile" d="M126 107q11 10 22 0" /><path className="baby-arm" d="M153 126c22 4 30 20 39 35" /><g className="silver-spoon" transform="rotate(-21 235 108)"><ellipse cx="235" cy="54" rx="28" ry="39" /><path d="M235 91v111" /></g><circle className="baby-hand" cx="209" cy="161" r="13" />
  </Frame>
  if (id === 261) return <Frame id={id} label="A human nervous system is formed from polished steel cables">
    <circle className="steel-head" cx="170" cy="39" r="25" /><path className="steel-body" d="M170 65v99m0-64-67 59m67-59 67 59m-67-3-43 68m43-68 43 68" /><path className="steel-nerves" d="m170 81-31 26m31-7 31 26m-31-9-42 17m42 0 42 17m-42 5-22 34m22-20 26 38m-68-70-23 20m105-7 28 20" /><circle className="steel-node" cx="139" cy="107" r="5" /><circle className="steel-node" cx="201" cy="126" r="5" /><circle className="steel-node" cx="128" cy="134" r="5" /><circle className="steel-node" cx="212" cy="151" r="5" />
  </Frame>
  if (id === 277) return <Frame id={id} label="A spoken message travels straight out from a horse's mouth">
    <path className="horse-head" d="M62 65c31-31 83-21 102 12l-13 38-35 23-9 47-40-14 8-48-26-28Z" /><path className="horse-ear" d="m70 68-15-39 35 27m55 12 11-41-34 32" /><circle className="horse-eye" cx="113" cy="87" r="6" /><path className="horse-muzzle" d="M75 123c22 5 51 1 76-8" /><path className="speech-straight" d="M148 123h158m-20-13 20 13-20 13" /><circle className="speech-dot" cx="181" cy="123" r="6" /><circle className="speech-dot" cx="209" cy="123" r="6" /><circle className="speech-dot" cx="237" cy="123" r="6" />
  </Frame>
  if (id === 284) return <Frame id={id} label="A row of laughing faces ends with one final spotlighted laugh">
    {[55,105,155].map(x=><g className="laugh-face" transform={`translate(${x} 119)`} key={x}><circle r="27" /><path d="M-12-5h4m12 0h4M-13 8q13 18 26 0" /></g>)}<path className="laugh-finish" d="M199 44v153" /><g className="last-laugh" transform="translate(260 119)"><circle r="44" /><path d="M-18-8h7m16 0h7M-22 10q22 28 44 0" /></g><path className="laugh-rays" d="M260 53V27m-54 43-18-18m126 18 18-18m-126 116-18 18m126-18 18 18" />
  </Frame>
  if (id === 308) return <Frame id={id} label="A person is left holding the visibly short end of a divided wooden stick">
    <path className="long-stick" d="M40 82 285 145" /><path className="stick-break" d="m216 121 12 22 15-14" /><path className="short-stick" d="m229 139 64 17" /><g className="stick-person"><circle cx="285" cy="77" r="15" /><path d="M285 92v62m0-34-45 20m45-20 27 27m-27 7-23 59m23-59 26 59" /></g><circle className="stick-hand" cx="241" cy="140" r="8" />
  </Frame>
  if (id === 310) return <Frame id={id} label="A hand steals a lightning bolt away from another person's storm cloud">
    <path className="storm-cloud" d="M44 115c-16-36 18-65 51-50 15-36 70-30 77 11 37-8 54 42 19 59H63c-9 0-16-8-19-20Z" /><path className="thunder-bolt" d="m132 128-29 48h27l-13 44 50-66h-28l20-26Z" /><path className="stealing-hand" d="M295 115c-20-8-36 0-51 17l-28 33c-9 11-4 28 9 32 12 4 21-2 28-11l18-22 31 3 18-29Z" /><path className="steal-motion" d="M198 149h54m-16-13 17 13-17 13" />
  </Frame>
  if (id === 328) return <Frame id={id} label="One important date is marked with a bold red letter on a calendar">
    <rect className="calendar-page" x="58" y="25" width="224" height="190" rx="12" /><path className="calendar-top" d="M58 67h224M101 25v25m138-25v25" /><g className="calendar-grid"><path d="M90 67v148m32-148v148m32-148v148m32-148v148m32-148v148m32-148v148M58 97h224M58 127h224M58 157h224M58 187h224" /></g><rect className="red-date" x="155" y="128" width="31" height="29" rx="5" /><text className="red-letter" x="170.5" y="150">A</text>
  </Frame>
  if (id === 337) return <Frame id={id} label="Odd numbers are gathered at the two far ends">
    <g className="odd-end left"><circle cx="44" cy="120" r="25" /><text x="44" y="128">1</text><circle cx="96" cy="120" r="25" /><text x="96" y="128">3</text></g><path className="ends-line" d="M121 120h98" /><g className="odd-end right"><circle cx="244" cy="120" r="25" /><text x="244" y="128">5</text><circle cx="296" cy="120" r="25" /><text x="296" y="128">7</text></g><path className="end-caps" d="M21 87v66m298-66v66" />
  </Frame>
  if (id === 357) return <Frame id={id} label="A discarded drawing loops back toward a clean drawing board">
    <g className="old-sketch" transform="translate(33 66) rotate(-10)"><rect width="94" height="121" rx="5" /><path d="M15 91 39 60l17 18 17-30 10 43ZM15 105h63" /></g><path className="back-arrow" d="M145 173c1-78 67-112 119-74m-14-17 18 17-20 14" /><g className="drawing-board"><rect x="219" y="52" width="93" height="119" rx="5" /><path d="M230 84h70m-70 20h70m-70 20h45" /><path d="M238 171v32m55-32v32m-70 0h85" /></g>
  </Frame>
  if (id === 392) return <Frame id={id} label="A large heart is weighed down by a heavy metal weight">
    <path className="heavy-heart" d="M170 205C129 174 66 132 68 79c2-48 67-57 102-13 35-44 100-35 102 13 2 53-61 95-102 126Z" /><path className="weight-chain" d="M170 24v39" /><path className="heavy-weight" d="M132 23h76l18 61H114Z" /><text className="weight-mark" x="170" y="63">100</text><path className="floor-crack" d="m115 219 28-8 16 15 18-18 19 15 29-9" />
  </Frame>
  if (id === 400) return <Frame id={id} label="A crisp white surrender flag is raised high on a pole">
    <path className="flag-pole" d="M104 218V28" /><path className="white-flag" d="M108 38c49-24 91 24 143-2v93c-52 26-94-22-143 2Z" /><path className="flag-outline-detail" d="M122 60c34-10 67 16 111 0" /><path className="flag-base" d="M72 218h66" /><path className="raise-arrow" d="M73 174V77m-14 18 14-18 14 18" />
  </Frame>
  if (id === 435) return <Frame id={id} label="Famous words occupy the final position under theatre spotlights">
    <path className="spotlight" d="M40 35h42l47 142H17Zm218 0h42l23 142H211Z" /><g className="fame-stars"><path d="m61 69 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" /><path d="m279 69 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" /></g><path className="word-runway" d="M53 193h222" /><text className="final-words" x="212" y="183">WORDS</text><path className="final-marker" d="M291 151v57" />
  </Frame>
  if (id === 477) return <Frame id={id} label="A complete circular arrow loops fully around the word COME">
    <path className="full-circle" d="M102 62a82 82 0 1 1-16 102" /><path className="circle-arrow" d="m77 177 9-13 14 8" /><text className="circle-word" x="170" y="132">COME</text>
  </Frame>
  if (id === 497) return <Frame id={id} label="A play symbol sends a hand of cards to the far right side">
    <circle className="play-button" cx="64" cy="120" r="34" /><path className="play-triangle" d="m56 100 28 20-28 20Z" /><path className="play-motion" d="M108 120h74m-16-13 17 13-17 13" /><g className="right-cards" transform="translate(213 61)"><rect x="0" y="12" width="52" height="82" rx="7" transform="rotate(-12 26 53)" /><rect x="32" y="5" width="52" height="82" rx="7" transform="rotate(8 58 46)" /><path d="m59 24 8 14 15 2-11 11 3 15-15-8-14 8 3-15-11-11 15-2Z" /></g><path className="right-edge" d="M315 38v164" />
  </Frame>
  if (id === 554) return <Frame id={id} label="A fisherman casts an exceptionally wide net across the water">
    <g className="net-person"><circle cx="49" cy="72" r="13" /><path d="M49 85v56m0-34 38-25m-38 25-27 31m27 3-20 54m20-54 30 50" /></g><path className="cast-line" d="M87 82c65-69 145-51 207 17" /><path className="wide-net" d="M109 110c46-34 126-35 177 0l-21 91H128Z" /><path className="net-mesh" d="m126 116 23 81m11-96 10 100m22-105-1 105m23-101-3 101m25-92-5 88m-106-60h151m-145 27h138m-132 27h125" /><path className="water-line" d="M15 210q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" />
  </Frame>
  return null
}
