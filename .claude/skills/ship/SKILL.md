---
name: ship
description: Pre-deploy gate for the portfolio. Runs every check, regenerates the CV if content changed, then commits and pushes to trigger a Vercel deploy, only after Lenny approves.
disable-model-invocation: true
---

# Ship

Run in order. Stop at the first failure, explain it, and propose a fix.

1. `git status`: list uncommitted changes and ask whether they belong in this release.
2. `npm run content:check -- --strict`. If it fails, show the list and ask: ship anyway (items become after-launch to-dos) or fix first?
3. If `content:check` reports the CV is out of date: `npm run cv:pdf`, then `npm run cv:check`.
4. `npm run tokens:contrast`, `npx tsc --noEmit`, `npm run lint`, `npm run test:e2e`.
5. Summarise what's going out (commits since the last push: `git log origin/main..HEAD --oneline`) and **ask for approval to push**.
6. On approval: commit anything pending with a clear message, `git push`. Tell Lenny Vercel is deploying.
7. After Lenny says the deploy is live: `BASE_URL=https://lennydev.vercel.app npm run test:smoke`, and report the results.
