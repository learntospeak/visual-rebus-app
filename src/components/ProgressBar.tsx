interface ProgressBarProps {
  value: number
  max: number
  compact?: boolean
  label?: string
}

export function ProgressBar({ value, max, compact = false, label }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  return (
    <div
      className={compact ? 'mini-track' : 'progress-track'}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <span style={{ width: `${percent}%` }} />
    </div>
  )
}
