export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type PuzzleFormat = 'typography' | 'icon' | 'scale' | 'rotation' | 'illustration'

export interface VisualElement {
  content: string
  className?: string
  ariaLabel?: string
}

export interface Puzzle {
  id: number
  answer: string
  acceptedAnswers: string[]
  wordPattern: string
  difficulty: Difficulty
  format: PuzzleFormat
  prompt: string
  elements: VisualElement[]
  clues: [string, string, string]
  explanation: string[]
  region: 'Global' | 'AU' | 'UK' | 'US'
}

export interface SavedProgress {
  completedIds: number[]
  currentIndex: number
}
