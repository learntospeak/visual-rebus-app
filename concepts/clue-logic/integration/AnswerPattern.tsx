import { answerLetters } from '../../../src/utils/answers'

export function AnswerPattern({ pattern, answer, locked, celebrating, guess }: {
  pattern: string; answer: string; locked: boolean[]; celebrating: boolean; guess: string
}) {
  const letters = answerLetters(answer)
  const draft = answerLetters(guess)
  let answerIndex = 0
  return <div className={`answer-pattern${celebrating ? ' is-celebrating' : ''}`} aria-label={`Answer pattern: ${pattern}. Typed letters are an unsubmitted preview.`}>
    {pattern.split(/[-\s]+/).map((length, wordIndex) => <span className="answer-word" key={wordIndex}>
      {Array.from({ length: Number(length) }, (_, letterIndex) => {
        const index = answerIndex++
        return <span className={`letter-slot${locked[index] ? ' is-locked' : ' is-draft'}`} key={letterIndex} aria-hidden="true">
          <span className="locked-letter">{locked[index] ? letters[index] : draft[index] ?? ''}</span>
        </span>
      })}
    </span>)}
  </div>
}
