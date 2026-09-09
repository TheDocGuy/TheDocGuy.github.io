# Slide layouts

Pick a named layout per slide. Do not freehand a new composition.

Default canvas: **16:9** (`1920×1080`). **1:1** only for the Carousel deck type — set `data-aspect="1:1"` on `.deck` so CSS and `deck.js` scale to 1080×1080.

Density: one idea per slide. Title ≤ 8 words. Body ≤ 40 words unless it is a level card. Bullets ≤ 4. Speaker notes carry the story.

Markup lives in `templates/deck.html`. Classes are in `templates/slides.css`.

---

## 1. Title — `slide--title`

**Job:** Name the talk. No subtitle paragraph.

- Mono eyebrow (framework, workshop, mentorship)
- One serif line. Optional single ember-hot italic word
- Owner line: `Ryan Lake · DocFoundry`

```html
<section class="slide slide--title" data-slide>
  <!-- chrome -->
  <p class="eyebrow">Documentation Maturity Framework</p>
  <h1>Five levels. One honest read on how your docs actually operate.</h1>
  <p class="owner">Ryan Lake · DocFoundry</p>
</section>
```

## 2. Claim — `slide--claim`

**Job:** The sentence people should remember. Homepage closer pattern.

- One sentence. One stressed italic word
- No bullets, no logo dump in the body

```html
<section class="slide slide--claim" data-slide>
  <p class="claim">Most documentation problems aren’t <em>writing</em> problems. They’re <em>systems</em> problems.</p>
</section>
```

## 3. Stack — `slide--stack`

**Job:** Show all five DMF levels. Highlight one, or none (then Systemic is the visual default, matching the site).

Use shorts from `src/lib/dmf.ts`. Fill widths and colors from `brand.md`.

```html
<section class="slide slide--stack" data-slide>
  <p class="eyebrow">Maturity levels</p>
  <h2>Name the system you have.</h2>
  <ol class="stack">
    <li class="stack__row" data-level="2" data-active>
      <span class="stack__code">02</span>
      <div>
        <div class="stack__name">Managed</div>
        <div class="stack__short">Basic standards, inconsistent enforcement</div>
      </div>
      <div class="stack__bar" aria-hidden="true"></div>
    </li>
    <!-- 01, 03, 04, 05 -->
  </ol>
</section>
```

## 4. Level deep — `slide--level`

**Job:** One level, the way `/framework` cards work.

- `03 · Level 3` / name / short / three signals / next move
- Copy from `src/lib/dmf.ts` unless the user supplied a readout

## 5. Stat row — `slide--stats`

**Job:** Proof, not decoration. Max four figures.

Only numbers already on the homepage or in the user’s notes.

## 6. Trio — `slide--trio`

**Job:** Three iron cards. Audiences, signals, or moves.

Title + two sentences max per card.

## 7. Contrast — `slide--contrast`

**Job:** Writing problem vs systems problem. Two columns. Not a Venn diagram.

## 8. Path — `slide--path`

**Job:** Current level → target level → the one move between them.

Required on Framework, Talk, and Readout decks.

## 9. Agenda — `slide--agenda`

**Job:** Workshop only. Numbered, timed, one verb per step. ≤ 6 steps.

## 10. Close — `slide--close`

**Job:** One CTA. Site button language. URL in mono underneath.

Mentorship CTA only on mentorship decks. Default: assessment.

---

## Deck types → layouts

| Type | Length | Arc (layouts in order) |
|---|---|---|
| **Framework** | 8–12 | title → claim → stack → level (Managed) → level (Structured) → contrast → path → close |
| **Talk** | 12–18 | title → claim → contrast → stack → path → 2–4 evidence slides (stats/trio/level) → close |
| **Workshop** | 15–25 | title → claim → agenda → exercise frames (trio/path) → stack → close |
| **Mentorship** | 6–10 | title → contrast (for / not for) → trio (outcomes) → path → close (intake) |
| **Readout** | 8–12 | title → stack (current highlighted) → level deep → path → trio (90-day moves) → close |
| **Carousel** | 5–8 | claim cards, 1:1. No speaker notes. No agenda |

One CTA per deck.

## Speaker notes

Hidden on the slide (`<aside class="notes">`). 20–40 seconds of what Ryan says. Not a restatement of the headline.
