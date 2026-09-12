import { useId } from 'react'

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
const point = (radius: number, angle: number) => `${200 + radius * Math.cos(angle * Math.PI / 180)},${200 + radius * Math.sin(angle * Math.PI / 180)}`

export function ChapterMedallion({ earned, highlight }: { earned: boolean[]; highlight?: number }) {
  const id = useId().replace(/:/g, '')
  const master = earned.length === 10 && earned.every(Boolean)
  return <svg className="chapter-medallion" viewBox="0 0 400 400" role="img" aria-label={master ? 'Golden Clue Canvas Master medallion. All ten chapters earned.' : `${earned.filter(Boolean).length} of ten chapter pieces earned`}>
    <defs>
      <linearGradient id={`${id}-gold`} x2=".8" y2="1"><stop stopColor="#fff0b6"/><stop offset=".3" stopColor="#c39a43"/><stop offset=".55" stopColor="#f5dc8e"/><stop offset="1" stopColor="#97702c"/></linearGradient>
      <radialGradient id={`${id}-teal`}><stop stopColor="#327569"/><stop offset="1" stopColor="#103c35"/></radialGradient>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#173c33" floodOpacity=".2"/></filter>
    </defs>
    <g filter={`url(#${id}-shadow)`}>
      <circle cx="200" cy="200" r="180" fill={`url(#${id}-gold)`}/>
      <circle cx="200" cy="200" r="174" fill="#eee9da" stroke="#80662f"/>
      {numerals.map((numeral, index) => {
        const start = -108 + index * 36 + 1.5, end = start + 33
        const path = `M ${point(169, start)} A 169 169 0 0 1 ${point(169, end)} L ${point(111, end)} A 111 111 0 0 0 ${point(111, start)} Z`
        const [x,y] = point(141, start + 16.5).split(',').map(Number)
        return <g key={numeral} className={highlight === index ? 'medallion-new-piece' : undefined}>
          <path d={path} fill={earned[index] ? `url(#${id}-teal)` : '#e5e1d5'} stroke={earned[index] ? '#e5c776' : '#cbc6b8'} strokeWidth="2"/>
          <text x={x} y={y + 7} textAnchor="middle" fontFamily="Georgia, serif" fontSize="23" fill={earned[index] ? '#f3d78c' : '#78766d'}>{numeral}</text>
        </g>
      })}
      <circle cx="200" cy="200" r="105" fill={`url(#${id}-gold)`} stroke="#8c6d33" strokeWidth="2"/>
      <circle cx="200" cy="200" r="96" fill={master ? '#ead08b' : '#f1e5c6'} stroke="#b08b43"/>
      <g fill="none" stroke="#806226" strokeWidth="2.5">
        <path d="M175 253 Q137 236 147 185 M225 253 Q263 236 253 185"/>
        {[0,1,2,3].map(i => <g key={i} transform={`translate(0 ${-i*14})`}><path d="M148 237 Q128 230 136 219 Q150 219 148 237 M252 237 Q272 230 264 219 Q250 219 252 237" fill="#b28a3d"/></g>)}
      </g>
      <path d="M172 171 H193 C183 150 217 150 207 171 H229 V191 C250 181 250 215 229 205 V227 H207 C217 248 183 248 193 227 H172 V205 C151 215 151 181 172 191 Z" fill={`url(#${id}-teal)`} stroke="#a88035" strokeWidth="3"/>
      <text x="200" y="282" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" letterSpacing="2" fill="#735723">CLUE CANVAS</text>
      <path d="m200 117 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" fill="#97702c"/>
    </g>
  </svg>
}
