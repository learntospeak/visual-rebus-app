# Visual Rebus Expansion Roadmap

This is the working checklist for expanding the prototype into an engaging 525-puzzle game. Update this document whenever a task is completed, rejected or moved.

## Current status

- [x] Mobile-first React and TypeScript prototype
- [x] Home → Puzzle → Solved → Next loop
- [x] First 25-puzzle starter pack
- [x] Progressive three-stage clues
- [x] Correct-position letter locking
- [x] Rainbow completion animation
- [x] Harp-style completion chime
- [x] Local progress saving
- [x] Direct puzzle review links using `?puzzle=NUMBER`
- [x] GitHub repository and automatic mobile deployment
- [x] Visual asset quality standard
- [ ] Scalable content and progression architecture
- [ ] 525 approved playable puzzles

## Product target

Build a fair, polished visual-rebus game with:

- 525 approved puzzles;
- steadily increasing difficulty;
- varied visual, motion and interaction mechanics;
- useful clues and satisfying explanations;
- chapter progression without manipulative monetisation;
- consistent original vector artwork;
- daily and replayable modes after the core journey is proven.

## Target content structure

| Chapter | Working title | Levels | Primary mechanics | Difficulty |
|---|---|---:|---|---|
| 1 | First Steps | 1–25 | Basic placement, scale, icons and rotation | Easy |
| 2 | Between the Lines | 26–75 | Word position, spacing, repetition and containers | Easy–Medium |
| 3 | Picture This | 76–150 | Original vector objects and mixed text-image clues | Medium |
| 4 | Twist Your Thinking | 151–225 | Rotation, colour, direction and relative scale | Medium–Hard |
| 5 | Moving Parts | 226–300 | Meaningful animation, tapping and dragging | Medium–Hard |
| 6 | Double Meaning | 301–400 | Two compatible visual mechanisms per puzzle | Hard |
| 7 | Expert Rebus | 401–500 | Multi-stage visual reasoning | Hard–Expert |
| 8 | Master Challenges | 501–525 | Bespoke milestone and mixed-mechanic puzzles | Expert |

No puzzle enters the published count until it passes the content and artwork approval gates.

---

## Phase 1 — Scalable foundation

### 1.1 Split application responsibilities

- [x] Move screen components out of `App.tsx`.
- [x] Create a dedicated Home screen.
- [ ] Create a dedicated Chapter Map screen.
- [x] Create a dedicated Puzzle screen.
- [x] Create a dedicated Solved screen.
- [ ] Create reusable button components.
- [ ] Create reusable progress components.
- [x] Create a reusable answer-pattern component.
- [ ] Create a reusable clue component.
- [x] Create a shared audio service.
- [ ] Create a shared celebration service.
- [x] Move answer normalization and checking into shared utilities.
- [x] Move local progress persistence and direct-link syncing into a service.
- [ ] Add a central settings and progress store.

### 1.2 Upgrade the puzzle schema

- [x] Add `chapterId` and chapter order.
- [x] Add mechanic tags.
- [x] Add difficulty score from 1–10 in addition to Easy/Medium/Hard labels.
- [x] Add estimated solve time.
- [x] Add prerequisite or unlock rules.
- [x] Add artwork version and asset-credit fields.
- [x] Add tester results and approval status.
- [x] Add optional motion and interaction instructions.
- [x] Add analytics-safe puzzle version identifier.

### 1.3 Build a data-driven visual grammar

- [ ] Word and letter elements.
- [ ] Vertical and horizontal stacks.
- [ ] Above, below, inside, outside and between relationships.
- [ ] Repetition and count patterns.
- [ ] Size and weight variations.
- [ ] Rotation, reversal and mirroring.
- [ ] Colour emphasis with a non-colour accessibility signal.
- [ ] Lines, boxes, dividers, arrows and paths.
- [ ] Reusable vector-object library.
- [ ] Simple entrance and looping motion.
- [ ] Tap, select and drag interactions.
- [ ] Accessible description generated or supplied for every composition.

### 1.4 Content validation tools

- [x] Validate unique puzzle IDs.
- [x] Validate answers against word patterns.
- [x] Validate exactly three clues and at least one explanation step.
- [x] Validate accepted-answer normalization.
- [x] Reject missing region, creator, asset source or QA status.
- [x] Flag duplicate answers and near-duplicate visual concepts.
- [x] Produce a content summary by chapter, difficulty and mechanic.
- [x] Run validation automatically during production builds.

**Phase 1 exit gate:** a new puzzle can be added as structured data without editing `App.tsx` or writing puzzle-specific CSS.

---

## Phase 2 — Journey and engagement

### 2.1 Chapter map

- [ ] Create a chapter-selection screen.
- [ ] Show solved, current and locked chapters.
- [ ] Show puzzle count and completion percentage per chapter.
- [ ] Add a clear Continue button.
- [ ] Allow replay of completed puzzles.
- [ ] Preserve direct puzzle-review links for QA.

### 2.2 Unlocking and difficulty curve

- [ ] Unlock Chapter 1 immediately.
- [ ] Define how many puzzles must be solved to unlock the next chapter.
- [ ] Never require perfect scores to continue the main journey.
- [ ] Introduce only one unfamiliar mechanic at a time.
- [ ] Place easier recovery puzzles after difficult milestones.
- [ ] Add optional Expert paths without blocking casual players.

### 2.3 Stars and mastery

- [ ] Award three stars for solving without clues.
- [ ] Award two stars after clue 1.
- [ ] Award one star after clues 2–3 or answer reveal.
- [ ] Do not reduce stars based on solve speed in normal mode.
- [ ] Allow unlimited replay to improve a result.
- [ ] Show chapter mastery without making it mandatory.

### 2.4 Milestones and celebrations

- [ ] Add a special puzzle every 10 levels.
- [ ] Add a chapter-completion celebration.
- [ ] Add restrained achievement badges.
- [ ] Add a solved-phrase collection with explanations.
- [ ] Add sound, haptics and reduced-celebration settings.
- [ ] Keep celebrations brief and skippable.

### 2.5 Retention features — after the journey works

- [ ] Daily puzzle.
- [ ] Daily streak with a forgiving recovery rule.
- [ ] Share card that never reveals the answer.
- [ ] Optional timed mode unlocked after normal play.
- [ ] Weekly themed challenge.
- [ ] Personal statistics stored locally.

**Phase 2 exit gate:** players can see where they are, understand what unlocks next and feel rewarded without coins, adverts or pressure.

---

## Phase 3 — First expansion to 100 puzzles

### Chapter 2: levels 26–75

- [ ] Draft 60 globally familiar phrase candidates.
- [ ] Reject regional, obscure and duplicate candidates.
- [ ] Select the best 50.
- [ ] Create visual specifications before artwork.
- [ ] Produce original visuals under the asset standard.
- [ ] Write three progressive clues for each puzzle.
- [ ] Write concise explanations for each puzzle.
- [ ] Record accepted answers and spelling variants.
- [ ] Validate all records automatically.
- [ ] Blind-test each puzzle with at least three people.
- [ ] Approve, revise or reject every puzzle.

### Chapter 3: levels 76–100 initial set

- [ ] Draft 35 text-image phrase candidates.
- [ ] Select the best 25.
- [ ] Create reusable vector objects before one-off assets.
- [ ] Complete clues, explanations, variants and accessibility text.
- [ ] Validate and blind-test all 25.

### 100-puzzle release gate

- [ ] Exactly 100 approved puzzles are playable.
- [ ] No single visual mechanic exceeds one-third of the library.
- [ ] Difficulty increases gradually inside each chapter.
- [ ] At least 85% of tester ratings describe puzzles as fair.
- [ ] Direct links work for all 100 puzzles.
- [ ] Progress survives refresh, offline use and app updates.
- [ ] Full mobile QA passes on iOS and Android.

---

## Phase 4 — Expansion from 100 to 300

- [ ] Complete Chapter 3 through level 150.
- [ ] Complete Chapter 4 through level 225.
- [ ] Build and test motion primitives.
- [ ] Build and test tap and drag primitives.
- [ ] Complete Chapter 5 through level 300.
- [ ] Review difficulty and abandonment data after each 25-puzzle batch.
- [ ] Replace low-fairness puzzles instead of merely rewriting clues.
- [ ] Confirm performance remains smooth on lower-end phones.

**Phase 4 exit gate:** 300 approved puzzles, with motion and interaction improving meaning rather than acting as decoration.

---

## Phase 5 — Expansion from 300 to 525

- [ ] Complete Chapter 6 through level 400.
- [ ] Complete Chapter 7 through level 500.
- [ ] Create 25 bespoke Master Challenges.
- [ ] Review all answer overlap and near-duplicate concepts.
- [ ] Rebalance chapter unlock requirements.
- [ ] Re-test early chapters against the final quality standard.
- [ ] Complete accessibility descriptions for every puzzle.
- [ ] Complete artwork ownership and licensing records.
- [ ] Run a full 525-puzzle automated validation report.
- [ ] Run final cross-device regression testing.

**Phase 5 exit gate:** 525 approved puzzles with no placeholders, unlicensed artwork, broken patterns or untested answers.

---

## Puzzle approval gate

Every puzzle must satisfy all of the following:

- [ ] Answer is a familiar phrase for its labelled region.
- [ ] No materially different phrase fits equally well.
- [ ] Word pattern matches the canonical answer.
- [ ] Accepted spelling and punctuation variants are recorded.
- [ ] Three clues become progressively more specific.
- [ ] No clue wastes information already supplied.
- [ ] Explanation accounts for every meaningful visual element.
- [ ] Artwork passes `docs/06_VISUAL_ASSET_STANDARD.md`.
- [ ] Accessible description helps without revealing the answer.
- [ ] At least 2 of 3 blind testers solve without the final clue.
- [ ] All testers understand the explanation immediately.
- [ ] QA status is Approved.

## Batch workflow

Use this checklist for every batch of 25 puzzles:

- [ ] Choose chapter, difficulty range and mechanic mix.
- [ ] Draft 35–40 candidate phrases.
- [ ] Remove weak, obscure and duplicate candidates.
- [ ] Specify the strongest 25 visuals.
- [ ] Create or reuse approved vector assets.
- [ ] Add answers, variants, clues and explanations.
- [ ] Run automated validation.
- [ ] Review every puzzle through its direct QA link.
- [ ] Blind-test with three people.
- [ ] Revise or reject failures.
- [ ] Publish only approved puzzles.
- [ ] Record the release and updated puzzle count below.

## Release log

| Date | Version/commit | Puzzle count | Completed work | Known follow-up |
|---|---|---:|---|---|
| 15 Jul 2026 | Initial prototype | 25 | Core loop, starter content, direct links, letter locking and celebrations | Build scalable renderer and progression |

## Next actions

- [ ] Refactor the renderer so puzzle visuals are fully data-driven.
- [ ] Add automated content validation.
- [ ] Build the chapter map and unlock model.
- [ ] Add clue-based star ratings.
- [ ] Draft the Chapter 2 phrase shortlist.
- [ ] Produce and review levels 26–50 as the first expansion batch.
