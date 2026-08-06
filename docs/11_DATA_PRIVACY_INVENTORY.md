# Clue Canvas data and privacy inventory

Last audited: 6 August 2026

This document records the behaviour of the current launch code. It is the source for the privacy policy, Google Play Data safety answers and account-deletion testing. Update it whenever data handling changes.

## Current summary

- Accounts are optional. Guests can play without submitting personal information to Clue Canvas.
- Signed-in accounts use Supabase Authentication and cloud progress storage.
- The app has no advertising, payments, analytics SDK, location access, contacts access, camera access or microphone access.
- Clue Canvas does not sell player data.
- The in-app account-deletion flow, protected Supabase function, privacy policy and public deletion-request page are implemented and live. An authenticated end-to-end deletion with a disposable account still needs final verification before release.

## Data stored on the player’s device

### Puzzle progress

Browser storage key: `visual-rebus-progress-v1`

Stored fields:

- completed puzzle IDs;
- current journey position;
- best star score for each completed puzzle;
- puzzle IDs whose answers were revealed;
- legacy puzzle-feedback values, if any remain from an older build;
- daily-puzzle completion dates and reveal dates;
- current and longest daily streak; and
- the last daily completion date.

Purpose: save the player’s journey, stars, replay state and daily streak.

Retention: remains on the device until the player resets progress, clears site/app data or removes the app data.

### Settings

Browser storage key: `visual-rebus-settings-v1`

Stored fields:

- sound enabled;
- reduced celebrations;
- larger text;
- high contrast; and
- onboarding completed.

Purpose: remember accessibility and game preferences.

Retention: remains on the device until site/app data is cleared.

### Authentication session

When a player signs in, Supabase’s client library persists the authentication session and refresh token in local browser/app storage so the player can remain signed in.

Purpose: authenticate the player and synchronize their cloud progress.

Retention: controlled by the Supabase authentication session and removed or invalidated through sign-out, account deletion or expiry/revocation.

## Data stored by Supabase for signed-in players

### Account information

- email address;
- Supabase authentication user ID;
- password credential handled by Supabase Authentication; and
- authentication/session metadata maintained by Supabase.

The application never reads or stores a player’s plaintext password. The password is submitted directly to Supabase Authentication over HTTPS.

Purpose: create the optional account, authenticate the player and associate cloud progress with the correct person.

### Cloud progress

Database table: `public.player_progress`

Stored fields:

- authentication user ID;
- the same puzzle-progress structure listed above; and
- the timestamp of the most recent cloud update.

Purpose: synchronize progress between devices and restore it after reinstalling or signing in elsewhere.

Access control: Row Level Security permits authenticated players to read, create and update only the progress row matching their own authentication user ID.

Retention: currently retained while the account exists. The database row is configured to be deleted automatically when its Supabase authentication user is deleted.

### Service and security metadata

Supabase may process operational information needed to run and protect authentication and database services, such as request metadata, timestamps, IP addresses and service logs. This is handled by Supabase as the service provider and must be reflected in the final privacy policy where applicable.

## Information not currently persisted as player data

- The time taken on an individual puzzle and the number of clues used are calculated for the solved screen but are not stored in local progress or Supabase.
- Typed guesses and incorrect answers are not saved.
- The spoiler-free share result is handed to the device share sheet or clipboard; Clue Canvas does not send it to its own server.
- The current app does not collect analytics events, advertising identifiers, precise or approximate location, contacts, photos, files, microphone recordings, camera images, payment details or health information.

## Current third-party service

Supabase provides:

- optional email/password authentication;
- session management; and
- cloud storage of game progress.

Before publication, the privacy policy must name Supabase, explain its role, and link to relevant privacy information.

## Account deletion implementation

Implemented locally or in Supabase:

1. A prominent **Delete account and data** action for signed-in players.
2. A deliberate confirmation explaining that deletion is permanent.
3. A protected server-side Supabase function that authenticates the caller and deletes only that caller’s account.
4. Deletion of the Supabase authentication user, with the existing foreign-key cascade deleting `player_progress`.
5. Local sign-out and erasure of progress on the device used for deletion.
6. A public web page where a former player can request deletion without reinstalling the app.

Still required before Google Play submission:

1. Test deletion with a disposable authenticated account.
2. Confirm the deleted credentials no longer sign in and the related database row is gone.

The Supabase service-role or secret key must never be included in browser or Android application code. Administrative deletion must run in a protected server-side function.

## Decisions still needed

- Public developer name: `SilentJZ Studio`.
- Public support email: `cluecanvasadmin@gmail.com`.
- Legal name or trading name that will identify the privacy-policy operator.
- Contact method for an external deletion request: email `cluecanvasadmin@gmail.com` from the account address.
- Local puzzle progress is erased automatically on the device used for an in-app cloud-account deletion.
- Final retention wording for service logs and any deletion-request records.

## Data Safety working classification

This is a working note, not the final Play Console submission:

- Personal information: email address for optional account management.
- App activity: puzzle progress, stars, reveals and streak history for app functionality and account synchronization.
- Security practices: data transmitted over HTTPS; player progress protected by Supabase authentication and Row Level Security.
- Deletion: not ready until both the in-app deletion path and external web resource are implemented and tested.
