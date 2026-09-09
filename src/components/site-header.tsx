"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { LogoMark, LogoWordmark } from "@/components/logo"
import { NAV_LINKS } from "@/lib/site"
import { cn } from "@/lib/utils"

const navLinkClass =
  "rounded-sm transition-colors hover:text-cream focus-visible:text-cream"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const firstLink = panelRef.current?.querySelector("a")
    firstLink?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="relative z-20 border-b border-ember/20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12" aria-label="Primary">
        <Link
          href="/"
          className={cn("flex items-center gap-2.5", navLinkClass)}
          onClick={() => setOpen(false)}
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
                  className={cn(navLinkClass, current && "text-cream")}
                  aria-current={current ? "page" : undefined}
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
                "h-auto rounded-sm bg-ember-deep px-4 py-2 text-[0.82rem] font-semibold text-cream hover:bg-ember-fill",
              )}
            >
              Work With Me
            </Link>
          </li>
        </ul>

        <Button
          ref={toggleRef}
          type="button"
          variant="ghost"
          size="icon"
          className="text-cream hover:bg-iron hover:text-cream md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="true"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>

      <div
        id={menuId}
        ref={panelRef}
        hidden={!open}
        className="border-t border-ember/20 bg-iron/90 px-6 py-4 md:hidden"
      >
        <ul className="flex flex-col gap-3 text-sm font-medium text-ash">
          {NAV_LINKS.map((link) => {
            const current = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-sm py-1 hover:text-cream",
                    navLinkClass,
                    current && "text-cream",
                  )}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/mentorship"
              className="mt-2 inline-flex rounded-sm bg-ember-deep px-4 py-2 text-cream hover:bg-ember-fill"
              onClick={() => setOpen(false)}
            >
              Work With Me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
