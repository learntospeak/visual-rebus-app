import { playHarpChime } from './audio'

interface SolveCelebrationOptions {
  soundEnabled: boolean
  reducedCelebrations: boolean
  onComplete: () => void
}

export function startSolveCelebration({ soundEnabled, reducedCelebrations, onComplete }: SolveCelebrationOptions) {
  if (soundEnabled) playHarpChime()
  const duration = reducedCelebrations ? 350 : 1650
  const timer = window.setTimeout(onComplete, duration)
  return () => window.clearTimeout(timer)
}
