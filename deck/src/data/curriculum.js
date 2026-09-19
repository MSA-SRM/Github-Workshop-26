// The single source of truth for the 90-minute GitHub workshop deck.
// Every view renders from this module — no view may hard-code content.
//
// Acts, windows and beats are transcribed from spec §6 "Session flow"
// (docs/superpowers/specs/2026-09-19-github-workshop-design.md), using the
// "Timing budget" table for structural fields and the per-act prose for
// beats. Icon names are Octicon names drawn from Appendix A's Topic →
// Octicon → Tier inventory, matched to the concept each beat teaches.
// Labs and their steps are transcribed from spec §6 "Session flow" the same
// way: one step per discrete attendee action, icons matched to the concept
// each step teaches via Appendix A's Topic → Octicon → Tier inventory.

export const ACTS = [
  {
    id: 'a0', n: 0, slug: 'cold-open', title: 'Cold open & the map',
    start: 0, end: 7,
    beats: [
      { text: 'In 83 minutes this is full, every pixel is one of you, and you will all have resolved a merge conflict.', icons: [], tier: 2 },
      { text: 'report_final_v2_FINAL_actually_final.docx — the problem version control solves', icons: ['history'], tier: 2 },
      { text: 'Git is the engine. GitHub is the car, the road and the traffic system.', icons: ['git-branch', 'mark-github'], tier: 2 },
      { text: 'A repository is a project plus its entire history', icons: ['repo'], tier: 2 },
      { text: 'A commit is a labeled snapshot, not a file save', icons: ['git-commit'], tier: 2 },
      { text: 'A branch is a pointer, not a copy', icons: ['git-branch'], tier: 2 },
      { text: 'The three-place map: your computer, your fork, upstream', icons: ['device-desktop', 'repo-forked', 'repo'], tier: 2 },
      { text: 'GitHub is not a cloud folder. Committing is not saving. Git is not GitHub.', icons: [], tier: 2 },
    ],
  },
  {
    id: 'a1', n: 1, slug: 'your-repo', title: 'Your own repo',
    start: 7, end: 21,
    beats: [
      { text: 'The nine repo tabs named in 90 seconds — the whole map of GitHub, early, so every later concept has a home.', icons: ['repo', 'issue-opened', 'git-pull-request', 'play', 'project', 'book', 'shield', 'graph', 'gear'], tier: 2 },
      { text: 'The About panel', icons: [], tier: 2 },
      { text: 'The Code button', icons: ['code'], tier: 2 },
      { text: 'Public vs private', icons: ['globe', 'lock'], tier: 2 },
      { text: 'Fun beat — "Name & Shame": five real bad repository names on screen; the room votes on the worst by shouting, and the naming rules land as a punchline.', icons: ['typography'], tier: 2 },
      { text: 'Markdown taught as a real skill', icons: [], tier: 2 },
      { text: 'The surprising fact that a public repository without a licence is not open source', icons: ['law'], tier: 2 },
    ],
  },
  {
    id: 'a2', n: 2, slug: 'fork', title: 'Fork & the map',
    start: 21, end: 31,
    beats: [
      { text: 'Why you cannot push to someone else’s repository — the permission model', icons: ['lock'], tier: 2 },
      { text: 'The four ways to get a copy — fork, clone, download ZIP, use template — compared side by side', icons: ['repo-forked', 'repo-clone', 'download', 'repo-template', 'git-compare'], tier: 2 },
      { text: 'origin vs upstream as a two-box diagram', icons: ['repo-forked', 'repo'], tier: 2 },
      { text: 'Star vs watch vs fork', icons: ['star', 'eye', 'repo-forked'], tier: 2 },
      { text: 'Fun beat: the star counter jumps live on the projector as 35 people star at once', icons: ['star'], tier: 2 },
      { text: 'The help protocol: a pinned issue titled "Stuck? Comment here" in the upstream repository — blocked participants comment their username and step number, teaching Issues hands-on at no cost to the clock', icons: ['issue-opened'], tier: 2 },
    ],
  },
  {
    id: 'a3', n: 3, slug: 'branch-commit', title: 'Branch & commit',
    start: 31, end: 45,
    beats: [
      { text: 'Branch as movable pointer', icons: ['git-branch'], tier: 2 },
      { text: 'The default branch and why it is main', icons: ['git-branch'], tier: 2 },
      { text: 'Branch naming conventions', icons: ['typography'], tier: 2 },
      { text: 'Commit anatomy', icons: ['git-commit'], tier: 2 },
      { text: 'Atomic commits', icons: ['git-commit'], tier: 2 },
      { text: 'Commit message conventions', icons: ['typography'], tier: 2 },
      { text: 'Conventional Commits', icons: ['checklist'], tier: 2 },
      { text: 'The pitfall, pre-empted aloud: "If the box says ‘Commit directly to the main branch’, stop — you’re in the wrong place." This is where most participants go wrong; it is named before it happens.', icons: [], tier: 2 },
      { text: 'Fun beat — "press the dot": everyone presses . on their fork and VS Code opens in the browser', icons: ['code-square'], tier: 2 },
      { text: 'File history shown', icons: ['history'], tier: 2 },
      { text: 'Blame shown', icons: ['people'], tier: 2 },
    ],
  },
  {
    id: 'a4', n: 4, slug: 'pull-request', title: 'Pull request',
    start: 45, end: 62,
    beats: [
      { text: 'A PR as a proposal and a conversation that happens to contain a diff', icons: ['git-pull-request'], tier: 2 },
      { text: 'base vs compare, drawn as an arrow and taught slowly — this dropdown is where first-time PRs die', icons: ['arrow-right', 'git-compare'], tier: 2 },
      { text: 'PR anatomy: Conversation, Commits, Files changed', icons: ['comment-discussion', 'git-commit', 'file-diff'], tier: 2 },
      { text: 'The diff view', icons: ['diff-added', 'diff-removed', 'diff-modified'], tier: 2 },
      { text: 'The Watermelon Gate: red ✗ → read the bot’s comment → edit the title to add 🍉 → green ✓ → auto-merge → their pixel lights up on the projector', icons: ['dot-fill', 'check-circle-fill', 'x-circle-fill'], tier: 2 },
      { text: 'Reading a failed check as information rather than failure', icons: [], tier: 2 },
      { text: 'What Actions are', icons: ['workflow'], tier: 2 },
      { text: 'Bots', icons: ['dependabot', 'hubot'], tier: 2 },
      { text: 'Review mechanics: comment, approve, or request changes', icons: ['comment', 'check-circle-fill', 'x-circle-fill'], tier: 2 },
      { text: 'Inline comments', icons: ['comment-discussion'], tier: 2 },
      { text: 'Suggested changes', icons: ['code-review'], tier: 2 },
      { text: 'Draft PRs', icons: ['git-pull-request-draft'], tier: 2 },
      { text: 'Reviewers, assignees, labels, milestones', icons: ['person', 'tag', 'milestone', 'project'], tier: 2 },
      { text: 'Linking issues with "Closes #12"', icons: ['cross-reference'], tier: 2 },
      { text: '@mentions', icons: ['mention'], tier: 2 },
      { text: 'Merge vs squash vs rebase, drawn and compared but never performed', icons: ['git-merge', 'fold', 'git-branch'], tier: 2 },
      { text: 'Closed does not mean merged', icons: ['git-pull-request', 'git-merge', 'git-pull-request-closed'], tier: 2 },
      { text: 'Deleting the merged branch', icons: ['trash'], tier: 2 },
      { text: 'The moment: the upstream Insights → Contributors graph on the projector. "Every one of you is on this list. You are, as of ninety seconds ago, open source contributors."', icons: ['people'], tier: 2 },
      { text: 'Side quests for fast finishers, listed in the Guide so nobody idles and nobody races ahead in the main flow: add topics to your Lab 1 repo, create your profile README, open an issue suggesting a colour, react to three other people’s merged PRs, find the easter egg', icons: ['tag', 'person', 'book', 'issue-opened', 'smiley'], tier: 2 },
    ],
  },
  {
    id: 'a5', n: 5, slug: 'sync', title: 'Sync, origin & upstream',
    start: 62, end: 70,
    beats: [
      { text: 'Their fork is visibly stale — missing 34 pixels, reading "34 commits behind"', icons: ['arrow-down'], tier: 2 },
      { text: 'A fork is a photograph; the original keeps moving', icons: [], tier: 2 },
      { text: 'The fetch / pull / push / merge vocabulary', icons: ['repo-pull', 'repo-push', 'git-merge'], tier: 2 },
      { text: 'The golden rule: sync main before you branch', icons: ['north-star'], tier: 2 },
      { text: 'Fun beat: everyone refreshes their own fork’s Pages site simultaneously and sees the full mosaic in their own copy', icons: ['browser'], tier: 2 },
    ],
  },
  {
    id: 'a6', n: 6, slug: 'conflict', title: 'Conflict',
    start: 70, end: 83,
    beats: [
      { text: 'Git is not confused — Git is being careful', icons: ['alert'], tier: 2 },
      { text: 'What is not a conflict: different files, different lines. This delivers a retroactive callback — that is why all 35 merged cleanly ten minutes ago, and it was on purpose.', icons: ['check-circle'], tier: 2 },
      { text: 'The Chaos Moment: countdown from three; the facilitator pushes the maintainer commit; every PR in the room flips to "This branch has conflicts that must be resolved."', icons: [], tier: 2 },
      { text: 'Afterwards: a resolution is just a normal commit', icons: ['git-commit'], tier: 2 },
      { text: 'Prevention — small PRs, sync often, short-lived branches, talk to your team', icons: ['shield'], tier: 2 },
    ],
  },
  {
    id: 'a7', n: 7, slug: 'beyond', title: 'The rest of GitHub & close',
    start: 83, end: 90,
    beats: [
      { text: 'Rapid-fire tour framed as: "you now have the vocabulary for every one of these"', icons: [], tier: 2 },
      { text: 'Issues', icons: ['issue-opened'], tier: 2 },
      { text: 'Labels', icons: ['tag'], tier: 2 },
      { text: 'Milestones', icons: ['milestone'], tier: 2 },
      { text: 'Projects', icons: ['project'], tier: 2 },
      { text: 'Discussions', icons: ['comment-discussion'], tier: 2 },
      { text: 'Actions (you already ran one)', icons: ['workflow'], tier: 2 },
      { text: 'Pages (you’ve been watching one for 90 minutes)', icons: ['browser'], tier: 2 },
      { text: 'Releases and tags', icons: ['rocket', 'tag'], tier: 2 },
      { text: 'Semantic versioning', icons: ['versions'], tier: 2 },
      { text: 'Gists', icons: ['logo-gist'], tier: 2 },
      { text: 'Security and Dependabot, and the warning that history is forever', icons: ['shield', 'dependabot', 'alert-fill'], tier: 2 },
      { text: 'Insights', icons: ['graph'], tier: 2 },
      { text: 'Profile README and contribution graph', icons: ['person', 'book', 'graph'], tier: 2 },
      { text: 'Search qualifiers', icons: ['filter'], tier: 2 },
      { text: 'Notifications', icons: ['bell', 'inbox'], tier: 2 },
      { text: 'Codespaces', icons: ['codespaces'], tier: 2 },
      { text: 'Copilot', icons: ['copilot'], tier: 2 },
      { text: 'Orgs and teams', icons: ['organization', 'people'], tier: 2 },
      { text: 'Close on the full mosaic, 35/35 lit, contributor list scrolling, and one concrete next step: find a good first issue this week. The deck link stays live permanently.', icons: ['light-bulb'], tier: 2 },
    ],
  },
];

export const LABS = [
  {
    id: 'l1', n: 1, actId: 'a1', title: 'Create your repo', minutes: 4,
    steps: [
      { id: 'l1s1', text: 'Click New repository', icons: ['repo', 'plus'] },
      { id: 'l1s2', text: 'Name it well — no ALL CAPS, no spaces, hyphens not underscores', icons: ['typography'] },
      { id: 'l1s3', text: 'Add a short description', icons: ['info'] },
      { id: 'l1s4', text: 'Set visibility to Public', icons: ['globe'] },
      { id: 'l1s5', text: 'Check "Add a README file"', icons: ['book'] },
      { id: 'l1s6', text: 'Add a .gitignore', icons: ['eye-closed'] },
      { id: 'l1s7', text: 'Choose the MIT licence', icons: ['law'] },
      { id: 'l1s8', text: 'Click Create repository', icons: [] },
    ],
  },
  {
    id: 'l2', n: 2, actId: 'a1', title: 'Make the README yours', minutes: 3,
    steps: [
      { id: 'l2s1', text: 'Open README.md and click the pencil to edit', icons: ['pencil'] },
      { id: 'l2s2', text: 'Add a heading', icons: ['heading'] },
      { id: 'l2s3', text: 'Add bold text', icons: ['bold'] },
      { id: 'l2s4', text: 'Add a list', icons: ['list-unordered'] },
      { id: 'l2s5', text: 'Add a task list', icons: ['tasklist'] },
      { id: 'l2s6', text: 'Write a properly formed commit message', icons: ['typography'] },
      { id: 'l2s7', text: 'Commit the change', icons: ['git-commit'] },
    ],
  },
  {
    id: 'l3', n: 3, actId: 'a2', title: 'Fork the mosaic', minutes: 3,
    steps: [
      { id: 'l3s1', text: 'Star universe-mosaic', icons: ['star'] },
      { id: 'l3s2', text: 'Watch universe-mosaic', icons: ['eye'] },
      { id: 'l3s3', text: 'Fork universe-mosaic', icons: ['repo-forked'] },
      { id: 'l3s4', text: 'Observe the URL now carries your username', icons: [] },
      { id: 'l3s5', text: 'Observe the "forked from" provenance line', icons: ['repo-forked'] },
    ],
  },
  {
    id: 'l4', n: 4, actId: 'a3', title: 'Branch', minutes: 2,
    steps: [
      { id: 'l4s1', text: 'Open the branch dropdown', icons: ['git-branch'] },
      { id: 'l4s2', text: 'Type the new branch name: add-<username>', icons: ['typography'] },
      { id: 'l4s3', text: 'Create branch: add-<username>', icons: ['git-branch'] },
    ],
  },
  {
    id: 'l5', n: 5, actId: 'a3', title: 'Claim your pixel', minutes: 5,
    steps: [
      { id: 'l5s1', text: 'Add file → Create new file', icons: ['file-added'] },
      { id: 'l5s2', text: 'Path: cells/<your-username>.json — typing / creates the folder', icons: ['file-directory'] },
      { id: 'l5s3', text: 'Paste the template from the Guide', icons: [] },
      { id: 'l5s4', text: 'Change one word: your colour — acid, lime, purple, pink, teal or indigo', icons: [] },
      { id: 'l5s5', text: 'Commit message: feat: add <username> cell', icons: ['git-commit'] },
      { id: 'l5s6', text: 'Commit to your branch, not to main. If the box says "Commit directly to the main branch", stop — you are in the wrong place.', icons: ['alert'], warn: true },
      { id: 'l5s7', text: 'Commit new file', icons: ['check'] },
    ],
  },
  {
    id: 'l6', n: 6, actId: 'a4', title: 'Open the PR', minutes: 8,
    steps: [
      { id: 'l6s1', text: 'Click Compare & pull request', icons: ['git-pull-request'] },
      { id: 'l6s2', text: 'Verify base and compare out loud together', icons: ['arrow-right', 'git-compare'] },
      { id: 'l6s3', text: 'Click Create pull request', icons: ['git-pull-request'] },
      { id: 'l6s4', text: 'Watch the check turn red ✗', icons: ['x-circle-fill'] },
      { id: 'l6s5', text: "Read the bot's comment", icons: ['comment-discussion'] },
      { id: 'l6s6', text: 'Edit the PR title to add 🍉', icons: ['pencil'] },
      { id: 'l6s7', text: 'Watch the check turn green ✓', icons: ['check-circle-fill'] },
      { id: 'l6s8', text: 'Auto-merge', icons: ['git-merge'] },
      { id: 'l6s9', text: 'Watch your pixel light up on the projector', icons: [] },
    ],
  },
  {
    id: 'l7', n: 7, actId: 'a5', title: 'Sync your fork', minutes: 3,
    steps: [
      { id: 'l7s1', text: 'Click Sync fork', icons: ['sync'] },
      { id: 'l7s2', text: 'Click Update branch', icons: ['sync'] },
      { id: 'l7s3', text: 'Watch 34 pixels arrive in your own copy', icons: [] },
      { id: 'l7s4', text: 'Confirm "This branch is up to date"', icons: ['check-circle'] },
      { id: 'l7s5', text: 'Open Compare to see nothing remains', icons: ['git-compare'] },
    ],
  },
  {
    id: 'l8', n: 8, actId: 'a6', title: 'Sign the wall', minutes: 4,
    steps: [
      { id: 'l8s1', text: 'Create branch sign-<username>', icons: ['git-branch'] },
      { id: 'l8s2', text: 'Open WALL.md and click the pencil to edit', icons: ['pencil'] },
      { id: 'l8s3', text: 'Replace nobody with your username', icons: [] },
      { id: 'l8s4', text: 'Commit to your branch', icons: ['git-commit'] },
      { id: 'l8s5', text: 'Open a pull request with 🍉 in the title', icons: ['git-pull-request'] },
      { id: 'l8s6', text: 'Hands off keyboards', icons: [] },
    ],
  },
  {
    id: 'l9', n: 9, actId: 'a6', title: 'Resolve it', minutes: 6,
    steps: [
      { id: 'l9s1', text: 'Click Resolve conflicts', icons: ['alert'] },
      { id: 'l9s2', text: "Read <<<<<<< HEAD — what's there", icons: ['code'] },
      { id: 'l9s3', text: 'Read ======= — the divider', icons: ['code'] },
      { id: 'l9s4', text: "Read >>>>>>> — what you're bringing", icons: ['code'] },
      { id: 'l9s5', text: 'Decide, keeping both names', icons: ['pencil'] },
      { id: 'l9s6', text: 'Delete all three marker lines — the step people miss', icons: ['alert'], warn: true },
      { id: 'l9s7', text: 'Click Mark as resolved', icons: ['check'] },
      { id: 'l9s8', text: 'Click Commit merge', icons: ['git-merge'] },
      { id: 'l9s9', text: 'Watch it merge', icons: ['git-merge'] },
    ],
  },
];
export const GROUPS = [];

export const CURRICULUM = { acts: ACTS, labs: LABS, groups: GROUPS };
