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

if ! grep -Fq 'Requires a Jira key; pull requests only into `main`.' "$SKILL_FILE"; then
  echo "git-good skill description must require a Jira key and pull requests only into main" >&2
  exit 1
fi

if ! grep -Eq '^policy-version: 1$' "$SKILL_FILE"; then
  echo "git-good skill must declare policy-version 1" >&2
  exit 1
fi

if ! grep -Fq 'Never merge `dev` into `main`' "$SKILL_FILE"; then
  echo "git-good skill must forbid promoting dev to main" >&2
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

if ! grep -Fq 'Do not open a pull request into `dev`' "$AGENT_FILE"; then
  echo "git-good agent must forbid feature PRs into dev as the production ship path" >&2
  exit 1
fi

if ! grep -Eq '^alwaysApply: true$' "$RULE_FILE"; then
  echo "git-good rule must set alwaysApply: true" >&2
  exit 1
fi

if ! grep -Fq 'Never promote `dev` to `main`' "$RULE_FILE"; then
  echo "git-good rule must forbid promoting dev to main" >&2
  exit 1
fi

if ! grep -Eq 'KAN-\*' "$AGENTS_FILE"; then
  echo "AGENTS.md must document the KAN-* Jira key requirement" >&2
  exit 1
fi

if ! grep -Eq 'cursor/KAN-' "$AGENTS_FILE"; then
  echo "AGENTS.md must document the cursor/KAN- branch pattern" >&2
  exit 1
fi

if ! grep -Fq 'origin/main' "$AGENTS_FILE"; then
  echo "AGENTS.md must document branching from origin/main" >&2
  exit 1
fi

if [[ "${GITHUB_EVENT_NAME:-}" == "pull_request" ]]; then
  base="${GITHUB_BASE_REF:-}"
  head="${GITHUB_HEAD_REF:-}"

  case "$base" in
    dev)
      echo "Pull requests into dev are not allowed as the production ship path. Got head=$head" >&2
      exit 1
      ;;
    main)
      if [[ "$head" == "dev" ]]; then
        echo "dev must never merge into main; got head=$head" >&2
        exit 1
      fi
      [[ "$head" == cursor/* ]] || {
        echo "PRs into main must come from a cursor/* feature or hotfix branch; got $head" >&2
        exit 1
      }
      ;;
    *)
      echo "Pull requests must target main only; got $base" >&2
      exit 1
      ;;
  esac
fi

echo "git-good policy version 1 wiring and branch route are valid"
