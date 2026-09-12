# Owner artwork review — 12 September 2026

Recovered 30 nonempty notes from the owner's uploaded saved HTML gallery. The original attachment and a separate extracted JSON preserve the exact comments. This implementation follows those notes, not the earlier assistant-generated shortlist.

Backup before edits: `backup/before-owner-artwork-comments-2026-09-12`, commit `5df0ab8e89c70a44a962f2beef236e8dbed481ce`.

Inspect all changes at `/?artworks=all&review=owner`. Uncheck **Reviewed fixes (30)** to view all 565 current puzzles. Each reviewed card includes **What changed**. Existing saved comments, flags and progress keys remain intact.

The implementation summary for each of the 30 puzzles is maintained in `src/data/ownerArtworkReview.ts`. Labels and their source artwork now share an SVG coordinate system and scale together without independent cropping. Calendar 252 retains its existing interaction with its visible status subtitle removed (screen-reader announcements remain).

## New scenes and generation prompt set

Built-in image generation was used. Final assets are versioned WebP files under `public/owner-*-v1.webp`. Transparent sprites retain alpha; source files were not overwritten. Prompts requested premium cinematic realism, safe margins, and no answer labels unless the clue requires text:

- 43: Preserve gold DOWN and antique globe; pull back to show complete globe and stand.
- 65: Joyful walker with feet on floating paired oxygen atoms; no AIR lettering.
- 67: Remove empty decorative plaque and centre 2 NONE.
- 148: Open casement window revealing a golden key, with running hourglass on sill.
- 285: Four theatrical actors standing on jumbled letter sculptures RDO, LPA, TCA, ECSN.
- 286: Matching Hello speech bubbles connected by an equals sign, without literal WORD/4/WORD.
- 288: Brain inside gap between stone ledges; separate transparent skipping figure animated twice.
- 289: Work desk encountered before a beach retreat along a continuous path; no answer labels.
- 294: Replace underwater plaque with stainless steel sink and faucet on the same chain; preserve swimmer.
- 296: Woodland stream background plus transparent floating person, drifting on tap.
- 320: Matching intact/shattered porcelain handshake frames plus transparent steel hammer; synchronised impact and shards.
- 321: Forced-perspective hands cupping the sunset plus separate transparent velvet cape lifted on tap.
- 333: Shy wooden human figure with exactly two scalloped bite-shaped notches; no gore.
- 343: Pull back to show the whole prosthetic arm and leg at the expensive checkout.
- 350: Three matching frames: stumble, fall, then injured person beside someone pointing and laughing.
- 450: Recognisable blue Earth beside crossed-out END; path continues past the cancelled marker.

## Review caveat

Puzzle 333 follows the requested **two bites**. Its answer remains **once bitten, twice shy**. The gallery explicitly flags this mismatch for the owner; no answer, accepted answer, ID, unlock or progress migration was changed.

## Validation

- TypeScript build and Vite production build pass. The existing bundle-size advisory remains.
- Content validator: 565 puzzles, zero errors/warnings.
- All 565 game renderers render and resolve their referenced image assets, including the 29 replacement SVG renderers and existing calendar 252.
- SVG snapshots inspected for calendar cells, loose tiles, plaques, equation, narrow opening and layered scenes.
- DOM checks exercise all eight tap controls and replay, 30/all-565 gallery filtering, comment-only export availability, existing-note persistence and a game-progress sentinel.
- Reduced-motion CSS gives immediate final states rather than prolonged movement.
- Cloud browser could not open the local preview (`ERR_BLOCKED_BY_CLIENT`). This is not an on-device browser visual sign-off.
