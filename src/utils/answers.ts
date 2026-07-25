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

function editDistance(left: string, right: string) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = row[0]
    row[0] = leftIndex
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const previous = row[rightIndex]
      row[rightIndex] = Math.min(
        row[rightIndex] + 1,
        row[rightIndex - 1] + 1,
        diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      )
      diagonal = previous
    }
  }
  return row[right.length]
}

export function answerFeedback(puzzle: Puzzle, guess: string) {
  const normalisedGuess = normaliseAnswer(guess)
  const accepted = [puzzle.answer, ...puzzle.acceptedAnswers].map(normaliseAnswer)
  const closestDistance = Math.min(...accepted.map((answer) => editDistance(normalisedGuess, answer)))
  const nearMissLimit = Math.max(1, Math.floor(normaliseAnswer(puzzle.answer).length * 0.12))

  return closestDistance <= nearMissLimit
    ? 'Very close — check your spelling or wording.'
    : 'Not quite. Correct letters have been locked in place.'
}
