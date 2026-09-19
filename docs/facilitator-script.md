# Facilitator Script — GitHub Workshop '26

90 minutes · browser only · true beginners · 25–40 attendees · one facilitator

**Conventions used below**

- **SAY** — words worth saying close to verbatim. The rest is yours to improvise.
- *(italic)* — a stage direction: something you do, click, or show.
- **⚠️** — a pitfall to name *before* it happens, not after.
- **⏱** — where you should be on the clock.

**Fill these in before you print this:**

| Placeholder | Fill with |
|---|---|
| `<LAB_REPO>` | `github.com/HelloOjasMutreja/universe-mosaic` |
| `<MOSAIC_URL>` | `https://helloojasmutreja.github.io/universe-mosaic/` |
| `<DECK_URL>` | `https://msa-srm.github.io/Github-Workshop-26/` |
| `<HELP_ISSUE>` | direct link to the pinned "Stuck? Comment here" issue |

---

## Before the room — T minus 60 minutes

- [ ] Projector tested at **1024×768**. Walk to the back row and read a slide.
- [ ] Wifi tested on a second device, not just yours.
- [ ] Repo reset: run the `reset` workflow. `cells/` empty, `WALL.md` back to `Last signed by: nobody 🔥`.
- [ ] Smoke test: open a PR yourself, confirm the bot fails it without 🍉, passes it with, and merges.
- [ ] **Delete your smoke-test cell afterwards.**
- [ ] Four tabs open, in this order: presenter view · `<MOSAIC_URL>` · the repo's Pull requests tab · `<HELP_ISSUE>`.
- [ ] USB offline deck in your pocket.
- [ ] Write `<DECK_URL>` on the whiteboard. Leave it there all session.

**Two days before**, the pre-work email went out: create a GitHub account, verify the email, star the repo. Check the star count now — that's your readiness number.

---

# ACT 0 · Cold open & the map
**⏱ 0:00 → 0:07**

*(On screen: the empty mosaic, live, reading `0 / N pixels lit`.)*

> **SAY:** "That grid is empty right now. In about eighty minutes it's going to be full, and every single pixel in it will have been put there by one of you — through a real pull request, to a real repository, that anyone on the internet can see. You're also all going to break something and fix it. That part's on purpose."

*(Beat. Let that sit.)*

> **SAY:** "Quick honesty check — hands up if you've never made a repository before." *(Put your own hand up too if it's a big room; it relaxes people.)* "Perfect. That's who this is built for."

**Latecomer catch:**

> **SAY:** "If you don't have a GitHub account open right now, do that in the next four minutes while I talk. You do not need to understand anything I'm about to say to sign up."

### The problem

> **SAY:** "Everyone here has had a file called something like `report_final_v2_FINAL_actually_final.docx`."

*(Wait for the laugh. There's always a laugh.)*

> **SAY:** "That's version control done badly. You can't tell what changed. You can't go back. And if two people edit it, one of you loses work. Git is what happens when you solve that properly."

### The one distinction that matters

> **SAY:** "Git and GitHub are not the same thing, and mixing them up will confuse you for months. **Git** is a program. It tracks changes to files. It was written for the Linux kernel and it runs on your own machine. **GitHub** is a website that hosts Git projects and adds everything around them — collaboration, review, discussion, automation. Git is the engine. GitHub is the car, the road, and the traffic system."

### Three words, then we move

> **SAY:** "A **repository** — a repo — is a project plus its entire history. Not a folder. A folder with a memory."
>
> "A **commit** is a labelled snapshot. Not a save. A save overwrites. A commit remembers."
>
> "A **branch** is a pointer to one of those snapshots. It is not a copy of your files, which is why making one is instant."

### The map — leave this on screen

*(Show the three-box diagram: your computer · your fork · upstream.)*

> **SAY:** "Three places. Your computer. Your copy on GitHub. And the original, which belongs to someone else. Almost every confusion today will be about which of these three you're looking at. This diagram stays on screen all session — point at it whenever you're lost."

**⚠️ Kill these three now:**

> **SAY:** "Three things that are not true. GitHub is not Google Drive for code. Committing is not saving. And Git is not GitHub."

---

# ACT 1 · Your own repo
**⏱ 0:07 → 0:21**

### The tour — 90 seconds, fast

*(Open any repo. Point at each tab as you name it.)*

> **SAY:** "Nine tabs. You'll use three today and I want you to recognise the rest later. **Code** — the files. **Issues** — things that need doing or fixing. **Pull requests** — proposed changes. **Actions** — robots that run when things happen. **Projects** — planning boards. **Wiki** — long-form docs. **Security** — vulnerability alerts. **Insights** — who did what. **Settings** — self-explanatory."

*(Point at the About panel, then the green Code button.)*

> **SAY:** "That green Code button gives you four ways to get this project onto your machine. We're not using any of them today — everything happens in the browser."

### → LAB 1 · Create your repo · 4 minutes

> **SAY:** "Your turn. Top right, the plus sign, New repository. Follow along, I'll go slowly."

1. **＋ → New repository**
2. Name it — *hold here, see below*
3. Description — one line
4. **Public**
5. ✅ Add a README
6. ✅ Add `.gitignore`
7. ✅ Choose a license → **MIT**
8. **Create repository**

**At step 2, stop everyone:**

> **SAY:** "Before you type a name — names matter more than you'd think, because this becomes a URL and a folder on every future collaborator's disk."

### 🎲 Name & Shame · 45 seconds

*(Slide with five real repo names.)*

> **SAY:** "Five real repository names. Shout out the worst one."

`New folder (2)` · `test1` · `final-project-FINAL` · `My Cool Project` · `stuff-jan-2024`

> **SAY:** "The rules: lowercase. Hyphens, not spaces, not underscores. Short. Descriptive. No dates — Git already knows the date. And never, ever `test1`."

### While they work

*(Walk. Look at screens. People will not raise their hands.)*

### The licence point — worth 30 seconds

> **SAY:** "That licence checkbox isn't bureaucracy. A public repo with no licence is **not** open source. Legally, nobody may use your code. You made it visible and still kept every right. MIT says: do what you like, just keep my name on it."

### → LAB 2 · Make the README yours · 3 minutes

> **SAY:** "Open README.md. See the pencil icon, top right? That's the web editor. You never need to install anything to edit a file on GitHub."

1. ✏️ **Edit**
2. Add `## About me`
3. Add a **bold** line — `**like this**`
4. Add a list — lines starting with `- `
5. Add a task list — `- [ ] learn git`
6. Scroll down, write a commit message
7. **Commit changes**

> **SAY:** "That's Markdown. Hash for headings, stars for bold, dashes for lists. Square brackets make checkboxes that actually tick on GitHub."

**On the commit message — 30 seconds that will outlive today:**

> **SAY:** "Write it in the imperative — `Add about me section`, not `added about me section`. You're completing the sentence *'If applied, this commit will…'*. Keep the first line under about fifty characters. Every professional repo you ever touch does this."

---

# ACT 2 · Fork & the map
**⏱ 0:21 → 0:31**

> **SAY:** "You now own a repository. Here's the problem: you can't edit mine."

### Why forking exists

> **SAY:** "GitHub permissions run read, triage, write, maintain, admin. On a stranger's repository you have exactly none of them. You can look. You cannot touch. So how does open source work at all — how do thousands of people contribute to projects they don't own?"

*(Pause. Someone will say 'fork'.)*

> **SAY:** "You take your own copy. That's a fork. Your copy, your account, your rules — and it remembers where it came from."

### Four ways to get a copy — the slide that saves them weeks

> **SAY:** "People mix these up constantly, so:
> **Fork** — a copy on GitHub, under your name, that remembers its parent. Use it when you want to contribute back.
> **Clone** — a copy on your computer. Use it when you want to run the thing.
> **Download ZIP** — a dead copy. No history, no link home. Use it when you just want the files.
> **Use this template** — a fresh start with no shared history. Use it when you want a starting point, not a contribution.
> Today we fork."

### Star vs watch vs fork

> **SAY:** "Three buttons people confuse. **Star** is a bookmark and a round of applause. **Watch** is a notification subscription. **Fork** is a copy. Starring something does not get you updates. Watching something does not get you the code."

### → LAB 3 · Fork the mosaic · 3 minutes

> **SAY:** "Link's on the whiteboard and in the guide. `<LAB_REPO>`."

1. ⭐ **Star** it
2. 👁 **Watch → Participating**
3. 🍴 **Fork → Create fork**
4. Look at the URL — it says *your* username now
5. Look under the title — *"forked from …"*

*(Watch the star counter climb on the projector.)*

> **SAY:** "Look at the star count. That's all of you, just now. Every one of those is a real person clicking a real button."

### origin vs upstream — name it now

> **SAY:** "Two words you'll hear forever. **Origin** is your fork — you own it, you can write to it. **Upstream** is the original — you can read it, you cannot write to it. When something confuses you later today, the question is almost always: am I looking at origin, or upstream?"

### 🆘 The help protocol

> **SAY:** "I'm one person and there are a lot of you, so here's how we do stuck. Don't raise your hand and wait — there's a pinned issue on the repo called *'Stuck? Comment here'*. Comment your username and which step you're on. I'm watching it. And congratulations: you just learned what Issues are for."

---

# ACT 3 · Branch & commit
**⏱ 0:31 → 0:45**

### Why branch at all

> **SAY:** "You've got your fork. You could edit it directly — but nobody does that, and here's why. `main` is supposed to always work. If you edit `main` directly, your half-finished work *is* the project. A branch is a parallel line where you're allowed to be wrong."

> **SAY:** "It's called `main`. It used to be called `master`, and you'll still see that in older projects — same thing, renamed."

### Branch naming

> **SAY:** "Same discipline as repo names. Prefix by intent — `feature/`, `fix/`, `docs/`, `chore/` — then a short hyphenated description. `fix/login-crash` tells the whole team what you're doing before they open anything."

### → LAB 4 · Branch · 2 minutes

1. Click the **branch dropdown** (it says `main`)
2. Type `add-<your-username>`
3. Click **Create branch**
4. Confirm the dropdown now shows *your* branch, not `main`

> **SAY:** "That's it. That's a branch. It was instant because nothing was copied — it's a pointer."

### → LAB 5 · Claim your pixel · 5 minutes

> **SAY:** "Now the good part. You're each going to claim one pixel on that grid."

1. **Add file → Create new file**
2. Path: `cells/<your-username>.json`
3. Paste the template from the guide
4. Change **one word** — your colour: `acid`, `lime`, `purple`, `pink`, `teal`, `indigo`
5. Commit message: `feat: add <username> cell`
6. **⚠️ See below**
7. **Commit new file**

**At step 2:**

> **SAY:** "Type `cells/` and watch — the slash creates the folder. You don't make folders on GitHub, you just mention them."

**⚠️ At step 6 — stop the room. This is where most people go wrong:**

> **SAY:** "Everybody look at the bottom of your screen. There are two radio buttons. If it says **'Commit directly to the main branch'** — stop. You're in the wrong place. You want the second one: commit to your new branch. Check it now, before you click anything."

*(Do not skip this. It is the single highest-cost mistake of the session.)*

### 🎲 Press the dot · 30 seconds

> **SAY:** "Free party trick. Go back to your fork's main page and press the full stop key. Just `.`"

*(Wait for the reaction.)*

> **SAY:** "That's Visual Studio Code. In your browser. On any repository on GitHub, including ones you don't own. It's free and almost nobody knows about it."

---

# ACT 4 · Pull request
**⏱ 0:45 → 1:02** — *the crunch window; protect it*

> **SAY:** "You've made a change on your copy. I can't see it. Nobody can. To get it into the real project you have to *ask* — and that request is the single most important object on GitHub."

### What a PR actually is

> **SAY:** "A pull request is not a button. It's a proposal, a conversation, and a diff, bundled together. The merge button is the very last and least interesting thing about it. Most of a PR's life is people talking about it."

### base vs compare — go slow here

*(Draw the arrow. Do not rush this.)*

> **SAY:** "One dropdown kills more first pull requests than anything else. **Base** is where your change is *going* — the original repo, `main`. **Compare** is where it's *coming from* — your fork, your branch. Base, then compare. Destination, then source. If those are the wrong way round you'll see hundreds of changed files instead of one, and that's the tell."

### → LAB 6 · Open the PR · 8 minutes

1. Go to your fork. There's a yellow banner — **Compare & pull request**
2. **Stop. Read base and compare out loud with me.**
3. Title: `Add <username> to the mosaic`
4. Description: fill in the template
5. **Create pull request**
6. Watch the check start — the yellow dot

*(At step 2, actually do it together. Read it aloud as a room.)*

> **SAY:** "Base — the original repo, main branch. Compare — your fork, your `add-` branch. Everyone agree? Good."

### 🍉 The Watermelon Gate · ~3 minutes

*(They will start going red. Do not warn them in advance.)*

> **SAY:** "Hands up if you've got a red X."

*(Most of the room.)*

> **SAY:** "Good. That's supposed to happen."

*(Let that land. This is the most valuable 40 seconds of the workshop.)*

> **SAY:** "Red is not failure. Red is information. A robot just read your pull request and told you something. Nobody's angry. Nothing's broken. **Read what it says.**"

*(Wait. Make them actually read the bot comment.)*

> **SAY:** "It wants a watermelon in your title. That's an arbitrary rule I invented — but the *skill* isn't arbitrary. Real projects check real things: tests, formatting, security. The skill is: read the robot, fix the thing, watch it go green."

7. Click **✏️ Edit** next to your PR title
8. Add 🍉
9. Save — the check re-runs
10. Green ✓
11. The bot merges it
12. **Your pixel appears**

*(Switch to the mosaic tab. Let them watch it fill.)*

> **SAY:** "Every pixel that lands is one of you."

### While the merge wave runs — teach over the top

> **SAY:** "What you just watched was **GitHub Actions** — automation that runs when something happens. That's continuous integration. You've now used it, which is more than most people can say after a week of reading about it."

> **SAY:** "Reviews: a human can **comment**, **approve**, or **request changes**. They can comment on one specific line. They can even suggest exact replacement code that you apply with one click."

> **SAY:** "Three ways to merge — **merge commit** keeps everything and gets messy, **squash** flattens your branch into one tidy commit, **rebase** replays your commits for a straight-line history. Teams argue about this. You don't have to today."

**⚠️ One distinction to name:**

> **SAY:** "Closed is not merged. A closed pull request is one someone decided *not* to take. Merged means it's in. Different outcomes, both end the conversation."

### 🏅 The moment

*(Open Insights → Contributors on the projector.)*

> **SAY:** "This is the contributors list for this repository. Every one of you is on it. As of about ninety seconds ago, you are open source contributors. That is not a participation trophy — that is a public, permanent, linkable fact."

### 🚀 If you finish early

*(Point at the guide. Never let fast finishers race ahead in the main flow.)*

> **SAY:** "Done already? Side quests are in the guide — add topics to your own repo, build your profile README, open an issue suggesting a new colour, react to three other people's merged PRs, or find the easter egg hidden in the repo."

---

# ACT 5 · Sync, origin & upstream
**⏱ 1:02 → 1:10**

> **SAY:** "Go back to your own fork. Look at the top of the page."

*(Wait for it.)*

> **SAY:** "It says you're a load of commits *behind*. Everybody else's pixels went into the original — and your copy has no idea. Refresh your fork's mosaic. It's still nearly empty."

> **SAY:** "This is the thing people find genuinely confusing about forks, so here it is in one sentence: **a fork is a photograph, and the original keeps moving.**"

### → LAB 7 · Sync your fork · 3 minutes

1. On your fork: **Sync fork → Update branch**
2. Watch the pixels arrive in *your* copy
3. Confirm it now says *up to date*
4. Open **Compare** — nothing left to pull

> **SAY:** "Now refresh your own mosaic."

*(Everyone at once. This is the 'oh — it's mine now' moment.)*

### The vocabulary, and the rule

> **SAY:** "That button did two things with names you'll meet forever. **Fetch** — go and look at what changed upstream. **Merge** — bring it into mine. You'll also meet **pull**, which is fetch and merge together, and **push**, which sends yours the other way."

> **SAY:** "And the rule that prevents most pain in your first year: **sync main before you branch.** Always start from current."

---

# ACT 6 · Conflict
**⏱ 1:10 → 1:23**

> **SAY:** "Last thing, and it's the one people are most scared of. Merge conflicts."

> **SAY:** "Here's the reframe. Git is not confused. Git is being careful. Two people changed the same line, and rather than silently picking one and losing the other's work, it stops and asks a human. That's not a bug. That's the feature."

### The callback — worth setting up properly

> **SAY:** "Quick question. Thirty-odd of you edited the same repository ten minutes ago, at the same time. How many conflicts did we get?"

*(Let them answer. None.)*

> **SAY:** "None. Because you each added your *own file*. Different files never conflict. Different lines in the same file never conflict. That was designed — I built it that way so you'd all succeed. Now I'm going to take it away."

### → LAB 8 · Sign the wall · 4 minutes

1. New branch: `sign-<username>`
2. Open `WALL.md` → ✏️ **Edit**
3. Replace `nobody` with your username — keep the 🔥
4. Commit: `docs: sign the wall 🔥`
5. Open a PR — **🍉 in the title**, you know the rules now
6. **Stop. Hands off keyboards.**

> **SAY:** "Notice nobody needed reminding about the watermelon. That's the lesson sticking."

### 💥 The Chaos Moment · 1 minute

> **SAY:** "Everyone has an open pull request editing exactly one line. Watch what happens when I edit that same line."

> **SAY:** "Three. Two. One."

*(Push the maintainer commit.)*

> **SAY:** "Refresh your pull request."

*(The whole room goes red together. Enjoy it.)*

> **SAY:** "*'This branch has conflicts that must be resolved.'* Every one of you. Same line, same moment. Nothing is broken and nobody has lost any work."

### → LAB 9 · Resolve it · 6 minutes

1. Click **Resolve conflicts**
2. *Read the markers together — see below*
3. Decide: keep both names, comma-separated
4. **⚠️ Delete all three marker lines**
5. **Mark as resolved**
6. **Commit merge**
7. Green ✓ — merged

**At step 2, read it as a room:**

> **SAY:** "Three markers. `<<<<<<< HEAD` — everything under this is what's already there. `=======` — that's just a divider, it means nothing on its own. `>>>>>>>` — everything above this is what you're trying to bring in. That's it. That's the whole scary thing."

**⚠️ At step 4:**

> **SAY:** "This is the step everyone forgets. You must delete the marker lines themselves. All three. They're not magic syntax — they're literally just text Git typed into your file. If you leave them in, you've committed `<<<<<<<` into the project."

> **SAY:** "And notice what resolving actually was: you read two versions, you decided, you saved. That's it. A conflict resolution is just a normal commit."

### Prevention — the real lesson

> **SAY:** "You'll hit these for real. Four things make them rare: keep pull requests small, sync often, don't let branches live for weeks, and talk to the person working near you."

---

# ACT 7 · The rest of GitHub & close
**⏱ 1:23 → 1:30**

*(Rapid fire. High tempo. Don't linger.)*

> **SAY:** "You now have the vocabulary for all of this, so here's the map of everything you didn't use today."

**Issues** — bugs and tasks, with labels, milestones and assignees · **Discussions** — the forum · **Projects** — planning boards · **Actions** — you already ran one · **Pages** — you've been staring at one for ninety minutes, that's where the mosaic lives · **Releases and tags** — versioned snapshots · **Gists** — single-file snippets · **Security** — Dependabot warns you about vulnerable dependencies · **Insights** — the graphs · **Your profile** — the contribution graph and a README that renders on it · **Codespaces** — a full dev environment in the browser.

**⚠️ One warning worth thirty seconds:**

> **SAY:** "Never commit a password or an API key. Not even for a second. Deleting it in the next commit does **not** remove it — the history keeps everything. That's normally the feature. Here it's the trap."

### Close

*(Full mosaic on screen. Contributors list scrolling.)*

> **SAY:** "Ninety minutes ago most of you had never made a repository. Since then you've each created one, forked someone else's, made a branch, committed a change, opened a pull request, had a robot reject it, read the error, fixed it, got it merged, synced a fork, and resolved a merge conflict."

> **SAY:** "That's not a beginner's list. That's the actual daily loop of professional software work."

> **SAY:** "One thing this week. Find a repository you like, open its Issues tab, and filter for the label `good first issue`. That label exists specifically for people in your position. You now have every skill you need to take one."

> **SAY:** "The deck stays up permanently — it's on the whiteboard. Everything we did is in the guide, including a lot we didn't have time for. Thank you."

---

# Failure playbook

Keep this page open. Every one of these has happened to someone.

| What breaks | What you do |
|---|---|
| **Wifi dies** | Offline deck off the USB. Labs become a demo you drive on screen. Narrate every click. |
| **The bot stops merging** | Say the watermelon rule out loud, drop the Gate, and batch-merge from the PR list at act boundaries. Nobody will notice. |
| **Pages won't rebuild** | Show the `cells/` folder file count instead — it still climbs. |
| **Someone committed to `main`** | Fine. They can still open a PR from `main`. Don't make them redo it — note it and move on. |
| **Someone forked into an org** | Ask them to delete it and fork to their personal account, or the filename check will reject them. |
| **Someone arrives at 0:40** | Point at the whiteboard, tell them to start at Lab 1 in the guide, and catch them at the sync act. Don't rewind the room. |
| **PR opened against the wrong base** | Don't close it. Edit the base branch in the dropdown — it's editable after creation. |
| **A cell file is rejected** | Almost always: the filename doesn't match their username, or it's got a capital letter. |
| **You're running behind** | Cut Act 7 to two minutes, and cut the merge-vs-squash-vs-rebase explainer in Act 4. Never cut Lab 9. |
| **You're running ahead** | Slow down on base vs compare, and take live questions after Act 4. |

**The one thing not to do:** don't let a single stuck person stop the room. Point them at the pinned issue, keep the clock, come back to them during the next lab.
