# Release preparation — 5 October 2026

Current local source: feature/puzzle-games-400 at 00331f69aa55d05b78ca0d6e36d510f1afb289a4. Preserved owner edits in ArtworkGallery.tsx and vite.config.ts remain outside this commit; record their exact overlay with the eventual approved release. Original 565 rebuses and 400 mini-game definitions remain unchanged. Chapter 2 production stays paused.

## Gates before a final Android candidate

1. Owner reviews the draft menu. The owner said it is more complicated than before; the shorter Home suggestion has NOT yet been approved or implemented. Do not treat the published draft as release approval.
2. Open the existing Clue Canvas app in Play Console (games.cluecanvas.app), inspect App bundle explorer and every existing release track for used version codes. Code 4 remains provisional; choose a higher unused code only after this check. Preserve the existing upload key and application ID. No console access or version availability was established in this session.
3. Build from the final approved source and preserved overlay, after passing npm build, interaction and reward tests. Run capacitor sync android, then Gradle bundleRelease and assembleRelease through the existing wrapper/JDK. If gradlew.bat fails because the workspace path contains an ampersand, invoke the existing GradleWrapperMain class with Java directly from the android directory. Do not create a different host/project or signing identity.
4. Write new artifacts to a new versioned/date-specific candidate directory; retain the archived October 4 artifacts and stale label. Record source commit/overlay hashes, version name/code, package ID, artifact sizes and SHA256.
5. Check every dist file against APK assets/public and AAB base/assets/public (allow only documented Capacitor-generated metadata); verify every games asset and menu bundle matches. APK apksigner verify and AAB jarsigner verify must pass; compare upload-certificate SHA256 with the prior released 1.0.2/code3 upload certificate.
6. Install on actual Android or the existing Play internal track: preserve progress across upgrade; verify original journey, all four maps/rounds, daily mix, account Back first-tap, system Back hierarchy, loading retry, suspend/resume, offline play and any account-sync behavior available without invented results.
7. Only after owner approval and internal smoke, release to the original main website and existing Play listing via supported owner access. No stale APK/AAB upload or forced replacement of main.

## Verification already completed

- Production TypeScript/Vite build, 565 content validator and 400 game checks passed after account repair.
- Existing interaction/reward suites passed.
- Actual Chromium phone-sized first-tap account Back reproduced before repair (button moves from x26/y39.58 to x16/y14.67 on focus). Stable compact phone layout fixes it; first tap returns Home at 390px and 320px and returns Settings from Settings entry; input focus leaves Back position unchanged. 390x400 reduced-height account is scrollable with no horizontal overflow. Desktop return works.
- These are browser viewport checks, not real Android or an on-screen keyboard certification.
- adb devices -l returned no attached devices; no configured AVD .ini was found. Android smoke is blocked on a connected device or accessible internal-track testing.
- Latest original main website and Play have not been changed. Cloudflare/Play controls are not available in this task; no new hosting/accounts should be created as a workaround.

The original October 4 release README's successful signing results refer to its old archived artifacts, not to a freshly verified release candidate.
