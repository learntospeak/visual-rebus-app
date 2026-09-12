import { puzzlePacks } from '../data/catalog'
import { puzzles } from '../data/puzzles'

export function chapterRewards(completedIds: readonly number[]) {
  const completed = new Set(completedIds)
  return puzzlePacks.filter(pack => pack.status === 'available').map(pack => {
    const members = puzzles.filter(puzzle => puzzle.chapterId === pack.id)
    const solved = members.filter(puzzle => completed.has(puzzle.id)).length
    return { ...pack, solved, total: members.length, earned: members.length > 0 && solved === members.length }
  })
}

export function newlyEarnedChapter(before: readonly number[], after: readonly number[]) {
  const previous = chapterRewards(before)
  return chapterRewards(after).find((chapter, index) => chapter.earned && !previous[index].earned)?.id ?? null
}
