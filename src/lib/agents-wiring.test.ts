import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"

const root = join(dirname(fileURLToPath(import.meta.url)), "../..")

const COPILOT_GONE = [
  ".github/AGENTS.md",
  ".github/copilot-instructions.md",
  ".github/ai-state.json",
  ".github/agents/conductor.agent.md",
  ".github/agents/doc-writer.agent.md",
  ".github/agents/style-reviewer.agent.md",
  ".github/agents/researcher.agent.md",
  ".github/agents/release-notes-formatter.agent.md",
  ".github/agents/validator.agent.md",
]

test("Quill, style guide, and AGENTS.md handoff are in place", () => {
  const styleGuide = readFileSync(join(root, "docs/style-guide.md"), "utf8")
  const quill = readFileSync(join(root, ".cursor/agents/quill.md"), "utf8")
  const agents = readFileSync(join(root, "AGENTS.md"), "utf8")

  assert.match(styleGuide, /Reactive → Managed → Structured → Optimized → Systemic|1 \| Reactive/)
  assert.match(styleGuide, /documentation system/)
  assert.match(quill, /^name: quill$/m)
  assert.match(quill, /docs\/style-guide\.md/)
  assert.match(agents, /<!-- END:nextjs-agent-rules -->/)
  assert.match(agents, /subagent_type: quill/)
  assert.match(agents, /docs\/style-guide\.md/)
})

test("comms skill drafts replies and sends only after review and approval", () => {
  const comms = readFileSync(join(root, ".cursor/skills/comms/SKILL.md"), "utf8")
  const linkedin = readFileSync(join(root, ".cursor/skills/linkedin-post/SKILL.md"), "utf8")
  const agents = readFileSync(join(root, "AGENTS.md"), "utf8")
  const quill = readFileSync(join(root, ".cursor/agents/quill.md"), "utf8")
  const styleGuide = readFileSync(join(root, "docs/style-guide.md"), "utf8")

  assert.match(comms, /^name: comms$/m)
  assert.match(comms, /Gmail/)
  assert.match(comms, /LinkedIn DM/)
  assert.match(comms, /Quill writes/)
  assert.match(comms, /only when the current draft is approved/)
  assert.match(comms, /No send before approval/)
  assert.match(comms, /Never skip review/)
  assert.match(comms, /Do not write comms into this repository/)
  assert.match(linkedin, /^name: linkedin-post$/m)
  assert.match(agents, /reviews and approves/)
  assert.match(quill, /\.cursor\/skills\/comms\/SKILL\.md/)
  assert.match(styleGuide, /review-then-send/)
})

test("Copilot agent pack is gone", () => {
  for (const relative of COPILOT_GONE) {
    assert.equal(existsSync(join(root, relative)), false, `${relative} should not exist`)
  }
})
