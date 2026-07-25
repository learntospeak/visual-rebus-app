import type { Puzzle, SavedProgress } from '../types'

const STORAGE_KEY = 'visual-rebus-progress-v1'
export const emptyProgress: SavedProgress = {
  completedIds: [],
  currentIndex: 0,
  starsByPuzzle: {},
  revealedIds: [],
  feedbackByPuzzle: {},
  daily: { completedDates: [], revealedDates: [], currentStreak: 0, longestStreak: 0, lastCompletedDate: null },
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function previousDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() - 1)
  return localDateKey(date)
}

function requestedPuzzleIndex(puzzles: Puzzle[]) {
  const requestedId = Number(new URLSearchParams(window.location.search).get('puzzle'))
  return puzzles.findIndex((puzzle) => puzzle.id === requestedId)
}

export function loadProgress(puzzles: Puzzle[]): SavedProgress {
  const requestedIndex = requestedPuzzleIndex(puzzles)

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return requestedIndex >= 0 ? { ...emptyProgress, currentIndex: requestedIndex } : emptyProgress

    const saved = JSON.parse(raw) as SavedProgress
    return {
      completedIds: Array.isArray(saved.completedIds) ? saved.completedIds : [],
      currentIndex: requestedIndex >= 0
        ? requestedIndex
        : Math.min(Math.max(saved.currentIndex ?? 0, 0), puzzles.length - 1),
      starsByPuzzle: saved.starsByPuzzle && typeof saved.starsByPuzzle === 'object' ? saved.starsByPuzzle : {},
      revealedIds: Array.isArray(saved.revealedIds) ? saved.revealedIds : [],
      feedbackByPuzzle: saved.feedbackByPuzzle && typeof saved.feedbackByPuzzle === 'object' ? saved.feedbackByPuzzle : {},
      daily: {
        ...emptyProgress.daily,
        ...(saved.daily && typeof saved.daily === 'object' ? saved.daily : {}),
        completedDates: Array.isArray(saved.daily?.completedDates) ? saved.daily.completedDates : [],
        revealedDates: Array.isArray(saved.daily?.revealedDates) ? saved.daily.revealedDates : [],
      },
    }
  } catch {
    return requestedIndex >= 0 ? { ...emptyProgress, currentIndex: requestedIndex } : emptyProgress
  }
}

export function saveProgress(progress: SavedProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function syncPuzzleUrl(puzzleId: number | null) {
  const url = new URL(window.location.href)
  if (puzzleId === null) url.searchParams.delete('puzzle')
  else url.searchParams.set('puzzle', String(puzzleId))
  window.history.replaceState({}, '', url)
}

export function hasRequestedPuzzle() {
  return new URLSearchParams(window.location.search).has('puzzle')
}
