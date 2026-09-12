import { useState, type ReactNode } from 'react'
import './OwnerReviewedArt.css'

// Artwork and labels share one SVG coordinate system, including when letterboxed.
const sources: Record<number, string> = {
  43: 'owner-043-v1.webp', 65: 'owner-065-v1.webp', 67: 'owner-067-v1.webp',
  143: 'red-herring-143.webp', 148: 'owner-148-v1.webp', 172: 'premium-172-v2.webp',
  234: 'premium-234-v2.webp', 235: 'premium-235-v2.webp', 251: 'premium-251-v3.png',
  281: 'premium-281-v2.webp', 283: 'premium-283-v2.webp', 285: 'owner-285-v1.webp',
  286: 'owner-286-v1.webp', 288: 'owner-288-v1.webp', 289: 'owner-289-v1.webp',
  294: 'owner-294-v1.webp', 296: 'owner-296-v1.webp', 320: 'owner-320-v1.webp',
  321: 'owner-321-v1.webp', 328: 'premium-328-v2.webp', 333: 'owner-333-v1.webp',
  335: 'premium-335-v2.webp', 337: 'premium-337-v2.webp', 343: 'owner-343-v1.webp',
  350: 'owner-350-v1.webp', 449: 'premium-449-world-equation-v2.webp', 450: 'owner-450-v1.webp',
}
const descriptions: Record<number, string> = {
  43: 'DOWN descends towards a fully visible globe.', 65: 'A joyful person steps along floating pairs of oxygen atoms.',
  67: 'A gold 2 stands directly beside NONE.', 143: 'A red herring, fully visible within the frame.',
  148: 'An open window reveals a golden key while an hourglass runs down.',
  154: 'ACT rests on a level beam in contact with the point of a triangular pivot.',
  172: 'CASE sits above an open suitcase.', 234: 'A pencil poised over a completely blank sheet of paper.',
  235: 'Letters surround blank slots. Tap to fill the empty slots.',
  251: 'Every cell of the calendar reads SUN.', 281: 'BUSINE has two empty spaces; two S tiles sit below. Tap to complete it.',
  283: 'Three THING plaques recede one after another.', 285: 'Actors perform a play while standing on jumbled letter sculptures.',
  286: 'Two speech bubbles contain matching words, connected by an equals sign.',
  288: 'A brain sits in a gap between two ledges. Tap to make people skip across.',
  289: 'A work desk comes before a relaxing holiday scene along a path.',
  294: 'A swimmer above a submerged stainless steel kitchen sink hanging on a chain.',
  296: 'A person floats on a stream. Tap to drift downstream.',
  320: 'A hammer hangs above a porcelain handshake. Tap to strike and shatter it.',
  321: 'A cape covers cupped hands at sunset. Tap to reveal the sun held between the hands.',
  328: 'One calendar day is marked in red.', 333: 'A shy person-shaped sculpture with two bite-shaped pieces missing.',
  335: 'CHANCE fits inside a very narrow opening.', 337: 'Odd numbers sit at the ends of a central END plaque.',
  343: 'A complete prosthetic arm and leg beside a cash register showing a huge price.',
  350: 'A person trips and hurts their knee while someone nearby points and laughs. Tap to play the scene.',
  411: 'A switch marked MUST controls SHOW. Tap it and watch where SHOW moves.',
  449: 'A teacher points to x minus y equals world on a chalkboard.',
  450: 'An END marker is crossed out beside a clearly recognisable planet Earth.',
}
const toggles = new Set([235,281,321,411])
const interactive = new Set([235, 281, 288, 296, 320, 321, 350, 411])
export function hasOwnerReviewedArt(id: number) { return id in descriptions }

function Label({ x, y, children, size = 36, fill = '#f3d88c' }: { x: number; y: number; children: ReactNode; size?: number; fill?: string }) {
  return <text x={x} y={y} fontSize={size} fill={fill} textAnchor="middle" dominantBaseline="central" fontFamily="Georgia, serif" fontWeight="bold">{children}</text>
}

export function OwnerReviewedArt({ id }: { id: number }) {
  const [active, setActive] = useState(false)
  const [cycle, setCycle] = useState(0)
  const width = id === 449 ? 1200 : 900
  const height = id === 449 ? 800 : 900
  const image = sources[id] && <image href={`/${sources[id]}`} x={id === 143 ? 135 : 0} y={id === 143 ? 135 : 0} width={id === 143 ? 630 : width} height={id === 143 ? 630 : height} preserveAspectRatio="xMidYMid meet" />
  const content = <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    {image}
    {id === 288 && <g key={cycle} className={cycle ? 'owner-skip-sequence playing' : 'owner-skip-sequence'}>
      <image className="owner-skipper first" href="/owner-skipper-v1.webp" x="160" y="116" width="165" height="235" />
      <image className="owner-skipper second" href="/owner-skipper-v1.webp" x="38" y="126" width="155" height="220" />
    </g>}
    {id === 296 && <g key={cycle} className={cycle ? 'owner-drift playing' : 'owner-drift'}><ellipse cx="368" cy="425" rx="143" ry="57" fill="none" stroke="#d8fbf6" strokeWidth="4" opacity=".5"/><image href="/owner-floater-v1.webp" x="208" y="308" width="310" height="230" /></g>}
    {id === 320 && <g key={cycle} className={cycle ? 'owner-strike playing' : 'owner-strike'}>
      <image className="owner-broken" href="/owner-320-broken-v1.webp" width="900" height="900" />
      <g className="owner-shards">{Array.from({length:9},(_,i)=><path key={i} d="M-9-10 13-3 4 16Z" fill="#f6e6cc" style={{transform:`translate(${400+i%3*45}px,${460+Math.floor(i/3)*40}px)`}} />)}</g>
      <image className="owner-hammer" href="/owner-hammer-v1.webp" x="340" y="10" width="420" height="330" />
    </g>}
    {id === 321 && <image className="owner-cape" href="/owner-cape-v1.webp" x="102" y="235" width="696" height="670" style={{transform:active?'translateY(-850px) rotate(-8deg)':undefined}} />}
    {id === 350 && <g key={cycle} className={cycle ? 'owner-fall-sequence playing' : 'owner-fall-sequence'}><image className="owner-fall" href="/owner-350-fall-v1.webp" width="900" height="900"/><image className="owner-laugh" href="/owner-350-laugh-v1.webp" width="900" height="900" /></g>}
    {id === 154 && <><path d="M450 480 350 700H550Z" fill="#c78542" stroke="#f0d58c" strokeWidth="9"/><rect x="160" y="445" width="580" height="35" rx="10" fill="#d7b36e"/><Label x={450} y={388} size={130}>ACT</Label></>}
    {id === 235 && <>{['B','L','','','N','K','S'].map((l,i)=><Label key={i} x={147+i*101} y={383} size={48}>{l}</Label>)}{active && <><rect x="320" y="348" width="62" height="70" rx="5" fill="#ead092"/><rect x="420" y="348" width="62" height="70" rx="5" fill="#ead092"/></>}</>}

    {id === 251 && <><Label x={450} y={182} size={43} fill="#29483b">FEBRUARY</Label>{['S','M','T','W','T','F','S'].map((d,i)=><Label key={i} x={103+i*115.5} y={293} size={26} fill="#29483b">{d}</Label>)}{Array.from({length:28},(_,i)=><Label key={i} x={103+i%7*115.5} y={381+Math.floor(i/7)*109} size={27} fill="#29483b">SUN</Label>)}</>}
    {id === 281 && <>{'BUSINE'.split('').map((l,i)=><Label key={i} x={170+i*80} y={425} size={48}>{l}</Label>)}<g className="owner-loose-letter" style={{transform: active ? 'translate(-25px,-148px)' : undefined}}><Label x={675} y={573} size={48}>S</Label></g><g className="owner-loose-letter" style={{transform: active ? 'translate(-45px,-157px)' : undefined}}><Label x={775} y={582} size={48}>S</Label></g></>}
    {id === 283 && <><Label x={450} y={588} size={62}>THING</Label><Label x={450} y={375} size={36}>THING</Label><Label x={450} y={282} size={22}>THING</Label></>}
    {id === 328 && ['MON','TUE','WED','THU','DAY','SAT','SUN'].map((d,i)=><Label key={d} x={130+i*107} y={430} size={29} fill={i===4?'#fff3d4':'#364c42'}>{d}</Label>)}
    {id === 335 && 'CHANCE'.split('').map((letter,i)=><Label key={i} x={450} y={300+i*52} size={42}>{letter}</Label>)}
    {id === 337 && <>{[1,3,5,7,9].map((n,i)=><Label key={n} x={[87,172,255,721,807][i]} y={397} size={47} fill="#31483e">{n}</Label>)}<Label x={468} y={397} size={54}>END</Label></>}
    {id === 449 && <Label x={840} y={204} size={57} fill="#eeeede">x − y = world</Label>}
    {id === 411 && <><rect x="0" y="0" width="900" height="900" fill="#0b2825"/><rect x="95" y="190" width="520" height="510" rx="28" fill="#123d36" stroke="#bd9955" strokeWidth="8"/><Label x={350} y={587} size={94} fill={active ? "#c3d7c2" : "#304e45"}>ON</Label><g className="owner-show" style={{transform: active?'translateY(170px)':undefined}}><Label x={350} y={285} size={110}>SHOW</Label></g><Label x={745} y={325} size={48}>MUST</Label><rect x="690" y="380" width="105" height="185" rx="35" fill="#071d19" stroke="#d0ad64" strokeWidth="7"/><rect className="owner-switch" x="705" y={active?398:475} width="75" height="65" rx="16" fill={active?'#8cd2ba':'#d9bc7b'}/></>}
  </svg>
  function activate() { setActive(v=>!v); setCycle(v=>v+1) }
  return interactive.has(id)
    ? <button type="button" className={`puzzle-visual owner-reviewed-art owner-art-${id}${active?' is-active':''}`} onClick={activate} aria-label={descriptions[id]} aria-pressed={toggles.has(id) ? active : undefined} data-cycle={cycle}>{content}</button>
    : <div className={`puzzle-visual owner-reviewed-art owner-art-${id}`} role="img" aria-label={descriptions[id]}>{content}</div>
}
