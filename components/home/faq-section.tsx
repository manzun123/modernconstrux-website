"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, DollarSign, FileCheck, Award, Calendar, Palette, MapPin, RefreshCw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
  icon: React.ComponentType<{ className?: string }>
}

const faqs: FAQItem[] = [
  {
    question: "How is pricing calculated and what factors affect cost?",
    answer: "We provide transparent, itemized estimates with no hidden fees. Pricing factors include project size, materials selected, structural modifications, permit requirements, and site conditions. Every quote includes labor, materials, permits, and cleanup. We offer flexible financing options and will work with your budget to find the best solutions without compromising quality.",
    icon: DollarSign,
  },
  {
    question: "Do you handle permits and inspections?",
    answer: "Yes—we handle everything. Our team manages the entire permit process from application through final inspection, ensuring full code compliance. We have established relationships with local building departments throughout Southern California, which helps streamline approvals. You'll never have to visit a permit office or coordinate inspectors.",
    icon: FileCheck,
  },
  {
    question: "What warranties or guarantees do you offer?",
    answer: "We stand behind our work with a comprehensive 2-year workmanship warranty on all projects. Additionally, manufacturer warranties on materials and fixtures are passed directly to you. If any issue arises from our installation, we'll fix it promptly at no cost. Our reputation is built on quality—we're not satisfied until you are.",
    icon: Award,
  },
  {
    question: "How do payments and scheduling work?",
    answer: "We use a milestone-based payment structure tied to project phases—never asking for excessive upfront deposits. Typical terms include a reasonable deposit to secure materials, with remaining payments due at completion of defined project stages. We provide a detailed payment schedule upfront so there are no surprises. Financing options are available for qualified homeowners.",
    icon: Calendar,
  },
  {
    question: "Can you help with design and material selection?",
    answer: "Absolutely! Our design team helps you visualize your project with 3D renderings and material samples. We guide you through selections at our partner showrooms and can work with your existing designs or architects. Whether you have a Pinterest board or just a vague idea, we'll help bring your vision to life within your budget.",
    icon: Palette,
  },
  {
    question: "What areas do you serve?",
    answer: "We proudly serve all of Southern California, including San Diego County, Orange County, Los Angeles County, Riverside County, and San Bernardino County. From coastal communities to inland cities, our crews are equipped to handle projects throughout the region. Contact us to confirm service availability in your specific area.",
    icon: MapPin,
  },
  {
    question: "How do you handle changes during construction?",
    answer: "We understand that ideas evolve. All change requests are documented with a written change order that includes scope, cost, and timeline impact—approved by you before any work begins. This protects both parties and ensures transparency. Minor adjustments are often accommodated easily; larger changes are handled professionally with clear communication.",
    icon: RefreshCw,
  },
  {
    question: "Why should I choose Modern Construx over other contractors?",
    answer: "We combine old-school craftsmanship with modern technology and transparent communication. Our clients choose us for our detailed planning process, licensed professional crews (no subcontractor roulette), real-time project updates, and our commitment to finishing on time and on budget. Check our reviews—our reputation speaks for itself. We treat every home like it's our own.",
    icon: Star,
  },
]

interface FAQSectionProps {
  condensed?: boolean
}

export function FAQSection({ condensed = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const displayFaqs = condensed ? faqs.slice(0, 5) : faqs

  return (
    <section className="py-20 bg-muted/50">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <ScrollAnimate variant="fade-up">
            <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">
              Common Questions
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in complete transparency. Here are answers to the questions homeowners ask most before starting their project.
            </p>
          </ScrollAnimate>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {displayFaqs.map((faq, index) => (
            <ScrollAnimate key={index} variant="fade-up" delay={index * 50}>
              <div className="bg-background rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                      openIndex === index && "rotate-180"
                    )} 
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-5 pl-20">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* CTA Buttons */}
        <ScrollAnimate variant="fade-up" delay={300}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">
                Get a Free Estimate
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Have a question not listed here? We're happy to help—just reach out!
          </p>
        </ScrollAnimate>
      </div>
    </section>
  )
}

