## Jira

- Key: KAN-
- Acceptance criteria:
- Linked work:

## CI gate

This pull request cannot merge on a red `PR CI gate`.

The workflow runs, in order:

1. `npm run lint`
2. `npm run typecheck`
3. `npm test` — includes the canonical DMF level-name lock
4. `npm run build`

If you change DMF level names, update `src/lib/dmf.ts` **and** `src/lib/assessment.test.ts` in the same PR.

## Summary

-

## Change type

- [ ] Feature → `dev`
- [ ] `dev` → `main` promotion
- [ ] Authorized hotfix

## Linked or included PRs

-

## Test evidence

### Feature checks

-

### Integrated `dev` checks

-

## Public/private safety

- [ ] I confirmed this PR contains no career dashboards, job-search trackers, confidential briefs, screening lists, secrets, or other private material.

## work-manager handoff

- Requested Jira status after this PR:
- Evidence summary:

## Promotion checklist

Complete every applicable placeholder before promoting to `main`.

- [ ] The summary, change type, linked or included PRs, and test evidence are complete.
- [ ] Feature checks pass.
- [ ] Integrated `dev` checks pass.
- [ ] The `PR CI gate` passes.
- [ ] This promotion contains only reviewed changes from `dev`, unless it is an authorized hotfix.
- [ ] Production deploys only from `main`.
