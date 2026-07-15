# GUI Style Guide

## Direction

**Modern editorial puzzle card** — warm, clever, calm and premium. Avoid casino styling, clutter, excessive coins, random gradients and childish decoration.

See `assets/brand/ui_mockup.png`.

## Palette

- Ink: `#183B56` — headings, puzzle text and navigation.
- Teal: `#2CB1A6` — clues, active state and progress.
- Coral: `#FF6B5F` — primary submit action and brief celebration.
- Warm paper: `#F7F3EA` — main background.
- Gold: `#F2C94C` — restrained reward accent only.

## Typography

- Headings: Manrope or Space Grotesk.
- Body and answer input: Inter or the system font.
- Keep puzzle text large and high contrast.
- Do not use more than two font families.

## Layout rules

- One central puzzle card uses roughly two-thirds of the useful screen area.
- Puzzle, answer and clue actions are visible without scrolling on common phones.
- Bottom navigation is thumb-friendly and visually quiet.
- Coins, streaks and menus are secondary to the puzzle.
- Minimum touch target: 44 × 44 points.
- Use generous spacing; do not fill every empty area.

## Motion rules

- Fast transitions: approximately 150–250 ms.
- Celebration lasts less than one second before the explanation becomes readable.
- Motion must carry meaning or feedback.
- Support reduced motion.

## Illustration rules

- Use one consistent flat/vector family.
- Prefer simple shapes that remain legible on small screens.
- Avoid mixed stock-art styles.
- Every puzzle asset needs a recorded source or licence.

## Required screens

### Onboarding

One example puzzle, one clue demonstration and immediate play. No account request.

### Home

Continue, Daily Puzzle, Packs and progress. No busy dashboard.

### Puzzle

Central clue, word blanks, answer entry, clue, submit and report controls.

### Solved

Answer, animated explanation, next puzzle and share challenge.

### Packs

Difficulty, completion, locked/unlocked state and clear price labels.

### Settings

Purchases, restore, privacy, accessibility, sound, haptics and support.

## Visual quality test

A screenshot should make sense within two seconds:

1. What is the puzzle?
2. Where do I answer?
3. How do I get a clue?
4. What is the primary action?

If any answer is unclear, simplify the screen.
