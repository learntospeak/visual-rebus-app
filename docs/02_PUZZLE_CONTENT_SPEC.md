# Puzzle Content Specification

Complete every field before a puzzle is approved.

## Required record

- **ID:** stable unique number.
- **Answer:** canonical phrase.
- **Accepted answers:** spelling, punctuation and regional variants.
- **Word pattern:** example `4-6-3`.
- **Difficulty:** Easy, Medium or Hard.
- **Format:** typography, icon, illustration, photo, motion or interaction.
- **Visual specification:** exact positions, sizes, rotations, colours and assets.
- **Clue 1:** broad concept; no answer words.
- **Clue 2:** directs attention to the visual mechanism.
- **Clue 3:** targeted word or letter help.
- **Explanation:** one to three short steps showing why it works.
- **Region:** Global, AU, UK, US or other.
- **Originality log:** creator, date, phrase source and asset source/licence.
- **QA status:** Draft, Tested, Approved or Rejected.

Use `data/puzzle_inventory_template.csv` to track these fields.

## Launch format mix

1. **Typography placement:** above, below, inside, split, repeated or reversed.
2. **Text plus icon:** a word combined with one or more simple symbols.
3. **Illustrated placement:** objects inside, behind, around or crossing another object.
4. **Scale/colour/rotation:** size, colour or orientation carries meaning.
5. **Motion:** falling, running, fading, looping or crossing the screen.
6. **Interaction:** drag an object into position or tap the unusual element.

Aim for no single format to exceed one-third of the launch library.

## Difficulty rules

### Easy

- One obvious mechanism.
- Globally familiar phrase.
- Solvable from the image and word pattern.
- Clue 1 should usually be enough.

### Medium

- Two compatible mechanisms or a mild sound-alike.
- Familiar phrase but not instantly visible.
- Clue 2 should direct the player without giving the answer.

### Hard

- Multiple mechanisms or a less direct interpretation.
- Still fair for the labelled region.
- The full explanation must make the answer feel inevitable.
- Do not use obscurity as difficulty.

## Clue ladder standard

- **Clue 1 — Concept:** “Think about position and order.”
- **Clue 2 — Visual focus:** “Notice which word is above the other.”
- **Clue 3 — Targeted help:** reveal a meaningful letter, word category or phrase structure.
- **Reveal:** show the answer and explanation; never disguise a reveal as a normal clue.

Never reveal a letter the player has already entered correctly.

## Approval gate

A puzzle is approved only when:

- [ ] At least 2 of 3 blind testers solve it without the final clue.
- [ ] All testers understand the explanation immediately after reveal.
- [ ] No materially different phrase fits equally well.
- [ ] Regional or cultural dependence is labelled.
- [ ] Accepted spelling and punctuation variants are recorded.
- [ ] Artwork and layout are original or properly licensed.
- [ ] No tester reports that the answer feels arbitrary.

Reject weak puzzles. Do not keep them merely to increase the count.
