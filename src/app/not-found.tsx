import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-ember-hot uppercase">404</p>
      <h1 className="mt-3 font-heading text-4xl text-cream">That page is not in the system.</h1>
      <p className="mt-4 text-ash">
        Dead links are a maturity problem. This one is on us. Head back to a page that exists.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants(),
          "mt-8 inline-flex h-auto rounded-sm bg-ember-deep px-5 py-3 text-cream hover:bg-ember-fill",
        )}
      >
        Back to DocFoundry
      </Link>
    </div>
  )
}
