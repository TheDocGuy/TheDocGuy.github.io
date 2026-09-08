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

## Test plan

-
