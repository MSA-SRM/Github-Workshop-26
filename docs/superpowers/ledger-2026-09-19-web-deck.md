# SDD ledger — plan: docs/superpowers/plans/2026-09-19-web-deck.md

Spec: `docs/superpowers/specs/2026-09-19-github-workshop-design.md` (in-repo copy, reachable)
Repo: `MSA-SRM/Github-Workshop-26` · Branch: `feat/web-deck` · Base commit: `a83f57b`

## Pre-flight scan

### Pairs sharing a file

| Tasks | Shared file | Produces → consumes | Finding |
|---|---|---|---|
| 2 → 3 | `src/data/curriculum.js` | T2 creates `LABS = []`; T3 replaces it | Clean |
| 2 → 4 | `src/data/curriculum.js` | T2 creates `GROUPS = []`; T4 replaces it | Clean |
| 6 → 14 | `src/styles/base.css` | T6 creates with `@import './tokens.css'`; T14 prepends `@import './fonts.css'` | Clean — CSS allows consecutive leading `@import` |
| 13 → 15 | `src/main.js` | T13 writes `transport: null`; T15 replaces with adapter | Clean |
| 10 → 11 | `.u-section-heading` (base.css class, styled in deck.css) | T10 sets `font-size: var(--u-deck-display)` unscoped; T11 reuses the class | **CONFLICT — R4** |

### Pairs sharing an interface

| Tasks | Interface | Finding |
|---|---|---|
| 1 → 2 | `validateCurriculum() -> {ok, errors}` | Clean — asserted in that exact shape |
| 2 → 3,4,5,8,10,11,12 | `ACTS`, `CURRICULUM` | Clean |
| 5 → 10,11,12 | `icon(name, size)`, `mountSprite(doc)` | Clean — called with those signatures |
| 6 → (none) | `PALETTE`, `PALETTE_NAMES` | **CONFLICT — R7:** consumed only by its own test |
| 7 → 11,13 | `createProgress` → `isDone/toggle/doneCount/reset` | Clean |
| 8 → 12 | `computeDrift() -> {…, state, label}` | Clean — T12 reads `label`, `state` only |
| 9 → 10,13,15 | `createFollow` → `state/slide/navigate/rejoin/destroy` | Clean |
| 12 → 13 | presenter `goTo(i)` | **CONFLICT — R5:** T13 reads `root.dataset.i`, never set by T12 |

### Task self-consistency

| Task | Finding |
|---|---|
| 1 | Clean — tests match the validator's branches |
| 2 | Clean — `validateCurriculum(CURRICULUM)` passes with empty `LABS`/`GROUPS` |
| 3 | Clean — per-act lab minutes verified under every act window (a1 7<14, a2 3<10, a3 7<14, a4 5<17, a5 3<8, a6 10<13) |
| 4 | Clean — group counts sum to 178; tier split 36/77/65 |
| 5 | Clean — `repo` is referenced in Act 0, so the `oct-repo` symbol assertion holds |
| 6 | Token regexes match the stylesheet as written |
| 7 | Clean — throwing-storage and corrupt-JSON paths both covered |
| 8 | Clean — en-dash and rounding assertions match the implementation |
| 9 | Clean — degraded never returns to following |
| 10 | **CONFLICT — R6:** `document` keydown listener is never removed; leaks across mounts |
| 11 | Clean |
| 12 | Clean in isolation |
| 13 | See R5 |
| 14 | **CONFLICT — R2:** font URL 404s. **CONFLICT — R3:** `public/` font is not inlined, so `dist-offline` would not be single-file |
| 15 | Clean — capability-specific bodies deliberately sequenced after Step 1 |

## Rulings

- **Ruling R1: Spec and plan copied into the repo at `docs/superpowers/`, committed to `main` (a83f57b) before branching.** — Tasks 2/3/4 instruct the implementer to transcribe from the spec, so it must be readable at a stable in-repo path; it also makes the repo self-contained. — Cost if wrong: two duplicated markdown files that can be deleted.
- **Ruling R2: Task 14 vendors Mona Sans from npm `@fontsource-variable/mona-sans@5.3.0` (OFL-1.1) instead of the plan's GitHub raw URL.** — The plan's URL returns 404 (verified); the npm package is the maintained distribution and OFL-1.1 permits vendoring. — Cost if wrong: a different woff2 build of the same typeface.
- **Ruling R3: Task 14 sets `build.assetsInlineLimit` to 10 MB in offline mode so the woff2 inlines as a data URI.** — Without it `dist-offline/` emits a separate font file and the plan's own single-file requirement fails. — Cost if wrong: a larger single HTML file (~100 KB added).
- **Ruling R4: Task 10 scopes every deck.css rule under `.deck`.** — `.u-section-heading` is shared with the guide; unscoped, guide headings would render at `--u-deck-display` (up to 140px). — Cost if wrong: deck headings lose styling, caught immediately by the deck view test.
- **Ruling R5: Task 12 additionally exposes `current(): number`, and Task 13 uses it instead of `root.dataset.i`.** — `root.dataset.i` is never assigned anywhere in the plan, so the presenter's arrow key would pin it to slide 1 forever. — Cost if wrong: one extra method on the presenter's return object.
- **Ruling R6: Task 10 additionally returns `destroy()`, removing the `document` keydown listener, with a test asserting no advance after destroy.** — Listeners accumulate across mounts; in the live deck a re-render would double-advance slides. — Cost if wrong: one extra method and test.
- **Ruling R7: Task 11 renders the six palette colours as swatches in the guide, consuming `PALETTE`.** — Otherwise `palette.js` is consumed only by its own test, which the review rubric treats as YAGNI; and Lab 5 step 4 asks attendees to choose a colour by name, so showing the actual colours is a real improvement. — Cost if wrong: a small swatch row in the guide that could be removed.

## Progress

- Task 1: implementer DONE (commit 2870ec8), review: spec ✅, quality approved
- Task 1: minor (deferred): beat-level validator errors don't identify which beat within an act (`src/data/schema.js:15-16`)
- Task 1: minor (deferred): commit attribution says "Claude Sonnet 5" (the implementing model) rather than the session default; accurate, cosmetic only
- Task 1: fix round 1/5 (1 addressed, 0 open — validator branch test coverage; commits 2870ec8..10c6ea7)
- Task 1: complete (commits a83f57b..10c6ea7, review clean)
- Task 2: complete (commits 10c6ea7..04033b0, review clean — spec ✅, quality approved)
- Task 2: minor (deferred): `curriculum.js:92` PR-anatomy enumeration sourced from Appendix A rather than §6 prose
- Task 2: minor (deferred): `curriculum.js:95` empty `icons` where `log` may fit ("reading a failed check")
- Task 2: minor (deferred): task-2-report.md beat counts off by one (Act 4 is 20, total 82)
- Task 2: minor (deferred): `schema.js` never validates `beat.text` is non-empty, unlike `step.text`. Safe to defer — all beats are now written and reviewed; no later task adds beats.
- **Ruling R8: `l6.minutes` becomes 8, not the plan table's 5.** — Spec §6 budgets Lab 6 at 5 min AND the Watermelon Gate at 3 min; the plan folded the Gate's steps into Lab 6 but left minutes at 5, so any timing UI would understate Act 4 by 3 minutes. Spec is the binding authority over the plan table. Act 4 is 17 min and l6 is its only lab, so 8 < 17 keeps the act-window invariant. No test hard-codes 5. — Cost if wrong: Lab 6 displays 8 min instead of 5.
- Task 3: minor (deferred): `l6s5` uses `comment-discussion` for "read the bot's comment"; `dependabot`/`hubot` may fit better
- Task 3: minor (deferred): `l7s4` uses `check-circle` (sourced from the Conflicts group) for "confirm up to date"
- Task 3: minor (deferred): `file-added` and `file-directory` (l5s1/l5s2) are valid Octicons but absent from spec Appendix A — inherited from the plan's verbatim Lab 5
- Task 3: fix round 1/5 (1 addressed, 0 open — l6.minutes 5→8 per Ruling R8; commits 986bfa4..8c210d6)
- Task 3: complete (commits 04033b0..8c210d6, review clean)
- Task 4: complete (commits 8c210d6..dff0a04, review clean — spec ✅ zero discrepancies across all 178 rows, quality approved)
  Controller-verified independently: 23 groups, 178 topics, tiers 36/77/65, 125 distinct icons all valid in @primer/octicons
- **Ruling R9: Task 5's "no remote references" assertion must exempt the SVG namespace URI.** — The plan's test asserts `SPRITE` matches no `https?://`, but a valid `<svg>` root must carry `xmlns="http://www.w3.org/2000/svg"`, so the assertion is unsatisfiable as written. The constraint it enforces (Octicons vendored, never hotlinked) is a real global constraint and must keep a test — so the assertion is narrowed to "no http(s) URL other than the XML namespace" rather than deleted. — Cost if wrong: a hotlink using the literal namespace string would evade detection, which is not a realistic failure mode.
- Task 5: fix round 1/5 (1 addressed, 0 open — narrowed no-hotlink assertion per Ruling R9; commits 8c38b3d..978481c)
- Task 5: complete (commits dff0a04..978481c, review clean — spec ✅, quality approved; sprite = 127 icons)
- Task 5: minor (deferred): `mountSprite()` idempotency guard is correct but never exercised by a test
- Task 5: minor (deferred): the curriculum icon-set reduction is duplicated between generator and test (brief-mandated)
- **Ruling R10: Task 6 accepted on controller verification instead of a review dispatch.** — User asked for the fastest path to a deployed Pages site. Task 6's only real risk is wrong brand values; I verified all six palette hexes, their order, all four tokens and the light-mode selector directly. A reviewer would add little. — Cost if wrong: a styling defect visible on first render and trivially fixable.
- Task 6: complete (commits 978481c..3084ef4, controller-verified; 39/39 tests pass)
- Task 6: accepted deviation — brief used `new URL(..., import.meta.url)` with `readFileSync`, which fails under Vitest on Windows ("URL must be of scheme file"); implementer used `fileURLToPath`/`dirname`/`resolve`. Behaviour identical.
- **Ruling R11: adding a GitHub Actions Pages deploy workflow, which the plan omits.** — Plan Task 15 builds `dist/` with `--mode pages` but nothing publishes it, so the plan as written can never satisfy its own "GitHub Pages archive" deliverable. — Cost if wrong: an unused workflow file.
- **Ruling R12: Tasks 7, 8 and 9 batched into one dispatch.** — Three independent pure-logic modules with complete code in the plan and no shared files; the skill directs batching same-shape work. Reviewed as one unit. — Cost if wrong: one review covering three small modules rather than three.
