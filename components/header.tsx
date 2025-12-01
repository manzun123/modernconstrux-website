"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone, Sparkles, Box } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "AI Visualizer", href: "/ai-visualizer", highlight: true },
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "ADU Guide", href: "/adu-guide" },
  { name: "Projects", href: "/projects" },
  { name: "3D Showroom", href: "/showroom", icon: Box },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Modern Construx Logo" width={44} height={44} className="w-11 h-11" />
          <div className="hidden sm:block">
            <span className="font-bold text-xl tracking-tight text-foreground">Modern Construx</span>
            <p className="text-xs text-muted-foreground -mt-0.5">San Diego General Contractor</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={
                item.highlight
                  ? "flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                  : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              {item.highlight && <Sparkles className="w-4 h-4" />}
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:+18587440521"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="w-4 h-4" />
            (858) 744-0521
          </a>
          <Button asChild>
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.highlight
                    ? "flex items-center gap-2 text-base font-semibold text-accent"
                    : "block text-base font-medium text-foreground hover:text-accent transition-colors"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.highlight && <Sparkles className="w-4 h-4" />}
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
