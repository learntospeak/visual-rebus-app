import assert from 'node:assert/strict'
import { getSequentialPuzzleDefinition } from '../src/interactions/definitions'
import { accessibleAttempt, evaluateInteraction } from '../src/interactions/engine'
import type { InteractionAttempt, SequentialInteractionRule, SequentialPuzzleStep } from '../src/interactions/types'

function testRule(rule: SequentialInteractionRule, invalidAttempt: InteractionAttempt) {
  const step: SequentialPuzzleStep = {
    id: 'test',
    instruction: 'test',
    ariaLabel: 'test',
    incorrectFeedback: 'incorrect',
    successFeedback: 'correct',
    allowedInteractions: [rule],
    nextStep: 'next',
  }
  assert.equal(evaluateInteraction(step, accessibleAttempt(rule)).correct, true)
  assert.equal(evaluateInteraction(step, invalidAttempt).correct, false)
}

testRule(
  { kind: 'tap', targetId: 'seal', accessibleLabel: 'Tap seal' },
  { kind: 'tap', targetId: 'wrong' },
)
testRule(
  { kind: 'swipe', targetId: 'rail', direction: 'left', minDistance: 40, accessibleLabel: 'Swipe rail' },
  { kind: 'swipe', targetId: 'rail', direction: 'right', distance: 100 },
)
testRule(
  { kind: 'rotate', targetId: 'dial', direction: 'counterclockwise', minAngle: 50, accessibleLabel: 'Rotate dial' },
  { kind: 'rotate', targetId: 'dial', direction: 'counterclockwise', angle: -20 },
)
testRule(
  { kind: 'pinch', targetId: 'coin', maxScale: .65, accessibleLabel: 'Pinch coin' },
  { kind: 'pinch', targetId: 'coin', scale: .9 },
)
testRule(
  { kind: 'drag', targetId: 'key', dropTargetId: 'lock', minDistance: 30, accessibleLabel: 'Drag key' },
  { kind: 'drag', targetId: 'key', dropTargetId: 'table', distance: 100 },
)
testRule(
  { kind: 'orientation', targetId: 'maze', direction: 'right', minTilt: 12, accessibleLabel: 'Tilt maze' },
  { kind: 'orientation', targetId: 'maze', direction: 'left', tilt: -20 },
)

for (const key of ['year-dot', 'once-upon-time']) {
  const definition = getSequentialPuzzleDefinition(key)
  assert.ok(definition, `${key} definition exists`)
  let currentStep = definition.initialStep
  const visited = new Set<string>()
  while (currentStep !== definition.solvedStep) {
    assert.equal(visited.has(currentStep), false, `${key} does not loop`)
    visited.add(currentStep)
    const step = definition.steps[currentStep]
    assert.ok(step, `${key} has step ${currentStep}`)
    const result = evaluateInteraction(step, accessibleAttempt(step.allowedInteractions[0]))
    assert.equal(result.correct, true)
    assert.ok(result.nextStep)
    currentStep = result.nextStep
  }
  assert.equal(visited.size, 3, `${key} has three locks`)
}

console.log('Sequential interaction engine passed tap, drag, rotate, pinch, swipe, orientation and puzzle-flow tests.')

