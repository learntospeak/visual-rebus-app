# Chapter medallion

Adds a ten-piece teal and gold medallion, a home-screen collection entry, chapter completion screens, and the golden Master completion screen. Rewards derive from existing completedIds and the actual published chapter membership (currently 565 puzzles). Existing accounts receive earned pieces without migration. Clues/stars do not gate rewards; revealed puzzles must subsequently be solved. Daily puzzles do not award journey pieces. Replays do not repeat earned celebrations.

Chapter completion follows the existing sound/haptic preference-aware solve celebration. Reward animation respects both reduced celebrations and system reduced motion. Rewards provide continue, collection, revisit and home actions; screen headings receive focus.

Validation: content validator (565 puzzles), TypeScript, Vite production build, scripts/test-rewards.ts (all ten chapter boundaries, legacy completion, final completion, replay and invalid/duplicate IDs). Master SVG rendered and visually inspected. Browser/device end-to-end validation remains outstanding. Native Play Store bundle is not released by this change.

Pre-change backup: backup/before-chapter-medallion-2026-09-12.
