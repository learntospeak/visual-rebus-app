export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type PuzzleFormat = 'typography' | 'icon' | 'scale' | 'rotation' | 'illustration'
export type MechanicTag =
  | 'above-below'
  | 'inside-outside'
  | 'between'
  | 'split'
  | 'repetition'
  | 'count'
  | 'scale'
  | 'rotation'
  | 'reversal'
  | 'colour'
  | 'sequence'
  | 'missing-letter'
  | 'text-image'
  | 'direction'
  | 'sound-alike'

export type QaStatus = 'Draft' | 'Tested' | 'Approved' | 'Rejected'

export interface UnlockRule {
  requiresPuzzleIds: number[]
  minimumChapterStars?: number
}

export interface ArtworkMetadata {
  version: number
  creator: string
  source: string
  licence: string
  kind: 'text-css' | 'inline-svg' | 'project-asset'
}

export interface TesterResult {
  testerCode: string
  result: 'fair' | 'confusing' | 'wrong-answer'
  testedAt: string
  notes?: string
}

export interface QaMetadata {
  status: QaStatus
  testerResults: TesterResult[]
}

export interface MotionInstruction {
  type: 'entrance' | 'loop' | 'transition'
  name: string
  durationMs: number
  reducedMotionFallback: string
}

export interface InteractionInstruction {
  type: 'tap' | 'select' | 'drag'
  targetId: string
  instruction: string
  completionCondition: string
}

export interface VisualElement {
  content: string
  className?: string
  ariaLabel?: string
}

export interface Puzzle {
  id: number
  contentVersion: string
  chapterId: string
  chapterOrder: number
  answer: string
  acceptedAnswers: string[]
  wordPattern: string
  difficulty: Difficulty
  difficultyScore: number
  estimatedSolveSeconds: number
  format: PuzzleFormat
  mechanics: MechanicTag[]
  prompt: string
  elements: VisualElement[]
  clues: [string, string, string]
  explanation: string[]
  region: 'Global' | 'AU' | 'UK' | 'US'
  unlock: UnlockRule
  artwork: ArtworkMetadata
  qa: QaMetadata
  motion?: MotionInstruction
  interaction?: InteractionInstruction
}

export interface SavedProgress {
  completedIds: number[]
  currentIndex: number
}
