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
| `npm test` | DMF, assessment, and agent-wiring unit tests |
| `npm run build` | Production build |
| `npm run gitflow` | Git delivery policy checks |
| `npm run ci` | Lint, typecheck, test, build, and `gitflow` — the PR gate |

Pull requests run `.github/workflows/ci.yml`. A red **PR CI gate** means the change does not merge.

## Delivery

Feature branches target the protected `dev` branch. Required checks run before merge.

After changes merge, `.github/workflows/dev-preview.yml` uploads the integrated development build. Promotion uses a pull request from `dev` to `main`. Production GitHub Pages deploys only from `main`.

`git-good` owns all Git and pull request mutations.

## Writing (Quill)

All user-facing prose goes to the Cursor subagent at `.cursor/agents/quill.md`. The standard is `docs/style-guide.md`. Root `AGENTS.md` is the handoff.

Cursor skills do not live in this repo. They live only in the private repo `TheDocGuy/docfoundry-skills`: comms (email and LinkedIn DM replies — send only after Ryan reviews and approves), linkedin-post, and slide-deck.

## GitHub Pages

After this lands on `main`, set **Settings → Pages → Source** to **GitHub Actions**. `.github/workflows/pages.yml` builds the static export and deploys it to `https://thedocguy.github.io`.

## Also in this repo

- `.cursor/agents/quill.md` — writing subagent
- `docs/style-guide.md` — canonical voice and publication rules
- `ip/` — DMF and Component Style System stubs (copyright)
- `script-library/` — operational scripts
- `career/` — public notes only; job-search ops stay private

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui.
