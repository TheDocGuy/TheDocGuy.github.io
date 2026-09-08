import { getDmfLevel, type DmfLevel, type DmfLevelId } from "./dmf"

export type AssessmentQuestion = {
  id: string
  prompt: string
  help: string
  options: readonly [
    { level: 1; label: string },
    { level: 2; label: string },
    { level: 3; label: string },
    { level: 4; label: string },
    { level: 5; label: string },
  ]
}

export const ASSESSMENT_QUESTIONS: readonly AssessmentQuestion[] = [
  {
    id: "intake",
    prompt: "How does documentation work get started?",
    help: "Think about the last five doc requests, not the best one.",
    options: [
      { level: 1, label: "Someone pings a writer. If they are busy, it waits." },
      { level: 2, label: "We have a ticket queue, but people still bypass it." },
      { level: 3, label: "Work enters through one intake path with a template." },
      { level: 4, label: "Product and engineering systems create doc work items automatically." },
      { level: 5, label: "Definition of done includes docs. Work cannot close without them." },
    ],
  },
  {
    id: "standards",
    prompt: "What do writers use as the source of truth for voice, structure, and quality?",
    help: "A file that nobody opens does not count.",
    options: [
      { level: 1, label: "Each writer decides. Reviews are taste, not a standard." },
      { level: 2, label: "A style guide exists. Enforcement depends on who reviews." },
      { level: 3, label: "Templates and the style guide are required in every review." },
      { level: 4, label: "Standards are versioned and used to score or lint drafts." },
      { level: 5, label: "Humans and AI assistants are grounded in the same live standards." },
    ],
  },
  {
    id: "review",
    prompt: "How does a draft become publication-ready?",
    help: "Include SME review, peer review, and publish steps.",
    options: [
      { level: 1, label: "The writer publishes when it feels done." },
      { level: 2, label: "Someone reviews when they have time. The path is not the same twice." },
      { level: 3, label: "Expert-plus-peer review is the default path, with a known SLA." },
      { level: 4, label: "Review load and cycle time are measured and actively reduced." },
      { level: 5, label: "Review is a company workflow, not a docs-team favor." },
    ],
  },
  {
    id: "source",
    prompt: "Where does published documentation actually live?",
    help: "Count every help center, PDF dump, and Confluence space.",
    options: [
      { level: 1, label: "Wherever the last person put it. Several copies disagree." },
      { level: 2, label: "We named a primary system, but other copies still drift." },
      { level: 3, label: "One structured source of truth, with a defined publish path." },
      { level: 4, label: "Source-controlled docs publish on a release cadence." },
      { level: 5, label: "One system serves every brand and locale from the same source." },
    ],
  },
  {
    id: "coverage",
    prompt: "How do you know whether the product is documented?",
    help: "Guessing is not a coverage model.",
    options: [
      { level: 1, label: "We find out when a customer or support agent asks." },
      { level: 2, label: "The team keeps an informal list of gaps." },
      { level: 3, label: "Coverage is mapped to products or features and reviewed on a cadence." },
      { level: 4, label: "Coverage is a KPI. Gaps generate work items." },
      { level: 5, label: "Undocumented shipped work is treated as a defect in the delivery system." },
    ],
  },
  {
    id: "handoff",
    prompt: "How do product changes reach the documentation team?",
    help: "Release notes, UI copy, and admin docs all count.",
    options: [
      { level: 1, label: "Writers hear about it after it ships, or not at all." },
      { level: 2, label: "Someone forwards a changelog or invites a writer to a meeting." },
      { level: 3, label: "Docs is on the release train with a defined handoff." },
      { level: 4, label: "Work items are generated from the engineering system of record." },
      { level: 5, label: "Docs is a stage in delivery, not a team you remember to notify." },
    ],
  },
  {
    id: "onboarding",
    prompt: "What happens when a writer joins — or leaves?",
    help: "If the answer is 'ask the person who used to do it,' you already know.",
    options: [
      { level: 1, label: "They shadow whoever is least busy. Knowledge walks out with people." },
      { level: 2, label: "There are notes. Quality depends on who wrote them." },
      { level: 3, label: "A structured onboarding path covers tools, standards, and products." },
      { level: 4, label: "Onboarding is measured. Time-to-first-publish is a tracked number." },
      { level: 5, label: "The system is teachable without a heroic mentor. New writers ship in the workflow." },
    ],
  },
  {
    id: "metrics",
    prompt: "What does leadership see about documentation performance?",
    help: "Page views alone are not an operating metric.",
    options: [
      { level: 1, label: "Nothing formal. Docs is assumed to be 'fine' until it is not." },
      { level: 2, label: "Anecdotes and the occasional support ticket screenshot." },
      { level: 3, label: "We report cycle time, coverage, or review SLA on a cadence." },
      { level: 4, label: "Metrics drive the backlog. Slow steps get automation." },
      { level: 5, label: "Documentation KPIs sit next to product and support metrics." },
    ],
  },
  {
    id: "automation",
    prompt: "How much of the documentation operation still depends on copy-paste?",
    help: "Intake, release notes, localization, and publishing.",
    options: [
      { level: 1, label: "Almost everything is manual, including finding out what changed." },
      { level: 2, label: "A few checklists. People still re-key the same information." },
      { level: 3, label: "Repeatable workflows exist. Automation is limited to a couple of steps." },
      { level: 4, label: "Handoffs, release notes, or localization ride automated pipelines." },
      { level: 5, label: "The operating system is automated. People handle judgment, not retyping." },
    ],
  },
  {
    id: "strategy",
    prompt: "Who owns documentation strategy — tooling, governance, and investment?",
    help: "Owning the backlog is not the same as owning the system.",
    options: [
      { level: 1, label: "Nobody. Writers absorb whatever lands." },
      { level: 2, label: "A lead writer decides locally. Leadership is not in the loop." },
      { level: 3, label: "A manager owns governance and has a documented way of working." },
      { level: 4, label: "Strategy is funded. Tooling and headcount follow the roadmap." },
      { level: 5, label: "Documentation is treated as infrastructure with an executive owner." },
    ],
  },
] as const

export type AssessmentAnswers = readonly number[]

export type AssessmentResult = {
  average: number
  levelId: DmfLevelId
  level: DmfLevel
  answers: number[]
}

export function isCompleteAssessment(
  answers: Array<number | null>,
): answers is number[] {
  return (
    answers.length === ASSESSMENT_QUESTIONS.length &&
    answers.every(
      (answer) =>
        typeof answer === "number" &&
        Number.isInteger(answer) &&
        answer >= 1 &&
        answer <= 5,
    )
  )
}

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  if (answers.length !== ASSESSMENT_QUESTIONS.length) {
    throw new Error(
      `Expected ${ASSESSMENT_QUESTIONS.length} answers, received ${answers.length}`,
    )
  }

  for (const [index, answer] of answers.entries()) {
    if (!Number.isInteger(answer) || answer < 1 || answer > 5) {
      throw new Error(`Invalid answer at question ${index + 1}: ${answer}`)
    }
  }

  const total = answers.reduce((sum, answer) => sum + answer, 0)
  const average = total / answers.length
  const levelId = Math.min(5, Math.max(1, Math.round(average))) as DmfLevelId

  return {
    average: Number(average.toFixed(2)),
    levelId,
    level: getDmfLevel(levelId),
    answers: [...answers],
  }
}
