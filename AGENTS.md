<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent routing — DocFoundry

Parent agent orchestrates. **Quill writes.** `docs/style-guide.md` is the standard.

The Next.js block above is managed by `next dev`. Do not edit it. Keep this routing section after `<!-- END:nextjs-agent-rules -->`.

## Writing — mandatory handoff

Hand every user-facing prose task to the `quill` subagent at `.cursor/agents/quill.md`. That includes:

- Site copy and UI strings
- Markdown documentation
- LinkedIn posts, comments, hooks, and social copy
- Email replies, outreach, and follow-ups
- Release notes
- Mentorship copy
- Content PR descriptions

Do not draft, rewrite, or "just fix" that prose in the parent. Gather audience, channel, paths, and allowed facts, then launch Quill (`/quill` or Task `subagent_type: quill`).

If a task mixes code and copy: parent implements code; Quill owns the strings and markdown.

If Quill's draft needs a correction, send a new brief back to Quill. Do not patch the sentences yourself.

## Comms — email and LinkedIn

When the user asks to check inbox, draft or send email, reply, follow up, or handle LinkedIn as a conversation (DM, comment thread, outreach) — not a standalone post — read `.cursor/skills/comms/SKILL.md`.

Standalone LinkedIn posts still use `.cursor/skills/linkedin-post/SKILL.md`.

Parent manages Gmail tools and send confirmation. Quill still writes the copy. Do not send mail unless the user explicitly says to send. Do not commit inbox contents, contact lists, or follow-up trackers to this repository.

## Research

Use the built-in Explore subagent for codebase scans. Then give Quill a scoped brief. Do not recreate a separate researcher or style-reviewer agent.

## What this repo is not for

Career dashboards, job-search trackers, confidential briefs, and screening lists stay out. Do not invent case studies or testimonials.
