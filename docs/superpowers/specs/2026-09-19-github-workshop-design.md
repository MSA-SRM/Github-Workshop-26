# GitHub Workshop 2026 — Design Spec

**Date:** 2026-09-19
**Status:** Approved design, ready for implementation planning

---

## 1. Summary

A 90-minute, browser-only, fully hands-on GitHub workshop for true beginners,
delivered with a GitHub Universe '26–themed web deck that doubles as a
self-serve participant guide. Every attendee performs nine labs, contributes a
pixel to a collaborative mosaic via a real pull request, experiences a failing
CI check and fixes it, and resolves a genuine merge conflict.

The governing principle is **determinism**: every participant experiences the
same thing, in the same order, at the same moment. Successes are guaranteed by
architecture; the one failure and the one conflict are staged by the
facilitator.

---

## 2. Context and constraints

| Constraint | Value |
|---|---|
| Audience | True beginners — most have never created a repository |
| Duration | 90 minutes, one continuous block |
| Attendees | 25–40 |
| Facilitators | 1, solo, no TAs |
| Tooling | Browser only — github.com and github.dev. No Git install, no CLI, no local auth |
| Deck | Web deck (HTML), shared live with attendees as a reference |
| Theme | GitHub Universe '26 |
| Icons | Primer Octicons, used as concept vocabulary rather than decoration |
| Lab repo host | Facilitator's **personal** GitHub account — `HelloOjasMutreja` |
| Lab repo | `github.com/HelloOjasMutreja/universe-mosaic` — created, public, currently empty |

**Implications of solo facilitation at this scale:** merging 35 pull requests by
hand is impossible while teaching, so merging must be automated. The automation
is not a convenience — it is load-bearing, and it doubles as the workshop's live
demonstration of GitHub Actions.

**Implications of browser-only:** no time is spent on installation, credentials,
PATs or SSH keys. Terminal vocabulary is taught (fetch, pull, push, merge) so the
words are familiar later, but no terminal is used.

**On the number 35.** Throughout this document, counts such as `0 / 35 pixels
lit` and "34 commits behind" are written for an illustrative 35-person room.
Every such count is computed at runtime from the actual number of merged cells —
nothing is hard-coded to 35. The deck, the bot comments and the mosaic all read
the live count.

---

## 3. Deliverables

1. **`universe-mosaic`** — the public lab repository, including its GitHub
   Actions automation and a GitHub Pages site rendering the live mosaic.
2. **The web deck** — one codebase, three views (deck, guide, presenter),
   published as an Artifact for the live session and to GitHub Pages as the
   permanent archive, plus a single-file offline build.
3. **Facilitator resources** — pre-work email, printed runbook, Chaos Moment
   card, failure playbook.
4. **Rehearsal results** — four documented dry runs against defined exit
   criteria.

### Implementation tracks

The four deliverables decompose into three build tracks with one dependency
between them:

1. **Track A — lab repo & automation.** Repository, cell format, renderer,
   validation/auto-merge workflow, Pages deploy, reset workflow. Independent;
   must be built first because Track C rehearses against it.
2. **Track B — the web deck.** `curriculum.js`, the three views, theme, Octicon
   sprite, Follow Presenter, offline build. Independent of Track A except that
   it links to the repo.
3. **Track C — resources & rehearsal.** Pre-work email, runbook, Chaos Moment
   card, failure playbook, then the four dry runs. Depends on both A and B.

---

## 4. The determinism engine

### 4.1 Guaranteed success: the cell files

Each participant adds exactly one file: `cells/<their-github-username>.json`.

Two properties make conflict structurally impossible:

- **The filename is their GitHub username.** No two participants can ever
  modify the same file.
- **The cell's position is derived, not chosen.** `art/target.json` holds the N
  coordinates that compose the target image. A participant's position is
  `stableHash(username) mod N`, with linear probing across a sorted username
  list to resolve hash collisions deterministically. Because nobody picks a
  coordinate, no coordinate collision can occur, and there is no "which square
  is mine" confusion.

The participant's entire creative decision is **one word: a colour**, chosen
from the six Universe accent colours. This is the smallest possible decision
surface, which matters because they are making it while the facilitator is
mid-sentence explaining what a commit is.

The mosaic is a recognisable pixel image that reveals itself in Universe colours
as pull requests merge.

### 4.2 Guaranteed conflict: `WALL.md`

`WALL.md` contains exactly one line:

```
Last signed by: nobody 🔥
```

At the appointed minute every participant replaces `nobody` with their username
and opens a pull request. While they do, the facilitator pushes one commit
changing that same line. Every open pull request in the room conflicts, on the
same line, at the same moment.

Because the diff is a single line, the conflict markers are visible with nothing
competing for attention. Maximum lesson, minimum noise.

### 4.3 Guaranteed failure: the Watermelon Gate

The validation Action requires the 🍉 emoji in the **pull request title**.
Participants are **not** told this in advance.

Everyone opens their PR → everyone receives a red ✗ → the bot posts an
explanatory comment → they click Edit on the PR title, add 🍉 → the check re-runs
→ green ✓ → auto-merge.

Gating on the *title* rather than the commit message is deliberate: a title is
editable in one click in the web UI, so the fix takes seconds. Gating on a
commit message would require an entirely new commit and would stop being fun.

Every participant therefore experiences reading a failed check, understanding
bot feedback, editing a PR, and watching a check re-run — simultaneously, in
about 40 seconds.

---

## 5. Curriculum inventory

178 topics across 23 groups, tiered by depth:

- **Tier 1 — Performed** (36 topics): done hands-on in a lab.
- **Tier 2 — Taught live** (77 topics): explained on screen with a diagram or
  demo; seen, not done.
- **Tier 3 — Guide only** (65 topics): reference cards, cheat sheets and
  glossary in the shared deck.

Tier 3 exists because the deck is shared and permanent. It is what converts the
workshop from an event into a resource the attendees still use next month.

### Groups

A. Foundations & mental models · B. Repositories · C. Repo furniture ·
D. Markdown · E. Getting a copy (fork / clone / ZIP / template) · F. Social &
discovery · G. Branches · H. Commits · I. Pull requests · J. Code review ·
K. Merging · L. Remotes & syncing · M. Conflicts · N. Issues & planning ·
O. Actions & automation · P. Pages, releases & packages · Q. Security ·
R. Insights & analytics · S. Profile & identity · T. Search & navigation ·
U. Editors & tooling · V. Orgs, teams & permissions · W. Where to go next

Every topic is bound to one or more Octicons. The icon is introduced *as* the
concept, so that when a participant later hunts for a button in the GitHub UI
they are looking for a shape they have already met. The full topic → Octicon →
tier mapping is the source of truth for `curriculum.js` and is reproduced in
Appendix A.

### Explicitly out of scope

No CLI use, no rebase in practice, no cherry-pick, no stash, no SHAs or Git
internals, no detached HEAD, no submodules. Merge vs squash vs rebase is named
and diagrammed but never performed. For true beginners in 90 minutes each of
these costs more than it returns.

---

## 6. Session flow

Nine labs. Two synchronised room-wide moments. Two live projector counters that
do the pacing.

### Act −1 · Pre-work (T−48h)

Email plus deck link. Three tasks: create a GitHub account, verify the email,
star `universe-mosaic`. The star count serves as a live RSVP — the facilitator
knows the readiness of the room before walking in.

This act is non-negotiable. Account creation plus email verification takes 3–5
minutes; 35 people doing it at 0:00 would consume a fifth of the session.

### Act 0 · Cold open & the map · 0:00–0:07

Screen shows the empty mosaic, live, reading `0 / 35 pixels lit`.

The promise. The version-control problem. Git vs GitHub as engine vs ecosystem.
Repository as project-plus-history. Commit as labeled snapshot. Branch as
pointer. The three-place map (local ↔ your fork ↔ upstream), which stays pinned
to the screen edge for the rest of the session.

Misconceptions killed explicitly: GitHub is not a cloud folder; committing is
not saving; Git is not GitHub.

Latecomers without accounts sign up during this act.

### Act 1 · Your own repo · 0:07–0:21

The nine repo tabs named in 90 seconds — the whole map of GitHub, early, so
every later concept has a home. The About panel, the Code button, public vs
private.

**Lab 1 (4 min):** create a repository with a well-chosen name, description,
public visibility, README, `.gitignore` and MIT licence.

*Fun beat — "Name & Shame" (45 sec):* five real bad repository names on screen;
the room votes on the worst by shouting. The naming rules then land as a
punchline.

Markdown taught as a real skill. The surprising fact that a public repository
without a licence is not open source.

**Lab 2 (3 min):** edit the README to add a heading, bold text, a list and a
task list; commit with a properly formed message.

### Act 2 · Fork & the map · 0:21–0:31

Why you cannot push to someone else's repository — the permission model. The
four ways to get a copy (fork, clone, download ZIP, use template) compared side
by side. origin vs upstream as a two-box diagram. Star vs watch vs fork.

**Lab 3 (3 min):** star, watch, and fork `universe-mosaic`; observe the URL now
carries their username and the "forked from" provenance line.

*Fun beat:* the star counter jumps live on the projector as 35 people star at
once.

**Help protocol established here:** a pinned issue titled *"Stuck? Comment
here"* in the upstream repository. Blocked participants comment their username
and step number. This is the facilitator's queue, and it teaches Issues
hands-on at no cost to the clock.

### Act 3 · Branch & commit · 0:31–0:45

Branch as movable pointer. The default branch and why it is `main`. Branch
naming conventions. Commit anatomy, atomicity, message conventions,
Conventional Commits.

**Lab 4 (2 min):** create branch `add-<username>`.

**Lab 5 (5 min):** create `cells/<username>.json` from the template, change one
word — the colour — and commit to the branch.

**The pitfall, pre-empted aloud:** *"If the box says 'Commit directly to the
main branch', stop — you're in the wrong place."* This is where most
participants go wrong; it is named before it happens.

*Fun beat — "press the dot" (30 sec):* everyone presses `.` on their fork and
VS Code opens in the browser.

File history and blame shown.

### Act 4 · Pull request · 0:45–1:02

A PR as a proposal and a conversation that happens to contain a diff. **base vs
compare**, drawn as an arrow and taught slowly — this dropdown is where
first-time PRs die. PR anatomy and the diff view.

**Lab 6 (5 min):** open the pull request, verifying base and compare out loud
together.

**The Watermelon Gate (3 min):** red ✗ → read the bot's comment → edit the title
to add 🍉 → green ✓ → auto-merge → their pixel lights up on the projector.

During the merge wave: reading a failed check as information rather than
failure; what Actions are; bots; review mechanics (comment / approve / request
changes, inline comments, suggested changes); draft PRs; reviewers, assignees,
labels, milestones; `Closes #12`; @mentions; merge vs squash vs rebase drawn and
compared but never performed; closed ≠ merged; deleting the merged branch.

**The moment:** the upstream Insights → Contributors graph on the projector.
*"Every one of you is on this list. You are, as of ninety seconds ago, open
source contributors."*

**Side quests** for fast finishers, listed in the Guide so nobody idles and
nobody races ahead in the main flow: add topics to your Lab 1 repo; create your
profile README; open an issue suggesting a colour; react to three other people's
merged PRs; find the easter egg.

### Act 5 · Sync, origin & upstream · 1:02–1:10

Their fork is visibly stale — missing 34 pixels, reading "34 commits behind". A
fork is a photograph; the original keeps moving. The fetch / pull / push / merge
vocabulary. The golden rule: sync `main` before you branch.

**Lab 7 (3 min):** Sync fork; watch 34 pixels arrive in their own copy; confirm
"up to date"; open Compare to see nothing remains.

*Fun beat:* everyone refreshes their own fork's Pages site simultaneously and
sees the full mosaic in their own copy.

### Act 6 · Conflict · 1:10–1:23

Git is not confused — Git is being careful. What is *not* a conflict: different
files, different lines. This delivers a retroactive callback: *that* is why all
35 merged cleanly ten minutes ago, and it was on purpose.

**Lab 8 (4 min):** branch `sign-<username>`, edit `WALL.md`, commit, open a PR
with 🍉 in the title. Then: hands off keyboards.

**The Chaos Moment (1 min):** countdown from three; the facilitator pushes the
maintainer commit; every PR in the room flips to *"This branch has conflicts
that must be resolved."*

**Lab 9 (6 min):** Resolve conflicts → read the markers together (`<<<<<<< HEAD`
is what's there, `=======` is the divider, `>>>>>>>` is what you're bringing) →
decide, keeping both names → **delete all three marker lines**, the step people
miss → Mark as resolved → Commit merge → merged.

Afterwards: a resolution is just a normal commit. Prevention — small PRs, sync
often, short-lived branches, talk to your team.

### Act 7 · The rest of GitHub & close · 1:23–1:30

Rapid-fire tour framed as *"you now have the vocabulary for every one of
these"*: Issues, labels, milestones, Projects, Discussions, Actions (you already
ran one), Pages (you've been watching one for 90 minutes), releases and tags,
semver, Gists, Security and Dependabot and the warning that history is forever,
Insights, profile README and contribution graph, search qualifiers,
notifications, Codespaces, Copilot, orgs and teams.

Close on the full mosaic, 35/35 lit, contributor list scrolling, and one
concrete next step: find a `good first issue` this week. The deck link stays
live permanently.

### Timing budget

| Act | Window | Minutes |
|---|---|---|
| 0 Cold open | 0:00–0:07 | 7 |
| 1 Your repo | 0:07–0:21 | 14 |
| 2 Fork | 0:21–0:31 | 10 |
| 3 Branch & commit | 0:31–0:45 | 14 |
| 4 Pull request | 0:45–1:02 | 17 |
| 5 Sync | 1:02–1:10 | 8 |
| 6 Conflict | 1:10–1:23 | 13 |
| 7 Close | 1:23–1:30 | 7 |
| **Total** | | **90** |

---

## 7. The lab repository

### 7.1 Structure

```
universe-mosaic/
├── README.md                     front door + link to the guide
├── WALL.md                       one line: "Last signed by: nobody 🔥"
├── LICENSE                       MIT
├── .gitignore
├── CONTRIBUTING.md               doubles as a Tier-3 teaching artifact
├── CODE_OF_CONDUCT.md
├── cells/
│   ├── _template.json            the file participants copy
│   └── _example.json             keeps the directory present
├── art/
│   └── target.json               image coordinates + palette + easter egg
├── site/                         Pages output — the live mosaic
├── scripts/
│   ├── validate-cell.mjs
│   └── render-mosaic.mjs
└── .github/
    ├── workflows/
    │   ├── validate-and-merge.yml
    │   ├── deploy-pages.yml
    │   └── reset.yml
    ├── pull_request_template.md
    └── ISSUE_TEMPLATE/
```

### 7.2 Cell file format

```json
{
  "username": "octocat",
  "color": "acid"
}
```

`color` must be one of: `acid`, `lime`, `purple`, `pink`, `teal`, `indigo`.

### 7.3 Validation and auto-merge

`validate-and-merge.yml`, triggered on `pull_request_target`, checks in order:

1. The PR title contains 🍉 — otherwise fail with a friendly bot comment *(the
   Watermelon Gate)*.
2. Exactly one file is changed.
3. The path is `cells/<pr-author-login>.json` — the filename must match the PR
   author's login.
4. The JSON parses and `color` is one of the six permitted values.

On success: approve, squash-merge, and comment — *"🍉 merged — pixel (12,7) is
now lime. **24 / 35** lit."*

`WALL.md` pull requests in Act 6 run a separate rule: check 1 (the 🍉 title gate)
still applies — it applies to **every** pull request in the repository, without
exception — while checks 2–4 are replaced by a validation of the `WALL.md` line
shape. The PR merges once the participant has resolved the conflict. GitHub
already blocks merging a conflicted PR, so the sequencing requires no extra
logic.

By Act 6 participants already know the 🍉 rule, so this gate is no longer a
surprise; it is there for consistency and because they will now pass it
unprompted, which is itself the evidence that Act 4's lesson landed.

### 7.4 Operational requirements

These are correctness requirements, not optimisations:

- **`pull_request_target` runs with repository write access. The workflow must
  never check out the pull request's code.** Validation reads the diff through
  the API only. Checking out fork code in a `pull_request_target` workflow would
  be a live vulnerability in a repository that 35 strangers are pushing to.
- **Pages deploys must be debounced** with a single concurrency group and
  cancel-in-progress. Otherwise 35 merges in four minutes queue 35 site builds.
- **Merges must retry.** Near-simultaneous merges intermittently return "base
  branch was modified"; a bounded retry loop absorbs this.

### 7.5 Reset

`reset.yml` (`workflow_dispatch`) clears `cells/`, restores `WALL.md` to its
initial line, and redeploys the site. The workshop will be run more than once.

---

## 8. The web deck

### 8.1 Hosting

- **Live session:** published as an Artifact. Follow Presenter requires state
  shared across ~35 browsers, and the Artifact runtime provides this without a
  backend. This is the link shared on the day.
- **Archive:** GitHub Pages, served from the workshop repository itself.
  Permanent, facilitator-owned, no sync.
- **Fallback:** a single-file offline build on a USB stick, because venue wifi
  is unreliable.

One codebase, one build flag.

### 8.2 Single source of content

All acts, beats, labs, steps, Octicon names, tiers and guide cards live in
`curriculum.js`. Every view renders from it, so the views cannot drift.

### 8.3 Views

- **Deck** (default): full-bleed, approximately 15 words per slide, arrow-key
  navigation, legible from the back of a room.
- **Guide:** the same content as one long scrollable checklist, with sticky act
  navigation, in-page search, and step checkboxes persisted in browser storage
  so a stuck participant knows where they were. Reads and writes to browser
  storage are wrapped in try/catch and the page renders correctly without it.
- **Presenter:** a separate window showing the current slide, the next slide,
  facilitator notes, elapsed clock, and a **drift indicator** reporting whether
  the session is ahead of or behind the planned act boundary.

### 8.4 Follow Presenter

Attendees land in follow mode. Any navigation silently releases them — no modal,
no warning — and a "Rejoin presenter" pill appears until tapped. If sync fails,
the deck degrades silently to free-browse and never shows an error. The failure
mode of this feature must be invisible.

### 8.5 Theme

Derived from the live GitHub Universe '26 design tokens:

| Token | Value |
|---|---|
| Typeface | Mona Sans |
| Canvas | `#090d0a` |
| Accent / text-accent | `#23ea57` / `#5fed83` |
| Lime | `#cdf041` |
| Purple | `#8b40f5` |
| Pink | `#ed55ba` |
| Teal | `#26ede2` |
| Indigo | `#4a5ce5` |

The six accents double as the six mosaic colours, so the deck and the artifact
share one palette. Section headings are lowercase with a trailing slash
(`fork/`, `conflict/`). Oversized display type. The block-grid motif as act
dividers.

The Guide view additionally supports a light mode: dark is correct for a
projector and wrong for someone reading steps on a laptop for 90 minutes.

### 8.6 Octicons

`@primer/octicons` (MIT), vendored and inlined as an SVG sprite at build time.
Never hotlinked, so the offline build works. Every icon name in the inventory is
verified against the installed Octicons version during the build, because a
small number of names differ between versions.

### 8.7 Presentation requirements

Copy buttons on every snippet (cell JSON, branch name, file path). A live embed
of the mosaic Pages site on the reveal slides. Minimum 28px body type on deck
slides. Legible at 1024×768. No hover-dependent interaction.

---

## 9. Facilitator resources

- **Pre-work email** (T−48h): the three tasks, the deck link, one
  troubleshooting line.
- **Runbook**, two printed pages: the T−60min checklist (projector, wifi,
  smoke-test PR, repository reset); the four tabs to keep open (presenter view,
  mosaic Pages, upstream PR list, pinned help issue); and per act — the one
  sentence that must be said, the pitfall to pre-empt, and the drift target.
- **Chaos Moment card:** the exact click sequence for the maintainer commit, so
  it is not improvised in front of the room.
- **Failure playbook:** wifi down → offline deck, labs become a facilitator-driven
  demo. Bot down → cancel the Watermelon Gate verbally and batch-merge at act
  boundaries. Pages not rebuilding → show the `cells/` file count instead. Plus
  the predictable human failures: committed to main instead of a branch, forked
  into an organisation, arrived at 0:40, PR opened against the wrong base.

---

## 10. Rehearsal

Four runs, in order:

1. **Participant run.** Walk all nine labs on a throwaway account, timing each
   step and logging every ambiguity. Every Guide step is rewritten against what
   actually happened.
2. **Adversarial run.** Deliberately do it wrong: wrong base branch, malformed
   JSON, missing 🍉, uppercase filename, username mismatch, fork of a fork,
   commit straight to main. Each must produce a human-readable bot message, not
   a stack trace.
3. **Load run.** Script 35 concurrent pull requests. Measure Action throughput,
   merge success rate, Pages debounce behaviour and time-to-pixel-visible. This
   run determines whether the 0:45–1:02 window holds.
4. **Timed dress rehearsal.** The full 90 minutes with deck, presenter view and
   drift indicator, end to end.

### Exit criteria

- Every lab is completable by a first-timer within its budgeted time.
- Every invalid input produces a human-readable message.
- 35 pull requests merge in under 4 minutes.
- The full run lands within ±5 minutes of 90.

---

## 11. Known dependencies and risks

| Item | Status |
|---|---|
| GitHub MCP server | Failed to connect this session. **Not a blocker:** `gh` CLI v2.94.0 is installed and authenticated as `HelloOjasMutreja`, providing the push path for all Track A work |
| Repository naming | **Resolved.** Renamed to `universe-mosaic`, so the repo now follows the lowercase-hyphen convention Lab 1 teaches |
| Octicon names | **Resolved.** All 127 icon names referenced in Appendix A verified against `@primer/octicons` 19.38.0 (397 icons); zero missing |
| Mona Sans | Openly licensed; to be vendored with the deck |
| `@primer/octicons` | MIT; vendored at build time |
| Artifact shared-state capability | Required for Follow Presenter; to be confirmed against the live capability roster before the deck is built |
| Venue wifi | Assumed unreliable; offline build and failure playbook mitigate |
| Act 4 (0:45–1:02) | The crunch window. First pull requests are where beginners stall. Mitigated by the pre-empted pitfall, the pinned help issue, side quests and the load run |

---

## Appendix A — Topic → Octicon → Tier inventory

Tier key: ① performed hands-on · ② taught live · ③ guide reference only.

### A. Foundations & mental models
| Topic | Octicon | Tier |
|---|---|---|
| What version control is | `history` | ② |
| Git vs GitHub | `git-branch` + `mark-github` | ② |
| Distributed vs centralized VCS | `git-compare` | ③ |
| What a repository is | `repo` | ② |
| The commit graph | `git-commit` | ② |
| Branches as pointers | `git-branch` | ② |
| The three-place map | `device-desktop` `repo-forked` `repo` | ② |
| What a SHA is | `hash` | ③ |
| Why Git was created | `north-star` | ③ |

### B. Repositories
| Topic | Octicon | Tier |
|---|---|---|
| Creating a repo | `repo` `plus` | ① |
| Repo naming conventions | `typography` | ① |
| Description, topics, website | `info` `tag` | ① |
| Public vs private | `globe` / `lock` | ① |
| The nine repo tabs | `repo` `issue-opened` `git-pull-request` `play` `project` `book` `shield` `graph` `gear` | ② |
| The Code button | `code` | ② |
| Repo templates | `repo-template` | ③ |
| Archiving | `archive` | ③ |
| Deleting / transferring | `trash` `arrow-switch` | ③ |
| Repo settings | `gear` | ③ |

### C. Repo furniture
| Topic | Octicon | Tier |
|---|---|---|
| `README.md` | `book` | ① |
| `.gitignore` | `eye-closed` | ① |
| `LICENSE` — no licence means not open source | `law` | ① |
| MIT vs Apache-2.0 vs GPL | `law` | ③ |
| `CONTRIBUTING.md` | `checklist` | ③ |
| `CODE_OF_CONDUCT.md` | `people` | ③ |
| `CODEOWNERS` | `shield-check` | ③ |
| Issue & PR templates | `note` | ③ |
| `.gitattributes` | `file-code` | ③ |

### D. Markdown
| Topic | Octicon | Tier |
|---|---|---|
| Headings | `heading` | ① |
| Bold / italic | `bold` `italic` | ① |
| Lists | `list-ordered` `list-unordered` | ① |
| Task lists | `tasklist` | ① |
| Links & images | `link` `image` | ① |
| Code fences | `code` | ① |
| Blockquotes | `quote` | ② |
| Tables | `table` | ③ |
| GFM alerts | `alert` | ③ |
| Collapsible details | `fold` | ③ |
| Mermaid diagrams | `workflow` | ③ |
| Emoji shortcodes | `smiley` | ③ |

### E. Getting a copy
| Topic | Octicon | Tier |
|---|---|---|
| Fork | `repo-forked` | ① |
| Clone | `repo-clone` | ② |
| Download ZIP | `download` | ② |
| Use this template | `repo-template` | ② |
| When to use which | `git-compare` | ② |
| The "forked from" line | `repo-forked` | ① |
| Fork network graph | `graph` | ③ |

### F. Social & discovery
| Topic | Octicon | Tier |
|---|---|---|
| Star | `star` | ② |
| Watch | `eye` | ② |
| Fork count as a signal | `repo-forked` | ② |
| Star vs watch vs fork | `star` `eye` `repo-forked` | ② |
| Sponsors | `heart-fill` | ③ |
| Trending & Explore | `telescope` | ③ |

### G. Branches
| Topic | Octicon | Tier |
|---|---|---|
| Creating a branch | `git-branch` | ① |
| The default branch | `git-branch` | ② |
| Why we branch | `git-branch` | ② |
| Branch naming conventions | `typography` | ① |
| Switching branches | `arrow-switch` | ① |
| Deleting a merged branch | `trash` | ② |
| Branch protection rules | `shield-lock` | ③ |
| Branching strategies | `git-branch` | ③ |

### H. Commits
| Topic | Octicon | Tier |
|---|---|---|
| Making a commit | `git-commit` | ① |
| Commit anatomy | `git-commit` | ② |
| Atomic commits | `git-commit` | ② |
| Commit message conventions | `typography` | ① |
| Conventional Commits | `checklist` | ② |
| Commit history | `history` | ② |
| Blame view | `people` | ② |
| Amending | `pencil` | ③ |
| Signed / Verified commits | `verified` | ③ |
| Reverting | `arrow-switch` | ③ |

### I. Pull requests
| Topic | Octicon | Tier |
|---|---|---|
| Opening a PR | `git-pull-request` | ① |
| base vs compare | `arrow-right` `git-compare` | ① |
| Title & description conventions | `typography` | ① |
| Conversation / Commits / Files changed | `comment-discussion` `git-commit` `file-diff` | ② |
| The diff view | `diff-added` `diff-removed` `diff-modified` | ② |
| Draft PRs | `git-pull-request-draft` | ② |
| Open vs merged vs closed | `git-pull-request` `git-merge` `git-pull-request-closed` | ② |
| Reviewers, assignees, labels, milestone | `person` `tag` `milestone` `project` | ② |
| Linking issues (`Closes #12`) | `cross-reference` | ② |
| @mentions | `mention` | ② |
| Reactions | `smiley` | ③ |
| PR templates | `note` | ③ |

### J. Code review
| Topic | Octicon | Tier |
|---|---|---|
| Comment / Approve / Request changes | `comment` `check-circle-fill` `x-circle-fill` | ② |
| Inline comments | `comment-discussion` | ② |
| Suggested changes | `code-review` | ② |
| Resolving conversations | `check` | ② |
| Required reviewers | `shield-check` | ③ |
| Review etiquette | `people` | ③ |

### K. Merging
| Topic | Octicon | Tier |
|---|---|---|
| The merge button | `git-merge` | ① |
| Merge vs squash vs rebase | `git-merge` `fold` `git-branch` | ② |
| Effect on history | `history` | ② |
| Status checks | `dot-fill` `check-circle-fill` `x-circle-fill` | ① |
| Required checks | `shield-check` | ③ |
| Merge queue | `git-merge-queue` | ③ |

### L. Remotes & syncing
| Topic | Octicon | Tier |
|---|---|---|
| origin vs upstream | `repo-forked` `repo` | ① |
| "N commits behind" | `arrow-down` | ① |
| Sync fork | `sync` | ① |
| fetch / pull / push / merge | `repo-pull` `repo-push` `git-merge` | ② |
| Sync main before branching | `north-star` | ② |
| Compare across forks | `git-compare` | ② |
| CLI equivalents | `terminal` | ③ |

### M. Conflicts
| Topic | Octicon | Tier |
|---|---|---|
| What a conflict is | `alert` | ① |
| What is not a conflict | `check-circle` | ② |
| Marker anatomy | `code` | ① |
| Resolving in the web editor | `pencil` | ① |
| Mark as resolved → commit merge | `check` `git-merge` | ① |
| Preventing conflicts | `shield` | ② |
| Three-way merge | `git-compare` | ③ |
| `--ours` / `--theirs`, aborting | `terminal` | ③ |

### N. Issues & planning
| Topic | Octicon | Tier |
|---|---|---|
| Opening an issue | `issue-opened` | ① |
| Closing / reopening | `issue-closed` `issue-reopened` | ② |
| Labels | `tag` | ② |
| Assignees | `person` | ② |
| Milestones | `milestone` | ② |
| Issue templates & forms | `note` | ③ |
| `good first issue` | `light-bulb` | ② |
| Projects (boards & tables) | `project` `table` | ② |
| Roadmap view | `project-roadmap` | ③ |
| Discussions | `comment-discussion` | ② |
| Task lists & tracked issues | `tasklist` `issue-tracks` | ③ |

*(Opening an issue is Tier ① because the pinned help issue makes it hands-on.)*

### O. Actions & automation
| Topic | Octicon | Tier |
|---|---|---|
| What CI/CD means | `workflow` | ② |
| Watching a run on their own PR | `play` | ① |
| Reading pass/fail logs | `log` | ② |
| Workflow file basics | `file-code` | ③ |
| Triggers | `zap` | ③ |
| Marketplace actions | `package` | ③ |
| Secrets in Actions | `key-asterisk` | ③ |
| Bots | `dependabot` `hubot` | ② |

### P. Pages, releases & packages
| Topic | Octicon | Tier |
|---|---|---|
| GitHub Pages | `browser` | ② |
| Tags | `tag` | ② |
| Releases | `rocket` | ② |
| Semantic versioning | `versions` | ③ |
| Packages / registry | `package` | ③ |
| Gists | `logo-gist` | ② |

### Q. Security
| Topic | Octicon | Tier |
|---|---|---|
| Security tab | `shield` | ② |
| Dependabot | `dependabot` | ② |
| Secret scanning | `key` | ② |
| Code scanning | `codescan` | ③ |
| Security advisories | `shield-x` | ③ |
| History is forever — never commit secrets | `alert-fill` | ② |
| 2FA & passkeys | `shield-lock` | ③ |
| PATs vs SSH keys | `key-asterisk` | ③ |

### R. Insights & analytics
| Topic | Octicon | Tier |
|---|---|---|
| Insights tab | `graph` | ② |
| Pulse | `pulse` | ③ |
| Contributors graph | `people` | ② |
| Traffic | `meter` | ③ |
| Network graph | `git-branch` | ③ |

### S. Profile & identity
| Topic | Octicon | Tier |
|---|---|---|
| Profile README | `person` `book` | ② |
| Contribution graph | `graph` | ② |
| Pinned repositories | `pin` | ② |
| Achievements | `trophy` | ③ |
| Following people | `person-add` | ③ |
| Contributions as a portfolio | `briefcase` | ② |

### T. Search & navigation
| Topic | Octicon | Tier |
|---|---|---|
| Repo search & file finder | `search` | ② |
| Search qualifiers | `filter` | ② |
| Global code search | `code-square` | ③ |
| Keyboard shortcuts | `command-palette` | ③ |
| Notifications & inbox | `bell` `inbox` | ② |
| Managing notification noise | `bell-slash` | ③ |

### U. Editors & tooling
| Topic | Octicon | Tier |
|---|---|---|
| Web editor | `pencil` | ① |
| github.dev (press `.`) | `code-square` | ② |
| Codespaces | `codespaces` | ② |
| GitHub Desktop | `desktop-download` | ③ |
| GitHub CLI | `terminal` | ③ |
| GitHub Mobile | `device-mobile` | ③ |
| Copilot | `copilot` | ② |

### V. Orgs, teams & permissions
| Topic | Octicon | Tier |
|---|---|---|
| Why you can't push to others' repos | `lock` | ① |
| Permission levels | `shield` | ② |
| Collaborators | `person-add` | ② |
| Organizations | `organization` | ② |
| Teams | `people` | ③ |
| Visibility in an org | `globe` `repo-locked` | ③ |

### W. Where to go next
| Topic | Octicon | Tier |
|---|---|---|
| Finding a `good first issue` | `light-bulb` | ② |
| Contribution etiquette | `people` | ③ |
| Building a contribution habit | `flame` | ③ |
| GitHub Skills & docs | `book` | ③ |
| Universe & the wider community | `broadcast` | ③ |
