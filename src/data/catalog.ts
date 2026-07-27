import type { Puzzle } from '../types'

export interface PuzzlePack {
  id: string
  order: number
  title: string
  description: string
  firstPuzzle: number
  lastPuzzle: number
  difficultyRange: [number, number]
  status: 'available' | 'planned'
}

export const puzzlePacks: PuzzlePack[] = [
  { id: 'chapter-1', order: 1, title: 'First Steps', description: 'Placement, scale, icons and rotation', firstPuzzle: 1, lastPuzzle: 25, difficultyRange: [1, 6], status: 'available' },
  { id: 'chapter-2', order: 2, title: 'Between the Lines', description: 'Layered layouts and combined mechanisms', firstPuzzle: 26, lastPuzzle: 75, difficultyRange: [2, 7], status: 'available' },
  { id: 'chapter-3', order: 3, title: 'Picture Puzzles', description: 'Icons, illustrations and visual wordplay', firstPuzzle: 76, lastPuzzle: 115, difficultyRange: [2, 8], status: 'available' },
  { id: 'chapter-4', order: 4, title: 'Everyday Expressions', description: 'Objects, actions, colour and familiar sayings', firstPuzzle: 116, lastPuzzle: 165, difficultyRange: [2, 8], status: 'available' },
  { id: 'chapter-5', order: 5, title: 'Twist Your Thinking', description: 'Motion, interaction and harder combinations', firstPuzzle: 166, lastPuzzle: 215, difficultyRange: [4, 10], status: 'available' },
  { id: 'chapter-6', order: 6, title: 'Double Meaning', description: 'Two compatible visual mechanisms per puzzle', firstPuzzle: 216, lastPuzzle: 315, difficultyRange: [5, 10], status: 'available' },
  { id: 'chapter-7', order: 7, title: 'Expert Rebus', description: 'Multi-stage visual reasoning', firstPuzzle: 316, lastPuzzle: 415, difficultyRange: [7, 10], status: 'available' },
  { id: 'chapter-8', order: 8, title: 'Master Challenges', description: 'Bespoke milestone and mixed-mechanic puzzles', firstPuzzle: 416, lastPuzzle: 500, difficultyRange: [9, 10], status: 'available' },
  { id: 'chapter-9', order: 9, title: 'Grand Finale', description: 'The final fifty multi-layer master puzzles', firstPuzzle: 501, lastPuzzle: 550, difficultyRange: [9, 10], status: 'planned' },
]

export function puzzlesForPack(puzzles: Puzzle[], packId: string) {
  return puzzles
    .filter((puzzle) => puzzle.chapterId === packId)
    .sort((left, right) => left.chapterOrder - right.chapterOrder)
}

export function puzzleById(puzzles: Puzzle[], puzzleId: number) {
  return puzzles.find((puzzle) => puzzle.id === puzzleId)
}
