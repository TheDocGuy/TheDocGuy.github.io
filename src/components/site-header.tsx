"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { LogoMark, LogoWordmark } from "@/components/logo"
import { A11Y_COPY } from "@/lib/a11y-copy"
import { NAV_LINKS } from "@/lib/site"
import { cn } from "@/lib/utils"

const NAV_FOCUS =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ember-hot focus-visible:ring-offset-2 focus-visible:ring-offset-forge"

export function SiteHeader() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="relative z-20 border-b border-ember/20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12" aria-label={A11Y_COPY.primaryNav}>
        <Link
          href="/"
          className={cn("flex items-center gap-2.5", NAV_FOCUS)}
          onClick={() => setOpenPath(null)}
        >
          <LogoMark className="size-9" />
          <LogoWordmark className="font-heading text-[1.35rem] tracking-tight text-cream" />
        </Link>

        <ul className="hidden items-center gap-8 text-[0.82rem] font-medium tracking-wide text-ash md:flex">
          {NAV_LINKS.map((link) => {
            const current = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    NAV_FOCUS,
                    "transition-colors hover:text-cream",
                    current && "text-cream",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/mentorship"
              className={cn(
                buttonVariants({ variant: "default" }),
                NAV_FOCUS,
                "h-auto rounded-sm bg-ember-fill px-4 py-2 text-[0.82rem] font-semibold text-cream hover:bg-ember-fill-hover",
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
          className={cn(
            NAV_FOCUS,
            "text-cream hover:bg-iron hover:text-cream md:hidden",
          )}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenPath((current) => (current === pathname ? null : pathname))}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <div
        id={menuId}
        className={cn(
          "border-t border-ember/20 bg-iron/90 px-6 py-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col gap-3 text-sm font-medium text-ash">
          {NAV_LINKS.map((link) => {
            const current = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    NAV_FOCUS,
                    "block py-1 hover:text-cream",
                    current && "text-cream",
                  )}
                  onClick={() => setOpenPath(null)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/mentorship"
              className={cn(
                NAV_FOCUS,
                "mt-2 inline-flex rounded-sm bg-ember-fill px-4 py-2 text-cream hover:bg-ember-fill-hover",
              )}
              onClick={() => setOpenPath(null)}
            >
              Work With Me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
