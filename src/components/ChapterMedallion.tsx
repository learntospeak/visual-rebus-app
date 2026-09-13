import { useId } from 'react'

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
const point = (radius: number, angle: number) => `${200 + radius * Math.cos(angle * Math.PI / 180)},${200 + radius * Math.sin(angle * Math.PI / 180)}`

export function ChapterMedallion({ earned, highlight }: { earned: boolean[]; highlight?: number }) {
  const id = useId().replace(/:/g, '')
  const master = earned.length === 10 && earned.every(Boolean)
  const asset = '/chapter-medallion-gold-v2.webp'
  return <svg className="chapter-medallion" viewBox="0 0 400 400" role="img" aria-label={master ? 'Golden Clue Canvas Master medallion. All ten chapters earned.' : `${earned.filter(Boolean).length} of ten chapter pieces earned`}>
    <defs>
      <clipPath id={`${id}-circle`}><circle cx="200" cy="200" r="193"/></clipPath>
      <filter id={`${id}-ivory`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values=".12 .24 .04 0 .59 .11 .22 .04 0 .57 .09 .18 .03 0 .49 0 0 0 1 0"/></filter>
      <filter id={`${id}-satin`}><feColorMatrix type="saturate" values=".65"/></filter>
      <linearGradient id={`${id}-letter`} x1="0" y1="0" x2="0.3" y2="1"><stop stopColor="#fffbe3"/><stop offset=".38" stopColor="#fff1b5"/><stop offset=".6" stopColor="#ce9f42"/><stop offset="1" stopColor="#ffedb5"/></linearGradient>
      {numerals.map((_, index) => {
        const start = -90 + index * 36
        return <clipPath key={index} id={`${id}-segment-${index}`}><path d={`M ${point(184,start)} A 184 184 0 0 1 ${point(184,start+36)} L ${point(120,start+36)} A 120 120 0 0 0 ${point(120,start)} Z`}/></clipPath>
      })}
      <clipPath id={`${id}-centre`}><circle cx="200" cy="200" r="109"/></clipPath>
    </defs>
    <g clipPath={`url(#${id}-circle)`}>
      <image href={asset} width="400" height="400"/>
      {!master && <image href={asset} width="400" height="400" clipPath={`url(#${id}-centre)`} filter={`url(#${id}-satin)`}/>}
      {numerals.map((numeral,index) => {
        const [x,y] = point(151,-72+index*36).split(',').map(Number)
        return <g key={numeral} className={highlight === index ? 'medallion-new-piece' : undefined}>
          {!earned[index] && <image href={asset} width="400" height="400" clipPath={`url(#${id}-segment-${index})`} filter={`url(#${id}-ivory)`}/>}
          <text x={x} y={y+8} textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fill={earned[index] ? `url(#${id}-letter)` : '#796540'} stroke={earned[index] ? '#61481b' : '#f4ebd7'} strokeWidth=".65" paintOrder="stroke">{numeral}</text>
        </g>
      })}
    </g>
  </svg>
}
