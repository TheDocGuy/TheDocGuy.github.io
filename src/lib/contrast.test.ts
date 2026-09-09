import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"
import { A11Y_COPY } from "./a11y-copy"
import { PALETTE, contrastRatio } from "./contrast"

const root = join(dirname(fileURLToPath(import.meta.url)), "../..")
const AA_TEXT = 4.5

test("cream, ash, and ember-hot text pass AA on forge", () => {
  assert.ok(contrastRatio(PALETTE.cream, PALETTE.forge) >= AA_TEXT)
  assert.ok(contrastRatio(PALETTE.ash, PALETTE.forge) >= AA_TEXT)
  assert.ok(contrastRatio(PALETTE.ash, PALETTE.iron) >= AA_TEXT)
  assert.ok(contrastRatio(PALETTE.emberHot, PALETTE.forge) >= AA_TEXT)
})

test("cream on ember fill buttons passes AA at rest and hover", () => {
  assert.ok(contrastRatio(PALETTE.cream, PALETTE.emberFill) >= AA_TEXT)
  assert.ok(contrastRatio(PALETTE.cream, PALETTE.emberFillHover) >= AA_TEXT)
})

test("globals.css tokens match the contrast lockfile", () => {
  const css = readFileSync(join(root, "src/app/globals.css"), "utf8")
  assert.match(css, new RegExp(`--color-ash: ${PALETTE.ash}`))
  assert.match(css, new RegExp(`--color-ember-fill: ${PALETTE.emberFill}`))
  assert.match(css, new RegExp(`--color-ember-fill-hover: ${PALETTE.emberFillHover}`))
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
})

test("assessment, intake, and header wire skip, progress, and live regions", () => {
  assert.ok(A11Y_COPY.skipToMain.length > 0)
  assert.ok(A11Y_COPY.primaryNav.length > 0)
  assert.ok(A11Y_COPY.assessmentProgress.length > 0)

  const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8")
  const header = readFileSync(join(root, "src/components/site-header.tsx"), "utf8")
  const quiz = readFileSync(join(root, "src/components/assessment-quiz.tsx"), "utf8")
  const intake = readFileSync(join(root, "src/components/intake-form.tsx"), "utf8")

  assert.match(layout, /id="main-content"/)
  assert.match(layout, /A11Y_COPY\.skipToMain/)
  assert.match(header, /aria-current/)
  assert.match(header, /aria-controls/)
  assert.match(header, /Escape/)
  assert.match(quiz, /role="progressbar"/)
  assert.match(quiz, /role="status"/)
  assert.match(quiz, /role="alert"/)
  assert.match(intake, /aria-invalid/)
  assert.match(intake, /role="status"/)
  assert.match(intake, /role="alert"/)
})
