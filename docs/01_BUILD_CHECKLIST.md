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

## Phase 6 — Finish the web game

- [x] Build and validate the complete 565-puzzle playable library.
- [x] Complete the premium-art conversion and correction programme through puzzle 565.
- [x] Give all 565 puzzles unique progressive clue sets.
- [x] Add a “Where it came from” explanation to all 565 puzzles.
- [x] Keep the existing difficulty scores provisional and defer the player-facing Easy/Medium/Hard/Expert groups until closed-test results are available.
- [ ] Continue the gallery review, add accepted spellings and regional answers, and replace puzzles that testers identify as genuinely ambiguous.

**Exit result:** the content library is ready to package, while difficulty labels remain adjustable after real testing.

## Phase 7 — Google account, privacy and deletion

- [x] Secure the Google account that will own Clue Canvas with two-step verification and recovery details.
- [x] Register a personal Google Play Console account, accept the agreements and pay the one-time registration fee.
- [x] Complete Google’s legal-name, address, phone, email, identity and device-verification steps.
- [x] Use `SilentJZ Studio` as the public developer name and `cluecanvasadmin@gmail.com` as the working support email.
- [ ] Publish a Clue Canvas privacy policy describing optional accounts, Supabase authentication, cloud progress, retention and deletion.
- [x] Add a clear Delete account action inside the signed-in account/settings screen.
- [ ] Publish an external account-deletion request page on `cluecanvas.games` for people who no longer have the app.
- [ ] Choose and record the permanent Android package ID before creating the Play app record; proposed ID: `games.cluecanvas.app`.
- [x] Document the exact data collected by the launch build so the privacy policy and Play Data safety answers match in `docs/11_DATA_PRIVACY_INVENTORY.md`.

**Exit result:** the developer account is verified and all mandatory privacy/account-deletion foundations are working.

## Phase 8 — Package and test the Android app

- [ ] Install Android Studio, the required Java tools and the Android 16 / API 36 SDK.
- [ ] Add Capacitor to the existing Vite project and configure Clue Canvas, the permanent package ID and `dist` as the web build directory.
- [ ] Generate the Android project and keep the packaged web assets synchronized with each production build.
- [ ] Configure HTTPS access, Supabase authentication redirects, Android back-button behaviour, safe areas and network reconnect behaviour.
- [ ] Create the final adaptive launcher icon and splash-screen assets.
- [ ] Create the private release keystore, record its passwords securely and make at least two protected backups.
- [ ] Build a signed release Android App Bundle (`.aab`) for Google Play and an installable test APK.
- [ ] Install the Android build on the Samsung Galaxy S24 FE and complete sign-up, email confirmation, sign-in, sync and sign-out.
- [ ] Verify the custom keyboard, fixed puzzle canvas, Clue/Submit scrolling and compact solved page in the packaged app.
- [ ] Confirm progress survives closing the app, restarting the phone, signing in and installing an update.
- [ ] Confirm the core puzzle journey works offline and synchronizes safely after reconnecting.
- [ ] Test large text, high contrast, reduced motion, sound/haptics controls, screen-reader labels and touch targets.
- [ ] Run at least one 30-puzzle no-crash session and repeat the key checks on two additional devices or representative screen sizes.

**Exit result:** a signed, stable Android bundle is ready for Play Console testing.

## Phase 9 — Configure Play Console and recruit testers

- [ ] Create the Play Console app record as Clue Canvas, classify it as a free Puzzle game and enter the permanent package ID.
- [ ] Upload the signed bundle to the internal-testing track before exposing it to the closed-test group.
- [ ] Prepare the app icon, feature graphic and representative phone screenshots.
- [ ] Complete the store title, short description, full description, category, website and support contact details.
- [ ] Enter the privacy-policy and external account-deletion URLs and complete the Data safety form from the documented Supabase behaviour.
- [ ] Complete the 13+ target-audience, content-rating, ads, app-access and remaining policy declarations; describe the launch build as having no ads or purchases.
- [ ] Review Google’s automated checks and pre-launch report, then fix all important errors and warnings.
- [ ] Recruit at least 12 reliable testers with Google accounts; aim for 14–15 people as a buffer.
- [ ] Create the closed-test email list or Google Group and prepare one clear opt-in/install instruction message.

**Exit result:** the Play listing, policy declarations, tested bundle and closed-test group are ready.

## Phase 10 — Closed test, difficulty review and release

- [ ] Publish the approved bundle to the closed track and send testers the official opt-in link.
- [ ] Confirm at least 12 testers are opted in and keep that number continuously enrolled for the full 14 days.
- [ ] Require every tester to create or sign in to their own Clue Canvas account so progress reaches Supabase.
- [ ] Ask testers to attempt each assigned puzzle only once during the audit and avoid replaying it until results are exported.
- [ ] Let testers play normally: clues and answer reveals are allowed and provide useful difficulty information.
- [ ] Ask for short direct feedback only when something is broken, confusing or has another reasonable answer.
- [ ] Monitor Play testing feedback, crashes, Supabase synchronization and tester enrollment throughout the test.
- [ ] Fix important problems and upload updated closed-test builds without removing testers from the programme.
- [ ] After 14 continuous days, export each tester’s stars, completed puzzles and revealed puzzles from Supabase.
- [ ] Classify mostly-three-star puzzles as easier, mixed one-to-three-star puzzles as medium/hard, and frequently revealed but fair puzzles as expert.
- [ ] Rework puzzles that are frequently revealed and still do not make sense after explanation.
- [ ] Build the final Easy (1–3), Medium (4–6), Hard (7–8) and Expert (9–10) groups while retaining Journey and Daily modes.
- [ ] Apply for production access and answer Google’s questions using the recorded test activity, feedback and fixes.
- [ ] Publish with a cautious staged rollout and monitor crashes, reviews, synchronization and support requests.

**Exit result:** Clue Canvas has evidence-based difficulty groups and is released safely on Google Play.

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
- Content production and QA scale with every puzzle batch; the current 565-puzzle library remains a continuing review programme rather than a one-off build.
