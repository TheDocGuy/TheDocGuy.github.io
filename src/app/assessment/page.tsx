import type { Metadata } from "next"
import { AssessmentQuiz } from "@/components/assessment-quiz"

export const metadata: Metadata = {
  title: "Maturity Assessment",
  description:
    "Ten questions. Instant DocFoundry maturity level — from Reactive to Systemic.",
}

export default function AssessmentPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember uppercase">
        Free assessment
      </p>
      <h1 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-cream">
        Score the system you have, not the one on the slide.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash">
        Ten questions. Five options each, mapped to DMF levels. Results stay in this browser — we
        do not store your answers.
      </p>
      <div className="mt-10">
        <AssessmentQuiz />
      </div>
    </div>
  )
}
