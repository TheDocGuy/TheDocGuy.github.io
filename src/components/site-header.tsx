"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { LogoMark, LogoWordmark } from "@/components/logo"
import { NAV_LINKS } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 border-b border-ember/20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark className="size-9" />
          <LogoWordmark className="font-heading text-[1.35rem] tracking-tight text-cream" />
        </Link>

        <ul className="hidden items-center gap-8 text-[0.82rem] font-medium tracking-wide text-ash md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "transition-colors hover:text-cream",
                  pathname === link.href && "text-cream",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/mentorship"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-auto rounded-sm bg-ember px-4 py-2 text-[0.82rem] font-semibold text-cream hover:bg-ember-hot",
              )}
            >
              Work With Me
            </Link>
          </li>
        </ul>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-cream hover:bg-iron hover:text-cream md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open ? (
        <div className="border-t border-ember/20 bg-iron/90 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3 text-sm font-medium text-ash">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-1 hover:text-cream",
                    pathname === link.href && "text-cream",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/mentorship"
                className="mt-2 inline-flex rounded-sm bg-ember px-4 py-2 text-cream"
                onClick={() => setOpen(false)}
              >
                Work With Me
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
