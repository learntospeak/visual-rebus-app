import type { Puzzle } from '../types'
import { normaliseAnswer } from '../utils/answers'

export interface ContentValidationResult {
  errors: string[]
  warnings: string[]
  summary: {
    puzzleCount: number
    chapters: Record<string, number>
    difficulties: Record<string, number>
    mechanics: Record<string, number>
    qaStatuses: Record<string, number>
  }
}

function increment(target: Record<string, number>, key: string) {
  target[key] = (target[key] ?? 0) + 1
}

function answerWordPattern(answer: string) {
  return answer
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/gi, '').length)
    .join(' ')
}

export function validatePuzzles(puzzles: Puzzle[]): ContentValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const ids = new Set<number>()
  const versions = new Set<string>()
  const answers = new Map<string, number>()
  const visualSignatures = new Map<string, number>()
  const chapters: Record<string, number> = {}
  const difficulties: Record<string, number> = {}
  const mechanics: Record<string, number> = {}
  const qaStatuses: Record<string, number> = {}

  for (const puzzle of puzzles) {
    const label = `Puzzle ${puzzle.id}`
    if (ids.has(puzzle.id)) errors.push(`${label}: duplicate puzzle ID.`)
    ids.add(puzzle.id)

    if (!puzzle.contentVersion) errors.push(`${label}: missing content version.`)
    else if (versions.has(puzzle.contentVersion)) errors.push(`${label}: duplicate content version ${puzzle.contentVersion}.`)
    versions.add(puzzle.contentVersion)

    const normalizedAnswer = normaliseAnswer(puzzle.answer)
    const previousAnswer = answers.get(normalizedAnswer)
    if (previousAnswer) errors.push(`${label}: duplicates the answer from puzzle ${previousAnswer}.`)
    answers.set(normalizedAnswer, puzzle.id)

    const expectedPattern = answerWordPattern(puzzle.answer)
    const actualPattern = puzzle.wordPattern.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
    if (expectedPattern !== actualPattern) {
      errors.push(`${label}: word pattern ${puzzle.wordPattern} does not match ${expectedPattern}.`)
    }

    if (puzzle.clues.length !== 3 || puzzle.clues.some((clue) => !clue.trim())) {
      errors.push(`${label}: exactly three non-empty clues are required.`)
    }
    if (!puzzle.explanation.length || puzzle.explanation.some((step) => !step.trim())) {
      errors.push(`${label}: at least one non-empty explanation step is required.`)
    }

    const accepted = new Set<string>()
    for (const answer of puzzle.acceptedAnswers) {
      const normalized = normaliseAnswer(answer)
      if (!normalized) errors.push(`${label}: contains an empty accepted answer.`)
      if (normalized === normalizedAnswer) warnings.push(`${label}: accepted answer duplicates the canonical answer.`)
      if (accepted.has(normalized)) errors.push(`${label}: contains duplicate accepted answer “${answer}”.`)
      accepted.add(normalized)
    }

    if (!puzzle.region) errors.push(`${label}: missing region.`)
    if (!puzzle.chapterId || puzzle.chapterOrder < 1) errors.push(`${label}: invalid chapter metadata.`)
    if (puzzle.difficultyScore < 1 || puzzle.difficultyScore > 10) errors.push(`${label}: difficulty score must be 1–10.`)
    if (puzzle.estimatedSolveSeconds < 10) warnings.push(`${label}: estimated solve time looks unusually short.`)
    if (!puzzle.mechanics.length) errors.push(`${label}: at least one mechanic tag is required.`)
    if (!puzzle.artwork.creator || !puzzle.artwork.source || !puzzle.artwork.licence) errors.push(`${label}: incomplete artwork ownership metadata.`)
    if (!puzzle.qa.status) errors.push(`${label}: missing QA status.`)
    if (puzzle.qa.status === 'Approved' && puzzle.qa.testerResults.length < 3) {
      errors.push(`${label}: Approved status requires at least three tester results.`)
    }

    const visualSignature = [
      ...puzzle.mechanics.slice().sort(),
      ...puzzle.elements.map((element) => normaliseAnswer(element.content)),
    ].join('|')
    const similarPuzzle = visualSignatures.get(visualSignature)
    if (similarPuzzle) warnings.push(`${label}: visual concept may duplicate puzzle ${similarPuzzle}.`)
    visualSignatures.set(visualSignature, puzzle.id)

    increment(chapters, puzzle.chapterId)
    increment(difficulties, `${puzzle.difficulty} (${puzzle.difficultyScore})`)
    increment(qaStatuses, puzzle.qa.status)
    puzzle.mechanics.forEach((mechanic) => increment(mechanics, mechanic))
  }

  return {
    errors,
    warnings,
    summary: { puzzleCount: puzzles.length, chapters, difficulties, mechanics, qaStatuses },
  }
}
