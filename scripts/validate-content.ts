import { puzzles } from '../src/data/puzzles'
import { validatePuzzles } from '../src/data/validation'

const result = validatePuzzles(puzzles)

console.log(`Validated ${result.summary.puzzleCount} puzzles.`)
console.log('Chapters:', result.summary.chapters)
console.log('Difficulties:', result.summary.difficulties)
console.log('Mechanics:', result.summary.mechanics)
console.log('QA statuses:', result.summary.qaStatuses)

for (const warning of result.warnings) console.warn(`WARNING: ${warning}`)
for (const error of result.errors) console.error(`ERROR: ${error}`)

if (result.errors.length) {
  console.error(`Content validation failed with ${result.errors.length} error(s).`)
  process.exit(1)
}

console.log(`Content validation passed with ${result.warnings.length} warning(s).`)
