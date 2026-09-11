# The Chronologist's Cabinet

A mobile-first standalone proof of concept for puzzle 252. It does not import or modify the production game.

## Open it

Double-click `OPEN_YEAR_DOT_CABINET.bat`, or open `index.html` in a modern browser.

## Intended sequence

1. Place the timepieces on the rail from oldest to newest: sundial, hourglass, pocket watch, digital watch.
2. Take the key released by the drawer and place it in the keyhole.
3. Turn the year dial anticlockwise until the word `YEAR` is visibly compressed into the origin dot.
4. Enter the phrase revealed by that transformation to open the final lock.

The completed visual resolves to **the year dot**. The answer must be entered; it is never automatically revealed.

## Interaction support

- Pointer/touch: drag objects, rotate the dial.
- Click/tap alternative: select an object, then select its destination.
- Keyboard: tab to objects and sockets; use Enter/Space to select and place. Once unlocked, use Left or Down Arrow to rewind the dial.
- Reduced motion is respected.

## Design intent

The cabinet is presented through staged portrait close-ups rather than a scaled desktop scene. Each active mechanism fills the available play area and maintains thumb-sized targets. Camera transitions preserve the sense that every stage belongs to the same physical cabinet. The challenge uses observation, chronology, discovery and a chained mechanical sequence. Hints live outside the cabinet in a progressive ledger, so the scene never turns into an instruction panel. Incorrect ordering gives neutral mechanical feedback without exposing the answer.
