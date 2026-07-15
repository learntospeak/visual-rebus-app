# Build Checklist

## Phase 0 — Decision and setup — 2–3 hours

- [ ] Lock the product promise and primary audience.
- [ ] Choose temporary name criteria; do not spend more than 30 minutes naming.
- [ ] Confirm whether the Google Play account is subject to the 12-tester/14-day rule.
- [ ] Define the six supported puzzle formats.
- [ ] Create the first 10 puzzle specifications.

**Exit result:** a fixed scope, project folder and test content.

## Phase 1 — UX and visual system — 4–6 hours

- [ ] Wireframe Home, Puzzle, Solved, Packs, Daily and Settings.
- [ ] Apply the palette, typography, spacing and touch rules in the style guide.
- [ ] Make the puzzle card the dominant object.
- [ ] Define empty, wrong-answer, clue, solved and offline states.

**Exit result:** one consistent mobile interface system.

## Phase 2 — Project shell and navigation — 3–5 hours

- [ ] Create the mobile-first project in `src/`.
- [ ] Add screen navigation.
- [ ] Add local settings and progress storage.
- [ ] Confirm layouts on narrow and large phones.

**Exit result:** clickable screens with persistent local state.

## Phase 3 — Core puzzle engine — 8–12 hours

- [ ] Render puzzle content from structured data.
- [ ] Display word lengths without exposing letters.
- [ ] Normalise case, spaces and punctuation.
- [ ] Support accepted answer variants and near-miss feedback.
- [ ] Save completion and continue to the next puzzle.

**Exit result:** 25 text-based puzzles fully playable.

## Phase 4 — Six visual formats — 8–14 hours

- [ ] Typography placement.
- [ ] Text plus icon.
- [ ] Illustrated object placement.
- [ ] Scale, colour and rotation.
- [ ] Motion or animation.
- [ ] Simple interaction such as tap or drag.

**Exit result:** the engine supports the planned visual variety.

## Phase 5 — Differentiators — 6–10 hours

- [ ] Three-stage clue ladder.
- [ ] Optional answer reveal.
- [ ] Step-by-step solved explanation.
- [ ] Daily puzzle and streak.
- [ ] Share card that hides the answer.
- [ ] Fair/confusing/wrong-answer feedback.

**Exit result:** the app feels meaningfully better than a basic rebus clone.

## Phase 6 — Content production — 15–30 hours

- [ ] Build 120 playable puzzles.
- [ ] Build 30 reserve puzzles.
- [ ] Test each puzzle with at least three people.
- [ ] Record accepted spellings and regional labels.
- [ ] Reject ambiguous or culturally obscure items.

**Exit result:** 150 approved puzzle records.

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

## Overall effort

- Playable prototype: **12–18 hours**.
- Good MVP test build: **45–65 hours**.
- Launch-quality 150-puzzle version: **70–110 hours**, mostly content and QA.
