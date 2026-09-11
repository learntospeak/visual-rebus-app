# Sequential interaction system

Puzzles 252 and 253 introduce reusable, definition-driven escape-room interactions.

## Architecture

- `src/interactions/types.ts` defines tap, drag, rotate, pinch, swipe and orientation rules.
- `src/interactions/engine.ts` evaluates interaction attempts without knowing puzzle IDs or visuals.
- `src/interactions/definitions.ts` owns each puzzle's ordered states, allowed actions, thresholds and non-spoiling feedback.
- `src/components/SequentialPuzzle.tsx` translates pointer and device-orientation input into generic attempts and renders the selected scene.
- `PuzzleScreen` knows only whether a puzzle uses a sequence and receives a generic solved event; it contains no puzzle-specific mechanics.

Each step accepts only its declared interaction. Incorrect attempts keep the current state and return neutral feedback. Reaching `solvedStep` calls the existing completion pipeline, preserving stars, progress, celebrations, daily mode and replay behaviour.

All pointer gestures have a visible accessible action. Device-orientation rules request permission where required and retain the accessible alternative.

## Initial puzzle flows

- 252 — swipe the timeline backwards, rotate its origin wheel counterclockwise, then pinch `YEAR` into the origin dot.
- 253 — swipe the storybook page, rotate the clock clockwise, then drag `ONCE` onto the illuminated position above the clock.

Run `npm run test:interactions` for deterministic rule and flow checks.
