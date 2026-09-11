import {
  default as React,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { accessibleAttempt, evaluateInteraction } from '../interactions/engine'
import type {
  InteractionAttempt,
  InteractionDirection,
  SequentialInteractionRule,
  SequentialPuzzleDefinition,
} from '../interactions/types'

interface PointerPosition {
  targetId: string
  startX: number
  startY: number
  x: number
  y: number
}

interface SceneProps {
  step: string
  dragOffset: { x: number; y: number }
  liveRotation: number
  liveScale: number
}

function YearDotScene({ step, liveRotation, liveScale }: SceneProps) {
  const style = {
    '--mechanism-rotation': `${liveRotation}deg`,
    '--medallion-scale': String(liveScale),
  } as CSSProperties

  return (
    <div className={`sequential-scene year-dot-scene step-${step}`} style={style}>
      <img src="/premium-252-v2.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="escape-room-vignette" aria-hidden="true" />
      <div className="year-timeline" data-seq-target="timeline" aria-hidden="true">
        <i /><i /><i /><i />
        <small>NOW</small><small>PAST</small><small>ORIGIN</small>
      </div>
      <div className="year-origin-wheel" data-seq-target="origin-wheel" aria-hidden="true">
        <i /><span>⌁</span><i />
      </div>
      <div className="year-medallion" data-seq-target="year-medallion" aria-hidden="true">
        <span>YEAR</span>
      </div>
      <div className="year-origin-socket" aria-hidden="true" />
    </div>
  )
}

function OnceUponTimeScene({ step, dragOffset, liveRotation }: SceneProps) {
  const style = {
    '--mechanism-rotation': `${liveRotation}deg`,
    '--drag-x': `${dragOffset.x}px`,
    '--drag-y': `${dragOffset.y}px`,
  } as CSSProperties

  return (
    <div className={`sequential-scene once-time-scene step-${step}`} style={style}>
      <img src="/premium-253-v1.webp" alt="" aria-hidden="true" width="320" height="260" loading="eager" decoding="async" />
      <span className="escape-room-vignette" aria-hidden="true" />
      <div className="storybook-page" data-seq-target="storybook-page" aria-hidden="true">
        <span className="storybook-page-front" />
        <span className="storybook-page-back" />
      </div>
      <div className="once-clock-wheel" data-seq-target="clock-wheel" aria-hidden="true"><i /></div>
      <div className="clock-crown-drop" data-seq-drop="clock-crown" aria-hidden="true" />
      <div className="once-wordplate" data-seq-target="once-wordplate" aria-hidden="true">ONCE</div>
      <span className="storybook-glow" aria-hidden="true" />
    </div>
  )
}

function directionFromDelta(dx: number, dy: number): InteractionDirection {
  if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? 'left' : 'right'
  return dy < 0 ? 'up' : 'down'
}

function normaliseAngle(angle: number) {
  let result = angle
  while (result > 180) result -= 360
  while (result < -180) result += 360
  return result
}

export function SequentialPuzzle({ definition, onSolved }: { definition: SequentialPuzzleDefinition; onSolved?: () => void }) {
  const [currentStep, setCurrentStep] = useState(definition.initialStep)
  const [feedback, setFeedback] = useState('')
  const [feedbackKind, setFeedbackKind] = useState<'success' | 'incorrect' | ''>('')
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [liveRotation, setLiveRotation] = useState(0)
  const [liveScale, setLiveScale] = useState(1)
  const rootRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, PointerPosition>())
  const rotationPrevious = useRef<number | null>(null)
  const rotationTotal = useRef(0)
  const pinchInitialDistance = useRef<number | null>(null)
  const liveScaleRef = useRef(1)
  const solvedTimer = useRef<number | null>(null)
  const feedbackTimer = useRef<number | null>(null)
  const onSolvedRef = useRef(onSolved)
  const step = definition.steps[currentStep]
  const solved = currentStep === definition.solvedStep
  const activeRule = step?.allowedInteractions[0]

  useEffect(() => {
    onSolvedRef.current = onSolved
  }, [onSolved])

  useEffect(() => {
    setCurrentStep(definition.initialStep)
    setFeedback('')
    setFeedbackKind('')
    setDragOffset({ x: 0, y: 0 })
    setLiveRotation(0)
    setLiveScale(1)
  }, [definition])

  useEffect(() => () => {
    if (solvedTimer.current !== null) window.clearTimeout(solvedTimer.current)
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current)
  }, [])

  function showFeedback(message: string, kind: 'success' | 'incorrect') {
    setFeedback(message)
    setFeedbackKind(kind)
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current)
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback('')
      setFeedbackKind('')
    }, kind === 'success' ? 1200 : 1550)
  }

  function attemptInteraction(attempt: InteractionAttempt) {
    if (!step || solved) return
    const evaluation = evaluateInteraction(step, attempt)
    if (!evaluation.correct || !evaluation.nextStep) {
      showFeedback(evaluation.feedback, 'incorrect')
      setDragOffset({ x: 0, y: 0 })
      setLiveScale(1)
      setLiveRotation(0)
      return
    }

    showFeedback(evaluation.feedback, 'success')
    setCurrentStep(evaluation.nextStep)
    setDragOffset({ x: 0, y: 0 })
    setLiveScale(1)
    setLiveRotation(0)
    if (evaluation.nextStep === definition.solvedStep) {
      solvedTimer.current = window.setTimeout(() => onSolvedRef.current?.(), 850)
    }
  }

  function targetAt(event: ReactPointerEvent<HTMLDivElement>) {
    const element = (event.target as HTMLElement).closest<HTMLElement>('[data-seq-target]')
    return element?.dataset.seqTarget ?? 'scene'
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (solved) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const targetId = targetAt(event)
    pointers.current.set(event.pointerId, {
      targetId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
    })

    if (activeRule?.kind === 'rotate' && targetId === activeRule.targetId) {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-seq-target]')
      const rect = target?.getBoundingClientRect()
      if (rect) rotationPrevious.current = Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI
    }

    const activePointers = [...pointers.current.values()]
    if (activeRule?.kind === 'pinch' && activePointers.length === 2 && activePointers.every((pointer) => pointer.targetId === activeRule.targetId)) {
      pinchInitialDistance.current = Math.hypot(activePointers[0].x - activePointers[1].x, activePointers[0].y - activePointers[1].y)
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointers.current.get(event.pointerId)
    if (!pointer || !activeRule) return
    pointer.x = event.clientX
    pointer.y = event.clientY

    if (activeRule.kind === 'drag' && pointer.targetId === activeRule.targetId) {
      setDragOffset({ x: pointer.x - pointer.startX, y: pointer.y - pointer.startY })
    }

    if (activeRule.kind === 'rotate' && pointer.targetId === activeRule.targetId) {
      const target = rootRef.current?.querySelector<HTMLElement>(`[data-seq-target="${activeRule.targetId}"]`)
      const rect = target?.getBoundingClientRect()
      if (!rect) return
      const angle = Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI
      if (rotationPrevious.current !== null) rotationTotal.current += normaliseAngle(angle - rotationPrevious.current)
      rotationPrevious.current = angle
      setLiveRotation(rotationTotal.current)
    }

    const activePointers = [...pointers.current.values()]
    if (activeRule.kind === 'pinch' && activePointers.length === 2 && pinchInitialDistance.current) {
      const distance = Math.hypot(activePointers[0].x - activePointers[1].x, activePointers[0].y - activePointers[1].y)
      const nextScale = Math.max(.25, Math.min(1.35, distance / pinchInitialDistance.current))
      liveScaleRef.current = nextScale
      setLiveScale(nextScale)
    }
  }

  function resetPointers() {
    pointers.current.clear()
    rotationPrevious.current = null
    rotationTotal.current = 0
    pinchInitialDistance.current = null
    liveScaleRef.current = 1
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointers.current.get(event.pointerId)
    if (!pointer || !activeRule) {
      resetPointers()
      return
    }
    pointer.x = event.clientX
    pointer.y = event.clientY
    const dx = pointer.x - pointer.startX
    const dy = pointer.y - pointer.startY
    const distance = Math.hypot(dx, dy)

    if (activeRule.kind === 'pinch' && pointers.current.size >= 2) {
      const activePointers = [...pointers.current.values()]
      const measuredDistance = Math.hypot(activePointers[0].x - activePointers[1].x, activePointers[0].y - activePointers[1].y)
      const measuredScale = pinchInitialDistance.current ? measuredDistance / pinchInitialDistance.current : liveScaleRef.current
      attemptInteraction({ kind: 'pinch', targetId: pointer.targetId, scale: measuredScale })
    } else if (activeRule.kind === 'swipe') {
      attemptInteraction({ kind: 'swipe', targetId: pointer.targetId, direction: directionFromDelta(dx, dy), distance })
    } else if (activeRule.kind === 'rotate') {
      attemptInteraction({
        kind: 'rotate',
        targetId: pointer.targetId,
        direction: rotationTotal.current < 0 ? 'counterclockwise' : 'clockwise',
        angle: rotationTotal.current,
      })
    } else if (activeRule.kind === 'drag') {
      const dropTarget = activeRule.dropTargetId
        ? rootRef.current?.querySelector<HTMLElement>(`[data-seq-drop="${activeRule.dropTargetId}"]`)
        : undefined
      const dropRect = dropTarget?.getBoundingClientRect()
      const dropTargetId = dropRect
        && event.clientX >= dropRect.left
        && event.clientX <= dropRect.right
        && event.clientY >= dropRect.top
        && event.clientY <= dropRect.bottom
        ? activeRule.dropTargetId
        : undefined
      attemptInteraction({ kind: 'drag', targetId: pointer.targetId, dropTargetId, distance })
    } else if (activeRule.kind === 'tap') {
      attemptInteraction({ kind: 'tap', targetId: pointer.targetId, distance })
    } else {
      attemptInteraction({ kind: 'tap', targetId: pointer.targetId, distance })
    }
    resetPointers()
  }

  useEffect(() => {
    if (activeRule?.kind !== 'orientation') return
    const onOrientation = (event: DeviceOrientationEvent) => {
      const tilt = activeRule.direction === 'left' || activeRule.direction === 'right' ? event.gamma ?? 0 : event.beta ?? 0
      const direction: InteractionDirection = activeRule.direction === 'left' || activeRule.direction === 'right'
        ? tilt < 0 ? 'left' : 'right'
        : tilt < 0 ? 'up' : 'down'
      attemptInteraction({ kind: 'orientation', targetId: activeRule.targetId, direction, tilt })
    }
    window.addEventListener('deviceorientation', onOrientation)
    return () => window.removeEventListener('deviceorientation', onOrientation)
  })

  async function useAccessibleAction(rule: SequentialInteractionRule) {
    if (rule.kind === 'orientation') {
      const orientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> }
      if (orientation.requestPermission) {
        const permission = await orientation.requestPermission()
        if (permission === 'granted') {
          showFeedback('Motion control unlocked.', 'success')
          return
        }
      }
    }
    attemptInteraction(accessibleAttempt(rule))
  }

  const sceneProps = { step: currentStep, dragOffset, liveRotation, liveScale }
  const ariaLabel = solved ? definition.solvedAriaLabel : step?.ariaLabel

  return (
    <div
      ref={rootRef}
      className={`puzzle-visual sequential-puzzle escape-room-puzzle scene-${definition.scene}${solved ? ' is-solved' : ''}${feedbackKind === 'incorrect' ? ' has-error' : ''}`}
      role="application"
      aria-label={ariaLabel}
      data-sequential-key={definition.key}
      data-sequential-step={currentStep}
      data-sequential-flow={JSON.stringify([...Object.keys(definition.steps), definition.solvedStep])}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={resetPointers}
    >
      {definition.scene === 'year-dot' ? <YearDotScene {...sceneProps} /> : <OnceUponTimeScene {...sceneProps} />}
      <div className="escape-room-status" aria-live="polite">
        <span>{solved ? 'MECHANISM COMPLETE' : `LOCK ${Object.keys(definition.steps).indexOf(currentStep) + 1} OF ${Object.keys(definition.steps).length}`}</span>
        <strong>{solved ? 'Study the completed arrangement.' : step?.instruction}</strong>
      </div>
      {feedback && <div className={`escape-room-feedback is-${feedbackKind}`} role="status">{feedback}</div>}
      {!solved && activeRule && (
        <button
          type="button"
          className="sequential-access-action"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => void useAccessibleAction(activeRule)}
        >
          <span aria-hidden="true">{activeRule.kind === 'rotate' ? '↻' : activeRule.kind === 'pinch' ? '⇲' : activeRule.kind === 'drag' ? '✥' : activeRule.kind === 'swipe' ? '↔' : '◆'}</span>
          {activeRule.accessibleLabel}
        </button>
      )}
    </div>
  )
}
