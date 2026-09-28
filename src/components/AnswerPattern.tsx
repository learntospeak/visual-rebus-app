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
      {answer.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return <span className="answer-space" aria-hidden="true" key={`space-${partIndex}`} />
        }

        return (
          <span className="answer-word" key={`word-${partIndex}`}>
            {Array.from(part).map((character, characterIndex) => {
              if (!/[A-Za-z]/.test(character)) {
                return (
                  <span className="answer-punctuation" aria-hidden="true" key={`punct-${characterIndex}`}>
                    {character}
                  </span>
                )
              }

              const index = answerIndex++
              return (
                <span className={`letter-slot${locked[index] ? ' is-locked' : ''}`} key={`letter-${characterIndex}`} aria-hidden="true">
                  <span className="locked-letter">{locked[index] ? letters[index] : ''}</span>
                </span>
              )
            })}
          </span>
        )
      })}
    </div>
  )
}
