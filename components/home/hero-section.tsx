"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-luxury-home-construction-site-san-diego-aer.jpg"
          alt="Modern construction project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <ScrollAnimate variant="fade-up" delay={0}>
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              San Diego&apos;s Premier General Contractor
            </p>
          </ScrollAnimate>

          <ScrollAnimate variant="fade-up" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight text-balance">
              The Future of Building is Here
            </h1>
          </ScrollAnimate>

          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
              From stunning ADUs to complete home remodels, we transform spaces with precision craftsmanship and modern
              design. Licensed, insured, and dedicated to exceeding your expectations.
            </p>
          </ScrollAnimate>

          <ScrollAnimate variant="fade-up" delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                asChild
              >
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
