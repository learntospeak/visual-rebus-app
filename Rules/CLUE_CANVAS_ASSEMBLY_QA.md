# Assembly creator / independent reviewer protocol

User-authorized 2026-10-01. Supplements the mandatory Assembly rules; never overrides them. Existing approved artwork remains approved and is not silently replaced.

## Roles and sequence

1. **Creator (main agent):** read current handoff/backlog; run `npm run assembly:preflight`. Check catalogue and approved answers for exact, semantic and visual duplicates. Record subject, action, context and relationship/consequence before generating. Generate standalone artwork only. Default delivery batch is three; quality takes priority over filling a batch.
2. **Blind reviewer (separate isolated agent, no inherited conversation):** receive only the candidate under an opaque name plus neutral instructions. Do not receive target answer, concept, clues, prompt, answer-bearing filename, backlog, or creator rationale. Inspect actual pixels. Record up to three likely phrases in rank order, visible evidence, and the strongest alternative interpretation. Lock this response before revealing the target. Preserve the returned review in a separate JSON record.
3. **Informed reviewer (the same reviewer after recording its blind response):** receive intended answer, meaning components, relevant rules, catalogue comparison, and the actual mobile-size and solved/scrambled grid renders. Rate fairness and check every gate below. If the intended phrase was absent from the blind guesses, fail inference unless the reviewer had independently described the same meaning using synonymous wording, with explicit evidence. Merely agreeing after seeing the target is insufficient.
4. **Creator revision loop:** repair/regenerate failed candidates without asking the user to debug them. Any pixel, crop or image change invalidates prior review. Use a new isolated blind reviewer on the revised candidate. After three failed attempts, park the phrase with a reason and use the next eligible backlog item; do not lower the standard. Finish each item's review before generating the next item.
5. **Technical check:** inspect the real existing puzzle window at 320px and 390px viewport widths and desktop; verify all meaning components survive, no unintended gaps/crop, correct fragment rotation, swaps, solve gate, repeated-letter filling, punctuation/spaces, disabled used keys and completion. Store concrete evidence. Reviewers cannot invent passed browser checks when a browser is unavailable. Structural validator is not a substitute for visual inspection.
6. **Batch gate:** record candidates in `qa/assembly/batch.json`, review files and source images in repository paths; run `npm run assembly:ready`. Only `ready_for_user` records with every check passing may be presented as finished. Parked/failed work stays out of approval batch. Never include pending artwork in the approved folder.
7. **User approval:** present individual numbered images, intended phrase and a one-line inference explanation outside each image. No contact sheets or embedded answer text. User can say “approve all” or specify exceptions. Only an explicit user approval changes status to `approved`; record approval text/date and move the exact approved source to /Rebus/Assembly Approved. Do not merge or update the existing live app. Update handoff and private draft as appropriate.

## Required reviewer gates

Each gate records `pass: true/false` and specific `evidence`, not a generic score:
- `inference`: blind guesses or independently recorded synonymous meaning support intended phrase.
- `meaning`: subject, action, context, relationship/consequence all visible.
- `ambiguity`: intended answer is stronger than competing phrases; challenge is fair.
- `duplicates`: semantic AND visual comparison with catalogue and approved artwork; exact matches are also checked by script.
- `format`: no UI, captions, answer letters, titles, watermarks, borders or grid overlays in source; symbolic exceptions require explicit user approval.
- `anatomy`: natural bodies, hands, objects, scale, perspective and interactions.
- `mobile`: exact delivered artwork remains readable at mobile size.
- `jigsaw`: useful landmarks across tiles; no meaningless uniform pieces; actual grid/rotation fit checked.

Technical evidence uses the same pass/evidence format for `mobile320`, `mobile390`, `desktop`, `swap`, `rotation`, `contiguous`, `answerGate`, `repeatLetters`, `punctuationSpaces`, `usedKeys`, `completion`.

## Persistent records and honest scope

`batch.json` owns the queue, approved-answer exclusions and candidate state. Review files contain `candidateSha256`, `reviewerId`, `intendedPhrase`, `catalogueSha256` (printed by preflight), `renderConfig` (grid columns/rows, aspect ratio, crop policy and tested viewport sizes), `blind` (guesses, observedMeaning, evidence, recordedBeforeReveal), and `checks`. Candidate records contain id, phrase, creatorId, imagePath, sha256, reviewPath, status, the identical renderConfig and technicalEvidence. Use actual tool agent IDs and hash the delivered source, not its filename. Store review text exactly; never rewrite a reviewer rejection as a pass. Hash matching invalidates stale image reviews, but cannot prove subjective correctness or independent judgment. User approval remains final.

The script performs exact catalogue/approved/batch duplicate checks, state and evidence checks, identity separation, file existence and SHA-256 verification. It does NOT itself understand images, test the browser, prove blind isolation, or guarantee that every player will infer the phrase. Those steps are performed by the reviewer and technical checks during an active work session. No paid API, scheduler or perpetual agent is enabled.

Use `node --import tsx scripts/validate-assembly-qa.ts preflight` or `ready` directly if the npm wrapper is unavailable. Run preflight before generating; run ready before claiming a finished approval batch. No ready candidates must fail the ready command.

Before the first finished batch, materialize and hash every current approved source into approvedArtworkInventory; null hashes are deliberate pending values and block readiness. Reconcile the inventory against the current approved folder before every batch. Catalogue fingerprint includes that inventory and all batch candidate image hashes; any candidate revision requires refreshing pending duplicate reviews. Approved records preserve their historical catalogue audit; remove newly approved phrases from the queue.

renderConfig must contain grids (array of {cols,rows} for every grid used by that puzzle), aspect (positive number), cropPolicy (contain or cover), and viewportWidths (including 320, 390, and a desktop width of at least 1024). Every candidate and its reviewer record must have identical configurations.

## Automated AI artwork gate — 2026-10-02

Run this before any generated candidate is presented to the user:

`npm run assembly:review -- --image <image-path> --phrase "<intended phrase>" --text-mode no_text`

For deliberate text/wordplay rebuses, use `--text-mode subtle_text`.

The gate uses two API reviews. Stage 1 is blind and is not told the target phrase. Stage 2 receives the locked blind review plus the intended phrase and checks semantic match, fairness, answer leakage, stale/recycled concepts, format, mobile readability and jigsaw landmarks.

It also checks the local Chapter 1 catalogue plus the current Assembly prototype for exact duplicate answers before calling the API. A candidate fails closed if it is a contact sheet/triptych, UI/mockup, unrelated multi-scene image, wrong/recycled concept, direct answer giveaway, weak semantic match, unfairly ambiguous, poor on mobile, or weak for jigsaw slicing.

Use `--out qa/assembly/reviews/<name>.json` to persist the machine-readable review.

This automated gate supplements the existing technical/browser checks and explicit user approval; it does not replace them. It requires `OPENAI_API_KEY`. The default reviewer models are `gpt-6-luna` for the blind pass and `gpt-6-sol` for the informed pass, overrideable with `ASSEMBLY_BLIND_MODEL` and `ASSEMBLY_JUDGE_MODEL`.
