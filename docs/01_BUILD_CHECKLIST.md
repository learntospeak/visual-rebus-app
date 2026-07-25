# Build Checklist

## Phase 0 — Decision and setup — 2–3 hours

- [x] Lock the product promise and primary audience: fair, satisfying visual riddles for casual players and families.
- [x] Choose working name: **Clue Canvas**. Registered `cluecanvas.games` and `cluecanvas.com.au` for one year on 19 July 2026; formal trademark clearance remains a pre-release task.
- [x] Confirm Google Play requirement: a new personal developer account will require 12 opted-in closed testers for 14 continuous days before applying for production access.
- [x] Define the six supported puzzle formats: placement, repetition, scale, transformation, text plus image, and colour/movement/interaction.
- [x] Create the first 10 puzzle specifications: exceeded with 25 complete, validated puzzles.

**Exit result:** a fixed scope, project folder and test content.

## Phase 1 — UX and visual system — 4–6 hours

- [x] Wireframe Home, Puzzle, Solved, Packs, Daily and Settings in `docs/08_PHASE_1_UX_SPEC.md`.
- [x] Apply the palette, typography, spacing and touch rules in the style guide.
- [x] Make the puzzle card the dominant object.
- [x] Define empty, wrong-answer, clue, solved and offline states in `docs/08_PHASE_1_UX_SPEC.md`.

**Exit result:** one consistent mobile interface system.

## Phase 2 — Project shell and navigation — 3–5 hours

- [x] Create the mobile-first project in `src/`.
- [x] Add navigation for Onboarding, Home, Daily, Packs, Puzzle, Solved and Settings.
- [x] Add local settings and progress storage.
- [x] Confirm compact and large-phone layouts, including a 320px breakpoint.

**Exit result:** clickable screens with persistent local state.

## Phase 3 — Core puzzle engine — 8–12 hours

- [x] Render puzzle content from structured data.
- [x] Display word lengths without exposing letters.
- [x] Normalise case, spaces and punctuation.
- [x] Support accepted answer variants and spelling/wording near-miss feedback.
- [x] Save completion and continue to the next puzzle.

**Exit result:** 25 text-based puzzles fully playable.

## Phase 4 — Six visual formats — 8–14 hours

- [x] Typography placement through reusable visual templates.
- [x] Text plus icon.
- [x] Illustrated object placement with a named asset registry.
- [x] Scale, colour and rotation.
- [x] Motion: animated Falling Asleep puzzle with reduced-motion fallback.
- [x] Interaction: tap-to-break Broken Heart puzzle.

**Exit result:** the data-driven engine supports the planned visual variety and can scale through catalogue records without puzzle-ID renderer branches.

## Phase 5 — Differentiators — 6–10 hours

- [x] Three-stage clue ladder.
- [x] Optional answer reveal after all clues; revealed puzzles earn no stars and remain replayable.
- [x] Step-by-step solved explanation.
- [x] Date-based daily puzzle with current/longest streak; reveals do not extend it.
- [x] Spoiler-free result sharing through the device share sheet with clipboard fallback.
- [ ] Add a discreet Report Puzzle action only when it connects to a real feedback channel; local-only feedback UI was removed.

**Exit result:** the app feels meaningfully better than a basic rebus clone.

## Phase 6 — Content production — ongoing in 25-puzzle batches

- [ ] Build 525 approved playable puzzles.
- [ ] Maintain 50 additional reserve/replacement candidates.
- [ ] Release content in validated 25-puzzle batches.
- [ ] Test each puzzle with at least three people.
- [ ] Record accepted spellings and regional labels.
- [ ] Reject ambiguous or culturally obscure items.

**Milestones:** 50-puzzle beta, 100-puzzle content test, 300-puzzle major library and 525-puzzle complete journey.

**Exit result:** 525 approved playable records plus a healthy replacement pipeline.

## Phase 7 — Monetisation and analytics — 6–10 hours

- [ ] No forced ad in the first 10 puzzles.
- [ ] Optional rewarded ad for an extra clue or skip.
- [ ] One clearly described ad-free/supporter purchase.
- [ ] Restore-purchase flow.
- [ ] Minimal analytics: start, solve, fail, clue, reveal, abandon, purchase and crash.

**Exit result:** monetisation does not contradict the purchase promise.

## Phase 8 — Accessibility and QA — 8–14 hours

- [ ] Large-text mode.
- [ ] High contrast.
- [ ] Reduced motion.
- [ ] Sound and haptics toggles.
- [ ] Screen-reader labels.
- [ ] Offline test.
- [ ] Close/reopen and update survival test.
- [ ] Test at least three Android devices or screen sizes.

**Exit result:** stable beta candidate.

## Phase 9 — Store and legal package — 6–9 hours

- [ ] Unique icon and screenshots.
- [ ] Store title, subtitle, description and keywords.
- [ ] Privacy policy and support email.
- [ ] Google Data safety and age-rating answers.
- [ ] Purchase wording and screenshots match actual behaviour.

**Exit result:** store-ready submission package.

## Phase 10 — Closed beta and fixes — 4–8 hands-on hours plus waiting period

- [ ] Recruit testers early.
- [ ] Run required closed testing when applicable.
- [ ] Review feedback and analytics.
- [ ] Fix crashes, lost progress, purchase issues and confusing puzzles.

**Exit result:** release candidate.

## Phase 11 — Mastery assessment and continuing journey

- [ ] Give players a short baseline challenge near the beginning of the journey.
- [ ] Add comparable milestone challenges after major worlds.
- [ ] Compare solve rate, clues used, solve time and visual-mechanic mastery.
- [ ] Show personal improvement without claiming changes to IQ or general aptitude.
- [ ] Recommend replay paths for weaker mechanics.
- [ ] Unlock an end-of-journey Clue Canvas Challenge and personal summary.

**Exit result:** players can see measurable improvement in their Clue Canvas puzzle-solving skills and have a meaningful reason to continue mastering the game.

## Overall effort

- Playable prototype: **12–18 hours**.
- Good MVP test build: **45–65 hours**.
- Content production and QA scale with every 25-puzzle batch; the 525-puzzle journey is a continuing production programme rather than a single short build.
