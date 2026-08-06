# Clue Canvas — Google Play Data safety draft

Last reviewed: 6 August 2026

Use this document while completing the Play Console Data safety form. Recheck it against the final Android bundle and the wording Google shows in the form before submission.

## High-level answers

- Does the app collect or share any required user-data types? **Yes — it collects limited data when a player chooses to create an account.**
- Is all user data collected by the app encrypted in transit? **Yes.** Clue Canvas and Supabase use HTTPS.
- Does the app provide a way for users to request deletion? **Yes, once the live in-app flow and `https://cluecanvas.games/delete-account/` have passed the final deletion test.**
- Is data shared with third parties under Google Play’s definition? **No.** Supabase acts as a service provider processing data on the developer’s behalf. Reconfirm this classification against Google’s definition when submitting.
- Can users use the app without collection of account data? **Yes.** Accounts and cloud synchronization are optional.
- Has the app completed an eligible independent security review? **No.**

## Data type: Personal info — Email address

- Collected: **Yes**
- Shared: **No**
- Processed ephemerally: **No**
- Required or optional: **Optional** — the game works without an account
- Purposes:
  - **App functionality** — sign-in and cloud synchronization
  - **Account management** — create, authenticate and delete an account

## Data type: Personal info — User IDs

Supabase creates an internal authentication user ID for each optional account.

- Collected: **Yes**
- Shared: **No**
- Processed ephemerally: **No**
- Required or optional: **Optional**
- Purposes:
  - **App functionality** — connect progress to the correct player
  - **Account management** — manage the optional account

## Data type: App activity — App interactions

For signed-in players, Clue Canvas synchronizes completed puzzle IDs, journey position, star scores, answer reveals, daily completion/reveal dates and streak values.

- Collected: **Yes**
- Shared: **No**
- Processed ephemerally: **No**
- Required or optional: **Optional** — cloud synchronization requires an account, but guest play does not
- Purposes:
  - **App functionality** — save, restore and synchronize progress
  - **Analytics** — during testing, aggregated star and reveal patterns may be reviewed to improve puzzle difficulty groupings

## Authentication credentials

Players submit a password to Supabase Authentication over HTTPS. Clue Canvas does not receive or store the plaintext password. During final form completion, follow Google’s current guidance on whether Supabase-handled password credentials need a separate declaration under the form version presented in Play Console.

## Data types not collected by the current build

- name;
- phone number;
- physical or email address other than the optional sign-in email;
- precise or approximate location;
- contacts;
- photos, videos, files or documents;
- audio or voice recordings;
- health or fitness information;
- financial or payment information;
- browsing or search history;
- installed-app inventory;
- advertising identifiers; and
- device identifiers used for advertising or cross-app tracking.

## Security and deletion evidence

- Supabase authentication protects cloud access.
- Row Level Security restricts `player_progress` rows to their authenticated owner.
- The service-role key is confined to the deployed `delete-account` Edge Function and is never included in client code.
- Deleting the authentication user cascades to the matching `player_progress` row.
- The in-app deletion flow also clears progress on the device used for deletion.
- The external page provides a request path for players who no longer have the app.

## Final checks before submission

1. Test deletion with a disposable account and record the result.
2. Confirm both public URLs return HTTP 200 over HTTPS.
3. Confirm the final Android bundle contains no analytics, advertising or payment SDK added after this audit.
4. Re-read every Play Console definition shown beside the form fields.
5. Ensure the store listing, privacy policy and Data safety answers all describe the same release build.
