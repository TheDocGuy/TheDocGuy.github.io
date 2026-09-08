import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Public DocFoundry case studies will land here as engagements can be named.",
}

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember uppercase">Case studies</p>
      <h1 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] tracking-tight text-cream">
        Nothing public to ship yet.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-ash">
        The framework is at {`v0.1`}. Named client stories wait until they can be told without
        turning someone else&apos;s operation into marketing copy. When a case study is ready, it
        will live here — problem, system change, and the DMF movement, not a stack of screenshots.
      </p>
      <div className="mt-8 rounded-lg border border-dashed border-ember/30 bg-iron/30 p-8 text-sm text-ash">
        Empty on purpose. If you want the working version of this story, start with the assessment
        or a mentorship intake.
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/assessment"
          className={cn(
            buttonVariants(),
            "h-auto rounded-sm bg-ember px-5 py-3 text-cream hover:bg-ember-hot",
          )}
        >
          Assess your system
        </Link>
        <Link
          href="/framework"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:bg-iron hover:text-cream",
          )}
        >
          Read the framework
        </Link>
      </div>
    </div>
  )
}
