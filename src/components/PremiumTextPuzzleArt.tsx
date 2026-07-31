import React from 'react'

const premiumTextPuzzleIds = new Set([
  282, 283, 284, 286, 287,
  320, 321, 328, 333, 334, 335, 336, 337, 338, 340, 350,
])

export function hasPremiumTextPuzzleArt(id: number) {
  return premiumTextPuzzleIds.has(id)
}

export function PremiumTextPuzzleArt({ id }: { id: number }) {
  if (id === 282) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-282" role="img" aria-label="Two separate twos are brought together into one pair">
      <div className="premium-two-start"><b>2</b><b>2</b></div>
      <div className="premium-inward-arrows" aria-hidden="true"><span>↘</span><span>↙</span></div>
      <div className="premium-two-finish"><b>2</b><b>2</b></div>
    </div>
  )

  if (id === 283) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-283" role="img" aria-label="One THING follows vertically after another THING">
      <b>THING</b><span aria-hidden="true">↓</span><b>THING</b><span aria-hidden="true">↓</span><b>THING</b>
    </div>
  )

  if (id === 284) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-284" role="img" aria-label="A row of laughs ends with one final strongly emphasised laugh">
      <div className="premium-laugh-row"><span>ha</span><span>ha</span><span>ha</span><strong>HA!</strong></div>
      <div className="premium-finish-line" aria-hidden="true" />
    </div>
  )

  if (id === 286) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-286" role="img" aria-label="WORD appears on either side of the number four">
      <span>WORD</span><b>4</b><span>WORD</span>
    </div>
  )

  if (id === 287) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-287" role="img" aria-label="The letters of WORDS have broken apart and become lost">
      <strong>WORDS</strong>
      <span className="premium-lost-arrow" aria-hidden="true">↓</span>
      <div className="premium-lost-letters" aria-hidden="true"><i>W</i><i>O</i><i>R</i><i>D</i><i>S</i></div>
      <b aria-hidden="true">?</b>
    </div>
  )

  if (id === 320) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-320" role="img" aria-label="The word DEAL is split by a jagged break">
      <span>DE</span><i aria-hidden="true">⚡</i><span>AL</span>
    </div>
  )

  if (id === 321) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-321" role="img" aria-label="BLESSING is concealed inside DISGUISE">
      <div className="premium-disguise-shell"><span>DIS</span><b>BLESSING</b><span>GUISE</span></div>
    </div>
  )

  if (id === 328) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-328" role="img" aria-label="One calendar day is formed from bright red letters">
      <div className="premium-calendar">
        <div className="premium-calendar-rings" aria-hidden="true"><i /><i /></div>
        <div className="premium-calendar-week" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
        <strong><i>D</i><i>A</i><i>Y</i></strong>
      </div>
    </div>
  )

  if (id === 333) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-333" role="img" aria-label="BITE appears once and is followed by SHY twice">
      <span className="premium-bitten-word">BITE</span>
      <i aria-hidden="true">→</i>
      <div><b>SHY</b><b>SHY</b></div>
    </div>
  )

  if (id === 334) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-334" role="img" aria-label="The word CHANCE is unusually wide and heavy">CHANCE</div>
  )

  if (id === 335) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-335" role="img" aria-label="The word CHANCE is unusually thin and narrow">CHANCE</div>
  )

  if (id === 336) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-336" role="img" aria-label="AGAINST stands across all the odd numbers">
      <div aria-hidden="true"><span>1</span><span>3</span><span>5</span><span>7</span><span>9</span></div>
      <strong>AGAINST</strong>
    </div>
  )

  if (id === 337) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-337" role="img" aria-label="Odd numbers sit at both outer ends around two END blocks">
      <div className="premium-odd-end"><span>1</span><span>3</span></div>
      <div className="premium-end-pair"><b>END</b><b>END</b></div>
      <div className="premium-odd-end"><span>5</span><span>7</span></div>
    </div>
  )

  if (id === 338) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-338" role="img" aria-label="Sixes and sevens are mixed into a disorderly arrangement">
      <span>6</span><span>7</span><span>6</span><span>7</span><span>7</span><span>6</span><span>7</span><span>6</span>
    </div>
  )

  if (id === 340) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-340" role="img" aria-label="A single flawless golden ten is presented like an award">
      <span aria-hidden="true">✦</span><strong>10</strong><span aria-hidden="true">✦</span>
    </div>
  )

  if (id === 350) return (
    <div className="puzzle-visual premium-text-puzzle-art premium-text-350" role="img" aria-label="INSULT is added on top of INJURY">
      <div className="premium-addends"><span>INSULT</span><i>+</i><span>INJURY</span></div>
      <i aria-hidden="true">↓</i>
      <div className="premium-insult-stack"><b>INSULT</b><b>INJURY</b></div>
    </div>
  )

  return null
}
