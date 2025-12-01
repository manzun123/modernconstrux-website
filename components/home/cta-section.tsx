"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Sparkles } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

export function CTASection() {
  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <ScrollAnimate variant="fade-right">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                Ready to Start Your Project?
              </h2>
            </ScrollAnimate>
            <ScrollAnimate variant="fade-right" delay={100}>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Whether you&apos;re dreaming of a new ADU, planning a complete home remodel, or need commercial
                construction services, we&apos;re here to bring your vision to life.
              </p>
            </ScrollAnimate>
            <ScrollAnimate variant="fade-up" delay={200}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/contact">
                    Request a Free Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  asChild
                >
                  <a href="tel:+18587440521">
                    <Phone className="mr-2 w-4 h-4" />
                    (858) 744-0521
                  </a>
                </Button>
              </div>
            </ScrollAnimate>
          </div>

          {/* Right - AI Visualizer Promo */}
          <ScrollAnimate variant="fade-left" delay={300}>
            <div className="bg-primary-foreground/10 rounded-lg p-8 border border-primary-foreground/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground">AI Design Visualizer</h3>
              </div>
              <p className="text-primary-foreground/80 mb-6">
                Upload a photo of your space and see AI-generated remodel concepts in seconds. Visualize the
                possibilities before your project begins.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/ai-visualizer">
                  Try AI Visualizer
                  <Sparkles className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
