import type {
  InteractionAttempt,
  InteractionEvaluation,
  SequentialInteractionRule,
  SequentialPuzzleStep,
} from './types'

function ruleMatches(rule: SequentialInteractionRule, attempt: InteractionAttempt) {
  if (rule.kind !== attempt.kind || rule.targetId !== attempt.targetId) return false
  if (rule.direction && rule.direction !== attempt.direction) return false
  if (rule.dropTargetId && rule.dropTargetId !== attempt.dropTargetId) return false
  if (rule.minDistance !== undefined && (attempt.distance ?? 0) < rule.minDistance) return false
  if (rule.minAngle !== undefined && Math.abs(attempt.angle ?? 0) < rule.minAngle) return false
  if (rule.maxScale !== undefined && (attempt.scale ?? 1) > rule.maxScale) return false
  if (rule.minScale !== undefined && (attempt.scale ?? 1) < rule.minScale) return false
  if (rule.minTilt !== undefined && Math.abs(attempt.tilt ?? 0) < rule.minTilt) return false
  return true
}

export function evaluateInteraction(step: SequentialPuzzleStep, attempt: InteractionAttempt): InteractionEvaluation {
  const correct = step.allowedInteractions.some((rule) => ruleMatches(rule, attempt))
  return correct
    ? { correct: true, nextStep: step.nextStep, feedback: step.successFeedback }
    : { correct: false, feedback: step.incorrectFeedback }
}

export function accessibleAttempt(rule: SequentialInteractionRule): InteractionAttempt {
  return {
    kind: rule.kind,
    targetId: rule.targetId,
    direction: rule.direction,
    dropTargetId: rule.dropTargetId,
    distance: (rule.minDistance ?? 0) + 20,
    angle: rule.direction === 'counterclockwise' ? -(rule.minAngle ?? 0) - 20 : (rule.minAngle ?? 0) + 20,
    scale: rule.maxScale !== undefined ? rule.maxScale - .1 : rule.minScale !== undefined ? rule.minScale + .1 : 1,
    tilt: (rule.minTilt ?? 0) + 5,
  }
}

