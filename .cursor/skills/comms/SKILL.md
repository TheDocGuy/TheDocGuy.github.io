---
name: comms
description: Manage DocFoundry communications over email (Gmail) and LinkedIn. Use when the user asks to check inbox, draft or send email, reply to a thread, follow up, handle LinkedIn DMs or comments as conversation, or run outreach across both channels. Do not use for a standalone LinkedIn post or article hook with no inbox, reply, or send path — that is linkedin-post plus Quill.
---

# Comms — email and LinkedIn

Parent-agent playbook. You orchestrate. **Quill writes.** You do not draft the email or the LinkedIn copy.

Voice, DMF names, and terminology come from `docs/style-guide.md`. LinkedIn post shape comes from `.cursor/skills/linkedin-post/SKILL.md`. Email shape is in this file.

You are not a writing coach. You are running documentation-systems comms for Ryan Lake / TheDocGuy.

## When to use

Triggers:

- "Check my email" / "What's in the inbox"
- "Reply to this thread"
- "Draft an email to…"
- "Send a follow-up"
- "Handle this LinkedIn message / comment / connection note"
- "Outreach on email and LinkedIn"
- Mentorship inquiries arriving by mail or LinkedIn

Not this skill (use `linkedin-post` + Quill only):

- "Write a LinkedIn post about…"
- "Comment-ready take on [topic]" with no person, thread, or send step

## Hard rules

1. **Copy goes to Quill.** Gather channel, audience, allowed facts, and what not to invent. Launch `quill`. If the draft is wrong, send a new brief. Do not patch sentences in the parent.
2. **Do not send without an explicit send.** "Draft", "what would you say", and "reply to this" mean show a draft. Send only on "send it", "send this", or equivalent. LinkedIn has no send API here — paste-ready only.
3. **Do not write comms into this repository.** No inbox dumps, contact lists, follow-up trackers, screening notes, or career dashboards. Summaries stay in the chat.
4. **Do not invent.** Recipients, quotes, metrics, client names, and employer detail must come from the user or from a message you actually read. No fake case studies.
5. **Do not double-channel** the same person on email and LinkedIn unless asked.
6. **Gmail MCP may need auth.** Discover tools. If the namespace is `needsAuth`, still draft; do not pretend you sent or read mail.

## Channel split

| Channel | Read / send | Copy |
|---|---|---|
| **Email** | Gmail MCP after discovery | Quill, using the email shape below |
| **LinkedIn post / public comment** | Paste-ready only | Quill + `linkedin-post` |
| **LinkedIn DM / connection note** | Paste-ready only | Quill + the DM shape below |

If the task spans both channels, produce two artifacts and say which to send first.

## Gmail (email)

1. Call `GetDynamicTools` on namespace `Gmail` before any Gmail call. Use the returned tool names and schemas. Do not guess.
2. If `namespaceStatus` is `needsAuth`, tell Ryan to authenticate Gmail in Cursor. Continue with a paste-ready draft. Do not claim you searched or sent.
3. For inbox work: search or list, then read only the threads that match the ask. Return a short summary (who, subject, ask, urgency). Do not paste full bodies into git.
4. For a reply: pass the thread facts to Quill (from, subject, what they asked, allowed facts). Keep the same subject line unless Ryan wants it changed.
5. After Quill returns, show **To**, **Subject**, **Body**. Wait.
6. On explicit send: use the discovered send/draft tool. Confirm what was sent (to, subject, time). If send fails, keep the draft and report the error.

Never auto-send. Never BCC a list from this repo. Never create labels or filters unless asked.

## LinkedIn

No LinkedIn send MCP in this environment. Do not scrape profiles. Do not claim a post, comment, or DM was published.

- **Post / article hook / public comment:** launch Quill; tell it to read `.cursor/skills/linkedin-post/SKILL.md`.
- **DM / connection note:** launch Quill with the DM shape below. Short. One ask. No pitch-on-first-touch unless Ryan asked to pitch.
- Return paste-ready text plus one risk ("Do not send if…").

## Email shape (for Quill)

Ryan's voice: direct, practitioner, systems — not corporate, not "just circling back."

| Type | Use when | Shape |
|---|---|---|
| **Reply** | Inbound thread | Answer first. Then one clarifying question or one next step. Quote only what you must. |
| **Outreach** | Cold or warm intro | Why them, why now, one specific ask. No "I help companies scale content." |
| **Follow-up** | Prior thread, no reply | One sentence of context. One ask. Offer an easy out. |
| **Mentorship inbound** | Someone asking about working together | Who it's for. What it is not (writing coach). Point at intake. Soft CTA. |

Subject: specific and human. Name the artifact or decision ("Intake questions for the DMF assessment", not "Quick question" or "Following up").

Length: 80–180 words unless Ryan asks for longer. Short paragraphs. No signature block beyond the name he uses if he specified one.

Forbidden in email: "I hope this finds you well", "just circling back", "synergy", invented availability, attaching files from this repo that contain private career-ops.

## LinkedIn DM / connection note (for Quill)

Connection note: ≤200 characters when the field is the short one; otherwise 2–3 sentences. Why this person. One line of shared context. No link dump.

DM: 3–8 sentences. Same voice as email. One ask. Mentorship pitch only when the thread is already about working together.

## Quill brief (required fields)

Pass all of these:

- **Channel:** email | LinkedIn post | LinkedIn comment | LinkedIn DM
- **Audience:** who, and what they already know
- **Job of the message:** reply / outreach / follow-up / mentorship inbound
- **Allowed facts:** only what was in the thread or the user's notes
- **Ask:** the one next step
- **What not to invent**
- **Path:** none — return paste-ready copy unless a public docs path was named

## Output to Ryan

1. **Channel and action** — draft vs ready-to-send vs sent
2. **The copy** — paste-ready, no quotes around the whole thing
3. **Why this works** — two bullets, for Ryan
4. **Do not send if** — one risk
5. **Auth / tool blocker** — Gmail needsAuth, missing thread, missing recipient

If you sent mail, say so once with to/subject. If you did not, do not imply you did.
