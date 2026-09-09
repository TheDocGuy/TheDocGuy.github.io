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

test("git-good policy version 1 routing is in place", () => {
  const gitGood = readFileSync(join(root, ".cursor/agents/git-good.md"), "utf8")
  const gitRule = readFileSync(join(root, ".cursor/rules/git-good.mdc"), "utf8")
  const agents = readFileSync(join(root, "AGENTS.md"), "utf8")
  const prTemplate = readFileSync(join(root, ".github/PULL_REQUEST_TEMPLATE.md"), "utf8")

  assert.match(gitGood, /^name: git-good$/m)
  assert.match(gitGood, /^policy-version: 1$/m)
  assert.match(gitGood, /docfoundry-skills\/\.cursor\/skills\/git-good\/SKILL\.md/)
  assert.match(gitRule, /^alwaysApply: true$/m)
  assert.match(gitRule, /Policy version: 1/)
  assert.match(agents, /Parent orchestrates\. Quill writes\. git-good ships\./)
  assert.match(agents, /feature branches target `dev`/)
  assert.match(prTemplate, /`dev` → `main` promotion/)
  assert.match(prTemplate, /Integrated `dev` checks/)
})

test("Cursor skills are not in this public repo", () => {
  const agents = readFileSync(join(root, "AGENTS.md"), "utf8")
  const readme = readFileSync(join(root, "README.md"), "utf8")
  const quill = readFileSync(join(root, ".cursor/agents/quill.md"), "utf8")
  const styleGuide = readFileSync(join(root, "docs/style-guide.md"), "utf8")

  assert.equal(existsSync(join(root, ".cursor/skills")), false)
  assert.equal(existsSync(join(root, ".cursor/skills/comms/SKILL.md")), false)
  assert.equal(existsSync(join(root, ".cursor/skills/linkedin-post/SKILL.md")), false)
  assert.equal(existsSync(join(root, ".cursor/skills/slide-deck/SKILL.md")), false)

  assert.match(agents, /TheDocGuy\/docfoundry-skills/)
  assert.match(agents, /reviews and approves/)
  assert.match(agents, /must not contain Cursor skill files/)
  assert.match(readme, /TheDocGuy\/docfoundry-skills/)
  assert.match(quill, /TheDocGuy\/docfoundry-skills/)
  assert.match(styleGuide, /TheDocGuy\/docfoundry-skills/)
})

test("Copilot agent pack is gone", () => {
  for (const relative of COPILOT_GONE) {
    assert.equal(existsSync(join(root, relative)), false, `${relative} should not exist`)
  }
})
