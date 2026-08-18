# Clue Canvas retention, premium and social plan

Status: active product plan. The first retention foundation was implemented locally on 16 August 2026 and is awaiting publication/release.

## Implementation update — 16 August 2026

Completed locally:

- optional Android daily-puzzle reminder offered after the first Daily Puzzle;
- player-selected reminder time, defaulting to 7:00 pm;
- reminder controls in Settings and completion-aware rescheduling;
- Android notification permission requested only after the player opts in;
- structural 1–10 provisional difficulty calibration replacing automatic chapter-based inflation;
- visible difficulty score alongside Easy, Medium or Hard;
- one-tap Too easy / About right / Too hard feedback stored with player progress;
- varied post-starter journey selection that avoids consecutive themes, mechanisms and layouts where possible;
- privacy and data-inventory updates for reminders and difficulty feedback; and
- successful web build, Capacitor sync and native Android debug build.

Still required before release:

- publish the implementation branch to GitHub and the website;
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

- reminders and Android notification permission flow;
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

- Offer reminders only after the player completes a daily puzzle or opens the Daily screen more than once.
- Explain the benefit before Android's permission dialog: “Get one reminder when tomorrow's puzzle is ready.”
- Let the player choose a local time, defaulting to 7:00 pm.
- Schedule one on-device notification; do not require marketing push notifications or Firebase for the first version.
- Tapping the notification opens the Daily screen.
- Provide reminder time and on/off controls in Settings.
- Do not send a reminder if today's puzzle is already complete.

### Technical direction

Use Capacitor Local Notifications, declare Android 13+ notification permission, create a `Daily puzzle` notification channel, reschedule after completion/reboot/time-zone changes where supported, and preserve full gameplay when permission is denied.

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
- Implement local daily reminder and Settings controls.
- Improve Daily home state and add seven-day calendar.
- Add free streak milestones and one earned Grace Day.

Exit gate: reminders work across reboot/time-zone changes; permission denial is harmless; analytics disclosures match behaviour.

### Phase B — achievements and social sharing

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
