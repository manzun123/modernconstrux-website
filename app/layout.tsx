import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/layout/site-header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Construx | The Future of Building is Here",
  description:
    "The future of building is here. San Diego's premier general contractor specializing in ADUs, remodels, tenant improvements, and commercial construction. Licensed, insured, and dedicated to quality craftsmanship.",
  keywords: ["San Diego contractor", "ADU builder", "home remodel", "general contractor", "commercial construction"],
  openGraph: {
    title: "Modern Construx | The Future of Building is Here",
    description:
      "The future of building is here. San Diego's premier general contractor specializing in ADUs, remodels, and commercial construction.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SiteHeader />
        <main className="pt-[73px]">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
