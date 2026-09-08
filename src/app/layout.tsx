import type { Metadata } from "next"
import { DM_Mono, DM_Serif_Display, Instrument_Sans } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SITE } from "@/lib/site"
import "./globals.css"

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
})

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Documentation Maturity Framework`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.owner }],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${dmSerif.variable} ${dmMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
