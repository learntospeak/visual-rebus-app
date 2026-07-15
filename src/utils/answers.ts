import type { Puzzle } from '../types'

export function normaliseAnswer(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]/g, '')
}

export function answerLetters(value: string) {
  return value.replace(/[^a-z0-9]/gi, '').toUpperCase().split('')
}

export function isCorrectAnswer(puzzle: Puzzle, guess: string) {
  const accepted = [puzzle.answer, ...puzzle.acceptedAnswers].map(normaliseAnswer)
  return accepted.includes(normaliseAnswer(guess))
}
