import type { Puzzle } from '../types'

function answerWords(answer: string) {
  return new Set(answer.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((word) => word.length > 3))
}

function sharedAnswerWords(left: Puzzle, right: Puzzle) {
  const leftWords = answerWords(left.answer)
  return [...answerWords(right.answer)].filter((word) => leftWords.has(word)).length
}

export function nextVariedPuzzleIndex(puzzles: Puzzle[], currentIndex: number, completedIds: number[]) {
  const current = puzzles[currentIndex]
  const completed = new Set(completedIds)
  const chapterPuzzles = puzzles.filter((puzzle) => puzzle.chapterId === current.chapterId)
  const remaining = chapterPuzzles.filter((puzzle) => puzzle.id !== current.id && !completed.has(puzzle.id))

  if (remaining.length === 0) {
    const nextChapterPuzzle = puzzles.find((puzzle) => !completed.has(puzzle.id) && puzzle.id !== current.id)
    return nextChapterPuzzle ? puzzles.indexOf(nextChapterPuzzle) : currentIndex
  }

  const solvedInChapter = chapterPuzzles.length - remaining.length
  const targetDifficulty = 2 + Math.round((solvedInChapter / Math.max(1, chapterPuzzles.length - 1)) * 5)
  const ranked = remaining.map((candidate) => {
    const mechanicOverlap = candidate.mechanics.filter((mechanic) => current.mechanics.includes(mechanic)).length
    const sameTemplate = candidate.visualTemplate === current.visualTemplate ? 1 : 0
    const themeOverlap = sharedAnswerWords(current, candidate)
    const difficultyDistance = Math.abs(candidate.difficultyScore - targetDifficulty)
    return { candidate, penalty: mechanicOverlap * 5 + themeOverlap * 7 + sameTemplate * 2 + difficultyDistance }
  })
  ranked.sort((left, right) => left.penalty - right.penalty || left.candidate.id - right.candidate.id)
  return puzzles.indexOf(ranked[0].candidate)
}
