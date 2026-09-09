import type { Metadata } from "next"
import { IntakeForm } from "@/components/intake-form"
import { MENTORSHIP_POSITIONING, MENTORSHIP_TRACKS } from "@/lib/mentorship"

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "Documentation systems mentorship with Ryan Lake — 1:1, cohort, manager track, and drop-in reviews.",
}

export default function MentorshipPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-hot uppercase">Mentorship</p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.2rem,4vw,3.4rem)] tracking-tight text-cream">
        Not a writing coach. A documentation systems mentor.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash">{MENTORSHIP_POSITIONING}</p>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {MENTORSHIP_TRACKS.map((track) => (
          <article
            key={track.id}
            id={track.id}
            className="flex flex-col rounded-lg border border-ember/20 bg-iron/40 p-6"
          >
            <p className="font-mono text-[0.68rem] tracking-wider text-ember-hot uppercase">
              {track.audience}
            </p>
            <h2 className="mt-2 font-heading text-2xl text-cream">{track.name}</h2>
            <p className="mt-1 text-sm text-spark">
              {track.duration} · {track.cadence} · {track.price}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">{track.fit}</p>
            <ul className="mt-5 grid gap-2 text-sm text-cream/90">
              {track.outcomes.map((outcome) => (
                <li key={outcome} className="border-l border-ember/40 pl-3">
                  {outcome}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-16 max-w-2xl">
        <h2 className="font-heading text-3xl text-cream">Intake</h2>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          No job guarantees. No ghostwriting. If you want someone to write the resume for you, this
          is the wrong door. If you want to learn how the system works, fill this in.
        </p>
        <div className="mt-8">
          <IntakeForm />
        </div>
      </section>
    </div>
  )
}
