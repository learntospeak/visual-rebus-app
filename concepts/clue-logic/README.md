# Clue Logic: The Grand Opening

A standalone, draft chapter for owner playtesting: nine animated phrase puzzles followed by one bigger-picture finale. Original SVG scenes run locally, with no AI, video service, account, tracking or paid assets required. This is a concept test, not approved production content.

Run `npm run dev` from the repository root and open `/concepts/clue-logic/`. Alternatively, serve this directory with any static HTTP server. All six runtime files must stay together: index.html, style.css, app.mjs, chapter.mjs, engine.mjs and scenes.mjs.

## Rules

- Three lifelines reset for each scene. An incorrect letter, incorrect phrase or new hint costs one.
- Correct letters appear only in their correct slots. Repeat guesses and reopening hints are free.
- Hints provide a detail and a correct letter. They close at one remaining lifeline.
- Zero ends the attempt. Retry the scene without losing earlier solved scenes.
- Nine solved scenes unlock the final phrase. The notebook retains the narrative evidence.
- Pause, replay and frame stepping are free. Reduced-motion users start paused; accessible scene descriptions are available through How to play.
- Progress is saved locally on this device. Restart chapter clears only this prototype's save.

## Validation

`node concepts/clue-logic/test.mjs` tests lifelines, letter placement state, aliases, retries/failure boundaries, save restoration, finale gating and SVG frame validity.

`npx tsx concepts/clue-logic/check-novelty.mjs` checks all new answers and aliases against the real puzzle bank. Exact/normalised checks do not replace editorial review of synonymous phrases.

This folder is intentionally excluded from the main Vite production entrypoint. No Android build, existing puzzle, account, purchase flow or production save is changed.

## Playtest questions

Can you infer the action without a hint? Does the sequence feel connected? Which puzzles feel too obvious or unfair? Is losing a lifeline for a hint a worthwhile choice? Does the finale reward noticing the story? Difficulty labels are provisional until blind playtesting. The later scenes currently test sequencing and consequence rather than introducing unfamiliar sayings.

Before production: blind-test answer ambiguity and difficulty, test real iOS/Android devices and assistive technology, and decide whether the meta puzzle needs less explicit clues. These animations are a prototype of the continuing-story mechanic, not finished video cinematics.
