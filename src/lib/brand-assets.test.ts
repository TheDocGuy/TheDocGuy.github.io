import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const root = process.cwd()

test("create-next-app leftover SVGs are gone", () => {
  for (const file of ["next.svg", "vercel.svg", "globe.svg", "file.svg", "window.svg"]) {
    assert.equal(existsSync(join(root, "public", file)), false, file)
  }
})

test("DocFoundry favicon and apple-touch-icon exist in the forge/ember language", () => {
  const iconSvg = readFileSync(join(root, "src/app/icon.svg"), "utf8")
  assert.match(iconSvg, /#1a0f00/)
  assert.match(iconSvg, /#c45c0a/)
  assert.match(iconSvg, /#f07020/)
  assert.match(iconSvg, /#ffb340/)
  assert.equal(existsSync(join(root, "src/app/favicon.ico")), true)
  assert.equal(existsSync(join(root, "src/app/apple-icon.png")), true)
})
