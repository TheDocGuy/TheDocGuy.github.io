export const DMF_VERSION = "v0.1"

export const DMF_LEVELS = [
  {
    id: 1,
    code: "01",
    name: "Reactive",
    short: "Ad-hoc, undocumented, writer-dependent",
    summary:
      "Documentation happens when someone remembers to write it. Knowledge lives in people's heads. There is no shared standard, no owner, and no way to tell if the docs are complete.",
    signals: [
      "Requests arrive as Slack pings and hallway asks",
      "Style is whatever the last writer preferred",
      "A writer leaving takes the system with them",
    ],
    nextMove:
      "Name an owner, write down how work gets in, and publish a one-page standard. That is the jump to Managed.",
  },
  {
    id: 2,
    code: "02",
    name: "Managed",
    short: "Basic standards, inconsistent enforcement",
    summary:
      "Someone owns documentation and a few standards exist. The team still depends on heroics. Reviews, tooling, and intake are uneven across products.",
    signals: [
      "A style guide exists but is not used in every review",
      "Some products have coverage; others do not",
      "Work is tracked, but intake is still informal",
    ],
    nextMove:
      "Make the standard the default path: templates, a required review, and one source of truth. That is Structured.",
  },
  {
    id: 3,
    code: "03",
    name: "Structured",
    short: "Governance defined, workflows repeatable",
    summary:
      "Governance is written down. Writers follow the same intake, draft, review, and publish path. The operation is repeatable even when the calendar is not quiet.",
    signals: [
      "Templates and a review workflow are in daily use",
      "Tooling is chosen and shared across the team",
      "New writers can be onboarded without shadowing one person",
    ],
    nextMove:
      "Instrument the workflow. Measure cycle time, coverage, and review load, then automate the handoffs. That is Optimized.",
  },
  {
    id: 4,
    code: "04",
    name: "Optimized",
    short: "Automated, metrics-driven, scalable",
    summary:
      "Handoffs are automated. Metrics tell you where the system is slow. Documentation keeps pace with release velocity without adding headcount for every new product.",
    signals: [
      "Dev-to-docs work items are generated, not typed by hand",
      "Cycle time and coverage are reviewed like any other KPI",
      "Localization and publishing ride the same release train",
    ],
    nextMove:
      "Embed the system in how the company ships: other teams self-serve against the same standards. That is Systemic.",
  },
  {
    id: 5,
    code: "05",
    name: "Systemic",
    short: "Documentation as organizational infrastructure",
    summary:
      "Documentation is part of how the organization ships, supports, and trains. Standards live in the tools people already use. The system holds when people change.",
    signals: [
      "Product, Support, and Docs share one definition of done",
      "AI assistants and humans are grounded in the same live standards",
      "Leadership treats documentation as an operating system, not a cost center",
    ],
    nextMove:
      "Keep the system honest. Re-assess when you add products, change tooling, or grow the team.",
  },
] as const

export type DmfLevelId = (typeof DMF_LEVELS)[number]["id"]
export type DmfLevel = (typeof DMF_LEVELS)[number]

export function getDmfLevel(id: number): DmfLevel {
  const level = DMF_LEVELS.find((entry) => entry.id === id)
  if (!level) {
    throw new Error(`Unknown DMF level: ${id}`)
  }
  return level
}

export const DMF_LEVEL_NAMES = DMF_LEVELS.map((level) => level.name)
