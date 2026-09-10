export type SequentialInteractionKind = 'tap' | 'drag' | 'rotate' | 'pinch' | 'swipe' | 'orientation'

export type InteractionDirection = 'left' | 'right' | 'up' | 'down' | 'clockwise' | 'counterclockwise'

export interface SequentialInteractionRule {
  kind: SequentialInteractionKind
  targetId: string
  direction?: InteractionDirection
  dropTargetId?: string
  minDistance?: number
  minAngle?: number
  maxScale?: number
  minScale?: number
  minTilt?: number
  accessibleLabel: string
}

export interface SequentialPuzzleStep {
  id: string
  instruction: string
  ariaLabel: string
  incorrectFeedback: string
  successFeedback: string
  allowedInteractions: SequentialInteractionRule[]
  nextStep: string
}

export interface SequentialPuzzleDefinition {
  key: string
  puzzleId: number
  scene: 'year-dot' | 'once-upon-time'
  initialStep: string
  solvedStep: string
  steps: Record<string, SequentialPuzzleStep>
  solvedAriaLabel: string
}

export interface InteractionAttempt {
  kind: SequentialInteractionKind
  targetId: string
  direction?: InteractionDirection
  dropTargetId?: string
  distance?: number
  angle?: number
  scale?: number
  tilt?: number
}

export interface InteractionEvaluation {
  correct: boolean
  nextStep?: string
  feedback: string
}

