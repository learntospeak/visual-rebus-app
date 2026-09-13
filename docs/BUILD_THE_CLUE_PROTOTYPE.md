# Build the Clue: The Last Bell

Standalone playtest at /build-the-clue/. No app imports, main-game routing changes, accounts, customer messages, spending, analytics or shared progress writes. The only persistence is optional local feedback under cluecanvas-build-the-clue-notes-v1, with a user-triggered JSON export. Title/answer checked against the existing 565-puzzle catalog; "domino effect" is new, whereas "chain reaction" already exists. The latter receives a helpful phrase-specific nudge.

## Loop

Place a straight section, bridge and turn into three gaps, rotate to connect, push, inspect where the dominoes stop, adjust and retry. Correct connections ring the bell, then unlock the word guess. The simulation traces directional connectivity rather than checking an answer configuration. Falling follows the traced sequence in the correct direction. This is a deterministic tabletop puzzle, not a general rigid-body physics sandbox.

Generated felt/walnut artwork was produced with the built-in image tool and optimized as felt.webp. SVG dominoes, bridge and bell are code-native and animated separately. Audio is optional, initially off; reduced motion is respected. No timer, lives or penalty for attempts. Main game unchanged.

## Validation

- node scripts/test-build-the-clue.mjs checks 384 arrangements, all symmetric solutions, failure reasons and phrase variants.
- Local jsdom interaction walkthrough verified failed attempt/retry, placement and rotation, successful run, wrong/correct phrase, replay, reset during a run, and isolated feedback storage.
- SVG board rendered with Resvg and visually inspected with the final background.
- Main Vite build succeeded; standalone files are copied through public/.
- Browser could not open the local preview (ERR_BLOCKED_BY_CLIENT). Physical phone layout, audio, and animation quality require the owner's playtest; no browser/device signoff claimed.

## Local preview

From the repository root: python -m http.server 8787 --directory public
Open http://localhost:8787/build-the-clue/.

Backup: backup/before-build-the-clue-prototype-2026-09-13.
