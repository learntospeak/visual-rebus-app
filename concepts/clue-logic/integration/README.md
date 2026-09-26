# Clue Logic integration playtest

This is a separate React entry point for seven connected 3D scenes, inside the existing Clue Canvas puzzle interface. It is not registered in the main game's routes or puzzle list. Main-game source, saves, accounts, purchases and deployment configuration are unchanged.

## Run and build

From the repository root:

```sh
npx vite --config concepts/clue-logic/integration/vite.config.ts
npx tsc -p concepts/clue-logic/integration/tsconfig.json
npx tsx --test concepts/clue-logic/integration/*.test.ts
node --test concepts/clue-logic/test.mjs
npx vite build --config concepts/clue-logic/integration/vite.config.ts
```

The independent output is `concepts/clue-logic/integration-dist/` (ignored by Git). The ordinary `npm run build` remains the main game build and does not include this entry point. Vite warns about unused main-app CSS image URLs and the lazy Three.js chunk size; the prototype does not use those background selectors.

## Integration boundary

`LogicChapter` exports `onExit`, optional `onComplete({puzzleId, lifelines, hintsUsed})`, an optional `storageKey`, and `initialScene` (0 through 6). Its default save key is `cluecanvas.clueLogic.integration.v1`. Save restoration replays validated actions, never trusts saved lives, and does not fire completion callbacks. Mount with a React key when changing the storage namespace. The host owns navigation and any future progress/account connection.

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

This is a seven-puzzle integration sample, not a complete paid chapter. Real Android/iPhone performance, reduced-motion device behavior, further chapter continuation, final narrative reveal, pricing and purchases still need acceptance testing or implementation. Keep the PR in draft and the playtest separate until the owner approves the experience.

## Sound-only scene

Voice, subtitles, their controls, preferences and speech-synthesis code have been removed at the owner's request. Play starts a low flame bed. A real recorded wooden-door knock plays at 7.7 seconds. Rapid bubbling builds during the visual look-away interval (9–18.2 seconds), then settles as the camera returns. Manual look and paid clue views follow the same sound mix. Pause, backgrounding, completion and exit silence playback; replay resets the knock. The existing accessible scene-description disclosure remains available.

See audio/CREDITS.md for the public-domain knock recording and original generated flame loop and CC0 real pot-boiling recording. All playback uses local WAV assets, without external audio services. Old voice/subtitle preferences are no longer read. Actual speaker/headphone balance still benefits from owner listening tests.

Validation: TypeScript, independent build, sound-mix and knock-boundary tests, saved-state tests, and browser checks for removed controls and playback interactions.

The boiling layer now uses a real pot recording instead of pitched synthetic bubbles, at a lower level with softer gain transitions. Camera and knock timing are unchanged.

## Second scene

A Balancing Problem continues at the service counter with three spinning porcelain plates, timed wobble/recovery, a first-person gloved hand and recorded ceramic clinks. The approved first renderer and audio assets remain unchanged; the second renderer intentionally owns its geometry and choreography separately. Next puzzle advances from the first solved screen. The home screen also offers direct access for playtesting. Scene two saves under the base storage key plus .plates. Retry affects only its own scene. Both phrases and aliases pass the novelty check against all 565 existing puzzles. Difficulty is provisional until player testing.

## Five-scene continuation

Scenes 3–7 add the molehill/mountain, carpet, drain, hole and spilled-milk sequences. Each uses a deterministic 26-second 3D sequence, alternate camera angle, paid clue close-up, accessible scene description and separate save key. Home offers direct access to every scene and a button to start the five new scenes. The original kitchen and plate renderer files are unchanged.

New Foley is original quiet filtered-noise synthesis in story-sound.ts; it is not a field recording. No speech, subtitles or external audio service. New character geometry is volumetric and local. The full final metapuzzle is still not part of this seven-scene build.

Validation for this batch: 15 tests passed, including geometry at half-second intervals through every new scene and clue view, aliases, independent saves and failure. Novelty passed against 565 puzzles. TypeScript and isolated build passed. Browser automation reported no available browser in this session, so visual/device/audio acceptance of this new batch remains for owner playtesting; earlier browser checks above apply to the first two scenes only.

Latest playtest corrections: every LogicRound mount resets window scroll immediately and on the next animation frame. The mountain scene establishes the molehill for seven seconds and then grows it without a shovel or dirt particles. Synthetic Foley for scenes 3–7 is disconnected following owner feedback; those scenes are intentionally silent pending suitable sound design. Approved kitchen and plate audio remain. TypeScript, independent build and all 15 tests pass. Browser unavailable for scroll/device verification.

Molehill revision: an original animated mole makes two excursions before an original wizard transforms the mound into a towering original armoured knight. Camera pulls back from the mole to the transformation. The one-life clue shows a THE MOUNTAIN nameplate. No actor image, likeness or franchise armour asset is used. Scene remains silent. Tests now assert the initial mole, final knight, paid-only nameplate and replay reset. Browser still unavailable for visual acceptance.

Storybook style test: Scene 3 now lazy-loads storybook-scene.mjs, a Canvas2D illustrated sequence, instead of the previous 3D characters. Project-bound generated background and alpha character atlas, with all prompts, are under art/storybook/. Mole travel and gait poses, wizard pose blend, spell particles, smoke reveal, camera pull-back and paid nameplate are deterministic. It is layered illustration, not a rendered video. Scenes 1, 2 and 4–7 retain their renderers. Async image loading is awaited and disposed safely if navigation occurs during loading. 17 tests and TypeScript/build pass; browser review remains unavailable.

## Opening-night mystery experiment

A separate home card opens a five-room case using the pot, plates, rug, drain and milk puzzles. Each completed phrase unlocks one styled evidence document; reading is free. The final person-and-ingredient deduction unlocks after all five discoveries. It has three independent attempts, duplicate theories are free, and retry preserves evidence. The brief establishes exactly three people with access. The timeline and continuous alibi exclude two suspects; the torn packet and delivery batch match identify the ingredient. A fifth recipe note provides context; the final admission confirms motive rather than pretending the note proves intent. The wizard remains standalone.

Case progress uses cluecanvas.openingNight.case.v1; puzzle actions use its separate .rounds namespace, preserving standalone saves. This iteration tests evidence and deduction using existing restaurant animations; the proposed storybook carpet rework and replay loop are not implemented here. 21 tests and TypeScript/build pass. Browser unavailable for interactive and mobile visual verification.
