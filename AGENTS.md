<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent routing — DocFoundry

Parent orchestrates. Quill writes. git-good ships. Quill stays at `.cursor/agents/quill.md`. `docs/style-guide.md` stays here and is the standard.

The Next.js block above is managed by `next dev`. Do not edit it. Keep this routing section after `<!-- END:nextjs-agent-rules -->`.

## Git — mandatory handoff

Policy version: 1.

The parent and every agent except `git-good` may run only read-only Git operations: status, log, diff, and show. Hand all branch creation, staging, commits, pushes, and pull request creation, updates, or promotion to `git-good` at `.cursor/agents/git-good.md`. `git-good` reads the canonical skill from the private repository and requires a Jira `KAN-*` key.

Use the `dev` flow: feature branches start from `dev` as `cursor/KAN-<n>-…`, integrate into `dev` by merge/push after checks (no pull request into `dev`), then promote `dev` to `main` with a pull request. Pull requests are required only into `main`. Use a hotfix path only when the user authorizes it. Do not merge a GitHub pull request unless the user explicitly instructs you to merge.

Bootstrap exception: for this installation only, the parent may perform the minimum Git and pull request mutations needed to create the installation commit, push it, and open the bootstrap pull request because `git-good` did not exist. After that, no exception applies.

## Writing — mandatory handoff

Hand every user-facing prose task to the `quill` subagent at `.cursor/agents/quill.md`. That includes:

- Site copy and UI strings
- Markdown documentation
- LinkedIn posts, comments, hooks, and social copy
- Email and LinkedIn DM replies
- Release notes
- Mentorship copy
- Content PR descriptions

Do not draft, rewrite, or "just fix" that prose in the parent. Gather audience, channel, paths, and allowed facts, then launch Quill (`/quill` or Task `subagent_type: quill`).

If a task mixes code and copy: parent implements code; Quill owns the strings and markdown.

If Quill's draft needs a correction, send a new brief back to Quill. Do not patch the sentences yourself.

## Skills live in the private repo

Cursor skills live only in `TheDocGuy/docfoundry-skills`. That repo is private. This public site must not contain Cursor skill files.

When the private repo is in the workspace, read skills from `TheDocGuy/docfoundry-skills` at:

- `.cursor/skills/comms/SKILL.md` — inbound email and LinkedIn DM replies. Loop: Quill drafts → Ryan reviews and approves → then send. Do not send a draft that has not been approved. "Reply to this" is not approval.
- `.cursor/skills/linkedin-post/SKILL.md` — standalone LinkedIn posts, comments, hooks
- `.cursor/skills/slide-deck/SKILL.md` — HTML slide decks

Point at those files. Do not paste skill bodies, playbook steps, send procedures, or post templates into this repo.

If the private repo is not in the workspace, still do not draft those artifacts in the parent, and still do not recreate skill files here.

## Research

Use the built-in Explore subagent for codebase scans. Then give Quill a scoped brief. Do not recreate a separate researcher or style-reviewer agent.

## What this repo is not for

Career dashboards, job-search trackers, confidential briefs, and screening lists stay out. Do not invent case studies or testimonials. Do not commit inbox contents, contact lists, or career dashboards to this repository.
