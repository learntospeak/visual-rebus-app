# Clue Canvas — Phase 1 UX Specification

## Experience principles

- The puzzle is always the dominant object.
- Players can begin without an account or lengthy instructions.
- Clues help progressively without making the player feel punished.
- Navigation, rewards and settings remain visually secondary.
- All core puzzle content remains usable offline.

## Screen map

`First visit → Onboarding → Home → Puzzle → Solved → Next puzzle`

From Home, players can also open Daily Puzzle, Packs or Settings.

## Onboarding

Show only on the first visit. A replay option is available in Settings.

1. Present one simple example puzzle.
2. Explain that position, size, direction and pictures can affect the answer.
3. Demonstrate the Clue button once.
4. Offer one clear **Start playing** action.

No account request, multi-page introduction or permission prompt.

## Home

- Continue or start the current pack as the primary action.
- Show Daily Puzzle and Packs as secondary actions.
- Show overall progress quietly.
- Provide access to Settings without turning the page into a dashboard.

## Puzzle

- Central puzzle card, answer pattern and text entry.
- Progressive Clue and primary Submit actions.
- Show puzzle number, progress and difficulty.
- Wrong answers preserve correctly positioned letters and provide calm feedback.
- A blank submission says, “Enter your answer first.”

## Solved

- Brief celebration followed immediately by the answer.
- Explain how each visual element produces the solution.
- Provide Next Puzzle as the primary action.
- Add a spoiler-free share result when sharing is implemented.

## Daily Puzzle

- One calendar-day puzzle, consistent for all players.
- Clues remain available.
- Track current and longest streak locally.
- Missing a day does not produce punitive language.
- Solved results can be shared without revealing the answer.

## Packs

Packs and Chapters are one combined screen. Each card shows its name, theme, completion progress, availability state and eventual price or unlock requirement.

Initial structure:

1. Starter Pack
2. Between the Lines
3. Picture Puzzles
4. Twist Your Thinking
5. Future themed packs

## Settings

- Sound on/off.
- Reduced celebrations.
- Larger text.
- High contrast.
- Replay tutorial.
- Reset progress, with confirmation.
- Privacy and support links.

## Required interface states

- **Empty answer:** request an answer without marking the puzzle wrong.
- **Wrong answer:** calm near-miss message; retain correctly positioned letters.
- **Clue:** reveal one clue at a time and show when all clues are used.
- **Solved:** short celebration, answer explanation and next action.
- **Offline:** downloaded packs and saved progress continue working. If an online-only action is attempted, explain that it needs a connection and offer a retry; never block ordinary puzzle play.

## Visual system

- Modern editorial puzzle-card direction.
- Ink `#183B56`, teal `#2CB1A6`, coral `#FF6B5F`, warm paper `#F7F3EA` and restrained gold `#F2C94C`.
- Manrope for headings and Inter/system type for body and inputs.
- Minimum 44 × 44 point touch targets.
- Meaningful 150–250 ms transitions and reduced-motion support.

## Phase 1 exit result

The complete mobile experience has a consistent visual system and defined behaviour. Implementation of newly specified screens and settings belongs to later build phases.
