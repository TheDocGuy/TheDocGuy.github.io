---
name: slide-deck
description: Build a DocFoundry-branded HTML slide deck for a talk, workshop, DMF overview, mentorship pitch, assessment readout, or LinkedIn carousel. Use when the user asks for slides, a presentation, a pitch deck, talk slides, or workshop slides.
---

# Slide deck — TheDocGuy / DocFoundry

Produce a presentable deck in Ryan’s brand and voice. Copy `templates/deck.html`, keep `templates/slides.css` and `templates/deck.js`, fill slides from `layouts.md`. Do not invent a visual language.

Read before writing slides:

1. `brand.md` (tokens + forbidden list)
2. `layouts.md` (named layouts + deck arcs)
3. `src/lib/dmf.ts` if the deck names a maturity level
4. `src/lib/site.ts` for owner, tagline, URL

## When to use

- “Make a slide deck / talk / workshop slides”
- “DMF presentation”
- “Mentorship pitch deck”
- “Assessment readout slides”
- “LinkedIn carousel”

Not for: LinkedIn posts (use `linkedin-post`), site pages, or ghostwriting another brand.

## Voice on slides

Slides are tighter than posts. Front-load. Cut throat-clearing.

- Direct. The title is the point.
- Practitioner. Intake, review SLA, source of truth, coverage, cycle time, handoffs — not “excellence.”
- Systems, not sentences. If a slide could belong to any writer-coach, rewrite it.
- Confident, not theatrical.

Forbidden on-slide: “Let’s dive in”, “Agenda recap!”, “In today’s fast-paced…”, TBD/TODO, Defined/Strategic, invented metrics, fake testimonials, a mentorship CTA on a non-mentorship deck.

Good title: “Most doc problems are intake problems.”
Bad title: “A Journey Toward Documentation Excellence.”

## Canonical DMF names

Use only: Reactive → Managed → Structured → Optimized → Systemic.

If the user says Defined/Strategic, correct on the slides and say so once in the response.

On Framework, Talk, and Readout decks: name the current level and the target level. The move is the path between them.

## Workflow

1. Classify deck type and audience (lone writer, manager, leadership).
2. Confirm tokens have not drifted (`src/app/globals.css`, `src/components/logo.tsx`).
3. Outline: layout name + one-line job per slide. Tighten before filling copy.
4. Write on-slide copy, then speaker notes (20–40 seconds per slide).
5. Build from `templates/deck.html`. Do not freehand CSS. Carousel decks must set `data-aspect="1:1"` on `.deck` (1080×1080). Leave 16:9 for every other type.
6. Return the four artifacts below.

Do not commit readout decks with employer-specific evidence. Generate them locally.

## Output

Return:

1. **Deck** — HTML file using the template (path or paste-ready file)
2. **Speaker notes** — run of show, keyed to slide numbers
3. **Why this structure** — three bullets, for Ryan
4. **Do not present if** — one risk (unsourced stat, wrong DMF names, confidential detail)

If the user pasted notes, use only those facts plus canonical DMF copy from `src/lib/dmf.ts`. Do not invent `500+` work items unless that figure is in the notes or still on the homepage.

## Gold example

`examples/dmf-overview.html` is the regression fixture: forge field, serif title, mono eyebrow, stacked mark, Managed vs Structured as the distinction that matters. New decks should look like that file, not like a consulting master with the logo stuck in the corner.

Open it in a browser. Click or use arrows. Print to PDF (landscape).
