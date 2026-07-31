import React from 'react'

const premiumWordPuzzleIds = new Set([
  401, 402, 403, 404, 405, 408, 409, 410, 411, 412, 413, 414,
  421, 422, 423, 424, 427, 429, 431, 433, 434, 437, 439,
  441, 442, 443, 444, 445, 446, 447, 449, 450,
])

export function hasPremiumWordPuzzleArt(id: number) {
  return premiumWordPuzzleIds.has(id)
}

function Art({ id, label, children }: { id: number; label: string; children: React.ReactNode }) {
  return <div className={`puzzle-visual premium-word-art premium-word-${id}`} role="img" aria-label={label}>{children}</div>
}

export function PremiumWordPuzzleArt({ id }: { id: number }) {
  if (id === 401) return <Art id={id} label="HIT rises into the underside of a roof"><b>HIT</b><i>↑</i><span className="word-roof" /></Art>
  if (id === 402) return <Art id={id} label="BREAK splits open fresh ground"><span>GRO</span><b>BREAK</b><span>UND</span></Art>
  if (id === 403) return <Art id={id} label="STAND is planted firmly on a ground line"><b>STAND</b><span className="word-ground" /></Art>
  if (id === 404) return <Art id={id} label="YOU and ME share COMMON ground"><span>YOU</span><b>COMMON</b><span>ME</span><i className="word-ground" /></Art>
  if (id === 405) return <Art id={id} label="KEEP holds EAR against the ground"><b>KEEP</b><span>EAR</span><i className="word-ground" /></Art>
  if (id === 408) return <Art id={id} label="A piece has fallen out of PLOT"><span>PL</span><i className="lost-letter">O</i><span>T</span></Art>
  if (id === 409) return <Art id={id} label="PLOT becomes thicker on every line"><span>PLOT</span><b>PLOT</b><strong>PLOT</strong></Art>
  if (id === 410) return <Art id={id} label="STEAL pulls SHOW away"><b>STEAL</b><i>←</i><span>SHOW</span></Art>
  if (id === 411) return <Art id={id} label="SHOW continues onward through ON"><b>SHOW</b><span>ON</span><span>ON</span><span>ON</span><i>→</i></Art>
  if (id === 412) return <Art id={id} label="BEHIND is hidden behind SCENES"><span className="behind-word">BEHIND</span><b>SCENES</b></Art>
  if (id === 413) return <Art id={id} label="CENTRE occupies the exact middle of STAGE"><span>ST</span><b>CENTRE</b><span>AGE</span></Art>
  if (id === 414) return <Art id={id} label="STAGE trembles with fright"><i>〰</i><b>STAGE</b><i>〰</i></Art>
  if (id === 421) return <Art id={id} label="BACK is pressed against a wall"><b>BACK</b><span className="word-wall" /></Art>
  if (id === 422) return <Art id={id} label="HIT crashes into a brick wall"><b>HIT</b><i>→</i><span className="brick-word-wall" /></Art>
  if (id === 423) return <Art id={id} label="OFF has moved away from the wall"><span className="word-wall" /><b>OFF</b></Art>
  if (id === 424) return <Art id={id} label="SOMEONE is driven upward along a wall"><span className="word-wall" /><b>SOMEONE</b><i>↑</i><em>DRIVE</em></Art>
  if (id === 427) return <Art id={id} label="MORE sits inside a giant EYE"><span className="word-eye"><b>MORE</b></span></Art>
  if (id === 429) return <Art id={id} label="SIGHT appears between SORE and EYES"><span>SORE</span><b>SIGHT</b><span>EYES</span></Art>
  if (id === 431) return <Art id={id} label="ACTIONS are much louder than words"><b>ACTIONS</b><span>words</span><span>words</span><span>words</span></Art>
  if (id === 433) return <Art id={id} label="WORD sits on top of STREET"><b>WORD</b><span>STREET</span></Art>
  if (id === 434) return <Art id={id} label="EAT is inside WORDS"><span>WOR</span><b>EAT</b><span>DS</span></Art>
  if (id === 437) return <Art id={id} label="FALL drops onto DEAF EARS"><b>FALL</b><i>↓</i><span>DEAF&nbsp;&nbsp;EARS</span></Art>
  if (id === 439) return <Art id={id} label="ALL is surrounded by EAR words"><span>EAR</span><span>EAR</span><b>ALL</b><span>EAR</span><span>EAR</span></Art>
  if (id === 441) return <Art id={id} label="HEAD and SHOULDERS stand far above REST"><b>HEAD<br />SHOULDERS</b><i>↑</i><span>REST&nbsp;&nbsp;REST&nbsp;&nbsp;REST</span></Art>
  if (id === 442) return <Art id={id} label="Two HEAD words are pressed together"><b>HEAD</b><b>HEAD</b></Art>
  if (id === 443) return <Art id={id} label="HEAD is held perfectly level"><span className="word-level"><i /></span><b>HEAD</b></Art>
  if (id === 444) return <Art id={id} label="A path travels from HEAD down to TOE"><b>HEAD</b><i>↓<br />↓<br />↓</i><span>TOE</span></Art>
  if (id === 445) return <Art id={id} label="THINK balances on two feet"><b>THINK</b><span>FOOT</span><span>FOOT</span></Art>
  if (id === 446) return <Art id={id} label="BEST sits between two WORLDS"><span>WORLD</span><b>BEST</b><span>WORLD</span></Art>
  if (id === 447) return <Art id={id} label="Two WORLDS are extremely far apart"><b>WORLD</b><b>WORLD</b></Art>
  if (id === 449) return <Art id={id} label="DIFFERENCE separates two WORLDS"><span>WORLD</span><b>DIFFERENCE</b><span>WORLD</span></Art>
  if (id === 450) return <Art id={id} label="END is cancelled but WORLD remains"><s>END</s><span>≠</span><b>WORLD</b></Art>
  return null
}
