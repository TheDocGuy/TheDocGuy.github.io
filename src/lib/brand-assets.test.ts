import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"

const root = join(dirname(fileURLToPath(import.meta.url)), "../..")

const NEXT_LEFTOVERS = [
  "public/file.svg",
  "public/globe.svg",
  "public/next.svg",
  "public/vercel.svg",
  "public/window.svg",
]

test("create-next-app leftover public SVGs are gone", () => {
  for (const relative of NEXT_LEFTOVERS) {
    assert.equal(existsSync(join(root, relative)), false, `${relative} should not exist`)
  }
})

test("DocFoundry favicon and apple-touch-icon ship in public/ and app/", () => {
  const ico = readFileSync(join(root, "public/favicon.ico"))
  const svg = readFileSync(join(root, "public/icon.svg"), "utf8")
  const apple = readFileSync(join(root, "public/apple-touch-icon.png"))
  const appIco = readFileSync(join(root, "src/app/favicon.ico"))
  const appSvg = readFileSync(join(root, "src/app/icon.svg"), "utf8")
  const appApple = readFileSync(join(root, "src/app/apple-icon.png"))

  assert.equal(ico[0], 0)
  assert.equal(ico[1], 0)
  assert.equal(ico[2], 1)
  assert.equal(ico[3], 0)
  assert.deepEqual(ico.subarray(0, 4), appIco.subarray(0, 4))

  assert.match(svg, /viewBox="0 0 36 36"/)
  assert.match(svg, /#1a0f00/)
  assert.match(svg, /#c45c0a/)
  assert.match(svg, /#f07020/)
  assert.match(svg, /#ffb340/)
  assert.doesNotMatch(svg, /next|vercel/i)
  assert.equal(svg, appSvg)

  assert.equal(apple.readUInt32BE(16), 180)
  assert.equal(apple.readUInt32BE(20), 180)
  assert.equal(appApple.readUInt32BE(16), 180)
  assert.equal(appApple.readUInt32BE(20), 180)
})

test("root metadata points at the brand icons", () => {
  const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8")
  assert.match(layout, /\/favicon\.ico/)
  assert.match(layout, /\/icon\.svg/)
  assert.match(layout, /\/apple-touch-icon\.png/)
})
