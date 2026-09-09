import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"
import { contrastRatio } from "./contrast"

function themeColor(css: string, name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))
  assert.ok(match, `missing --color-${name} in globals.css`)
  return match[1]
}

test("cream, ash, and ember-hot pass AA on forge and iron", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")
  const forge = themeColor(css, "forge")
  const iron = themeColor(css, "iron")
  const cream = themeColor(css, "cream")
  const ash = themeColor(css, "ash")
  const emberHot = themeColor(css, "ember-hot")

  assert.ok(contrastRatio(cream, forge) >= 4.5, "cream on forge")
  assert.ok(contrastRatio(cream, iron) >= 4.5, "cream on iron")
  assert.ok(contrastRatio(ash, forge) >= 4.5, "ash on forge")
  assert.ok(contrastRatio(ash, iron) >= 4.5, "ash on iron")
  assert.ok(contrastRatio(emberHot, forge) >= 4.5, "ember-hot on forge")
})

test("cream on ember button fills passes AA, including hover", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")
  const cream = themeColor(css, "cream")
  const emberDeep = themeColor(css, "ember-deep")
  const emberFill = themeColor(css, "ember-fill")

  assert.ok(contrastRatio(cream, emberDeep) >= 4.5, "cream on ember-deep")
  assert.ok(contrastRatio(cream, emberFill) >= 4.5, "cream on ember-fill")
})

test("globals.css disables motion when the user prefers reduced motion", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
})
