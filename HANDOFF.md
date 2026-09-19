# Handoff — GitHub Workshop '26 web deck

**Written:** 2026-09-19 · **Branch:** `feat/web-deck` · **Head at handoff:** `0f9117d`
**Test state:** 64/64 passing across 9 files (`cd deck && npx vitest run`)

Read this file, then the spec, then the plan. Everything below is fact verified against the repo, not recollection.

---

## 1. The one thing the user wants next

> "Get this to a working and deployed on GitHub Pages as early as possible."

That is the active priority and it overrides the plan's task order. The
shortest honest path is in §6. Do not start Task 14 (offline build) or Task 15
(Artifact publish) before Pages is live — they are not on the critical path.

---

## 2. What this project is

A 90-minute, browser-only, hands-on GitHub workshop for true beginners
(25–40 attendees, one facilitator, no TAs). Three deliverables:

| Track | What | Where | State |
|---|---|---|---|
| **A** | Lab repo attendees fork | `HelloOjasMutreja/universe-mosaic` | **Not started.** Repo exists, public, empty |
| **B** | The web deck | this repo, `deck/` | **In progress — 8 of 15 tasks done** |
| **C** | Runbook, pre-work email, rehearsal | this repo (planned) | Not started |

You are working on **Track B**.

The deck is one codebase with three views rendered from a single data file:
- **deck** — what the facilitator projects
- **guide** — the same lab steps as a scrollable checklist, shared live with attendees
- **presenter** — current/next slide, elapsed clock, and a drift indicator

### Authoritative documents

- **Spec (binding authority):** `docs/superpowers/specs/2026-09-19-github-workshop-design.md`
  §6 is the session flow; §8 is the deck; Appendix A is the 178-topic inventory.
- **Plan:** `docs/superpowers/plans/2026-09-19-web-deck.md` — 15 TDD tasks.
  **The plan contains known defects.** See §5.
- **Ledger:** `.superpowers/sdd/2026-09-19-web-deck/progress.md` — every completed
  task, every deferred minor, every ruling. **Git-ignored, so it does not survive
  a clean checkout.** Its rulings are reproduced in §5 below for that reason.

---

## 3. Done — Tasks 1–9 (commit `a83f57b`..`0f9117d`)

| Task | What landed | Commits |
|---|---|---|
| 1 | Vite/Vitest scaffold + `src/data/schema.js` (`validateCurriculum`) | `2870ec8`, `10c6ea7` |
| 2 | `ACTS` — 8 acts, 82 beats, contiguous, sums to exactly 90 min | `04033b0` |
| 3 | `LABS` — 9 labs with steps and `warn` flags | `986bfa4`, `8c210d6` |
| 4 | `GROUPS` — all 178 topics, 23 groups, tiers 36/77/65 | `dff0a04` |
| 5 | `scripts/build-sprite.mjs` + `src/icons/icon.js` + generated `sprite.js` (127 icons) | `8c38b3d`, `978481c` |
| 6 | `src/data/palette.js`, `src/styles/tokens.css`, `src/styles/base.css` | `3084ef4` |
| 7 | `src/lib/progress.js` | `1506144` |
| 8 | `src/lib/drift.js` | `2cb0e86` |
| 9 | `src/lib/follow.js` | `0f9117d` |

### Review status — read this carefully

- Tasks 1–5 each passed a full task review (spec compliance + quality).
- **Task 6** was accepted on controller verification instead of a review
  dispatch (Ruling R10). Palette hexes, tokens and light-mode selector were
  verified directly.
- **Tasks 7, 8 and 9 have NOT been reviewed at all.** They were batched into
  one dispatch (Ruling R12) which was interrupted before review. Their tests
  pass and the code matches the plan verbatim, but no reviewer has seen them.
  **Review them before the final whole-branch review**, or fold them into it.

### Interfaces the remaining tasks consume

```
validateCurriculum(curriculum) -> {ok: boolean, errors: string[]}
ACTS, LABS, GROUPS, CURRICULUM = {acts, labs, groups}
PALETTE: {name, hex}[]   PALETTE_NAMES: string[]
icon(name, size = 24) -> SVGSVGElement      mountSprite(doc) -> void
SPRITE: string           ICON_NAMES: string[]
createProgress(storage?) -> {isDone, toggle, doneCount, reset}
computeDrift({acts, actId, elapsedMs}) -> {expectedMin, elapsedMin, driftMin, state, label}
createFollow({transport, onChange}) -> {state, slide, navigate, rejoin, destroy}
```

Act windows in minutes: `a0` 0–7, `a1` 7–21, `a2` 21–31, `a3` 31–45,
`a4` 45–62, `a5` 62–70, `a6` 70–83, `a7` 83–90.

---

## 4. Remaining — Tasks 10–15 plus a Pages workflow

| Task | What | Brief |
|---|---|---|
| 10 | Deck view + `styles/deck.css` | `.superpowers/sdd/2026-09-19-web-deck/task-10-brief.md` |
| 11 | Guide view + `styles/guide.css` | `task-11-brief.md` |
| 12 | Presenter view | `task-12-brief.md` |
| 13 | `index.html` + `src/main.js` routing | `task-13-brief.md` |
| 14 | Mona Sans + offline single-file build | `task-14-brief.md` |
| 15 | Artifact publish + Pages archive build | `task-15-brief.md` |
| — | **GitHub Actions Pages deploy workflow** (not in the plan — Ruling R11) | none; write it |

Briefs for all remaining tasks are already extracted into
`.superpowers/sdd/2026-09-19-web-deck/`. If that directory is gone (it is
git-ignored), regenerate with:

```bash
bash "C:/Users/Ojas/.claude/plugins/cache/claude-plugins-official/superpowers/6.3.0/skills/subagent-driven-development/scripts/task-brief" docs/superpowers/plans/2026-09-19-web-deck.md <N>
```

---

## 5. Rulings already made — do not re-litigate, do not silently drop

These are corrections to defects in the plan. Each says what it costs if wrong.

- **R1** — Spec and plan copied into this repo at `docs/superpowers/` so
  implementers can transcribe from them. *Cost: two duplicated markdown files.*
- **R2** — Task 14 must vendor Mona Sans from npm **`@fontsource-variable/mona-sans@5.3.0`** (OFL-1.1).
  **The plan's GitHub raw URL 404s — verified.** *Cost: a different woff2 build of the same typeface.*
- **R3** — Task 14 must set `build.assetsInlineLimit` high (10 MB) in offline
  mode so the woff2 inlines as a data URI. Without it `dist-offline/` emits a
  separate font file and is not single-file, failing the plan's own
  requirement. *Cost: ~100 KB larger HTML.*
- **R4** — Task 10 must scope **every** `deck.css` rule under `.deck`.
  `.u-section-heading` is shared with the guide; unscoped, guide headings
  render at `--u-deck-display` (up to 140px). *Cost: deck headings lose styling, caught by the deck test.*
- **R5** — Task 12 must additionally expose **`current(): number`**, and Task 13
  must use it. The plan's `main.js` reads `root.dataset.i`, **which nothing
  anywhere assigns** — the presenter's arrow key would pin it to slide 1
  forever. *Cost: one extra method.*
- **R6** — Task 10 must additionally return **`destroy()`** removing the
  `document` keydown listener, with a test asserting no advance after destroy.
  Listeners otherwise accumulate across mounts and double-advance slides.
  *Cost: one extra method and test.*
- **R7** — Task 11 must render the six palette colours as swatches in the
  guide, consuming `PALETTE`. Otherwise `palette.js` is consumed only by its
  own test (YAGNI); and Lab 5 asks attendees to pick a colour by name, so
  showing the colours is a real improvement. *Cost: a removable swatch row.*
- **R8** — `l6.minutes` is **8**, not the plan table's 5. Spec §6 budgets Lab 6
  at 5 min *and* the Watermelon Gate at 3 min, and the Gate's steps live inside
  `l6`. Already applied. *Cost: Lab 6 displays 8 min.*
- **R9** — Task 5's no-hotlink assertion is narrowed to exempt the SVG
  namespace URI (`xmlns="http://www.w3.org/2000/svg"`), because the plan's
  original assertion was unsatisfiable. Already applied. *Cost: a hotlink using the literal namespace string would evade detection — not a realistic failure mode.*
- **R10** — Task 6 accepted on controller verification, no review dispatch.
  *Cost: a styling defect visible on first render.*
- **R11** — A GitHub Actions Pages deploy workflow must be added. The plan
  builds `dist/` but nothing publishes it, so the plan can never satisfy its
  own "GitHub Pages archive" deliverable. *Cost: an unused workflow file.*
- **R12** — Tasks 7–9 batched into one dispatch. *Cost: one review over three modules — **and that review never happened**, see §3.*

---

## 6. Shortest path to a live Pages deploy

1. **Task 10** (deck view) — apply **R4** and **R6**.
2. **Task 11** (guide view) — apply **R7**.
3. **Task 12** (presenter view) — apply **R5** (add `current()`).
4. **Task 13** (entry + routing) — apply **R5** (use `current()`, not `root.dataset.i`).
5. **Pages workflow** (R11). Set `vite.config.js` base for mode `pages` to
   `/Github-Workshop-26/deck/` — already written that way. Build with
   `npx vite build --mode pages` from `deck/`, publish `deck/dist`.
   Enable Pages on the repo (Settings → Pages → source: GitHub Actions).
   Resulting URL: `https://msa-srm.github.io/Github-Workshop-26/deck/`
6. **Then** Task 14 (font + offline) and Task 15 (Artifact + Follow Presenter transport).

After step 5 the user has what they asked for. Steps in 6 are polish.

---

## 7. Environment facts (verified, not assumed)

- Node v24.13.0, npm 11.6.2. Windows; Git Bash available; **PowerShell is the primary shell**.
- `gh` CLI v2.94.0, authenticated as `HelloOjasMutreja`, **ADMIN** on `MSA-SRM/Github-Workshop-26`.
- **The GitHub MCP server fails to connect** (bad Authorization header). Not a
  blocker — use `gh` and `git`. The Figma MCP server needs OAuth and is unused here.
- `@primer/octicons@19.38.0` — all 127 icon names used by the curriculum verified present.
- Universe '26 tokens were scraped from the live site: canvas `#090d0a`,
  accent `#23ea57`, text-accent `#5fed83`, and the six accents
  acid `#23ea57` / lime `#cdf041` / purple `#8b40f5` / pink `#ed55ba` /
  teal `#26ede2` / indigo `#4a5ce5`. Typeface is Mona Sans.

### Gotchas that have already cost time

- **`new URL(p, import.meta.url)` passed to `node:fs` throws on Windows under
  Vitest** ("The URL must be of scheme file"). Use `fileURLToPath`/`dirname`/`resolve`.
  Task 6's test already works around this.
- `.superpowers/` is git-ignored, so subagent reports are never committed.
  Do not be surprised when a report is on disk but absent from a diff.
- Nothing has been pushed. `feat/web-deck` is local only.
- The API dropped connection twice mid-dispatch (ENOTFOUND). **Check the working
  tree before re-dispatching an interrupted task** — once, an agent had finished
  all its work and died only before committing. Re-running would have redone it.

---

## 8. How to continue

The build is running under `superpowers:subagent-driven-development`: a fresh
implementer per task, a task review after each, a whole-branch review at the
end. To continue that way, resume the loop at Task 10 and append to the ledger.

If you continue without that skill, the non-negotiables are: work on
`feat/web-deck`; keep all 64 existing tests passing; apply every ruling in §5;
never hard-code counts that should come from `curriculum.js`; and remember the
guide view must render correctly when browser storage throws.

**Still unreviewed and owed a review:** Tasks 7, 8, 9.
**Still unwritten:** the Pages workflow, and Tracks A and C entirely.
