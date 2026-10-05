export type MiniGameMode = 'odd' | 'memory' | 'next' | 'belong'

export const miniGames: { id: MiniGameMode; title: string; description: string }[] = [
  { id: 'odd', title: 'Odd One Out', description: 'Spot the detail that breaks the pattern.' },
  { id: 'memory', title: 'Visual Memory', description: 'Study a board, then test your memory.' },
  { id: 'next', title: 'What Comes Next?', description: 'Find the pattern and complete the sequence.' },
  { id: 'belong', title: 'Which Doesn’t Belong?', description: 'Find the choice that breaks the rule.' },
]

export function readMiniGameProgress() {
  const solved: Record<MiniGameMode, number> = { odd: 0, memory: 0, next: 0, belong: 0 }
  try {
    const raw = localStorage.getItem('cluecanvas-games-progress-v1')
    const saved: unknown = raw ? JSON.parse(raw) : {}
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) throw new Error('Invalid saved progress')
    const { results, daily } = saved as { results?: unknown; daily?: unknown }
    if (results && typeof results === 'object' && !Array.isArray(results)) {
      for (const game of miniGames) {
        for (let number = 1; number <= 100; number++) {
          const id = `${game.id}-${String(number).padStart(3, '0')}`
          const result = (results as Record<string, unknown>)[id]
          if (result && typeof result === 'object' && (result as { status?: unknown }).status === 'solved') solved[game.id]++
        }
      }
    }
    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const entry = daily && typeof daily === 'object' ? (daily as Record<string, unknown>)[today] : null
    const score = entry && typeof entry === 'object' ? (entry as { score?: unknown }).score : null
    const dailyScore = typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 4 ? score : null
    return { solved, dailyScore, unavailable: false }
  } catch {
    // Display honestly without altering the existing game save or storage schema.
    return { solved, dailyScore: null, unavailable: true }
  }
}