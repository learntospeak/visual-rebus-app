# Visual Asset Standard

Every puzzle visual must meet this standard before it can be marked Approved. The goal is a consistent, premium visual language that remains clear across phones, browsers and operating systems.

## 1. Default art direction

- Use original flat vector artwork wherever an object or character is required.
- Use the established palette: Ink `#183B56`, Teal `#2CB1A6`, Coral `#FF6B5F`, Warm Paper `#F7F3EA` and Gold `#F2C94C`.
- Use rounded geometric forms, confident silhouettes and restrained detail.
- Use one dominant visual idea per puzzle. Decoration must never compete with the clue.
- Maintain a calm editorial style rather than cartoon clip-art, photorealism or casino-game styling.

## 2. Prohibited by default

- Platform emoji as primary puzzle artwork. Emoji differ across Apple, Google, Samsung and desktop systems.
- Unedited stock illustrations from mixed visual families.
- AI-generated raster images with malformed objects, text, hands, faces or inconsistent lighting.
- Low-resolution JPEGs, screenshots, watermarked art or assets without a recorded licence.
- Colour alone as the only carrier of meaning.

An exception requires a documented reason and cross-device testing.

## 3. Vector construction rules

- Prefer inline SVG or project-owned SVG files for icons and illustrations.
- Use the Ink colour for primary outlines with consistent rounded caps and joins.
- Keep primary strokes visually equivalent to roughly 4–6 px in a 120 px view box.
- Use no more than five colours in one puzzle illustration.
- Avoid details thinner than 2 px at the final rendered size.
- Group related artwork into reusable components rather than embedding one-off drawing logic in screen code.

## 4. Size and layout

- The clue must remain recognisable at 320 px screen width.
- Primary subjects should occupy 45–75% of the puzzle visual area.
- Preserve at least 20 px of clear space around meaningful artwork.
- Do not allow important details to touch, clip against or disappear behind the puzzle-card edge.
- Test long answer patterns and artwork together without requiring vertical scrolling on a common phone.

## 5. Meaning and fairness

- A tester must be able to name the depicted object without being told what it is.
- Direction, count, scale, position and colour must be visually unmistakable when they carry the answer.
- Do not rely on device-specific glyph orientation or cultural symbolism without a region label.
- Artwork must support one intended phrase; it must not introduce a second equally plausible answer.
- The solved explanation must account for every meaningful visual element.

## 6. Accessibility

- Maintain at least WCAG AA contrast for meaningful text and shapes.
- Provide a concise accessible description for every puzzle visual.
- Never expose the answer in accessible text before the puzzle is solved.
- Pair colour clues with shape, position, labels or another non-colour signal.
- Meaning must remain visible in high-contrast and reduced-motion modes.

## 7. Required QA views

Check each visual at:

- 320 × 568 phone viewport;
- 390 × 844 modern phone viewport;
- large-text mode;
- light mode and any supported high-contrast mode;
- at least one iPhone browser and one Android browser.

## 8. Approval checklist

- [ ] Artwork follows the established vector style and palette.
- [ ] No platform-dependent emoji is used as the primary clue.
- [ ] The depicted subjects are immediately recognisable.
- [ ] The clue remains legible at 320 px width.
- [ ] Direction, count and relative position are unambiguous.
- [ ] Contrast and accessible description are adequate.
- [ ] Asset source, creator and licence are recorded.
- [ ] The visual has been checked on both iOS and Android.
- [ ] At least 2 of 3 blind testers solve it without the final clue.

If any required item fails, the puzzle remains Draft or Rejected.
