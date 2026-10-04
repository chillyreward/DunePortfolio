# Claude Code kit — lenny-portfolio

## 1. Install Claude Code (once)

Claude Code needs a paid Claude plan (Pro or higher).

1. Open **PowerShell** (prompt starts with `PS C:\`) and run:
   ```
   irm https://claude.ai/install.ps1 | iex
   ```
2. Close PowerShell, open a new one, and run `claude --version`. It should print a version number.
3. Git for Windows is recommended (you already use git).

Prefer an app? The Claude Desktop app has a **Code** tab: open it, choose the project folder, and everything below works the same.

## 2. Add this kit to the project

Unzip into the **project root** (the folder with `package.json`), keeping the folders:

```
CLAUDE.md                                   ← read automatically every session
.claude/skills/design-review/SKILL.md       ← /design-review
.claude/skills/ship/SKILL.md                ← /ship
.claude/skills/add-project/SKILL.md         ← /add-project
docs/portfolio/prompts/PROMPT-12-corrections.md
```

`CLAUDE.md` imports your existing `AGENTS.md` and the brief, so Claude Code and Antigravity follow the same rules. Also add `review/` to `.gitignore`.

Commit: `git add CLAUDE.md .claude docs/portfolio/prompts .gitignore && git commit -m "chore: Claude Code setup"`

## 3. Start a session

```
cd C:\Users\HP\Desktop\lenny-portfolio
claude
```

The first time, it opens your browser to log in.

## 4. Your first message (paste this)

```
Run /design-review on the current site and show me the findings.
Then read docs/portfolio/prompts/PROMPT-12-corrections.md. Before doing anything,
ask me the questions in its "LENNY CONFIRMS" block one by one. Then make a plan
for the corrections, section by section, and wait for my approval before editing.
After each section, screenshot the affected pages in both modes at 375 and 1440px,
look at them, and show me before moving on.
```

## Everyday use

- "Make the hero feel more monumental": describe it in plain words. Claude plans, edits, screenshots and shows you.
- `/design-review`: full visual audit against the brief, anytime.
- `/add-project`: new project, end to end (it interviews you first).
- `/ship`: runs every check, regenerates the CV if needed, asks you, then pushes (Vercel deploys).

Tips: press **Shift+Tab** to cycle permission modes until you reach plan mode (Claude proposes before touching files). `/clear` starts fresh between unrelated tasks. `/compact` shrinks a long session.
