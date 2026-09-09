#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

required=(
  "AGENTS.md"
  ".cursor/agents/git-good.md"
  ".cursor/rules/git-good.mdc"
  ".github/PULL_REQUEST_TEMPLATE.md"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required git-good wiring: $file" >&2
    exit 1
  fi
done

grep -Fq "Parent orchestrates. Quill writes. git-good ships." AGENTS.md
grep -Eq '^policy-version: 1$' .cursor/agents/git-good.md
grep -Fq "Policy version: 1" .cursor/rules/git-good.mdc
grep -Fq "alwaysApply: true" .cursor/rules/git-good.mdc

if [[ "${GITHUB_EVENT_NAME:-}" == "pull_request" ]]; then
  base="${GITHUB_BASE_REF:-}"
  head="${GITHUB_HEAD_REF:-}"

  case "$base" in
    dev)
      [[ "$head" == cursor/* ]] || {
        echo "Feature PRs into dev must use cursor/* branches; got $head" >&2
        exit 1
      }
      ;;
    main)
      [[ "$head" == "dev" || "$head" == cursor/hotfix-* ]] || {
        echo "PRs into main must come from dev or an authorized cursor/hotfix-* branch; got $head" >&2
        exit 1
      }
      ;;
    *)
      echo "Pull requests must target dev or main; got $base" >&2
      exit 1
      ;;
  esac
fi

echo "git-good policy version 1 wiring and branch route are valid"
