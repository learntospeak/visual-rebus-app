import React from 'react'

const premiumTextPuzzleIds = new Set([282, 283, 284, 286, 287])

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

  return null
}
