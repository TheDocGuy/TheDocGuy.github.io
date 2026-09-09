---
title: DocFoundry style guide
description: Canonical voice, terminology, and publication rules for every user-facing sentence in this repository.
last_updated: 2026-09-09
doc_type: reference
---

# DocFoundry style guide

This file is the standard. Quill reads it before writing. Parent agents do not draft user-facing prose.

## Brand

**Brand**: TheDocGuy / DocFoundry  
**Owner**: Ryan Lake  
**Positioning**: Documentation systems mentor — not a writing coach. The work is documentation infrastructure, not editing prose.

Audience: documentation leads, content ops managers, and technical writers who already know the craft. Do not hand-hold.

## Voice

- **Direct.** Lead with the point. No preamble, no "Great question!", no throat-clearing.
- **Practitioner-grounded.** Real documentation-ops language. Not academic. Not corporate.
- **Systems lens.** Structures, process, and maturity — not sentence tips.
- **Confident because it is earned**, not performed.
- American English. Contractions are fine. Em dashes are fine.

Good: "Most teams skip the taxonomy step because it feels abstract. It's not — it's the thing that makes your search work."  
Bad: "In today's fast-paced business environment, effective documentation is more important than ever."

Good: "This template enforces the structure. Writers fill in the blanks."  
Bad: "You might want to consider perhaps using a template approach here."

## DMF (canonical)

Use only these names. If the user says Defined or Strategic, correct to this set in the draft and say so once.

| Level | Name | Characteristics |
|---|---|---|
| 1 | Reactive | Ad hoc, tribal knowledge, undocumented decisions |
| 2 | Managed | Documented, repeatable, assigned ownership |
| 3 | Structured | Templates in use, tooling established, review process exists |
| 4 | Optimized | Metrics-driven, continuous improvement cycle active |
| 5 | Systemic | Self-sustaining, embedded in org culture and workflows |

When assessing a situation, name the current level and the target level. Frame the recommendation as a move on this scale.

## Terminology

Use the preferred term. Do not use the avoid list. Do not mix synonyms for the same concept inside one artifact.

| Concept | Preferred | Avoid | Note |
|---|---|---|---|
| documentation | documentation | docs, content, materials | Full word in formal copy; `docs` is fine in code and filenames |
| user | user | customer, end user, client | Default. Pick one term per artifact and stay with it |
| documentation system | documentation system | doc system, docs platform, content platform | Full phrase always |

## Style rules (locked)

- Active voice, plain language, front-loaded structure.
- If a simpler word works, use it. "Use" not "utilize." "Start" not "initiate."
- The most important thing goes first — in the artifact, in the section, in the sentence.
- Heading depth max: H2 → H3 → H4. Never skip a level. Never go deeper.
- Standalone markdown documentation under `docs/` gets this frontmatter: `title`, `description`, `last_updated`, `doc_type`. Valid `doc_type`: `user-guide`, `release-notes`, `admin-guide`, `reference`, `tutorial`. Fill every field.
- UI strings and TSX page copy do not get markdown frontmatter.

## Forbidden

- Fluff intros ("This document will explain…", "In this guide…", "In today's fast-paced…")
- Passive constructions where active is possible
- Undefined acronyms
- Placeholder text in shipped copy: `TBD`, `TODO`, `[INSERT`, `lorem ipsum`, `PLACEHOLDER`, `[NEEDS REVIEW]`
- Invented case studies, testimonials, metrics, client names, or employer detail that was not in the brief
- Generic writing advice, ghostwriting for other brands, personal branding unrelated to documentation systems
- Career dashboards, job-search trackers, confidential briefs, or screening red-flag lists in this repository

## Channels

### Site and UI

Match the public site: short, direct, systems-framed. First sentence does the work. Do not invent stats. Do not add testimonials.

### Markdown documentation

One product, feature, or release per file. Use the structure for the `doc_type`:

**User guide**

```
## Overview
## Prerequisites
## [Task name] (repeat as needed)
### Steps
### Result
## Troubleshooting
```

**Admin/IT guide**

```
## Overview
## Requirements
## Configuration
### [Setting name]
## Verification
## Rollback
```

**Reference**

```
## [Item name]
Description (1-2 sentences)
**Type**: ...
**Default**: ...
**Valid values**: ...
**Example**: ...
```

**Tutorial**

```
## What you'll learn
## Before you start
## [Step N]: [Action]
## What's next
```

Default to Markdown. Exactly one H1, or none if the title comes from frontmatter. No empty sections. Code blocks have a language identifier.

### LinkedIn

Read `.cursor/skills/linkedin-post/SKILL.md` for post types, length, CTAs, hashtags, and output shape. Voice and DMF names still come from this file.

Standalone posts and public comments use that overlay. Replies to LinkedIn DMs use `.cursor/skills/comms/SKILL.md`.

### Email

Read `.cursor/skills/comms/SKILL.md` for reply shape and the review-then-send loop. Voice and DMF names still come from this file. Do not invent recipients or facts. Do not put inbox contents in this repository. Send only after the draft is approved.

### Release notes

Do not invent items. Classify what you were given. Omit empty sections. If classification is uncertain, put the item in the most likely section and report it in the return note — not as a placeholder in the file.

```markdown
---
title: 'Release Notes — v[VERSION]'
description: 'Summary of changes in version [VERSION].'
last_updated: '[DATE]'
doc_type: 'release-notes'
---

## Summary

[1-3 sentence overview from the input.]

## What's New

- **[Feature name]**: [One-line description.]

## Bug Fixes

- **[Bug/issue ID or short name]**: [One-line description.]

## Known Issues

- **[Issue name]**: [Description.] Workaround: [workaround, or "None."]

## Upgrade Notes

> [!IMPORTANT]
> [Breaking change or migration step. Drop this section if nothing is required.]

- [Step or consideration for upgraders.]
```

| Input keywords | Section |
|---|---|
| added, new, introduced, support for | What's New |
| fixed, resolved, corrected, patch | Bug Fixes |
| deprecated, will be removed, end of life | Upgrade Notes |
| breaking, removed, migration required, must update | Upgrade Notes (with IMPORTANT callout) |
| known issue, not yet fixed, limitation, workaround | Known Issues |
| general description of the release | Summary |

Items that are both a feature and a breaking change go in Upgrade Notes, with a cross-reference under What's New. Merge duplicates. If the version is missing, ask the parent — do not ship `[VERSION]`.

### Mentorship

Who it is for. What it is not (writing coach). One outcome. Soft CTA. Do not pitch on every artifact.

## Publication checklist

Run this before returning. Failures block. Warnings go in the return note.

**Markdown documentation**

- [ ] Frontmatter present and filled: `title`, `description`, `last_updated`, `doc_type`
- [ ] Heading levels sequential; no empty sections
- [ ] No placeholder text
- [ ] Internal links resolve; URLs are well-formed
- [ ] First sentence is not fluff; headings are active voice

**Site / UI / LinkedIn / email / paste-ready copy**

- [ ] First line does work
- [ ] Preferred terminology only
- [ ] Canonical DMF names
- [ ] No invented facts
- [ ] No placeholders
