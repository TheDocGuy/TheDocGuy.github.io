export const MENTORSHIP_POSITIONING =
  "I help technical writers stop thinking like editors and start thinking like systems builders. Mentorship here is not sentence coaching. It is how documentation works at the organizational level — governance, workflows, tooling, stakeholders, and metrics — so you can lead it, not just contribute to it."

export const MENTORSHIP_TRACKS = [
  {
    id: "intensive",
    name: "1:1 Intensive",
    audience: "Career changers and new grads",
    duration: "3 months",
    cadence: "Weekly sessions",
    price: "$300–$500 / month",
    fit: "You can write. You cannot yet see the job as a system. We build the portfolio, the vocabulary, and the operating picture of a real technical writing role.",
    outcomes: [
      "A three-piece portfolio that shows systems thinking, not just samples",
      "A resume and LinkedIn that read as a practitioner, not a student",
      "A working map of tools vs. process vs. content strategy",
    ],
  },
  {
    id: "cohort",
    name: "Group Cohort",
    audience: "Early-career writers ready to level up",
    duration: "8 weeks",
    cadence: "4–6 writers",
    price: "$500–$800 / person",
    fit: "You are producing docs and still feel like a ticket-taker. The cohort gives you peers, a governance starter kit, and language leadership actually hears.",
    outcomes: [
      "At least one governance artifact you can take back to work",
      "A peer group that outlives the eight weeks",
      "A clear path from writer to lead",
    ],
  },
  {
    id: "manager",
    name: "Manager Track",
    audience: "Senior writers eyeing management",
    duration: "6 months",
    cadence: "Bi-weekly sessions",
    price: "$600–$900 / month",
    fit: "You can write the docs. You have not yet run the team. We cover the unglamorous half: sprint planning, hiring, PIPs, vendors, and the systems story interviews require.",
    outcomes: [
      "A leadership narrative for resume, LinkedIn, and interviews",
      "Practice running the ceremonies a docs manager actually owns",
      "Honest preview of the job, including the hard parts",
    ],
  },
  {
    id: "drop-in",
    name: "Drop-In Review",
    audience: "Any stage",
    duration: "90 minutes",
    cadence: "One session",
    price: "$150–$250",
    fit: "You need a sharp read on a resume, portfolio, interview loop, or career decision. Not a program. A working session.",
    outcomes: [
      "Specific edits, not generic advice",
      "A next-step list you can execute the same week",
      "A clean entry point if you later want a longer engagement",
    ],
  },
] as const

export const INTAKE_TRACKS = MENTORSHIP_TRACKS.map((track) => ({
  id: track.id,
  label: `${track.name} — ${track.audience}`,
}))
