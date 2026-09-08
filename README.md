# DocFoundry

Public site for **DocFoundry**, Ryan Lake's Documentation Maturity Framework (TheDocGuy).

This is the first usable slice of the Claude migration package: branded homepage, five-level DMF, a 10-question assessment, mentorship intake, and about. Career-ops files (job-search dashboard, confidential briefs) stay out of this repo.

Canonical DMF levels: **Reactive → Managed → Structured → Optimized → Systemic**.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43217](http://127.0.0.1:43217)

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js on port 43217 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | DMF + assessment unit tests |
| `npm run build` | Production build |
| `npm run ci` | Lint, typecheck, test, build — the PR gate |

Pull requests run `.github/workflows/ci.yml`. A red **PR CI gate** means the change does not merge.

## LinkedIn skill

Cursor skill at `.cursor/skills/linkedin-post/SKILL.md`. Ask for a LinkedIn post and it drafts in TheDocGuy voice against the DMF.

## GitHub Pages

After this lands on `main`, set **Settings → Pages → Source** to **GitHub Actions**. `.github/workflows/pages.yml` builds the static export and deploys it to `https://thedocguy.github.io`.

## Also in this repo

- `.github/agents/` — DocFoundry Copilot agent pack
- `ip/` — DMF and Component Style System stubs (copyright)
- `script-library/` — operational scripts
- `career/` — public notes only; job-search ops stay private

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui.
