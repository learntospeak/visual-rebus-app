import { playDailyStreakAccent, playHaptic, playSolveChime } from './audio'

interface SolveCelebrationOptions {
  soundEnabled: boolean
  hapticsEnabled: boolean
  reducedCelebrations: boolean
  daily: boolean
  onComplete: () => void
}

export function startSolveCelebration({ soundEnabled, hapticsEnabled, reducedCelebrations, daily, onComplete }: SolveCelebrationOptions) {
  if (soundEnabled) {
    if (daily) playDailyStreakAccent()
    else playSolveChime()
  }
  if (hapticsEnabled) playHaptic(daily ? 'streak' : 'success')
  const duration = reducedCelebrations ? 350 : 1650
  const timer = window.setTimeout(onComplete, duration)
  return () => window.clearTimeout(timer)
}
