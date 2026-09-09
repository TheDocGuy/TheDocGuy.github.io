import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About",
  description:
    "Ryan Lake — Technical Writing Manager, documentation systems architect, and DocFoundry founder.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-hot uppercase">About</p>
      <h1 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.2rem)] tracking-tight text-cream">
        Ryan Lake · TheDocGuy
      </h1>
      <p className="mt-2 text-lg text-spark">
        Technical Writing Manager · Documentation Systems Architect · AI Agent Builder
      </p>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-ash">
        <p>
          I build documentation systems that scale. Not just great docs — the infrastructure
          underneath them: governance, tooling, workflow automation, AI agents, and the team
          practices that keep documentation sustainable at any release velocity.
        </p>
        <p>
          Eight-plus years leading technical writing across enterprise SaaS and large-scale
          manufacturing taught me the same lesson twice: most documentation problems are systems
          problems. I design the intake, the review path, the source of truth, and the automation
          that makes publication-ready docs a repeatable outcome instead of a heroic one.
        </p>
        <p>
          DocFoundry is the public form of that work. The Documentation Maturity Framework is how I
          talk about it with writers and with leadership. Mentorship is how I teach other people to
          run it.
        </p>
      </div>

      <h2 className="mt-12 font-heading text-2xl text-cream">What I actually do</h2>
      <ul className="mt-4 grid gap-3 text-sm text-ash">
        <li>Documentation strategy — governance, tooling, information architecture, KPIs</li>
        <li>Workflow automation — eliminating manual dev-to-docs handoffs</li>
        <li>AI writing assistants grounded in live style guides and standards</li>
        <li>Team leadership — hiring, onboarding, performance, Agile ceremonies</li>
        <li>Continuous localization that ships with the product, not after it</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants(),
            "h-auto rounded-sm bg-ember-deep px-5 py-3 text-cream hover:bg-ember-fill",
          )}
        >
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={SITE.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:bg-iron hover:text-cream",
          )}
        >
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <Link
          href="/mentorship"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto rounded-sm px-5 py-3 text-ash hover:bg-iron hover:text-cream",
          )}
        >
          Work with me
        </Link>
      </div>
    </div>
  )
}
