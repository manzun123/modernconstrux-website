"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import { Menu, X, Phone, Sparkles, Box, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "AI Visualizer", href: "/ai-visualizer", highlight: true },
  { name: "Home", href: "/" },
  { 
    name: "About Us", 
    href: "/about",
    submenu: [
      { name: "Warranty", href: "/warranty" }
    ]
  },
  { name: "ADU Guide", href: "/adu-guide" },
  { name: "Projects", href: "/projects" },
  { name: "3D Showroom", href: "/showroom", icon: Box },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setAboutDropdownOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false)
    }, 400) // 400ms delay before closing
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="flex items-center justify-between w-full px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/images/logo.png" alt="Modern Construx Logo" width={44} height={44} className="w-11 h-11" />
          <div className="hidden sm:block">
            <span className="font-bold text-xl tracking-tight text-foreground">Modern Construx</span>
            <p className="text-xs text-muted-foreground -mt-0.5">San Diego General Contractor</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-5">
          {navigation.map((item) => (
            item.submenu ? (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2"
                >
                  {item.name}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
                {/* Invisible bridge to prevent gap issues */}
                <div className="absolute top-full left-0 h-2 w-full" />
                {aboutDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2 bg-background border border-border rounded-lg shadow-lg min-w-[140px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.highlight
                    ? "flex items-center gap-1.5 text-lg font-semibold text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                    : "text-lg font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                }
              >
                {item.highlight && <Sparkles className="w-4 h-4" />}
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </Link>
            )
          ))}
          <div className="w-px h-5 bg-border mx-2" />
          <a
            href="tel:+18587440521"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            (858) 744-0521
          </a>
          <Button size="sm" asChild>
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
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full text-base font-medium text-foreground hover:text-accent transition-colors"
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Main About Us link */}
                    <Link
                      href={item.href}
                      className="block mt-2 ml-4 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us Overview
                    </Link>
                    {/* Submenu items with animated expand */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileAboutOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
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
                )}
              </div>
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
