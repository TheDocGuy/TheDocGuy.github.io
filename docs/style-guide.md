---
title: DocFoundry Style Guide
description: Public mirror of the Confluence DocFoundry Style Guide, the source of truth for voice, terminology, and publication rules.
last_updated: 2026-09-10
doc_type: reference
---

# DocFoundry Style Guide

## Authority and Parent Standard

The canonical source of truth is the Confluence page **DocFoundry Style Guide** in space MFS.

Live URL: https://docfoundry.atlassian.net/wiki/spaces/MFS/pages/819202/DocFoundry+Style+Guide

This file is the published public mirror of that page. Keep this file in sync with it.

Until that Confluence page existed, this file was interim authority. Confluence is canonical now.

The parent standard is the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/). This guide is a DocFoundry *delta*: contradictions and extensions only. Do not copy Microsoft chapters here. If this file is silent, use Microsoft.

Related: [DocFoundry Way of Working](https://docfoundry.atlassian.net/wiki/spaces/MFS/pages/163976/DocFoundry+Way+of+Working)

Quill writes user-facing prose. Parent agents do not draft user-facing prose.

## Brand

**Brand**: TheDocGuy / DocFoundry

**Owner**: Ryan Lake

**Positioning**: Documentation systems mentor, not a writing coach. The work is documentation infrastructure, not editing prose.

**Audience**: Documentation leads, content ops managers, and technical writers who already know the craft. Do not hand-hold.

## Voice

- **Direct.** Lead with the point. No preamble, no "Great question!", no throat-clearing.

- **Practitioner-grounded.** Real documentation-ops language. Not academic. Not corporate.

- **Systems lens.** Structures, process, and maturity, not sentence tips.

- **Confident.** Earned, not performed.

- Use American English. Contractions are fine. Do not use em dashes.

Good: "Most teams skip the taxonomy step because it feels abstract. It's not. It's the thing that makes your search work."

Bad: "In today's fast-paced business environment, effective documentation is more important than ever."

Good: "This template enforces the structure. Writers fill in the blanks."

Bad: "You might want to consider perhaps using a template approach here."

## Capitalization

DocFoundry overrides Microsoft sentence-style headings.

### Title Case for Titles and Headings

Use Title Case for document titles, page titles, headings (H1–H4), and published article titles.

- Capitalize the first and last words.

- Capitalize nouns, pronouns, verbs (including Is), adjectives, and adverbs.

- Lowercase articles (a, an, the), coordinating conjunctions (and, but, or, nor, for, so, yet), and prepositions of four letters or fewer unless the word is first or last.

- After a colon in a heading, capitalize the next word.

- Keep product and proper names in canonical form.

  Write DocFoundry, DMF, and GitHub as shown here.

### Body Sentences and UI Labels

- Write body sentences in normal sentence case.

  Do not apply Title Case to running text.

- Match UI labels to the product exactly.

  If the button is Save, write Save. If the button is save, write save.

- Do not Title Case UI labels to look consistent.

- Do not rewrite UI labels to sentence case.

## Bolding

Use bold for UI names in procedures and for lead terms in labeled lists.

- Bold UI names in procedures, such as Select **Save**.

- Bold the lead term in a labeled list or definition line, such as **Brand**: DocFoundry.

- Do not bold for emphasis in running sentences.

- Do not bold a whole sentence or a heading.

- Do not mix bold and italic for the same kind of thing.

  Use italic for first-use defined terms only. Follow Microsoft for italic.

## Lists

Wrap list item content in a paragraph by default (`li > p`).

### Default List Item

```html
<ul>
  <li>
    <p>Always wrap list item content in a paragraph.</p>
  </li>
</ul>
```

- Put one idea in each item.

  Put the first sentence in that paragraph.

- Put extra sentences in the same item in extra paragraph siblings inside the same `li`.

- Place nested lists after the paragraph, not inside it.

- If every item is a full sentence, end each paragraph with a period.

### Compact Chrome

- Compact chrome (navigation, tags, and short index lists of three words) may omit the paragraph wrapper.

- Use the paragraph wrapper for everything else.

### Markdown and HTML

- For published HTML and Confluence, emit `li > p`.

- In Markdown sources, use a block list item when the output must match that structure.

  A loose list (a blank line between items) wraps each item in a paragraph.

## Punctuation

DocFoundry overrides Microsoft on the em dash.

- Do not use the em dash (Unicode U+2014).

- Do not fake an em dash with two hyphens (`--`).

- Replace that mark with a period, a comma, a colon, parentheses, or two sentences.

- Keep hyphens in compounds such as front-loaded and ten-question.

- Keep en dashes for numeric ranges only, such as 2024–2026.

## Global English

Follow Microsoft for global communications. Do not copy those chapters here.

- Read [Global communications](https://learn.microsoft.com/en-us/style-guide/global-communications/).

- Read [Writing tips](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips).

### Operating Rules

- Use American English spelling.

- Write short sentences in subject-verb-object order.

- Use one term per concept.

  Do not switch synonyms for the same concept.

- Keep that and who when they clarify structure.

- Keep articles such as the, a, and an.

- Do not use idioms, sports metaphors, or US-only culture references.

- Do not stack modifiers.

- Spell out acronyms on first use.

### Heading Capitalization Exception

Microsoft global tips say to use sentence-style capitalization. Title Case still wins for DocFoundry document titles, page titles, headings (H1–H4), and published article titles.

## Alt Text

Every image has a text alternative that serves the same purpose. This implements Web Content Accessibility Guidelines (WCAG) 2.2 Success Criterion 1.1.1.

Prefer real text over images of text (WCAG 1.4.5).

### Image Types

- For informative images, write concise alt text that names the meaning, not the file.

  Do not start with "image of" or "picture of".

- For decorative images, set `alt=""`.

  Do not omit the attribute.

- For functional images such as an icon button or a linked image, write alt text that names the action or destination.

- For complex images such as a chart, diagram, or infographic, write a short alt attribute plus a long description in adjacent text or a table.

### Markup

- In Markdown, write an image with a meaningful alt attribute:

```markdown
![meaningful alt](url)
```

- Do not write an empty alt attribute for informative images:

```markdown
![]()
```

- On the site, `next/image` and `img` require `alt`.

  Use an empty string only when the image is decorative.

- Captions do not replace alt text.

## DMF (Canonical)

Use only these names. If the user says Defined or Strategic, correct to this set in the draft and say so once.

Never use Defined or Strategic.

| Level | Name | Characteristics |
|---|---|---|
| 1 | Reactive | Ad hoc, tribal knowledge, undocumented decisions |
| 2 | Managed | Documented, repeatable, assigned ownership |
| 3 | Structured | Templates in use, tooling established, review process exists |
| 4 | Optimized | Metrics-driven, continuous improvement cycle active |
| 5 | Systemic | Self-sustaining, embedded in org culture and workflows |

The canonical names, in order, are Reactive → Managed → Structured → Optimized → Systemic.

When assessing a situation, name the current level and the target level. Frame the recommendation as a move on this scale.

## Terminology

Use the preferred term. Do not use the avoid list. Do not mix synonyms for the same concept inside one artifact.

The preferred term is documentation. Do not use docs unless you are quoting a path or a filename.

| Concept | Preferred | Avoid | Note |
|---|---|---|---|
| documentation | documentation | docs, content, materials | Use documentation in running text. Use `docs` only in quoted paths and filenames |
| user | user | customer, end user, client | Default. Pick one term per artifact and stay with it |
| documentation system | documentation system | doc system, docs platform, content platform | Full phrase always |

## Style Rules (Locked)

- Active voice, plain language, front-loaded structure.

- If a simpler word works, use it. "Use" not "utilize." "Start" not "initiate."

- The most important thing goes first: in the artifact, in the section, in the sentence.

- Heading depth max: H2 → H3 → H4. Never skip a level. Never go deeper.

- Standalone markdown documentation under `docs/` gets this frontmatter: `title`, `description`, `last_updated`, `doc_type`. Valid `doc_type`: `user-guide`, `release-notes`, `admin-guide`, `reference`, `tutorial`. Fill every field.

- UI strings and TSX page copy do not get markdown frontmatter.

- Document titles, page titles, headings (H1–H4), and published article titles use Title Case. Body sentences use sentence case.

- UI labels match the product exactly.

- No em dashes. No two-hyphen stand-ins.

## Forbidden

- Fluff intros ("This document will explain…", "In this guide…", "In today's fast-paced…")

- Passive constructions where active is possible

- Undefined acronyms

- Placeholder text in shipped copy: `TBD`, `TODO`, `[INSERT`, `lorem ipsum`, `PLACEHOLDER`, `[NEEDS REVIEW]`

- Invented case studies, testimonials, metrics, client names, or employer detail that was not in the brief

- Generic writing advice, ghostwriting for other brands, personal branding unrelated to documentation systems

- Career dashboards, job-search trackers, confidential briefs, or screening red-flag lists in this repository

- Em dashes (Unicode U+2014) and two-hyphen stand-ins (`--`)

## Channels

### Site and UI

Match the public site: short, direct, systems-framed. First sentence does the work. Do not invent stats. Do not add testimonials.

Match UI labels to the product exactly. Do not Title Case UI. Do not rewrite UI to sentence case.

### Markdown Documentation

One product, feature, or release per file. Use the structure for the `doc_type`:

**User Guide**

```markdown
## Overview
## Prerequisites
## [Task Name] (Repeat as Needed)
### Steps
### Result
## Troubleshooting
```

**Admin/IT Guide**

```markdown
## Overview
## Requirements
## Configuration
### [Setting Name]
## Verification
## Rollback
```

**Reference**

```markdown
## [Item Name]
Description (1-2 sentences)
**Type**: ...
**Default**: ...
**Valid Values**: ...
**Example**: ...
```

**Tutorial**

```markdown
## What You'll Learn
## Before You Start
## [Step N]: [Action]
## What's Next
```

Default to Markdown. Exactly one H1, or none if the title comes from frontmatter. No empty sections. Code blocks have a language identifier.

### LinkedIn

Voice and DMF names still come from this style guide. Post types, length, CTAs, hashtags, and output shape live in the private repo `TheDocGuy/docfoundry-skills`, skill `linkedin-post`.

### Email

Replies to email and LinkedIn DMs use the `comms` skill in that same private repo. Send only after Ryan reviews and approves. Do not invent recipients or facts. Do not put inbox contents in the public site repo.

### Release Notes

Do not invent items. Classify what you were given. Omit empty sections. If classification is uncertain, put the item in the most likely section and report it in the return note, not as a placeholder in the file.

```markdown
---
title: 'Release Notes: v[VERSION]'
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

Items that are both a feature and a breaking change go in Upgrade Notes, with a cross-reference under What's New. Merge duplicates. If the version is missing, ask the parent. Do not ship `[VERSION]`.

### Mentorship

Who it is for. What it is not (writing coach). One outcome. Soft CTA. Do not pitch on every artifact.

## Publication Checklist

Run this before returning. Failures block. Warnings go in the return note.

**Markdown Documentation**

- [ ] Frontmatter present and filled: `title`, `description`, `last_updated`, `doc_type`
- [ ] Heading levels sequential; no empty sections
- [ ] Headings use Title Case; body sentences use sentence case
- [ ] No em dashes or two-hyphen stand-ins
- [ ] Informative images have meaningful alt text; decorative images use `alt=""`
- [ ] No placeholder text
- [ ] Internal links resolve; URLs are well-formed
- [ ] First sentence is not fluff

**Site / UI / LinkedIn / Paste-Ready Copy**

- [ ] First line does work
- [ ] Preferred terminology only
- [ ] Canonical DMF names
- [ ] UI labels match the product exactly
- [ ] No invented facts
- [ ] No placeholders
