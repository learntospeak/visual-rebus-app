import React, { type CSSProperties, type ReactNode } from 'react'

const reviewedPuzzleIds = new Set([
  222, 223, 224, 225, 227, 228, 229, 230, 233, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255,
  257, 258, 260, 261, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 328, 337, 357, 392, 400, 435, 477, 497, 554,
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
  if (id === 240) return <Frame id={id} label="A lone person stands precisely on the centre line halfway along a road, marked by four inward-pointing arrows">
    <path className="middle-road-ground" d="M70 0h200l55 240H15Z" /><path className="middle-road-edge" d="M70 0 15 240M270 0l55 240" /><path className="middle-road-line" d="M170 6v43m0 32v43m0 32v76" /><g className="middle-person"><circle cx="170" cy="112" r="13" /><path d="M170 126v49m0-31-29 20m29-20 29 20m-29 11-23 43m23-43 23 43" /></g><path className="middle-arrows" d="m97 118 38 17-38 17m146-34-38 17 38 17M145 52l25 25 25-25m-50 172 25-25 25 25" />
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
  if (id === 244) return <Frame id={id} label="A road reaches its final barrier at a grave marked RIP, beside a lifeless tree">
    <path className="dead-land" d="M0 0h340v240H0Z" /><path className="dead-road" d="M31 240c27-63 74-47 104-91 28-42 49-56 100-58" /><path className="dead-road-line" d="M39 236c27-50 67-39 94-84 27-44 55-52 96-54" /><path className="grave-stone" d="M226 81V44c0-32 55-32 55 0v37Z" /><text className="grave-mark" x="253.5" y="65">RIP</text><path className="dead-barrier" d="M207 92h91m-75 0v31m59-31v31" /><path className="dead-tree" d="M79 126V43m0 38-34-31m34 10 27-30M78 99l-25 20m26-57-8-32" />
  </Frame>
  if (id === 245) return <Frame id={id} label="A person's spoken words curl through the air and summon a mischievous horned shadow">
    <g className="devil-speaker"><circle cx="65" cy="99" r="24" /><path d="M65 123v72m0-45-35 25m35-25 30 23m-30 22-25 39m25-39 28 39" /></g><path className="spoken-summon" d="M91 92c44-42 79 36 118-4m-93-17c29-16 50 24 77 5" /><g className="devil-shadow"><path d="M231 83c-7-22 2-42 20-52l4 27c11-3 22-3 33 2l11-25c15 14 18 35 7 54 21 23 19 68 5 105h-81c-17-43-15-83 1-111Z" /><circle className="devil-eye" cx="258" cy="102" r="5" /><circle className="devil-eye" cx="283" cy="102" r="5" /><path className="devil-grin" d="M256 119q15 14 30 0" /><path className="devil-tail" d="M304 162c27-6 23-34 8-27m5-7 8 11-13 2" /></g>
  </Frame>
  if (id === 246) return <Frame id={id} label="An analogue clock is one minute away from the eleventh hour">
    <circle className="clock-face" cx="170" cy="120" r="92" /><g className="clock-ticks">{Array.from({length:12},(_,i)=><line key={i} x1="170" y1="38" x2="170" y2="52" transform={`rotate(${i*30} 170 120)`} />)}</g><text className="clock-eleven" x="123" y="64">11</text><path className="clock-hands" d="m170 120-42-44m42 44-8-72" /><circle className="clock-pin" cx="170" cy="120" r="7" />
  </Frame>
  if (id === 247) return <Frame id={id} label="An old-fashioned person is visibly hiding behind a row of newspapers titled TIMES">
    <g className="behind-person"><circle cx="171" cy="66" r="27" /><path d="M171 93v102m0-59-45 37m45-37 45 37m-45 22-28 40m28-40 28 40" /><path className="old-hat" d="M137 55h68m-55-3 9-28h27l9 28" /></g>{[54,113,172].map((x,index)=><g className={`times-paper times-paper-${index}`} transform={`translate(${x} ${104 + index * 7}) rotate(${index * 2 - 2})`} key={x}><rect width="114" height="105" rx="5" /><text x="57" y="27">TIMES</text><path d="M13 40h88M13 54h39m8 0h41M13 68h88M13 82h36m10 0h42" /></g>)}
  </Frame>
  if (id === 248) return <Frame id={id} label="One runner is being timed simultaneously by two separate stopwatches">
    <g className="timed-runner"><circle cx="170" cy="84" r="14" /><path d="m171 99 21 31 34-8m-34 8-19 42-34 25m34-25 33 36m-37-87-33 7" /></g>{[68,272].map((x,index)=><g className="double-timer" transform={`translate(${x} 108)`} key={x}><circle r="48" /><path d="M0-48v-15m-13 0h26M0-34V0l${index ? '-22 19' : '24 14'}" /><circle r="5" /></g>)}<path className="timer-rays" d="M113 111h24m66 0h24" />
  </Frame>
  if (id === 249) return <Frame id={id} label="One sun-marked calendar day is inside a house while an identical day is outside">
    <path className="in-out-house" d="M42 108 169 26l128 82v114H42Z" /><path className="house-roof" d="m26 112 143-94 145 94" /><path className="house-door" d="M129 139h80v83h-80Z" /><g className="day-card inside-day" transform="translate(75 122)"><rect width="65" height="72" rx="8" /><path d="M0 19h65" /><circle cx="32.5" cy="44" r="13" /><path d="M32 24v7m0 26v7M13 44h7m25 0h7M19 31l5 5m17 17 5 5m0-27-5 5M24 53l-5 5" /></g><g className="day-card outside-day" transform="translate(232 143)"><rect width="65" height="72" rx="8" /><path d="M0 19h65" /><circle cx="32.5" cy="44" r="13" /><path d="M32 24v7m0 26v7M13 44h7m25 0h7M19 31l5 5m17 17 5 5m0-27-5 5M24 53l-5 5" /></g>
  </Frame>
  if (id === 250) return <Frame id={id} label="One seven-day weekly planner is inside a house while another weekly planner is outside">
    <path className="in-out-house" d="M42 108 169 26l128 82v114H42Z" /><path className="house-roof" d="m26 112 143-94 145 94" /><path className="house-door" d="M129 139h80v83h-80Z" />{[[67,124,'inside-week'],[226,143,'outside-week']].map(([x,y,className])=><g className={`week-card ${className}`} transform={`translate(${x} ${y})`} key={String(className)}><rect width="78" height="72" rx="8" /><path d="M0 20h78M11 20v52m11-52v52m11-52v52m11-52v52m11-52v52m11-52v52" /><circle cx="5.5" cy="43" r="3" /><circle cx="16.5" cy="50" r="3" /><circle cx="27.5" cy="38" r="3" /><circle cx="38.5" cy="54" r="3" /><circle cx="49.5" cy="43" r="3" /><circle cx="60.5" cy="34" r="3" /><circle cx="71.5" cy="49" r="3" /></g>)}
  </Frame>
  if (id === 251) return <Frame id={id} label="A monthly calendar whose Sunday column dominates the page">
    <rect className="calendar-page" x="39" y="23" width="262" height="194" rx="12" /><path className="calendar-top" d="M39 62h262M88 23v25m203-25v25" /><g className="calendar-grid"><path d="M76 62v155m38-155v155m38-155v155m38-155v155m38-155v155m38-155v155M39 95h262M39 127h262M39 159h262M39 191h262" /></g><g className="sunday-column"><rect x="266" y="63" width="34" height="153" /><text x="283" y="86">S</text><text x="283" y="118">S</text><text x="283" y="150">S</text><text x="283" y="182">S</text><text x="283" y="211">S</text></g><text className="calendar-month" x="170" y="50">MONTH</text>
  </Frame>
  if (id === 252) return <Frame id={id} label="Calendar years recede backwards along a vast timeline until the earliest year becomes a single distant dot">
    <path className="year-horizon" d="M24 204 170 35 316 204Z" /><path className="year-road-lines" d="M61 204 170 35m109 169L170 35" />{[[79,147,82,61,'2026'],[145,100,55,42,'1900'],[185,70,38,29,'1000']].map(([x,y,width,height,year],index)=><g className={`receding-year year-card-${index}`} transform={`translate(${x} ${y})`} key={String(year)}><rect width={width} height={height} rx="5" /><path d={`M0 ${Number(height) * .28}h${width}`} /><text x={Number(width) / 2} y={Number(height) * .7}>{year}</text></g>)}<circle className="year-origin-dot" cx="229" cy="58" r="5" /><path className="year-back-arrow" d="M290 187C264 139 244 92 232 66m-12 13 12-14 15 10" />
  </Frame>
  if (id === 253) return <Frame id={id} label="A single one-times token sits directly upon the face of a large clock">
    <circle className="once-clock" cx="170" cy="139" r="76" /><g className="once-ticks">{Array.from({length:12},(_,index)=><path d="M170 72v12" transform={`rotate(${index * 30} 170 139)`} key={index} />)}</g><path className="once-hands" d="M170 139v-42m0 42 34 19" /><circle className="once-pin" cx="170" cy="139" r="7" /><g className="once-token"><rect x="133" y="20" width="74" height="58" rx="15" /><text x="170" y="59">1×</text></g>
  </Frame>
  if (id === 254) return <Frame id={id} label="A clock rests across two unmistakable open human palms with five separate fingers on each hand">
    {[0, 1].map((side) => <g className="open-supporting-hand" transform={side ? 'translate(340 0) scale(-1 1)' : undefined} key={side}>
      <rect className="hand-finger hand-thumb" x="36" y="125" width="25" height="67" rx="13" transform="rotate(-43 48 158)" />
      <rect className="hand-finger" x="54" y="81" width="25" height="91" rx="13" transform="rotate(-15 66 126)" />
      <rect className="hand-finger" x="79" y="64" width="26" height="103" rx="13" transform="rotate(-4 92 115)" />
      <rect className="hand-finger" x="105" y="73" width="25" height="94" rx="13" transform="rotate(7 117 120)" />
      <rect className="hand-finger" x="129" y="96" width="23" height="78" rx="12" transform="rotate(18 140 135)" />
      <path className="hand-palm" d="M54 145c0-17 14-29 31-29h38c18 0 32 14 32 32v41c0 13-5 24-15 32l-7 6H75l-8-9c-9-10-13-22-13-36Z" />
      <path className="hand-wrist" d="M75 205h58l8 35H69Z" />
      <path className="palm-crease" d="M70 170c20-15 46-15 67 0m-54 25c11-7 27-7 38 0" />
    </g>)}<circle className="small-clock" cx="170" cy="91" r="61" /><path className="small-clock-hands" d="M170 51v40l29 18" /><g className="clock-ticks">{Array.from({length:12},(_,i)=><line key={i} x1="170" y1="37" x2="170" y2="47" transform={`rotate(${i*30} 170 91)`} />)}</g><circle className="clock-pin" cx="170" cy="91" r="6" />
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
  if (id === 260) return <Frame id={id} label="A clenched fist forged from iron grips a long measuring ruler like a symbol of authority">
    <g className="iron-rule"><rect x="27" y="104" width="286" height="43" rx="6" /><path d="M49 104v19m22-19v12m22-12v19m22-19v12m22-12v19m22-19v12m22-12v19m22-19v12m22-12v19m22-19v12m22-12v19" /></g><g className="iron-fist"><path d="M118 129c-13-21-6-42 12-47 6-18 25-23 39-12 12-18 38-13 44 7 19-7 38 7 35 28l-5 37c-3 39-31 69-70 69-42 0-72-29-72-68 0-8 7-14 17-14Z" /><path d="M129 84v43m39-57-1 54m46-47-9 49m44-21-20 32M119 143c38-9 76-8 124-1" /></g>
  </Frame>
  if (id === 261) return <Frame id={id} label="A human nervous system is formed from polished steel cables">
    <circle className="steel-head" cx="170" cy="39" r="25" /><path className="steel-body" d="M170 65v99m0-64-67 59m67-59 67 59m-67-3-43 68m43-68 43 68" /><path className="steel-nerves" d="m170 81-31 26m31-7 31 26m-31-9-42 17m42 0 42 17m-42 5-22 34m22-20 26 38m-68-70-23 20m105-7 28 20" /><circle className="steel-node" cx="139" cy="107" r="5" /><circle className="steel-node" cx="201" cy="126" r="5" /><circle className="steel-node" cx="128" cy="134" r="5" /><circle className="steel-node" cx="212" cy="151" r="5" />
  </Frame>
  if (id === 271) return <Frame id={id} label="A single cherry balances on the very highest point of a tall layered dessert">
    <path className="dessert-plate" d="M52 209h236" /><path className="dessert-layer layer-one" d="M73 159h194v45H73Z" /><path className="dessert-layer layer-two" d="M96 113h148v46H96Z" /><path className="dessert-layer layer-three" d="M123 73h94v40h-94Z" /><path className="dessert-icing" d="M123 73c14 15 23-12 37 2 12 12 22-14 35 0 8 9 14 2 22-2" /><circle className="top-cherry" cx="170" cy="45" r="19" /><path className="cherry-stem" d="M170 27c3-17 14-20 26-22" />
  </Frame>
  if (id === 272) return <Frame id={id} label="A glowing green GO signal sends a bunch of bananas spinning wildly in every direction">
    <rect className="go-signal" x="27" y="71" width="91" height="98" rx="20" /><circle cx="72.5" cy="120" r="31" /><path className="go-arrow" d="M121 120h47m-14-15 16 15-16 15" /><g className="wild-bananas">{[[214,62,-35],[271,78,18],[230,132,42],[286,153,-18],[202,188,12]].map(([x,y,r],index)=><path d="M-18-25c37 7 47 34 27 52-18 16-45 4-50-18 15 7 29 1 34-10 5-12 0-20-11-24Z" transform={`translate(${x} ${y}) rotate(${r})`} key={index} />)}</g><path className="banana-motion" d="M193 51 180 35m87 19 12-20m-89 110-18 8m107 37 18 13m-86 7-7 18" />
  </Frame>
  if (id === 273) return <Frame id={id} label="A potato glows red-hot on a heat gauge while two oven mitts struggle to hold it">
    <path className="hot-potato" d="M108 67c33-32 93-22 117 17 30 48-3 108-59 111-54 3-91-47-73-95 4-12 8-23 15-33Z" /><circle className="potato-eye" cx="135" cy="103" r="5" /><circle className="potato-eye" cx="184" cy="132" r="6" /><path className="heat-lines" d="M127 49c-13-17 10-22-1-39m43 34c-11-18 12-22 1-39m42 51c-8-16 12-18 6-34" /><path className="oven-mitt left-mitt" d="M92 145c-29-7-48 11-45 36 3 26 27 45 58 38l31-20-15-45Z" /><path className="oven-mitt right-mitt" d="M229 143c29-8 50 9 48 34-2 27-26 47-57 41l-32-19 14-46Z" /><path className="heat-gauge" d="M292 43v126m0 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40Zm0-3V80" />
  </Frame>
  if (id === 274) return <Frame id={id} label="A narrow opened sardine tin is packed edge-to-edge with overlapping fish">
    <rect className="sardine-tin" x="35" y="55" width="270" height="137" rx="45" /><path className="tin-rim" d="M55 74h230v99H55Z" />{[[82,93],[133,93],[184,93],[235,93],[108,140],[159,140],[210,140],[261,140]].map(([x,y],index)=><g className="tin-fish" transform={`translate(${x} ${y})`} key={index}><path d="M-24 0c15-20 42-20 57 0-15 20-42 20-57 0Z" /><path d="m-24 0-14-12v24Z" /><circle cx="24" cy="-3" r="3" /></g>)}<path className="tin-key" d="M276 43h31m-13 0v27" />
  </Frame>
  if (id === 275) return <Frame id={id} label="A small fish is left untouched while an enormous fish barely fits inside a sizzling frying pan">
    <g className="small-spared-fish" transform="translate(62 75)"><path d="M-23 0c15-18 40-18 54 0-14 18-39 18-54 0Z" /><path d="m-23 0-15-12v24Z" /><circle cx="21" cy="-3" r="3" /></g><path className="frying-pan" d="M108 166c0-45 44-74 98-74s98 29 98 74c0 39-44 56-98 56s-98-17-98-56Zm196-3 34-15" /><g className="big-fry-fish" transform="translate(204 157)"><path d="M-69 0c42-50 116-50 153 0-37 49-111 49-153 0Z" /><path d="m-69 0-34-29v58Z" /><circle cx="65" cy="-8" r="7" /></g><path className="sizzle-lines" d="M150 76c-12-17 9-23-1-39m57 43c-11-19 12-24 1-42m55 50c-8-17 11-22 3-36" />
  </Frame>
  if (id === 276) return <Frame id={id} label="A bee buzzes underneath and inside the crown of a traditional bonnet">
    <path className="bonnet-crown" d="M76 146c1-67 35-111 94-111s93 44 94 111Z" /><path className="bonnet-brim" d="M36 146h268c-10 40-57 59-134 59S46 186 36 146Z" /><path className="bonnet-ribbon" d="M95 123h149v28H95Zm16 72-31 38m149-38 31 38" /><g className="bonnet-bee" transform="translate(170 96)"><ellipse rx="24" ry="16" /><path d="M-12-14v28M0-16v32M12-14v28" /><ellipse className="bee-wing" cx="-15" cy="-21" rx="15" ry="10" transform="rotate(25 -15 -21)" /><ellipse className="bee-wing" cx="15" cy="-21" rx="15" ry="10" transform="rotate(-25 15 -21)" /><path className="bee-antenna" d="M-8-15c-8-12-15-11-19-4m35 4c8-12 15-11 19-4" /></g><path className="bee-buzz" d="M138 82c-12-12-12-24 0-34m64 34c12-12 12-24 0-34" />
  </Frame>
  if (id === 277) return <Frame id={id} label="A spoken message travels straight out from a horse's mouth">
    <path className="horse-head" d="M62 65c31-31 83-21 102 12l-13 38-35 23-9 47-40-14 8-48-26-28Z" /><path className="horse-ear" d="m70 68-15-39 35 27m55 12 11-41-34 32" /><circle className="horse-eye" cx="113" cy="87" r="6" /><path className="horse-muzzle" d="M75 123c22 5 51 1 76-8" /><path className="speech-straight" d="M148 123h158m-20-13 20 13-20 13" /><circle className="speech-dot" cx="181" cy="123" r="6" /><circle className="speech-dot" cx="209" cy="123" r="6" /><circle className="speech-dot" cx="237" cy="123" r="6" />
  </Frame>
  if (id === 278) return <Frame id={id} label="The word ALL is scattered across every room, floor and corner of a small place map">
    <path className="place-map" d="M34 35h272v170H34Z" /><path className="place-rooms" d="M34 104h272M121 35v170m99-101v101" />{[[71,75,-8],[167,72,9],[262,69,-5],[74,151,11],[166,155,-11],[261,154,7]].map(([x,y,r],index)=><text className="all-stamp" x={x} y={y} transform={`rotate(${r} ${x} ${y})`} key={index}>ALL</text>)}<path className="map-pin" d="M170 118c-20 0-32 16-32 33 0 23 32 50 32 50s32-27 32-50c0-17-12-33-32-33Z" /><circle className="pin-hole" cx="170" cy="151" r="9" />
  </Frame>
  if (id === 279) return <Frame id={id} label="An exceptionally long story scroll is cut by scissors into one very short final strip">
    <path className="long-scroll" d="M23 51h269v94H23c21-25 21-69 0-94Z" /><path className="story-lines" d="M54 76h209M54 98h226M54 120h194" /><path className="scroll-cut" d="M238 38v121" /><g className="story-scissors" transform="translate(239 178)"><circle cx="-13" cy="15" r="12" /><circle cx="13" cy="15" r="12" /><path d="m-8 5 39-45M8 5l-39-45" /></g><path className="short-strip" d="M266 171h54v31h-54Z" /><path className="short-line" d="M276 186h34" />
  </Frame>
  if (id === 280) return <Frame id={id} label="The same old photograph appears again and again around a circular timeline arrow">
    <path className="history-loop" d="M81 190c-54-75 10-163 91-153 76 9 113 99 64 158m-17-3 20 7 7-21" />{[[72,112,-13],[166,51,4],[245,129,14],[153,166,-5]].map(([x,y,r],index)=><g className="history-photo" transform={`translate(${x} ${y}) rotate(${r})`} key={index}><rect x="-37" y="-31" width="74" height="62" rx="4" /><circle cx="-13" cy="-6" r="9" /><path d="M-31 20-9 1 5 13 19-4 31 20Z" /></g>)}
  </Frame>
  if (id === 281) return <Frame id={id} label="A professional briefcase is only half constructed, with its unfinished side remaining as a dashed blueprint">
    <path className="briefcase-solid" d="M40 92h132v108H40Z" /><path className="briefcase-handle-solid" d="M80 92V62h84v30" /><path className="briefcase-blueprint" d="M172 92h128v108H172Zm0 48h128M220 92V62h52v30" /><path className="briefcase-clasp" d="M146 130h26v29h-26" /><path className="loose-parts" d="m274 218 18-10m-4 20 18-11m-40-4 7 14" />
  </Frame>
  if (id === 282) return <Frame id={id} label="Four interlocking puzzle pieces, each marked 2, are being snapped together into one complete square">
    <g className="two-pieces">{[[93,76,-5],[179,72,4],[96,151,3],[181,150,-3]].map(([x,y,r],index)=><g transform={`translate(${x} ${y}) rotate(${r})`} key={index}><path d="M-39-34h28c-5 20 25 20 20 0h30v28c-20-5-20 25 0 20v31H9c5-20-25-20-20 0h-28V14c20 5 20-25 0-20Z" /><text x="0" y="12">2</text></g>)}</g><path className="piece-arrows" d="M36 63 61 77m243-13-26 14M38 195l27-16m237 17-28-17" />
  </Frame>
  if (id === 283) return <Frame id={id} label="A conveyor carries one different object directly after another in a continuous sequence">
    <path className="conveyor-belt" d="M30 166h280v38H30Z" /><circle className="belt-wheel" cx="61" cy="185" r="15" /><circle className="belt-wheel" cx="279" cy="185" r="15" /><g className="conveyor-things"><circle cx="65" cy="127" r="24" /><path d="M119 151v-48h53v48Z" /><path d="m220 100 28 51h-56Z" /><path d="m270 151 29-49 29 49Z" /></g><path className="conveyor-arrow" d="M102 224h134m-17-13 18 13-18 13" />
  </Frame>
  if (id === 284) return <Frame id={id} label="A row of laughing faces ends with one final spotlighted laugh">
    {[55,105,155].map(x=><g className="laugh-face" transform={`translate(${x} 119)`} key={x}><circle r="27" /><path d="M-12-5h4m12 0h4M-13 8q13 18 26 0" /></g>)}<path className="laugh-finish" d="M199 44v153" /><g className="last-laugh" transform="translate(260 119)"><circle r="44" /><path d="M-18-8h7m16 0h7M-22 10q22 28 44 0" /></g><path className="laugh-rays" d="M260 53V27m-54 43-18-18m126 18 18-18m-126 116-18 18m126-18 18 18" />
  </Frame>
  if (id === 285) return <Frame id={id} label="A miniature theatre performance takes place directly on the open pages of a dictionary">
    <path className="word-book-page" d="M25 105c53-22 104-14 145 16v96c-44-27-94-34-145-17Z" /><path className="word-book-page" d="M315 105c-53-22-104-14-145 16v96c44-27 94-34 145-17Z" /><path className="word-book-lines" d="M46 137h92m-92 20h78m78-20h92m-78 20h78" /><path className="word-stage" d="M91 102h158V53H91Z" /><path className="stage-curtain" d="M91 53c24 19 47 20 79 4 32 16 55 15 79-4v49H91Z" /><g className="stage-players"><circle cx="146" cy="78" r="8" /><path d="M146 86v25m0-15-15 10m15-10 15 10" /><circle cx="195" cy="78" r="8" /><path d="M195 86v25m0-15-15 10m15-10 15 10" /></g>
  </Frame>
  if (id === 286) return <Frame id={id} label="Two quotation cards display exactly the same line-by-line message with a one-for-one match between them">
    <g className="matching-quote left-quote"><rect x="28" y="54" width="123" height="133" rx="16" /><text x="45" y="90">“</text><path d="M53 111h72M53 132h83M53 153h66" /></g><g className="matching-quote right-quote"><rect x="189" y="54" width="123" height="133" rx="16" /><text x="206" y="90">“</text><path d="M214 111h72M214 132h83M214 153h66" /></g><path className="quote-match" d="M157 91h26m-26 21h26m-26 21h26m-26 21h26" />
  </Frame>
  if (id === 287) return <Frame id={id} label="Letter tiles wander through a confusing map while a person is left with an empty speech bubble">
    <path className="lost-map" d="M129 39h184v164H129Z" /><path className="lost-route" d="M143 177c19-53 58 13 78-45 16-47 53-14 76-71" /><g className="lost-letters">{[['W',160,159],['O',201,111],['R',246,137],['D',276,75],['S',185,63]].map(([letter,x,y])=><g transform={`translate(${x} ${y})`} key={String(letter)}><rect x="-14" y="-16" width="28" height="32" rx="5" /><text y="8">{letter}</text></g>)}</g><g className="speechless-person"><circle cx="62" cy="125" r="18" /><path d="M62 143v55m0-32-27 19m27-19 27 19" /></g><path className="empty-speech" d="M24 41h94v62H62l-20 18 5-18H24Z" />
  </Frame>
  if (id === 288) return <Frame id={id} label="A brain carefully hovers in the dangerous space between two railway platforms">
    <path className="gap-platform left-platform" d="M0 70h125v146H0Z" /><path className="gap-platform right-platform" d="M215 70h125v146H215Z" /><path className="platform-edge" d="M0 72h125m90 0h125" /><path className="gap-rails" d="M145 58v177m50-177v177" /><path className="gap-brain" d="M139 111c-15-20 3-42 24-36 10-18 37-11 38 9 21 3 25 31 8 42 9 21-14 38-31 27-15 17-43 2-35-20-14-4-17-16-4-22Z" /><path className="mind-arrows" d="m111 115 25 11-25 11m118-22-25 11 25 11" />
  </Frame>
  if (id === 289) return <Frame id={id} label="A racing briefcase crosses the finish line before a beach ball, cocktail and deckchair">
    <path className="priority-finish" d="M203 24v194" /><path className="finish-checker" d="M203 32h18v18h-18m18 0h18v18h-18m-18 18h18v18h-18m18 0h18v18h-18m-18 18h18v18h-18m18 0h18v18h-18" /><g className="racing-business"><rect x="126" y="94" width="60" height="53" rx="6" /><path d="M143 94V78h26v16m-68 54h80" /><circle cx="139" cy="154" r="7" /><circle cx="174" cy="154" r="7" /></g><g className="trailing-pleasure"><circle cx="284" cy="161" r="29" /><path d="M264 142 304 181m0-39-40 39M267 79h38l-19 35Z" /><path d="M286 114v22" /></g><path className="race-motion-lines" d="M49 103h61m-72 24h72m-55 24h55" />
  </Frame>
  if (id === 290) return <Frame id={id} label="A diverse group of passengers are crowded together inside one single boat">
    <path className="same-boat-hull" d="M36 139h268l-38 67H76Z" /><path className="same-boat-rim" d="M27 139h286" /><g className="boat-crowd">{[[81,112,'#ffd365'],[126,101,'#ef6a62'],[170,111,'#2cb1a6'],[214,99,'#8b6bb1'],[259,112,'#64a6c4']].map(([x,y,color],index)=><g transform={`translate(${x} ${y})`} style={{'--passenger-colour':color} as CSSProperties} key={index}><circle cy="-22" r="14" /><path d="M0-8v44m0-25-21 18m21-18 21 18" /></g>)}</g><path className="same-water" d="M14 219c24-15 48 15 72 0s48 15 72 0 48 15 72 0 48 15 72 0 24 0 24 0" />
  </Frame>
  if (id === 291) return <Frame id={id} label="A huge boulder lands in one side of a small boat, violently rocking it off balance">
    <path className="rockboat-water" d="M5 193c27-17 54 17 81 0s54 17 81 0 54 17 81 0 54 17 81 0" /><g className="rocked-boat" transform="rotate(-12 171 147)"><path d="M54 120h236l-42 77H94Z" /><path d="M45 120h254" /><circle className="boat-rock" cx="100" cy="82" r="48" /><path className="rock-cracks" d="m73 65 20 12-9 19m34-46-7 22 19 13" /></g><path className="rock-motion" d="M78 24 92 42m49-27-8 22" />
  </Frame>
  if (id === 292) return <Frame id={id} label="A traveller reaches an empty jetty too late while the boat is already sailing far away">
    <path className="miss-water" d="M0 161h340v79H0Z" /><path className="miss-jetty" d="M0 132h143v29H0Zm94 29v65m34-65v65" /><g className="miss-person"><circle cx="72" cy="86" r="16" /><path d="M72 102v61m0-35-30 18m30-18 30 12m-30 23-25 43m25-43 24 43" /></g><g className="departing-boat"><path d="M219 129h100l-22 39h-58Z" /><path d="M267 129V70l37 35h-37" /></g><path className="departure-lines" d="M186 105h43m-54 19h46" />
  </Frame>
  if (id === 293) return <Frame id={id} label="A hand presses a wave-making machine that turns perfectly calm water into large rolling waves">
    <path className="calm-water" d="M20 156h112" /><path className="made-waves" d="M135 156c21-37 42-37 63 0s42 37 63 0 42-37 63 0" /><rect className="wave-machine" x="108" y="81" width="64" height="64" rx="12" /><circle className="wave-button" cx="140" cy="113" r="16" /><path className="maker-hand" d="M140 14v77m-16-57 16-20 16 20" /><path className="wave-arrows" d="m192 98 20 15-20 15" />
  </Frame>
  if (id === 294) return <Frame id={id} label="At a fork in the water, one figure swims at the surface while another weight sinks downward">
    <path className="choice-water" d="M0 102h340" /><g className="swim-choice"><circle cx="87" cy="77" r="15" /><path d="M102 84c25 8 40 3 55-12m-43 18-24 22m-3-13-28 10" /></g><g className="sink-choice"><path d="M242 79h48l13 38h-74Z" /><path d="M266 117v93m-15-18 15 18 15-18" /></g><path className="choice-divider" d="M170 35v171" /><circle className="choice-dot" cx="170" cy="102" r="10" />
  </Frame>
  if (id === 295) return <Frame id={id} label="A cautious hand dips a scientific test strip and thermometer into the edge of unknown water">
    <path className="tested-water" d="M0 142c35-19 70 19 105 0s70 19 105 0 70 19 105 0" /><path className="testing-hand" d="M36 39c32-9 55 4 70 25l34 48-25 19-40-39-49 6Z" /><path className="test-strip" d="m119 83 31 113" /><path className="test-marks" d="m136 143 13-4m-9 18 13-4m-9 18 13-4" /><path className="water-thermometer" d="M221 44v101m0 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36Zm0-4V83" /><path className="water-question" d="M278 65c0-23 39-23 39 0 0 18-20 16-20 34m0 17v3" />
  </Frame>
  if (id === 296) return <Frame id={id} label="A small boat travels in exactly the same direction and rhythm as a strong river current">
    <path className="flow-river" d="M0 62c64 24 86-24 150 0s86-24 150 0 40 10 40 10M0 121c64 24 86-24 150 0s86-24 150 0 40 10 40 10M0 180c64 24 86-24 150 0s86-24 150 0 40 10 40 10" /><g className="flow-boat"><path d="M105 112h126l-26 45h-75Z" /><path d="M167 112V67l38 31h-38" /></g><path className="flow-direction" d="M62 217h219m-22-15 23 15-23 15" />
  </Frame>
  if (id === 297) return <Frame id={id} label="Only a struggling swimmer's head remains safely above a dangerously high waterline">
    <path className="high-water" d="M0 116h340v124H0Z" /><path className="high-wave" d="M0 116c28-18 56 18 84 0s56 18 84 0 56 18 84 0 56 18 84 0" /><g className="above-head"><circle cx="170" cy="91" r="31" /><path d="M151 88h5m28 0h5m-29 17q10 9 20 0" /><path className="wet-hair" d="M143 76c12-32 54-31 62 3-13-6-21-4-31 3-9-8-19-10-31-6Z" /></g><path className="treading-arms" d="M81 152c40-30 58-24 89-9m89 9c-40-30-58-24-89-9" />
  </Frame>
  if (id === 298) return <Frame id={id} label="A worried person is submerged waist-deep inside a steaming pool of glowing hot water">
    <path className="hot-water-pool" d="M25 105h290v104c-75 25-215 25-290 0Z" /><path className="hot-water-line" d="M25 105c32-18 64 18 96 0s64 18 96 0 64 18 96 0" /><g className="hot-water-person"><circle cx="170" cy="91" r="25" /><path d="M170 116v67m0-40-41 20m41-20 41 20" /><path d="M157 86h5m16 0h5m-25 18q12-10 24 0" /></g><path className="steam-lines" d="M93 78c-14-19 12-25-1-45m78 39c-14-19 12-25-1-45m78 51c-14-19 12-25-1-45" />
  </Frame>
  if (id === 299) return <Frame id={id} label="A battered weather vane remains standing through violent wind, rain and lightning until clear sky appears">
    <path className="storm-cloud-wide" d="M20 69c4-34 36-46 62-29 17-33 66-25 72 12 37-12 63 30 42 57H43C27 109 16 91 20 69Z" /><path className="storm-rain" d="m48 120-12 26m42-26-12 26m42-26-12 26m42-26-12 26" /><path className="storm-bolt" d="m172 106-24 46h22l-11 38 42-57h-23l18-27Z" /><path className="weather-vane" d="M238 55v164m-35 0h70M200 86h76m-76 0 20-16v32Zm76 0-20-16v32Z" /><circle className="clearing-sun" cx="294" cy="43" r="25" /><path className="sun-rays" d="M294 5v17m0 42v17m-38-38h17m42 0h17m-65-27 12 12m30 30 12 12m0-54-12 12m-30 30-12 12" />
  </Frame>
  if (id === 300) return <Frame id={id} label="A person's enormous tears merge beneath their face and become a winding river through the landscape">
    <g className="crying-face"><circle cx="94" cy="75" r="51" /><circle cx="77" cy="67" r="4" /><circle cx="111" cy="67" r="4" /><path d="M77 98q17-18 34 0" /></g><path className="tear-river" d="M77 78c-12 42 21 53 4 86-13 26-42 36-48 76m78-162c15 43-14 58 7 88 17 24 57 29 65 74" /><path className="river-merge" d="M33 240c52-36 99-45 150 0" /><path className="river-banks" d="M0 212c18-8 38-6 55 1m104-2c59-17 117-13 181 9" /><path className="river-tree" d="M255 181v43m0-30-23-18m23 10 22-20" />
  </Frame>
  if (id === 301) return <Frame id={id} label="One nearly black horse steps from deep shadow while a row of bright horses remains fully visible">
    <path className="horse-shadow" d="M181 0h159v240H181Z" />{[[52,'#dfb05c'],[119,'#e8e3cf'],[207,'#172a35'],[280,'#cf8154']].map(([x,color],index)=><g className={`horse-silhouette horse-${index}`} transform={`translate(${x} 71)`} style={{'--horse-colour':color} as CSSProperties} key={index}><path d="M-24 23c5-26 22-42 45-38l20 5 15-20 9 28-15 23 5 70H33l-5-48-29 2-4 46h-22l3-68Z" /><circle cx="42" cy="1" r="3" /></g>)}<path className="dark-spotlight" d="M196 12 177 220h101L229 12Z" />
  </Frame>
  if (id === 302) return <Frame id={id} label="A powerful bull charges at full speed toward a solid closed farm gate">
    <g className="charging-bull"><path d="M50 113c10-38 74-42 95-9l31 49-32 25-28-30H67l-15 45H28l12-55-20-12Z" /><path className="bull-horns" d="M54 107C34 81 21 84 13 101m124 4c19-27 34-23 41-5" /><circle cx="116" cy="112" r="4" /></g><path className="bull-speed" d="M7 73h49M1 94h39m-31 23h29" /><g className="closed-gate"><path d="M221 45v171m101-171v171M211 216h121M221 73h101m-101 61h101m-101 61h101M225 75l93 58-93 60m93-118-93 58 93 60" /></g><path className="impact-lines" d="m193 102 15-13m-11 34 18-3m-18 27 16 11" />
  </Frame>
  if (id === 303) return <Frame id={id} label="Two large animal horns are tightly interlocked and secured at their crossing by a padlock">
    <path className="left-horn" d="M23 64c25 84 71 121 148 89-59-6-89-38-91-101Z" /><path className="right-horn" d="M317 64c-25 84-71 121-148 89 59-6 89-38 91-101Z" /><path className="horn-ridges" d="m57 94 31-15m-14 40 31-17m178-8-31-15m14 40-31-17" /><g className="horn-lock"><rect x="145" y="144" width="50" height="48" rx="8" /><path d="M156 144v-16c0-20 28-20 28 0v16" /><circle cx="170" cy="166" r="5" /></g>
  </Frame>
  if (id === 304) return <Frame id={id} label="A crowned lion rules from the highest rock above dense jungle foliage">
    <path className="jungle-foliage" d="M0 187c25-45 57-42 79-8 15-54 66-49 85-8 28-48 77-39 88 8 28-34 66-23 88 8v53H0Z" /><path className="king-rock" d="M88 213 126 89h93l42 124Z" /><g className="lion-king"><circle cx="171" cy="93" r="52" /><circle className="lion-face" cx="171" cy="93" r="34" /><circle className="lion-eye" cx="159" cy="86" r="4" /><circle className="lion-eye" cx="183" cy="86" r="4" /><path className="lion-muzzle" d="M158 105q13 14 26 0" /><path className="lion-crown" d="m139 45 15-28 17 24 18-25 14 29Z" /></g><path className="jungle-vines" d="M31 209c20-25 35-10 43 13m230-13c-20-25-35-10-43 13" />
  </Frame>
  if (id === 305) return <Frame id={id} label="One bee follows a perfectly straight measured flight line while every other bee loops and wanders">
    <path className="wandering-flight" d="M30 54c45-39 63 46 104 4m104 120c38-49 64 29 89-10" /><path className="bee-straight-line" d="M39 128h252m-18-14 19 14-19 14" />{[[42,128,0],[89,50,22],[281,179,-18]].map(([x,y,r],index)=><g className={`flight-bee bee-${index}`} transform={`translate(${x} ${y}) rotate(${r})`} key={index}><ellipse rx="18" ry="12" /><path d="M-8-11v22M2-12v24" /><ellipse className="flight-wing" cx="-10" cy="-16" rx="11" ry="7" /><ellipse className="flight-wing" cx="10" cy="-16" rx="11" ry="7" /></g>)}<path className="flight-ruler" d="M39 154h252m-230 0v11m23-11v7m23-7v11m23-11v7m23-7v11m23-11v7m23-7v11m23-11v7m23-7v11" />
  </Frame>
  if (id === 306) return <Frame id={id} label="A person stands beneath a clear protective dome while every fly is repelled away from them">
    <path className="fly-dome" d="M78 196c0-103 43-157 92-157s92 54 92 157Z" /><g className="fly-free-person"><circle cx="170" cy="101" r="21" /><path d="M170 122v63m0-40-38 24m38-24 38 24" /></g>{[[43,80,-20],[292,76,18],[38,161,8],[303,163,-12]].map(([x,y,r],index)=><g className="repelled-fly" transform={`translate(${x} ${y}) rotate(${r})`} key={index}><ellipse rx="9" ry="6" /><ellipse cx="-7" cy="-8" rx="7" ry="4" /><ellipse cx="7" cy="-8" rx="7" ry="4" /><path d="M12 0h17m-5-7 7 7-7 7" /></g>)}<path className="dome-base" d="M63 196h214" />
  </Frame>
  if (id === 307) return <Frame id={id} label="A butterfly moves through and connects every person in a lively social circle">
    <path className="social-ring" d="M170 32c79 0 130 48 130 88s-51 88-130 88S40 160 40 120 91 32 170 32Z" />{[[170,29],[270,72],[286,156],[170,211],[54,156],[70,72]].map(([x,y],index)=><g className="social-person" transform={`translate(${x} ${y})`} key={index}><circle cy="-8" r="10" /><path d="M0 2v28m0-17-16 11m16-11 16 11" /></g>)}<g className="social-butterfly" transform="translate(170 120)"><ellipse cx="-25" cy="-18" rx="29" ry="22" transform="rotate(25 -25 -18)" /><ellipse cx="25" cy="-18" rx="29" ry="22" transform="rotate(-25 25 -18)" /><ellipse cx="-21" cy="23" rx="23" ry="19" transform="rotate(-22 -21 23)" /><ellipse cx="21" cy="23" rx="23" ry="19" transform="rotate(22 21 23)" /><path d="M0-24v57m0-50-15-16m15 16 15-16" /></g><path className="social-links" d="M170 86V43m43 57 45-22m-46 63 55 14m-97 20v25m-42-59-56 14m55-55L81 78" />
  </Frame>
  if (id === 308) return <Frame id={id} label="A person is left holding the visibly short end of a divided wooden stick">
    <path className="long-stick" d="M40 82 285 145" /><path className="stick-break" d="m216 121 12 22 15-14" /><path className="short-stick" d="m229 139 64 17" /><g className="stick-person"><circle cx="285" cy="77" r="15" /><path d="M285 92v62m0-34-45 20m45-20 27 27m-27 7-23 59m23-59 26 59" /></g><circle className="stick-hand" cx="241" cy="140" r="8" />
  </Frame>
  if (id === 309) return <Frame id={id} label="A long complicated report is compressed into one tiny summary scroll tucked inside a walnut shell">
    <path className="nutshell-left" d="M31 128c0-72 58-111 139-98v180C89 227 31 197 31 128Z" /><path className="nutshell-right" d="M309 128c0-72-58-111-139-98v180c81 17 139-13 139-82Z" /><path className="nut-ridges" d="M62 89c36 23 49 73 18 112m198-112c-36 23-49 73-18 112M93 53c30 42 31 110 0 158m154-158c-30 42-31 110 0 158" /><g className="summary-scroll"><path d="M112 82h116v88H112c14-24 14-64 0-88Z" /><path d="M137 106h67m-67 19h73m-73 19h48" /></g><path className="compress-arrows" d="M84 125h34m-15-13 15 13-15 13m153-13h-34m15-13-15 13 15 13" />
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
