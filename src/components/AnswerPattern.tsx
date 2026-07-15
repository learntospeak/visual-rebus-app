import { answerLetters } from '../utils/answers'

interface AnswerPatternProps {
  pattern: string
  answer: string
  locked: boolean[]
  celebrating: boolean
}

export function AnswerPattern({ pattern, answer, locked, celebrating }: AnswerPatternProps) {
  const letters = answerLetters(answer)
  let answerIndex = 0

  return (
    <div className={`answer-pattern${celebrating ? ' is-celebrating' : ''}`} aria-label={`Answer pattern: ${pattern}`}>
      {pattern.split(/[-\s]+/).map((length, wordIndex) => (
        <span className="answer-word" key={`${length}-${wordIndex}`}>
          {Array.from({ length: Number(length) }, (_, letterIndex) => {
            const index = answerIndex++
            return (
              <span className={`letter-slot${locked[index] ? ' is-locked' : ''}`} key={letterIndex} aria-hidden="true">
                <span className="locked-letter">{locked[index] ? letters[index] : ''}</span>
              </span>
            )
          })}
        </span>
      ))}
    </div>
  )
}
