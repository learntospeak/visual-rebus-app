import type { Puzzle, SavedProgress } from '../types'

const STORAGE_KEY = 'visual-rebus-progress-v1'
const emptyProgress: SavedProgress = { completedIds: [], currentIndex: 0 }

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
