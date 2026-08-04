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

## Phase 6 — Finish the player experience

- [x] Build and validate the complete 565-puzzle playable library.
- [x] Complete the premium-art conversion and correction programme through puzzle 565.
- [x] Give all 565 puzzles unique progressive clue sets.
- [x] Add a “Where it came from” explanation to all 565 puzzles.
- [ ] Group puzzles for players as Easy (1–3), Medium (4–6), Hard (7–8) and Expert (9–10), while retaining Journey and Daily modes.
- [ ] Complete the gallery playtest, add accepted spellings and regional answers, and replace any puzzle that testers still find ambiguous.

**Exit result:** players can choose an appropriate difficulty and the launch library has passed its final editorial review.

## Phase 7 — Play Store and Android foundations

- [ ] Create and verify a personal Google Play Console developer account and pay the one-time registration fee.
- [ ] Publish a Clue Canvas privacy policy and establish a working public support email.
- [ ] Add account deletion inside the app and a public webpage for account-deletion requests.
- [ ] Create the Capacitor Android project with a permanent package ID and target Android 16 / API 36.
- [ ] Add the app icon and splash assets, configure signing, generate a release Android App Bundle (`.aab`), and install an internal build.

**Exit result:** a signed Android build can be installed and the mandatory account/privacy foundations are complete.

## Phase 8 — Android accessibility and QA

- [ ] Test the Android build on at least three real devices or representative screen sizes.
- [ ] Verify the custom keyboard, stable puzzle canvas, Clue/Submit scrolling and compact solved page.
- [ ] Test sign-up, sign-in, cloud sync, sign-out and account deletion from beginning to end.
- [ ] Confirm progress survives close/reopen, device restart, sign-in and an app update.
- [ ] Confirm the core puzzle journey works offline and reconnects safely.
- [ ] Verify large text, high contrast, reduced motion, sound and haptics controls.
- [ ] Check screen-reader labels, focus order and finger-sized touch targets.
- [ ] Complete a 30-puzzle no-crash session and resolve important Google Play pre-launch report findings.

**Exit result:** the signed Android build is a stable closed-beta candidate.

## Phase 9 — Store listing and policy forms

- [ ] Create the Play Console app record as Clue Canvas, classify it as a free Puzzle game and confirm the permanent package ID.
- [ ] Prepare the final app icon, feature graphic and phone screenshots.
- [ ] Complete the store title, short description, full description, category and support contact details.
- [ ] Complete the privacy policy, Data safety form and external account-deletion URL using the app’s real Supabase data handling.
- [ ] Complete the 13+ target-audience, content-rating, ads, app-access and other required declarations; store claims must match the no-ads/no-purchases launch build.

**Exit result:** the Play Console app record is complete and ready to accept the closed-test bundle.

## Phase 10 — Closed test and production release

- [ ] Recruit at least 12 testers with Google accounts and prepare the closed-test email list or Google Group.
- [ ] Publish the signed bundle to the closed track and keep at least 12 testers continuously opted in for 14 days.
- [ ] Record tester activity and feedback, fix important problems, and upload the final release candidate.
- [ ] Apply for production access, answer Google’s testing questions, then use a cautious staged production rollout and monitor crashes and reviews.

**Exit result:** Clue Canvas is approved for production and released safely on Google Play.

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
