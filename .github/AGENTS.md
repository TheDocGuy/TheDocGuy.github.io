# DocFoundry Agent System — Index

This file describes the multi-agent orchestration system for the TheDocGuy/DocFoundry repository. All agents live in `.github/agents/`. All agents inherit global grounding from `.github/copilot-instructions.md` and share state via `.github/ai-state.json`.

---

## Agent overview

| Agent | File | Role | Model weight | Tools |
|---|---|---|---|---|
| Conductor | `conductor.agent.md` | Orchestrator — decomposes tasks, routes to specialists, synthesizes final PR | Heavy | read, search, edit |
| Researcher | `researcher.agent.md` | Read-only codebase scanner — finds coverage gaps and undocumented features | Heavy | read, search |
| Doc Writer | `doc-writer.agent.md` | Writes user-facing docs, release note drafts, admin content | Heavy | read, edit, search |
| Style Reviewer | `style-reviewer.agent.md` | Reviews output against DocFoundry content standards | Light | read, search |
| Release Notes Formatter | `release-notes-formatter.agent.md` | Formats raw inputs to the DocFoundry release note template | Light | read, edit |
| Validator | `validator.agent.md` | Final publication gate — checks metadata, structure, links, style | Light | read, search |

---

## When to invoke each agent

### Start here: always invoke Conductor

For any documentation task, start with the Conductor. It decomposes the task and routes to the right specialists. Do not invoke specialist agents directly unless you need a specific isolated operation.

```
@conductor Write user documentation for the [feature name] feature
@conductor Generate release notes for version [X.Y.Z] using these inputs: [...]
@conductor Find all undocumented features in [directory] and create docs for the top 3
```

### Invoke specialists directly only when

- You need a quick, isolated operation (e.g., "just format these release notes")
- You're debugging a specific agent's output
- You want to re-run one step in the chain without the full orchestration overhead

```
@researcher What documentation gaps exist in /docs/admin/?
@doc-writer Write a reference page for the [setting name] configuration parameter
@style-reviewer Review this draft against DocFoundry standards: [paste content]
@release-notes-formatter Format these changelog entries: [paste entries]
@validator Check this document is publication-ready: [path/to/doc.md]
```

---

## Standard orchestration chains

### New feature documentation
```
Conductor
  └── Researcher (scan for gaps and context)
  └── Doc Writer (write the doc)
  └── Style Reviewer (review output)
  └── Validator (publication gate)
  └── Conductor (create PR)
```

### Release notes
```
Conductor
  └── Researcher (confirm what changed, gather context)
  └── Release Notes Formatter (format to template)
  └── Validator (publication gate)
  └── Conductor (create PR)
```

### Documentation audit
```
Conductor
  └── Researcher (full coverage scan)
  └── Conductor (synthesize findings into prioritized backlog, no PR)
```

---

## Model weight guidance

Agents are grouped into heavy and light categories to balance quality and cost:

**Heavy model** (use the most capable available — e.g., `claude-3.5-sonnet`, `gpt-4o`):
- Conductor — needs strong reasoning to decompose tasks and synthesize outputs
- Researcher — needs to understand code and infer documentation needs
- Doc Writer — needs strong writing ability and instruction-following

**Light model** (use a faster, lower-cost model — e.g., `claude-3-haiku`, `gpt-4o-mini`):
- Style Reviewer — pattern-matching against a defined checklist
- Release Notes Formatter — structural transformation, not reasoning
- Validator — checklist evaluation against fixed rules

---

## Tool restrictions

| Agent | Can read | Can write/edit | Can search | Can run terminal |
|---|---|---|---|---|
| Conductor | ✓ | ✓ (PR creation, state updates only) | ✓ | ✓ |
| Researcher | ✓ | ✗ | ✓ | ✗ |
| Doc Writer | ✓ | ✓ (doc files only) | ✓ | ✗ |
| Style Reviewer | ✓ | ✗ | ✓ | ✗ |
| Release Notes Formatter | ✓ | ✓ (release note files only) | ✗ | ✗ |
| Validator | ✓ | ✗ | ✓ | ✗ |

Agents should declare only the tools they actually use. Declaring unnecessary tools expands blast radius.

---

## State management

All agents share a single state file at `.github/ai-state.json`. The schema includes:

- `session_log` — history of completed sessions
- `architectural_decisions` — locked-in system-level choices
- `style_decisions` — locked-in voice and formatting choices
- `active_tasks` / `completed_tasks` — task tracking
- `terminology_registry` — canonical term definitions

**Only the Conductor writes to `ai-state.json`.** Specialist agents read it but do not modify it directly. Pass any new decisions back to the Conductor as part of your structured output.

---

## DocFoundry DMF context

This system is designed to help organizations move along the DocFoundry Documentation Maturity Framework:

| Level | Name |
|---|---|
| 1 | Reactive |
| 2 | Managed |
| 3 | Structured |
| 4 | Optimized |
| 5 | Systemic |

Every PR created by the Conductor should note the current DMF level and what level the documentation change is moving the project toward.

---

## File inventory

```
.github/
  AGENTS.md                              ← this file
  copilot-instructions.md                ← brand/voice grounding for all agents
  ai-state.json                          ← persistent shared state
  agents/
    conductor.agent.md                   ← primary orchestrator
    researcher.agent.md                  ← read-only scanner
    doc-writer.agent.md                  ← content author
    style-reviewer.agent.md              ← standards enforcer
    release-notes-formatter.agent.md     ← template formatter
    validator.agent.md                   ← publication gate
```
