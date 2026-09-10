#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_FILE="/agent/repos/docfoundry-skills/.cursor/skills/git-good/SKILL.md"
AGENT_FILE="$ROOT/.cursor/agents/git-good.md"
RULE_FILE="$ROOT/.cursor/rules/git-good.mdc"
AGENTS_FILE="$ROOT/AGENTS.md"

if [[ ! -f "$SKILL_FILE" ]]; then
  echo "Missing canonical git-good skill: $SKILL_FILE" >&2
  exit 1
fi

if [[ ! -f "$AGENT_FILE" ]]; then
  echo "Missing git-good agent: $AGENT_FILE" >&2
  exit 1
fi

if [[ ! -f "$RULE_FILE" ]]; then
  echo "Missing git-good rule: $RULE_FILE" >&2
  exit 1
fi

if ! grep -Eq '^name: git-good$' "$SKILL_FILE"; then
  echo "git-good skill is missing required frontmatter name" >&2
  exit 1
fi

if ! grep -Eq '^description: .+Requires a Jira key; pull requests only into `main`\.$' "$SKILL_FILE"; then
  echo "git-good skill description must require a Jira key and pull requests only into main" >&2
  exit 1
fi

if ! grep -Eq '^policyVersion: 1$' "$SKILL_FILE"; then
  echo "git-good skill must declare policyVersion 1" >&2
  exit 1
fi

if ! grep -Eq '^name: git-good$' "$AGENT_FILE"; then
  echo "git-good agent is missing required frontmatter name" >&2
  exit 1
fi

if ! grep -Eq '^description: .+Requires a Jira key; pull requests only into main\.$' "$AGENT_FILE"; then
  echo "git-good agent description must require a Jira key and pull requests only into main" >&2
  exit 1
fi

if ! grep -Eq '^policy-version: 1$' "$AGENT_FILE"; then
  echo "git-good agent must declare policy-version 1" >&2
  exit 1
fi

if ! grep -Eq '^alwaysApply: true$' "$RULE_FILE"; then
  echo "git-good rule must set alwaysApply: true" >&2
  exit 1
fi

if ! grep -Eq 'KAN-\*' "$AGENTS_FILE"; then
  echo "AGENTS.md must document the KAN-* Jira key requirement" >&2
  exit 1
fi

if ! grep -Eq 'cursor/\*-e023' "$AGENTS_FILE"; then
  echo "AGENTS.md must document the cursor/*-e023 branch pattern" >&2
  exit 1
fi

echo "git-good policy version 1 wiring and branch route are valid"
