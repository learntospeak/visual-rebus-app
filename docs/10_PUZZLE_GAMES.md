# Puzzle games: 400-puzzle expansion
Clue Canvas includes Odd One Out, Visual Memory, What Comes Next and Which Doesn't Belong, 100 numbered puzzles each. All source/content stays in this repository and is bundled into Android. No Replit project or hosting was used.

Original 565 rebuses, IDs, approved art and progress schema remain unchanged. Home opens GamesScreen and a same-origin bundled view that isolates game styles. Existing app settings/music remain controlled by the app. No new audio, ads, payments or tracking calls.

## Difficulty progression
Five 20-puzzle bands per mode. These are editorial complexity bands, not measured human difficulty scores. Individual puzzle difficulty varies; lighter questions provide breathers.

| Numbers | Odd One Out | Visual Memory | What Comes Next | Which Doesn't Belong |
| --- | --- | --- | --- | --- |
| 1–20 | Nine tiles: directions and dot counts | Four objects; 10 seconds; positions | Alternation and fixed increases | Familiar categories |
| 21–40 | Sixteen tiles: turns and openings | Six objects; 9 seconds; positions | Three-part cycles, rotations, multiplication | Narrower categories |
| 41–60 | Twenty-five tiles: smaller outline/dot details | Nine objects; 8 seconds; positions/counts | Growing increases/interleaving | Number, spelling and shape properties |
| 61–80 | Outer symbol and inner arrow alignment | Twelve objects; 8 seconds; dots at a position | Shape cycle plus numbers | Matched pairs |
| 81–100 | Detailed symbols: alignment or openings | Sixteen objects; 7 seconds; two positions | Missing alternating/interleaved/compound steps | Two stated conditions |

Relaxed memory mode removes automatic hiding. Answers are untimed. Every question has a hint and explanation. Reusable mechanics have distinct parameters/boards; these are not 400 unrelated mechanics. Definition duplicates are rejected. SVG art is original project work; no paid/generated/stock artwork added.

## Progress
cluecanvas-games-progress-v1 stores valid IDs and best results on this device. Revealed/missed differs from solved; replay cannot downgrade a solve. Continue finds first unplayed puzzle. All numbers can be replayed. App Settings reset removes both rebus and game progress after existing confirmation.

Game progress does not sync to the account; shelf labels this explicitly. Original rebus sync is unchanged. Storage failures display a warning; damaged stored records are filtered.

Daily mix is fixed by local date, one puzzle per mode. All 100 per mode rotate over 100 days, then repeat. It can include any difficulty band. Best daily score persists. This is a finite collection, not an unlimited daily content feed.

## Source and verification
public/games/catalog.json contains stable odd-001 through belong-100 IDs. scripts/build-games-content.mjs deterministically builds content. engine.mjs validates saves, answers and daily selection; render.mjs draws SVGs/accessibility labels; app.js provides the maps and game loop. src/screens/GamesScreen.tsx integrates offline assets.

npm run build:games rebuilds the catalogue. npm run test:games verifies 400 IDs/definitions, unique choices, memory answers, directional relationships, independent sequence rules, damaged-save filtering and daily rotation. Production build includes these and the original 565-puzzle validation.

Browser checks covered every mode at 1/21/41/61/81, easy correct solve, advanced memory pair and compound pattern, numbered maps, reveal preserving prior solve, return to original home/rebus, saved progress, relaxed memory and 320px layout. Original interaction and reward tests passed. Signed Android AAB/APK build passed; packaged game files match source, APK signature verifies and upload signer matches existing code-3 release.

No physical Android device or configured emulator was available. Human enjoyment/difficulty testing is not claimed. Google Play upload/review, version-code availability and public rollout remain release steps. Prepared version 1.1.0/code4; do not silently publish.

Planet order checked against https://science.nasa.gov/solar-system/planets/ . Metric prefixes checked against https://www.bipm.org/en/measurement-units/si-prefixes . Other simple explanations reviewed in authoring; no independent blind/human testing claimed.
