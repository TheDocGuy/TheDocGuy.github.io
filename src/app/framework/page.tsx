import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { DMF_LEVELS, DMF_VERSION } from "@/lib/dmf"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Framework",
  description:
    "The DocFoundry Documentation Maturity Framework — five levels from Reactive to Systemic.",
}

export default function FrameworkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember uppercase">
        DMF {DMF_VERSION}
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.2rem,4vw,3.4rem)] tracking-tight text-cream">
        Five levels. One honest read on how your docs actually operate.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash">
        Most documentation problems are not writing problems. They are systems problems. The
        Documentation Maturity Framework names the system you have, the one you need, and the
        move in between. Use it as a shared language with leadership — not as a score to perform
        for.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/assessment"
          className={cn(
            buttonVariants(),
            "h-auto rounded-sm bg-ember px-5 py-3 text-cream hover:bg-ember-hot",
          )}
        >
          Run the assessment
        </Link>
        <Link
          href="/mentorship"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:bg-iron hover:text-cream",
          )}
        >
          Get a guided readout
        </Link>
      </div>

      <ol className="mt-16 grid gap-4">
        {DMF_LEVELS.map((level) => (
          <li
            key={level.id}
            id={`level-${level.id}`}
            className="rounded-lg border border-ember/20 bg-iron/40 p-6 md:p-8"
          >
            <p className="font-mono text-[0.68rem] text-ember">
              {level.code} · Level {level.id}
            </p>
            <h2 className="mt-2 font-heading text-3xl text-cream">{level.name}</h2>
            <p className="mt-1 text-sm text-spark">{level.short}</p>
            <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-ash">{level.summary}</p>
            <ul className="mt-5 grid gap-2 text-sm text-cream/90 md:grid-cols-3">
              {level.signals.map((signal) => (
                <li key={signal} className="rounded-sm border border-ember/15 bg-forge/40 px-3 py-3">
                  {signal}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-parchment">
              <span className="font-mono text-[0.68rem] tracking-wider text-ember uppercase">
                Next move{" "}
              </span>
              {level.nextMove}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
