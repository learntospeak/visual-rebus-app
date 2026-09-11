import type { SequentialPuzzleDefinition } from './types'

const definitions: Record<string, SequentialPuzzleDefinition> = {
  'year-dot': {
    key: 'year-dot',
    puzzleId: 252,
    scene: 'year-dot',
    initialStep: 'rewind-timeline',
    solvedStep: 'solved',
    solvedAriaLabel: 'The timeline has returned to its origin, where YEAR has collapsed into one tiny dot.',
    steps: {
      'rewind-timeline': {
        id: 'rewind-timeline',
        instruction: 'Trace the timeline back towards its beginning.',
        ariaLabel: 'An ancient timeline stretches into the distance. Swipe it left to rewind it.',
        incorrectFeedback: 'The timeline resists. Follow it backwards.',
        successFeedback: 'The oldest mark has surfaced.',
        allowedInteractions: [{
          kind: 'swipe',
          targetId: 'timeline',
          direction: 'left',
          minDistance: 48,
          accessibleLabel: 'Rewind the timeline',
        }],
        nextStep: 'align-origin',
      },
      'align-origin': {
        id: 'align-origin',
        instruction: 'Turn the origin mechanism against the clock.',
        ariaLabel: 'A brass origin wheel is unlocked. Rotate it counterclockwise.',
        incorrectFeedback: 'The teeth lock in that direction.',
        successFeedback: 'The origin is aligned.',
        allowedInteractions: [{
          kind: 'rotate',
          targetId: 'origin-wheel',
          direction: 'counterclockwise',
          minAngle: 55,
          accessibleLabel: 'Turn the origin wheel counterclockwise',
        }],
        nextStep: 'compress-year',
      },
      'compress-year': {
        id: 'compress-year',
        instruction: 'Reduce the final piece to its smallest possible form.',
        ariaLabel: 'A brass medallion marked YEAR is unlocked. Pinch it smaller.',
        incorrectFeedback: 'Smaller—not farther away.',
        successFeedback: 'The mechanism is complete.',
        allowedInteractions: [{
          kind: 'pinch',
          targetId: 'year-medallion',
          maxScale: .64,
          accessibleLabel: 'Pinch YEAR into its smallest form',
        }],
        nextStep: 'solved',
      },
    },
  },
  'once-upon-time': {
    key: 'once-upon-time',
    puzzleId: 253,
    scene: 'once-upon-time',
    initialStep: 'turn-page',
    solvedStep: 'solved',
    solvedAriaLabel: 'The book is open and ONCE rests physically upon the working clock.',
    steps: {
      'turn-page': {
        id: 'turn-page',
        instruction: 'Search the storybook for the missing piece.',
        ariaLabel: 'An old storybook rests above a clock. Swipe its page to the left.',
        incorrectFeedback: 'The cover stays shut. Try turning the page.',
        successFeedback: 'A single wordplate was hidden inside.',
        allowedInteractions: [{
          kind: 'swipe',
          targetId: 'storybook-page',
          direction: 'left',
          minDistance: 42,
          accessibleLabel: 'Turn the storybook page',
        }],
        nextStep: 'wind-clock',
      },
      'wind-clock': {
        id: 'wind-clock',
        instruction: 'Set the clockwork in motion.',
        ariaLabel: 'The book is open and a brass clock mechanism is unlocked. Rotate it clockwise.',
        incorrectFeedback: 'The clockwork catches. Wind it with time.',
        successFeedback: 'The clock has begun to tick.',
        allowedInteractions: [{
          kind: 'rotate',
          targetId: 'clock-wheel',
          direction: 'clockwise',
          minAngle: 55,
          accessibleLabel: 'Wind the clock clockwise',
        }],
        nextStep: 'place-once',
      },
      'place-once': {
        id: 'place-once',
        instruction: 'Place the discovered piece where it belongs.',
        ariaLabel: 'Drag the ONCE wordplate onto the illuminated space above the clock.',
        incorrectFeedback: 'That is not the wordplate’s resting place.',
        successFeedback: 'The story mechanism is complete.',
        allowedInteractions: [{
          kind: 'drag',
          targetId: 'once-wordplate',
          dropTargetId: 'clock-crown',
          minDistance: 34,
          accessibleLabel: 'Place ONCE above the clock',
        }],
        nextStep: 'solved',
      },
    },
  },
}

export function getSequentialPuzzleDefinition(key?: string) {
  return key ? definitions[key] : undefined
}

export function hasSequentialPuzzleDefinition(key?: string) {
  return Boolean(getSequentialPuzzleDefinition(key))
}

