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
  const favicon = readFileSync(join(root, "src/app/favicon.ico"))
  const appleIcon = readFileSync(join(root, "src/app/apple-icon.png"))
  assert.equal(favicon[0], 0)
  assert.equal(favicon[1], 0)
  assert.equal(favicon[2], 1)
  assert.equal(favicon[3], 0)
  assert.deepEqual([...appleIcon.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
  assert.ok(appleIcon.length > 1000)
})
