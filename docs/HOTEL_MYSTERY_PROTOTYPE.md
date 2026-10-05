# The Curious Hotel — scene mystery prototype

Standalone entry: /hotel-mystery/. The main game, its route and progress are unchanged.

## Play

Explore a single lobby. Tap the trolley to move it, the freed rug to lift it, and the exposed papers to inspect the complaints. Inspect the red guestbook and turn the page to discover missing pages. Guestbook and rug evidence can be found in either order. Submit the expression after examining both pieces of evidence. Rug/carpet and sweep/sweeping/swept variants are accepted. The lit passage marks a clearly labelled end to this one-room prototype.

Large invisible object targets are keyboard accessible; optional Show objects reveals their labels. Bell gives a small response without being necessary. Sound starts off and is enabled only by the player's button. Reduced motion skips transitions. Props use simple direct actions rather than inventory or combination systems.

Four matching lobby states are generated artwork in a single sprite sheet, displayed through CSS frame selection and a short crossfade. This is illustrated state animation, not a 3D trolley/cloth simulation. The guestbook page-turn and inspection papers are native HTML/CSS for readable clues. No product spending or external calls. Feedback is stored only under cluecanvas-hotel-mystery-feedback-v1 and exported only when the player downloads it.

## Verification

- node scripts/test-hotel-mystery.mjs: prerequisites, both investigation orders, frame mapping, immutable state and phrase variants.
- Local jsdom walkthrough: caught rug, moved trolley, lifted rug, papers, guestbook page turn, early-answer gate, wrong/correct answers, passage ending and reset. No main storage writes.
- Vite production build passed; all prototype assets are static public/ files.
- Artwork reviewed and hit regions aligned to final sprite positions. Full phone visual/audio verification remains outstanding (the browser has reported ERR_BLOCKED_BY_CLIENT on this project's previews).

Backup: backup/before-hotel-mystery-2026-09-13.
