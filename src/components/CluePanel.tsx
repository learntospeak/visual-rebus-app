interface CluePanelProps {
  clueNumber: number
  clue: string
}

export function CluePanel({ clueNumber, clue }: CluePanelProps) {
  return (
    <aside className="clue-panel" aria-live="polite">
      <span className="eyebrow">CLUE {clueNumber}</span>
      <p>{clue}</p>
    </aside>
  )
}
