# DocFoundry slide brand kit

Do not invent a palette, type stack, or mark. Read the live source if anything here might be stale.

| Token | Source |
|---|---|
| Colors, radius, grain | `src/app/globals.css` |
| Type loading | `src/app/layout.tsx` |
| Stacked-bar mark + wordmark | `src/components/logo.tsx` (export: `assets/logo.svg`) |
| Site name, owner, tagline, URL | `src/lib/site.ts` |
| DMF names, shorts, signals, next moves | `src/lib/dmf.ts` |
| Page grammar | `src/app/page.tsx`, `src/app/framework/page.tsx` |

`templates/slides.css` maps these tokens onto slide classes. Do not restyle around it.

## Colors

| Role | Token | Hex |
|---|---|---|
| Slide field | forge | `#1a0f00` |
| Card / surface | iron | `#2e2016` |
| Secondary surface | steel | `#4a3828` |
| Title / primary text | cream | `#f5ede0` |
| Body / labels | ash | `#8a7060` |
| Soft body on cards | parchment | `#ede0cc` |
| Accent | ember | `#c45c0a` |
| Hover / stressed word | ember-hot | `#f07020` |
| Highlight / active level | spark | `#ffb340` |
| Hairline | ember @ 15–25% | `rgb(196 92 10 / 20%)` |

Maturity fill bars (from `src/components/maturity-stack.tsx`):

| Level | Width | Fill |
|---|---|---|
| 1 Reactive | 14% | `#3a2810` |
| 2 Managed | 30% | `#6b3a0a` |
| 3 Structured | 52% | `#a04e0a` |
| 4 Optimized | 74% | `#d07020` |
| 5 Systemic | 94% | ember-hot → spark |

Corners: `0.25rem`. Not pills.

## Type

Load from Google Fonts, same families as the site:

- **Instrument Sans** — body, card titles, UI
- **DM Serif Display** — slide titles. Italic only for one stressed word
- **DM Mono** — eyebrows, level codes, “NEXT MOVE”, footer, slide index

Roles:

- Eyebrow: mono, ~0.68rem, uppercase, tracking `0.2em`, ember
- Title: serif, cream, tight tracking, clamp-large. One word may be ember-hot italic
- Body: sans, ash, short lines
- Card heading: sans semibold, cream
- Footer: mono, ash, `RYAN LAKE · DOCFOUNDRY · THE DOC GUY`

## Chrome

Every slide:

1. Top-left: stacked-bar mark (`assets/logo.svg`) + `Doc` + `Foundry` (`Foundry` in ember-hot, serif)
2. Framework decks: `DMF v0.1` in mono, top-right (read version from `src/lib/dmf.ts`)
3. Bottom: owner line left, `03 / 12` right
4. Field: forge. Optional quiet radial ember glow. No white canvas.

## Copy rules that are also brand

- Canonical levels only: Reactive → Managed → Structured → Optimized → Systemic
- Stats only from the homepage or the user’s notes. Site stats today: `8+`, `500+`, `9+`, `≤10`
- Tagline: “Where great doc systems are forged”
- CTA language from the site: `Assess Your Maturity →` / `Run the assessment`
- URL: `https://thedocguy.github.io`

## Forbidden

White or light “projector mode.” Inter, Arial, or Calibri as the face. Rounded startup cards. Stock isometric. Fake logos. Defined / Strategic. Invented testimonials. QR codes unless asked. Redesigning the mark.
