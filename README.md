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
| `npm run ci` | Lint, typecheck, test, build: the PR gate |

Pull requests run `.github/workflows/ci.yml`. A red **PR CI gate** means the change does not merge.

## Writing (Quill)

All user-facing prose goes to the Cursor subagent at `.cursor/agents/quill.md`. The DocFoundry style source of truth is the Confluence [**DocFoundry Style Guide**](https://docfoundry.atlassian.net/wiki/spaces/MFS/pages/819202/DocFoundry+Style+Guide). `docs/style-guide.md` is the public mirror and must stay in sync. It is not canonical. Root `AGENTS.md` is the handoff.

Cursor skills do not live in this repo. They live only in the private repo `TheDocGuy/docfoundry-skills`: comms (email and LinkedIn DM replies, send only after Ryan reviews and approves), linkedin-post, and slide-deck.

## GitHub Pages

After this lands on `main`, set **Settings → Pages → Source** to **GitHub Actions**. `.github/workflows/pages.yml` builds the static export and deploys it to `https://thedocguy.github.io`.

## Also in this repo

- `.cursor/agents/quill.md`: writing subagent
- `docs/style-guide.md`: public mirror of the Confluence DocFoundry Style Guide. Keep it in sync. It is not canonical.
- `ip/`: DMF and Component Style System stubs (copyright)
- `script-library/`: operational scripts
- `career/`: public notes only; job-search ops stay private

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui.
