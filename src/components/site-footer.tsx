import Link from "next/link"
import { SITE } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-ember/20 px-6 py-10 text-center md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <p className="font-mono text-[0.65rem] tracking-[0.12em] text-steel uppercase">
          {SITE.name} · A {SITE.brand} framework · © {SITE.copyrightYear} {SITE.owner}
        </p>
        <div className="flex flex-wrap justify-center gap-5 text-xs text-ash">
          <Link href="/framework" className="hover:text-cream">
            Framework
          </Link>
          <Link href="/assessment" className="hover:text-cream">
            Assessment
          </Link>
          <Link href="/mentorship" className="hover:text-cream">
            Mentorship
          </Link>
          <a href={SITE.linkedin} className="hover:text-cream" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={SITE.github} className="hover:text-cream" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
