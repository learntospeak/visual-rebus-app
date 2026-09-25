# Clue Logic integration playtest

This is a separate React entry point for **Before Service**, the approved kitchen animation, inside the existing Clue Canvas puzzle interface. It is not registered in the main game's routes or puzzle list. Main-game source, saves, accounts, purchases and deployment configuration are unchanged.

## Run and build

From the repository root:

```sh
npx vite --config concepts/clue-logic/integration/vite.config.ts
npx tsc -p concepts/clue-logic/integration/tsconfig.json
npx tsx --test concepts/clue-logic/integration/state.test.ts
node --test concepts/clue-logic/test.mjs
npx vite build --config concepts/clue-logic/integration/vite.config.ts
```

The independent output is `concepts/clue-logic/integration-dist/` (ignored by Git). The ordinary `npm run build` remains the main game build and does not include this entry point. Vite warns about unused main-app CSS image URLs and the lazy Three.js chunk size; the prototype does not use those background selectors.

## Integration boundary

`LogicChapter` exports `onExit`, optional `onComplete({puzzleId, lifelines, hintsUsed})`, and an optional `storageKey`. Its default save key is `cluecanvas.clueLogic.integration.v1`. Save restoration replays validated actions, never trusts saved lives, and does not fire completion callbacks. Mount with a React key when changing the storage namespace. The host owns navigation and any future progress/account connection.

`AnimatedClue` is a renderer with play, pause, replay, look, enlarge, and paid-hint signals. It owns no puzzle answers, purchases, or progress. Three.js loads only when this component mounts. It releases its animation loop, event listeners, geometry, textures, materials and WebGL context on unmount. The approved scene geometry, lighting, camera choreography and aspect ratios are unchanged.

The prototype imports the real Button, AnswerPattern, CluePanel, ProgressBar, SolvedScreen, types and stylesheet from `src/`. `PuzzleScreen.tsx` is an isolated copy of the main screen with an injected visual slot and chapter-specific lifeline rules. This avoids changing the shipping component before review. When integration is approved, extract that slot and the compact keyboard into shared components, then register the chapter behind an opt-in feature flag. Do not merge the standalone copy into the main navigation as a second competing UI.

## Rules and safeguards

- Three lifelines; incorrect letters/phrases and opening a clue cost one.
- Correct letters appear only in their answer positions; repeated guesses do not charge twice.
- Hints close at one remaining life so a hint cannot end the round.
- Looking, replaying, reviewing an already-opened clue and the accessible scene description are free.
- Exhausting lives ends the round; retry resets only this attempt.
- Restoring a save always leaves the animation at the play button.
- Reduced-motion users can step through the scene. Background tabs pause playback. Failed WebGL loading offers a scene description.

## Validation and release boundary

Automated checks cover corrupt-save recovery, hints and repeated guesses, failure lockout, saved wins, the existing ten-scene rules, TypeScript and the main 565-puzzle production build. Browser testing covers desktop and 390px/320px layouts, correct letters, paid hints, failure/retry, save restoration, play-button restoration and enlarged viewing.

This remains a one-puzzle integration sample, not a complete paid chapter. Real Android/iPhone performance, reduced-motion device behavior, chapter continuation, final narrative reveal, pricing and purchases still need acceptance testing or implementation. Keep the PR in draft and the playtest separate until the owner approves the experience.

## Optional narration and subtitles

The owner approved the visual prototype on 25 September 2026. Voice-over and subtitles now have independent, remembered controls. Voice defaults off and subtitles default on; narration starts only with user interaction. Preferences use `cluecanvas.clueLogic.media.v1`, separate from puzzle progress.

This prototype uses the browser/device's English speech voice (Australian English preferred when installed), not a recorded actor or generated audio asset. Voice quality and availability depend on the device. Narration uses the exact approved caption script and changes with the scene. It cancels stale speech on scene changes, pause, mute, backgrounding and unmount. A speech error turns subtitles on. Listening does not cost a lifeline or reveal extra answers. Real-phone voice playback and perceived voice quality still require owner testing.

Run the audio lifecycle and cue tests with `npx tsx --test concepts/clue-logic/integration/narration.test.ts concepts/clue-logic/integration/state.test.ts`.

Narration refinement: the main 22-second sequence now contains only three short in-scene lines (Come on…, One second., Still waiting?), separated by silence. Subtitles match those lines and disappear between them. Manual looking is silent; the opened hint says Let me see…. The device voice and animation are unchanged.

Timing correction: Come on starts at 5.6s after the pot close-up settles; a local synthesised double knock starts at 7.7s, and One second starts at 8.5s. The knock follows the voice-over switch and is captioned for silent viewing. Camera choreography is unchanged.

Detective delivery: retain the same device voice, with rate 0.88, pitch 0.86 and volume 0.82. Short lines now end with ellipses for a quieter thinking-aloud feel. Cue start times and camera motion stay fixed. Expressive delivery varies by device speech engine; recorded narration would provide finer acting control.
