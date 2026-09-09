---
name: comms
description: Draft and send replies to inbound emails and LinkedIn DMs after Ryan reviews and approves. Use when the user asks to reply to a message, email, or DM, or to send an approved draft. Do not use for standalone LinkedIn posts, article hooks, or public comments — that is linkedin-post plus Quill.
---

# Comms — reply after review

Parent-agent playbook. **Quill writes. You send only after Ryan approves.**

Goal: responses to inbound emails and LinkedIn direct messages. Not posts. Not cold outreach. Not an inbox CRM.

Voice, DMF names, and terminology come from `docs/style-guide.md`. Reply shape is in this file. LinkedIn *posts* are a different skill.

## Loop (always)

1. **Ingest** the inbound email or DM — pasted text, or Gmail read after tool discovery.
2. **Draft** via Quill. You do not write the reply in the parent. If the draft is wrong, new brief to Quill — do not patch sentences.
3. **Present for review.** Show channel, recipient, subject (email), and body. Stop. This is a draft, not a send.
4. **Revise** if Ryan requests changes or pastes replacement copy. Show the new draft. Stop again.
5. **Send** only when the current draft is approved. Then confirm what went out.

Never skip review. "Reply to this", "draft a response", and "what would you say" are ingest + draft + present. They are not approval.

### Approval

Approval is explicit, for *this* draft:

- "approved"
- "looks good, send"
- "send it" / "send this"
- "yes, send"

Not approval: "take a look", "thoughts?", "tweak the ask", "make it shorter", a new inbound paste.

If Ryan edits the copy in the same message as approval, send **that** text. Do not send an older draft.

If Ryan rejects or asks for changes, status goes back to draft. Do not send.

### Status (say it every turn)

`draft` → `in_review` → `changes_requested` → `in_review` → `approved` → `sent`

Or `blocked` (auth, missing recipient, missing inbound, send error).

## When to use

- "Reply to this email / DM"
- "Draft a response to…"
- "Send the approved reply"
- Mentorship or practitioner inbound on email or LinkedIn messaging

Not this skill:

- "Write a LinkedIn post" / article hook / public comment → `linkedin-post` + Quill
- Building a contact list, follow-up tracker, or career dashboard in this repo

## Hard rules

1. **No send before approval.** One approved draft, one send.
2. **Do not claim sent** unless a send tool succeeded. LinkedIn has no send MCP here — after approval, return paste-ready copy and say it is not sent.
3. **Do not write comms into this repository.** No inbox dumps, message archives, or contact lists. The thread stays in chat.
4. **Do not invent** recipients, quotes, or facts. Only the inbound message and Ryan's notes.
5. **Do not BCC** a list. Do not add new To/CC names Ryan did not give you.

## Email (Gmail)

1. `GetDynamicTools` on namespace `Gmail` before any Gmail call. Use returned names and schemas.
2. If `namespaceStatus` is `needsAuth`, tell Ryan to authenticate Gmail. Still draft and present for review. Do not claim you read or sent mail.
3. Prefer reply-in-thread when a thread id exists, so the conversation stays one thread. Keep the subject unless Ryan changes it.
4. Present **To**, **Subject**, **Body**. Wait for approval.
5. On approval: send with the discovered tool. Report to, subject, and that it sent. On failure: stay `blocked`, keep the approved copy, report the error.

Do not create a Gmail draft in the mailbox unless Ryan asks for a mailbox draft instead of a send.

## LinkedIn DMs

No LinkedIn send MCP in this environment. Do not scrape. Do not claim a DM was delivered.

1. Ingest the inbound DM (Ryan pastes it, or a future LinkedIn tool you discovered).
2. Quill drafts. Present for review. Wait for approval.
3. After approval: if a LinkedIn send tool exists, send then confirm. If not, return the approved paste-ready reply and say to paste it in LinkedIn. Status is `approved`, not `sent`.

If `GetDynamicTools` later shows a LinkedIn or messaging namespace, use it the same way as Gmail: discover, then send **only** after approval.

## Reply shape (for Quill)

Direct, practitioner, systems. Answer first. One next step. No "I hope this finds you well." No "just circling back."

| Inbound | Shape |
|---|---|
| **Question / ask** | Answer, then one clarifying question or one next step |
| **Mentorship inquiry** | Who it's for. What it is not (writing coach). Point at intake. Soft CTA |
| **Scheduling / logistics** | Confirm the constraint. Propose one option. Easy out |

Email: 80–180 words unless Ryan asks for longer. Subject stays on-thread.

LinkedIn DM: 3–8 sentences. One ask. Mentorship pitch only when the thread is already about working together.

Forbidden: invented availability, fake case studies, attaching private career-ops files from this repo.

## Quill brief (required)

- **Channel:** email | LinkedIn DM
- **Audience:** who, what they already asked
- **Inbound:** the facts from the message (not a repo dump)
- **Allowed facts**
- **Ask:** the one next step
- **What not to invent**
- **Path:** none — paste-ready copy

## Output to Ryan

1. **Status** — `draft` / `in_review` / `changes_requested` / `approved` / `sent` / `blocked`
2. **Channel + recipient**
3. **The copy** — paste-ready, no quotes around the whole thing
4. **Do not send if** — one risk, until status is `sent`
5. **Blocker** — Gmail `needsAuth`, no LinkedIn send, missing inbound

After a successful send: to, subject or channel, status `sent`. Once. Do not imply a send that did not happen.
