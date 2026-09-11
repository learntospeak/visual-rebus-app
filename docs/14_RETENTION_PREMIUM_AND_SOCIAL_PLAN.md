# Clue Canvas retention, premium and social plan

Status: active product plan. The first retention foundation is implemented and published to the website/GitHub; its Android features are awaiting the next Play Store release.

## Implementation update — 16 August 2026

Completed locally:

- ~~Optional Android daily-puzzle reminder offered after the first Daily Puzzle.~~ ✅
- ~~Player-selected reminder time, defaulting to 7:00 pm.~~ ✅
- ~~Reminder controls in Settings and completion-aware rescheduling.~~ ✅
- ~~Android notification permission requested only after the player opts in.~~ ✅
- ~~Structural 1–10 provisional difficulty calibration replacing automatic chapter-based inflation.~~ ✅
- ~~Visible difficulty score alongside Easy, Medium or Hard.~~ ✅
- ~~One-tap Too easy / About right / Too hard feedback stored with player progress.~~ ✅
- ~~Varied post-starter journey selection that avoids consecutive themes, mechanisms and layouts where possible.~~ ✅
- ~~Privacy and data-inventory updates for reminders and difficulty feedback.~~ ✅
- ~~Successful web build, Capacitor sync and native Android debug build.~~ ✅
- ~~Publish the implementation branch to GitHub and the website.~~ ✅
- ~~Replace the custom keyboard spacing with a Gboard-style layout.~~ ✅

Still required before release:

- test reminder permission, timing, tapping and cancellation on the Samsung test device;
- collect enough tester difficulty feedback to replace provisional ratings with evidence-based ratings; and
- include the Android changes in the next Play Store bundle.

## 1. Product goal

Give players a short, satisfying reason to return each day, a larger reason to return each week, and visible long-term progress. Retention should come from good puzzles, friendly competition and collection—not pressure, excessive notifications or pay-to-win mechanics.

Primary loop:

1. A player receives an optional reminder at a time they selected.
2. They solve the shared daily puzzle and earn 0–3 stars.
3. Their weekly tally, streak and relevant achievements update.
4. They compare their result and optionally share a spoiler-free result card.
5. They see tomorrow's return cue and progress toward a weekly or collection goal.

## 2. Current foundation

Already present:

- one deterministic daily puzzle for everyone;
- current and longest daily streaks;
- spoiler-free text sharing through the device share sheet with clipboard fallback;
- 0–3 stars based on clue use, with no speed penalty in normal play;
- optional Supabase account and private cloud progress;
- 565 journey puzzles, chapter progress and phrase explanations; and
- no advertising, billing or analytics SDK.

Missing:

- ~~reminders and Android notification permission flow;~~ ✅
- streak calendar, milestones or recovery mechanic;
- visual share card and explicit social destinations;
- server-validated daily submissions and public-safe player profiles;
- weekly standings, groups or friends comparison;
- achievement definitions and trophy cabinet;
- new-content catalogue/version state; and
- retention analytics and consent/disclosure updates.

The files named `premium-*` are polished puzzle artwork. They are not evidence of an existing premium purchase system.

## 3. Daily reminders

### Recommended experience

- ~~Offer reminders after the player completes their first Daily Puzzle.~~ ✅
- ~~Explain the benefit before Android's permission dialog: “Get one reminder when tomorrow's puzzle is ready.”~~ ✅
- ~~Let the player choose a local time, defaulting to 7:00 pm.~~ ✅
- ~~Schedule one on-device notification without requiring marketing push notifications or Firebase.~~ ✅
- ~~Make tapping the notification open the Daily screen.~~ ✅
- ~~Provide reminder time and on/off controls in Settings.~~ ✅
- ~~Do not send a reminder if today's puzzle is already complete.~~ ✅

### Technical direction

~~Use Capacitor Local Notifications, declare Android 13+ notification permission, create a `Daily puzzle` notification channel, reschedule after completion, and preserve full gameplay when permission is denied.~~ ✅ Reboot/time-zone behaviour still requires device testing.

## 4. Streaks and premium value

### Free streak experience

- Seven-day calendar showing completed, revealed, missed and current days.
- Friendly milestones at 3, 7, 14, 30, 60, 100 and 365 days.
- One earned **Grace Day** after every seven completed daily puzzles, with a maximum balance of one.
- Grace Days repair only the immediately preceding missed day and never add leaderboard points.
- Clear longest-streak and total-dailies statistics.

### Recommended premium model

Use a one-time **Clue Canvas Plus** purchase at first, rather than a subscription. The current content cadence does not yet justify a recurring fee.

Free forever:

- journey starter content;
- the daily puzzle, reminder and base streak;
- global weekly tally participation;
- standard sharing and core achievements; and
- account sync.

Clue Canvas Plus candidates:

- full journey and future premium themed puzzle packs;
- complete Daily Archive, allowing past daily puzzles to be played without changing historical leaderboard results;
- a second optional “Encore” puzzle each day;
- detailed personal statistics and yearly activity calendar;
- premium visual share-card themes and profile frames;
- private groups/leagues for family, friends or workplaces;
- additional music and interface themes; and
- up to two stored Grace Days instead of one.

Premium must not buy weekly points, alter scoring, hide clues from free players, grant extra leaderboard attempts or repair a missed day for leaderboard credit. Cosmetic badges should visibly differ from skill achievements.

### Commercial options to decide later

- Recommended launch test: one-time Plus unlock, with separately purchasable large themed packs only if content production supports them.
- Do not introduce a subscription until there is a reliable monthly release cadence and ongoing premium service such as leagues, seasonal events and new packs.
- Google Play Billing, acknowledgement, restore purchases, account entitlement sync and offline entitlement caching are mandatory before selling anything.

## 5. Sharing and social destinations

### Upgrade the share asset

Generate a branded, spoiler-free image card containing:

- Clue Canvas logo and daily/puzzle number;
- stars, clues used and optional weekly rank;
- a small non-answer result pattern;
- streak milestone when relevant; and
- `cluecanvas.games` plus a trackable, non-personal campaign link.

Never include the answer or puzzle artwork for the current daily puzzle.

### Destination design

Keep the native Android share sheet because it already reaches apps installed on the device. Add a share panel with:

- Share to apps (native sheet, including Instagram/TikTok when the receiving app accepts the image);
- WhatsApp;
- Facebook;
- Messenger where supported;
- X;
- Bluesky;
- Reddit;
- SMS/email; and
- Copy result / Save image.

Platform limitation: Instagram and TikTok do not provide a reliable general-purpose web URL for prefilled result posts. They should receive the generated image through Android's native share flow rather than a misleading direct button. Facebook direct sharing primarily shares a URL; accompanying user text cannot be guaranteed.

Use each platform's documented share mechanism and gracefully fall back to the native sheet. Do not require players to connect social accounts to Clue Canvas.

## 6. Weekly tally board

### Recommended first version

Every daily puzzle from Monday 00:00 UTC through Sunday 23:59 UTC contributes to one weekly tally:

- 3 points: solved with no clues;
- 2 points: solved with one clue;
- 1 point: solved with two or more clues;
- 0 points: revealed or not attempted.

The board shows rank, display name, total points, puzzles played and three-star solves. Ties share a rank. Do not use solve speed as a tiebreaker; it disadvantages accessibility users and encourages rushing.

Views:

- **Global:** surrounding ranks plus the top 20, rather than an endless list.
- **My group:** invitation-code group comparison (phase two).
- **Previous week:** frozen final results retained for a limited history.

Participation requirements:

- signed-in account;
- explicit opt-in;
- player-selected public display name, separate from email;
- acceptance of simple fair-play and community rules; and
- ability to leave the board or change visibility.

### Data and security model

Do not publish `player_progress` or derive rankings directly in the browser.

Add separate tables such as:

- `public_profiles`: user ID, public display name, visibility and created/updated timestamps;
- `daily_results`: user ID, UTC date, puzzle/version ID, stars, clues used, completion state and server timestamp;
- `weekly_scores`: materialized/derived weekly totals; and
- later, `groups`, `group_members` and invite codes.

Submission must be idempotent: one scoring result per account/date, with later replay unable to improve that day's competitive score. Use a Supabase Edge Function or secured database function to validate the expected daily puzzle, acceptable values and server date. RLS exposes only the minimum public leaderboard fields and keeps email/private progress inaccessible.

Client-only anti-cheat cannot guarantee fair results. The initial board should be described as friendly competition, with rate limits, impossible-result checks and administrative removal tools. Stronger server-side puzzle-session validation can follow if abuse appears.

### Moderation and age safety

- Prefer generated names such as `Clever Koala 482` for launch, or tightly validate custom names.
- No avatars, biographies, chat, direct messages or location.
- Add report and block/admin-hide capabilities before unrestricted custom names.
- Publish leaderboard rules and retention period.

## 7. Achievements and visible progression

### Presentation

Add a **My Collection** screen reached from Home. It contains personal statistics, a restrained badge cabinet, recently earned badges and locked-badge hints. Award animations should be brief and respect reduced-celebration settings.

### Achievement families

Journey:

- First Aha — solve the first puzzle.
- Getting the Picture — solve 10 puzzles.
- Phrase Finder — solve 50 puzzles.
- Canvas Curator — solve 100 puzzles.
- Chapter Complete — finish each chapter.

Skill:

- First Sight — solve a puzzle with no clues.
- Perfect Five / Perfect Twenty — achieve consecutive three-star journey solves.
- Second Look — improve a replayed puzzle's star score.
- All Angles — solve puzzles from each mechanic/category.

Consistency:

- Three-Day Spark, Seven-Day Rhythm, Month on the Canvas and Century Streak.
- Weekend Regular — complete both weekend dailies four times.

Discovery:

- Word Historian — read 25 phrase origins.
- Collection badges for themed packs.

Weekly:

- Full Week — attempt all seven dailies.
- Clean Sweep — score 21 weekly points.
- Personal Best — beat the player's previous weekly score.

Avoid achievements based on raw speed, social spam, purchases or watching advertisements. Premium collection badges may exist, but the main skill and consistency set remains achievable for free.

### Implementation model

- Define achievements in versioned application data with stable IDs.
- Derive retroactive achievements from existing progress where possible.
- Store `achievement_id`, `earned_at` and relevant version/account locally and in cloud progress.
- Make awarding idempotent so sync/reinstall cannot duplicate it.
- Separate permanent achievements from time-limited seasonal marks.

## 8. Fresh content cadence

### Recommended cadence

- Daily: one globally shared puzzle from an approved pool.
- Weekly: one named theme and weekly tally.
- Monthly: a visible content drop of 15–25 journey/themed puzzles.
- Seasonal: occasional event collection, without permanently removing core content.

Add content metadata: release ID, release date, theme, availability, puzzle version and `new_until`. Home and Packs show a quiet “New” marker and a “What's new” card until opened. Preserve historical puzzle versions used for competitive daily results.

Do not promise a cadence publicly until at least two future drops are approved and scheduled.

## 9. Analytics and success measures

### Events needed

Collect the minimum events required to answer product questions:

- app/session opened;
- Daily screen opened;
- daily started/completed/revealed;
- reminder prompt shown, enabled, denied or disabled;
- streak milestone earned or Grace Day used;
- share panel opened, destination selected and share completed where observable;
- leaderboard viewed and opt-in completed;
- weekly participation/completion;
- achievement earned/viewed;
- content drop viewed/started; and
- premium offer viewed, purchase started/completed/restored.

Do not collect puzzle answer text, contacts, social-account identity or advertising ID.

### Metrics

Primary:

- Day-1, Day-7 and Day-30 retention;
- percentage completing at least three dailies per week;
- weekly board participation and week-over-week return;
- daily reminder opt-in and reminder-to-completion conversion; and
- share rate and attributable installs/visits.

Guardrails:

- notification denial/disable rate;
- reveal rate and puzzle fairness complaints;
- leaderboard opt-out/report rate;
- crash-free sessions; and
- account deletion rate.

### Privacy work

Choose either privacy-conscious first-party event storage in Supabase or a configured analytics provider. Before release, update the privacy policy, in-app disclosure, Google Play Data safety answers and the data inventory. Define retention periods and deletion behaviour. Analytics must not be silently added while documentation still states that none is collected.

## 10. Delivery phases

### Phase A — measurement foundation and reminder

- Define event schema, privacy disclosures and baseline measurements.
- ~~Implement local daily reminder and Settings controls.~~ ✅
- Improve Daily home state and add seven-day calendar.
- Add free streak milestones and one earned Grace Day.

Exit gate: reminders work across reboot/time-zone changes; permission denial is harmless; analytics disclosures match behaviour.

### Phase B — achievements and social sharing

- Prototype a more expressive solve sequence with performance-specific feedback.
- Prototype the Living Weekly Canvas and test whether it makes players want to complete another puzzle.
- Test a five-puzzle Aha Chain without punishing reveals or ending a daily streak.
- Implement versioned achievements and My Collection.
- Backfill eligible achievements from existing progress.
- Generate image share cards.
- Add explicit supported destinations plus native share fallback.
- Add campaign links and share attribution without personal identifiers.

Exit gate: no daily spoilers; saved/shared image works on target Android devices; achievements never duplicate.

### Phase C — weekly board

- Add public profile opt-in and safe display names.
- Add server-validated first-attempt daily results.
- Build global current/previous weekly boards.
- Add rate limits, moderation/admin controls and leaderboard privacy text.
- Pilot with closed testers before public release.

Exit gate: no email/private progress exposure; scores are deterministic; deletes remove/anonymize public records as promised.

### Phase D — premium foundation

- Finalize free/Plus entitlement boundaries and price.
- Implement Play Billing, acknowledgement, restore and entitlement sync.
- Add Daily Archive, statistics, cosmetic themes and/or private groups in a staged order.
- Update store listing, privacy/data-safety material and support procedures.

Exit gate: purchase, restore, refund/revocation and offline states pass license testing; free daily competition remains fair.

### Phase E — content operations

- Build release metadata and “What's new” presentation.
- Prepare two monthly drops before announcing cadence.
- Add weekly theme scheduling and historical version preservation.

## 11. Decisions required before implementation

1. Premium structure: one-time Plus (recommended), individual packs, or subscription later.
2. Free journey boundary: all current journey puzzles, a starter portion, or current chapters plus future paid packs.
3. Leaderboard identity: generated names initially (recommended) or moderated custom names.
4. Board scope at launch: global only (recommended) or global plus private groups.
5. Grace Day rule: earned every seven completions with one free storage slot (recommended), or another non-paid rule.
6. Reminder default offer: after first daily completion (recommended) and preferred suggested time.
7. Analytics approach: first-party Supabase events or a third-party analytics provider.
8. Content cadence the team can reliably sustain.

## 12. Recommended approval package

Approve Phase A and the design work for Phase B first. Prototype Phase C against tester accounts before committing to public names or private groups. Defer billing implementation until reminder, sharing and weekly-board data demonstrate repeat demand. This sequence learns whether players return before adding the highest policy and support burden.

## 13. Pizzazz and “one more puzzle” ideas

These ideas add anticipation, payoff and progress around the core puzzle without using random paid rewards, energy limits or punishing loss mechanics.

### Living Weekly Canvas

Each completed puzzle reveals another part of a larger themed illustration. A seven-piece weekly canvas might build from its background through characters and details to a final animated reveal. Completed canvases become permanent collectibles. This is the strongest brand-specific concept because progress is literally added to a Clue Canvas.

### Aha Chain

A short session chain fills across five consecutive puzzle attempts. No-clue solves create a gold link, clue-assisted solves create a standard link, and reveals pause rather than destroy the chain. Completing it advances the current canvas or unlocks a small presentation reward. It should reset naturally between sessions and never threaten the daily streak.

### Choose the next puzzle

After a journey solve, offer three face-down choices such as Quick Think, Picture Puzzle and Wild Card. This adds curiosity and player choice while helping the journey avoid predictable runs of similar answers. The system must still respect chapter progression and difficulty calibration.

### Special milestone puzzles

Every tenth journey puzzle receives a more elaborate introduction, distinctive artwork treatment, larger but brief celebration and collectible milestone mark. These are scheduled rewards, not random loot boxes.

### Expressive result moment

Tailor the solve response to what happened: First Sight for no clues, Sharp Thinking for one clue, New Best for improved replay performance, and an appropriate recovery message after a difficult solve. Combine the message with a brief visual pulse, balanced sound, haptic feedback and visible progress toward the next meaningful goal.

### Aha Album

Create a permanent phrase collection containing puzzle artwork, phrase meaning and origin, best stars, first-solved date and mastery state. Themed pages such as animals, food, weather and time can unlock restrained cosmetic frames, canvas treatments or music variations.

### Weekly event layer

Present the seven daily puzzles as one weekly journey with a maximum 21-star tally, personal target, optional social comparison and final canvas reveal. Personal best and completion remain meaningful even when a player is not near the global leaders.

### Positive surprise moments

Occasionally feature an animated Daily Puzzle, seasonal canvas, hidden themed puzzle or new music variation. Surprises must always be positive and must not expire purchases, remove earned progress or pressure a player to pay.

## 14. Weighted idea filter

The backlog must be filtered before implementation. A high score earns an experiment or design review—not automatic approval.

### Scoring criteria

Score every criterion from 1 (weak) to 5 (strong), then calculate the weighted total out of 100.

| Criterion | Weight | Question |
|---|---:|---|
| Retention potential | 25% | Is this likely to increase useful repeat play? |
| Clue Canvas brand fit | 20% | Does it feel distinctive to this puzzle game? |
| Player delight/value | 15% | Does the player gain enjoyment, mastery or connection? |
| Evidence/confidence | 10% | Do feedback, data or a prototype support the idea? |
| Effort efficiency | 15% | Is the likely value strong relative to build and content effort? |
| Safety and simplicity | 10% | Is it low-risk for privacy, policy, fairness and interface clutter? |
| Strategic enablement | 5% | Does it unlock or improve later work? |

Formula:

`weighted score = sum((criterion score ÷ 5) × criterion weight)`

Priority bands:

- **80–100 — Prototype now:** high-value candidate, still subject to dependency and UI gates.
- **65–79 — Next:** design or test after current work is measured.
- **50–64 — Later:** retain in backlog until evidence or dependencies improve.
- **Below 50 — Defer:** cost, risk or weak player value currently outweighs benefit.

### Initial provisional scores

| Idea | Score | Band | Current recommendation |
|---|---:|---|---|
| Living Weekly Canvas | 84 | Prototype now | Prototype visually before building the complete system. |
| Expressive result moment | 83 | Prototype now | Best small first pizzazz experiment. |
| Aha Album / phrase collection | 83 | Prototype now | Design alongside achievements to avoid duplicate collections. |
| Reliable themed content cadence | 82 | Prototype now | Operational priority; do not promise it until two drops are ready. |
| Daily reminder | 80 | Implemented | Test on the Samsung device and measure after Play release. |
| Special puzzle every ten levels | 78 | Next | Create one prototype milestone before committing to all chapters. |
| Branded image share cards | 78 | Next | Combine with the result-screen redesign. |
| Aha Chain | 77 | Next | Test a five-step, non-punitive version. |
| Achievements and My Collection | 77 | Next | Merge its information architecture with the Aha Album. |
| Streak calendar and earned Grace Day | 74 | Next | Finish Phase A before larger social systems. |
| Global weekly tally board | 73 | Next | Requires server validation, public-profile safety and moderation. |
| Positive surprise events | 70 | Next | Use sparingly after the base weekly loop exists. |
| Cosmetic canvas/music themes | 69 | Next | Good premium candidate after the free loop proves valuable. |
| Minimal retention analytics | 68 | Next | Required to validate other scores; complete privacy work first. |
| Choose-the-next-puzzle cards | 67 | Next | Prototype after varied sequencing has been tested. |
| Daily Archive | 66 | Next | Strong Plus candidate but depends on billing decisions. |
| Difficulty feedback/calibration | 66 | Implemented | Collect tester evidence before recalibrating again. |
| Second daily Encore puzzle | 64 | Later | Adds content burden and may dilute the primary Daily Puzzle. |
| Private family/friend groups | 61 | Later | Add only after the global board is safe and useful. |
| Explicit social-network buttons | 56 | Later | Native sharing already covers many apps; image quality comes first. |
| Play Billing / premium entitlement | 44 | Defer | Re-score after repeat demand and premium boundaries are proven. |

These numbers are product hypotheses. Update Confidence first when tester feedback or retention data arrives; do not manipulate other criteria merely to move a preferred idea upward.

### Anti-overload gates

An idea cannot enter implementation merely because its weighted score is high. It must also pass every applicable gate:

1. **One main loop per release:** introduce no more than one new core retention loop at a time.
2. **Two-progress-limit:** show no more than two progress systems together on Home or the solved screen.
3. **Replace before adding:** identify which existing element a new card, meter or button replaces.
4. **Prototype before platform work:** visually test large features such as the Living Canvas and weekly board before building backend systems.
5. **Measure before stacking:** observe one release before adding another mechanic intended to solve the same retention problem.
6. **Free core remains complete:** premium may add depth and presentation but cannot buy leaderboard advantage or repair competitive results.
7. **No guilt design:** missing a day must not erase paid items, permanent collections or unrelated progress.
8. **Content capacity gate:** do not approve a feature whose ongoing puzzle/art workload cannot be sustained for at least three months.
9. **Privacy and moderation gate:** social or analytics work cannot ship before its deletion, disclosure and safety behaviour is defined.
10. **Removal rule:** if a feature adds clutter without improving its target measure after a fair test, simplify or remove it.

### Decision record for each approved idea

Before implementation, add a short entry containing:

- problem being solved;
- weighted score and evidence date;
- smallest testable version;
- screen or feature it replaces;
- success measure and guardrail;
- review date; and
- keep, change or remove decision.

## 15. Complete effect scorecard

This register scores every unique product idea in the document. When an idea appears again in a delivery phase, it inherits the score shown here rather than being counted twice.

### How to read the scores

- **App effect (1–10):** expected overall difference to the player experience and product strength if executed well.
- **Retention effect (1–10):** expected influence on useful repeat play.
- **Effort (1–10):** combined design, engineering, content, testing and ongoing operational cost; higher means harder.
- **Weighted priority (0–100):** the broader filter from Section 14, including fit, confidence, safety and strategic enablement.

Effect scale:

- **9–10 — Transformative:** changes how Clue Canvas is understood or repeatedly played.
- **7–8 — Major:** meaningfully improves a core loop or reason to return.
- **5–6 — Useful:** clearly improves quality, depth or commercial value.
- **3–4 — Supporting:** important polish or infrastructure with limited standalone pull.
- **1–2 — Minor:** little standalone player effect, even if technically required.

All scores are hypotheses dated 18 August 2026. Tester evidence and real retention data should change Confidence and the weighted priority—not retroactively justify a preferred idea.

### Existing and implemented foundation

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| Large journey puzzle library | 10 | 8 | 10 | 92 | Implemented |
| Shared Daily Puzzle | 10 | 10 | 5 | 95 | Implemented |
| Current and longest daily streak | 7 | 8 | 3 | 78 | Implemented |
| 0–3 star scoring based on clue use | 7 | 7 | 3 | 78 | Implemented |
| Phrase meanings and origin stories | 6 | 5 | 7 | 68 | Implemented |
| Optional account and cloud progress | 7 | 7 | 7 | 75 | Implemented |
| Spoiler-free native text sharing | 5 | 5 | 3 | 60 | Implemented |
| Password recovery | 6 | 4 | 4 | 72 | Implemented |
| Background music and separate control | 5 | 4 | 4 | 55 | Implemented |
| Gboard-style custom keyboard | 6 | 4 | 4 | 70 | Implemented |
| Optional local Daily reminder | 8 | 9 | 5 | 80 | Implemented; device test/release pending |
| Player-selected reminder time | 5 | 6 | 3 | 70 | Implemented; device test/release pending |
| Completion-aware reminder suppression | 4 | 5 | 3 | 68 | Implemented; device test/release pending |
| Structural provisional difficulty rating | 6 | 5 | 5 | 66 | Implemented; needs evidence |
| Visible 1–10 difficulty indicator | 4 | 3 | 2 | 58 | Implemented |
| Too easy / About right / Too hard feedback | 6 | 5 | 4 | 66 | Implemented; needs tester volume |
| Varied post-starter journey sequencing | 7 | 6 | 5 | 72 | Implemented; needs tester validation |

### Daily, streak and personal progress

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| Stronger Daily state on Home | 7 | 8 | 3 | 77 | Next |
| Seven-day completed/revealed/missed calendar | 7 | 8 | 4 | 74 | Next |
| Milestones at 3, 7, 14, 30, 60, 100 and 365 days | 7 | 8 | 4 | 72 | Next |
| Earned Grace Day every seven completions | 6 | 7 | 6 | 68 | Next; rule approval required |
| Grace Day never adds leaderboard points | 3 | 2 | 3 | 70 | Required fairness rule |
| Longest streak and total-Dailies statistics | 6 | 6 | 3 | 65 | Next |
| Personal yearly activity calendar | 6 | 7 | 5 | 64 | Premium candidate |
| Detailed personal statistics | 6 | 6 | 5 | 64 | Premium candidate |

### Pizzazz and meta-progression

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| Living Weekly Canvas | 10 | 10 | 8 | 84 | Prototype now |
| Expressive performance-specific result moment | 9 | 8 | 4 | 83 | Best small prototype |
| Aha Album / permanent phrase collection | 9 | 8 | 7 | 83 | Prototype information architecture |
| Five-puzzle non-punitive Aha Chain | 8 | 8 | 5 | 77 | Next experiment |
| Choose one of three next-puzzle cards | 7 | 7 | 6 | 67 | Later prototype |
| Special presentation every ten journey puzzles | 8 | 7 | 6 | 78 | Prototype one milestone |
| Weekly event joining seven Dailies and a final reveal | 9 | 10 | 8 | 80 | After Canvas prototype |
| Occasional positive surprise moments | 7 | 7 | 7 | 70 | Use sparingly |
| Performance messages such as First Sight and New Best | 6 | 5 | 3 | 76 | Bundle with result moment |
| Visible progress toward the next meaningful reward | 8 | 8 | 4 | 81 | Bundle with result moment |
| Unlockable cosmetic frames from collections | 5 | 5 | 5 | 62 | Later/premium candidate |
| Unlockable canvas treatments | 6 | 6 | 6 | 65 | Later/premium candidate |
| Unlockable music variations | 4 | 4 | 6 | 58 | Later/premium candidate |

### Achievements and collection

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| My Collection / badge cabinet | 8 | 8 | 7 | 77 | Next; merge with Aha Album |
| Journey-volume achievements | 6 | 6 | 4 | 66 | Next |
| Skill and no-clue achievements | 7 | 7 | 5 | 72 | Next |
| Replay-improvement achievements | 6 | 6 | 4 | 68 | Next |
| Mechanic/category mastery achievements | 7 | 7 | 6 | 69 | Next |
| Consistency achievements | 7 | 8 | 5 | 73 | Next |
| Phrase-origin/discovery achievements | 6 | 5 | 5 | 67 | Next |
| Weekly participation and perfect-week achievements | 7 | 8 | 5 | 72 | Requires weekly results |
| Retroactive achievement awards | 4 | 4 | 5 | 70 | Required migration quality |
| Brief reduced-motion-aware award animation | 5 | 4 | 3 | 69 | Bundle with achievements |
| Seasonal marks kept separate from permanent achievements | 4 | 4 | 4 | 63 | Later |

### Sharing and acquisition

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| Branded spoiler-free image share card | 8 | 6 | 6 | 78 | Next |
| Include stars, clues, streak/rank and campaign link | 7 | 6 | 5 | 74 | Bundle with image card |
| Share image through native Android sheet | 7 | 5 | 5 | 75 | Next |
| Explicit WhatsApp destination | 5 | 3 | 3 | 60 | Later |
| Explicit Facebook destination | 4 | 3 | 4 | 54 | Later; platform limitations |
| Explicit Messenger destination where supported | 4 | 3 | 5 | 50 | Later; platform limitations |
| Explicit X destination | 4 | 3 | 3 | 55 | Later |
| Explicit Bluesky destination | 4 | 3 | 3 | 56 | Later |
| Explicit Reddit destination | 4 | 3 | 3 | 54 | Later |
| SMS/email share options | 4 | 3 | 2 | 58 | Later |
| Copy result and save image | 5 | 3 | 3 | 63 | Bundle with image card |
| Non-personal campaign links and share attribution | 4 | 4 | 5 | 60 | Requires analytics/privacy work |

### Weekly competition and social comparison

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| Global Monday–Sunday 21-point tally | 9 | 10 | 8 | 73 | Prototype after Phase A |
| Top 20 plus surrounding player ranks | 7 | 8 | 6 | 70 | Bundle with global board |
| Previous-week frozen results | 6 | 7 | 5 | 64 | Next after current board |
| Private invitation-code groups | 8 | 9 | 9 | 61 | Later |
| Personal target and previous-best comparison | 8 | 8 | 5 | 78 | Prefer before heavy competition |
| Global percentile | 7 | 7 | 6 | 69 | Useful for most players |
| Explicit leaderboard opt-in | 4 | 3 | 4 | 76 | Mandatory safety control |
| Public display name separate from email | 5 | 5 | 6 | 65 | Required for leaderboard |
| Generated safe display names | 4 | 4 | 4 | 72 | Recommended launch identity |
| Custom names with validation/moderation | 5 | 5 | 8 | 52 | Defer |
| No speed-based tiebreaker | 4 | 3 | 2 | 78 | Mandatory accessibility rule |
| No chat, biographies, avatars or direct messages | 3 | 2 | 1 | 82 | Mandatory scope/safety rule |
| Reporting and administrative hiding | 3 | 3 | 7 | 80 | Mandatory before custom names |

### Premium and monetisation

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| One-time Clue Canvas Plus purchase | 6 | 4 | 9 | 58 | Preferred model, not approved |
| Free Daily, reminder, global board and core achievements | 8 | 8 | 4 | 84 | Recommended free boundary |
| Full journey and future themed packs in Plus | 8 | 6 | 8 | 70 | Requires free-boundary decision |
| Complete Daily Archive | 7 | 7 | 7 | 66 | Strong Plus candidate |
| Second optional Encore puzzle each day | 6 | 6 | 8 | 64 | Later; high content burden |
| Premium visual share themes and profile frames | 5 | 4 | 6 | 62 | Later |
| Premium private leagues | 8 | 9 | 9 | 61 | Later; global board first |
| Premium interface themes | 4 | 3 | 6 | 57 | Later |
| Premium music themes | 4 | 3 | 6 | 58 | Later |
| Two stored Grace Days for Plus | 3 | 4 | 5 | 45 | Defer; avoid paid pressure |
| Separately purchased large themed packs | 6 | 4 | 8 | 52 | Revisit when cadence is proven |
| Subscription | 5 | 5 | 10 | 35 | Defer until ongoing value exists |

### Fresh content and operations

| Idea | App effect | Retention effect | Effort | Weighted priority | Status |
|---|---:|---:|---:|---:|---|
| One approved globally shared puzzle daily | 10 | 10 | 9 | 90 | Core operational commitment |
| Named weekly theme | 8 | 9 | 7 | 80 | Next after content preparation |
| Monthly drop of 15–25 puzzles | 9 | 9 | 10 | 82 | High value, very high effort |
| Seasonal event collection | 7 | 7 | 9 | 68 | Later |
| Content release/version metadata | 4 | 4 | 6 | 72 | Required for reliable drops |
| Quiet New marker and What's New card | 5 | 5 | 3 | 70 | Bundle with content metadata |
| Preserve historic competitive puzzle versions | 3 | 4 | 7 | 78 | Mandatory before competition |
| Prepare two drops before announcing a cadence | 3 | 5 | 9 | 80 | Mandatory capacity gate |

### Analytics, privacy and technical enablers

These items can have modest visible effect but high release necessity. They must not be dropped merely because another feature looks more exciting.

| Idea | App effect | Retention effect | Effort | Weighted priority | Release necessity |
|---|---:|---:|---:|---:|---:|
| Minimal retention-event instrumentation | 8 | 8 | 7 | 68 | 9/10 |
| Day-1, Day-7 and Day-30 measurement | 8 | 9 | 5 | 76 | 9/10 |
| Reminder opt-in and completion conversion | 6 | 7 | 4 | 72 | 8/10 |
| Share-rate and attributable-visit measurement | 6 | 5 | 6 | 64 | 7/10 |
| Fairness/reveal/report guardrail metrics | 6 | 6 | 5 | 70 | 8/10 |
| First-party Supabase analytics option | 5 | 5 | 7 | 62 | 7/10 |
| Third-party analytics option | 5 | 5 | 6 | 60 | 6/10 |
| Privacy policy and Play Data safety updates | 5 | 3 | 6 | 78 | 10/10 |
| Defined analytics retention/deletion behaviour | 4 | 3 | 6 | 76 | 10/10 |
| Server-validated first-attempt Daily result | 4 | 5 | 9 | 82 | 10/10 before leaderboard |
| Idempotent one-result-per-account/date submission | 3 | 4 | 8 | 80 | 10/10 before leaderboard |
| Separate public-profile and result tables with RLS | 4 | 4 | 8 | 82 | 10/10 before leaderboard |
| Rate limits and impossible-result checks | 3 | 3 | 7 | 78 | 9/10 before leaderboard |
| Play Billing purchase acknowledgement | 3 | 2 | 8 | 72 | 10/10 before payment |
| Restore purchases and entitlement sync | 5 | 4 | 9 | 78 | 10/10 before payment |
| Refund/revocation and offline entitlement handling | 4 | 3 | 9 | 76 | 10/10 before payment |
| Samsung notification permission/timing/tap test | 4 | 5 | 3 | 82 | 10/10 before Play release |

### Current top-level order after complete scoring

Scores alone do not define build order because dependencies and effort matter. The recommended sequence is:

1. Finish Samsung reminder testing and include the current work in the next Play release.
2. Prototype the Expressive Result Moment because it has high effect with moderate effort.
3. Prototype the Living Weekly Canvas visually before committing to its content system.
4. Design the Aha Album and My Collection as one screen, not two competing collections.
5. Add minimum analytics/privacy foundations needed to judge the experiments.
6. Build streak calendar/milestones before adding another daily pressure mechanic.
7. Upgrade image sharing.
8. Pilot the global weekly tally with safe generated identities.
9. Consider premium only after repeat demand and sustainable content production are demonstrated.
