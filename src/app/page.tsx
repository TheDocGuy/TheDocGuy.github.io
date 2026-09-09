import Link from "next/link"
import { MaturityStack } from "@/components/maturity-stack"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STATS = [
  { value: "8+", label: "Years building documentation systems" },
  { value: "500+", label: "Automated work items delivered via DocFoundry methods" },
  { value: "9+", label: "Enterprise products under one unified doc system" },
  { value: "≤10", label: "Business days draft to publication, every sprint" },
]

const AUDIENCES = [
  {
    title: "The Lone Writer",
    body: "You are the only technical writer at your company. No governance. No process. No style guide. DocFoundry gives you the vocabulary and the structure to build it — and to make leadership understand why it matters.",
  },
  {
    title: "The Aspiring Manager",
    body: "You have mastered writing. Now you want to lead the system. DocFoundry bridges the gap from individual contributor to documentation systems leader — with the tools managers actually use.",
  },
  {
    title: "The Team Building at Scale",
    body: "Your team is growing and your documentation infrastructure is not keeping up. DocFoundry is the audit, the roadmap, and the governance model — built to be implemented, not just read.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.2em] text-ember-hot uppercase">
            <span className="size-1.5 rounded-full bg-spark motion-safe:animate-pulse" aria-hidden="true" />
            Documentation Maturity Framework
          </p>
          <h1 className="font-heading text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.08] tracking-tight text-cream">
            Where great doc systems are <em className="text-ember-hot not-italic md:italic">forged</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ash">
            DocFoundry is the framework for technical writers and teams who want to stop managing
            documentation and start building systems that actually scale. Built by a practitioner.
            Proven across SaaS and manufacturing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/assessment"
              className={cn(
                buttonVariants(),
                "h-auto rounded-sm bg-ember-deep px-6 py-3.5 text-[0.87rem] font-bold text-cream hover:bg-ember-fill",
              )}
            >
              Assess Your Maturity →
            </Link>
            <Link
              href="/framework"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-auto rounded-sm border-ash/40 bg-transparent px-6 py-3.5 text-[0.87rem] font-semibold text-ash hover:border-ash hover:bg-transparent hover:text-cream",
              )}
            >
              How It Works
            </Link>
          </div>
        </div>
        <MaturityStack />
      </section>

      <section className="border-y border-ember/15">
        <div className="mx-auto grid max-w-6xl md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="border-b border-ember/15 px-6 py-9 last:border-b-0 md:border-r md:border-b-0 md:px-7 md:last:border-r-0"
            >
              <div className="font-heading text-[2.8rem] leading-none text-ember-hot">{stat.value}</div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ash">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-hot uppercase">Who it&apos;s for</p>
        <h2 className="mt-3 max-w-xl font-heading text-[clamp(1.8rem,3vw,2.6rem)] tracking-tight text-cream">
          Built for writers who think like <em className="text-ember-hot italic">architects</em>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {AUDIENCES.map((audience) => (
            <article
              key={audience.title}
              className="rounded-md border border-ember/20 bg-iron/50 p-7 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 hover:border-ember/50"
            >
              <h3 className="text-[0.95rem] font-bold tracking-tight text-cream">{audience.title}</h3>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-ash">{audience.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-16 text-center md:px-12 md:py-20">
        <p className="font-heading text-[clamp(1.3rem,2.5vw,1.8rem)] leading-snug tracking-tight text-cream">
          Most documentation problems aren&apos;t <em className="text-ember-hot italic">writing</em>{" "}
          problems. They&apos;re <em className="text-ember-hot italic">systems</em> problems.
        </p>
        <p className="mt-5 font-mono text-[0.68rem] tracking-[0.12em] text-ash">
          RYAN LAKE · DOCFOUNDRY · THE DOC GUY
        </p>
      </section>

      <section className="border-t border-ember/20 bg-iron/80 px-6 py-16 text-center md:px-12">
        <h2 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-cream">
          Ready to assess where you stand?
        </h2>
        <p className="mt-3 text-[0.9rem] text-ash">
          Take the free DocFoundry Maturity Assessment — 10 questions, instant results.
        </p>
        <Link
          href="/assessment"
          className={cn(
            buttonVariants(),
            "mt-7 inline-flex h-auto rounded-sm bg-ember-deep px-8 py-4 text-[0.95rem] font-bold text-cream hover:bg-ember-fill",
          )}
        >
          Start the Assessment →
        </Link>
      </section>
    </>
  )
}
