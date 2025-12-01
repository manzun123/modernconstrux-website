"use client"

import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"

const testimonials = [
  {
    quote:
      "Modern Construx transformed our backyard with a beautiful ADU. The attention to detail and communication throughout the project was exceptional. Highly recommend!",
    author: "Sarah M.",
    location: "Pacific Beach",
    project: "ADU Construction",
  },
  {
    quote:
      "Our kitchen remodel exceeded all expectations. The team was professional, on-time, and the quality of work is outstanding. We love our new space!",
    author: "Michael R.",
    location: "La Jolla",
    project: "Kitchen Remodel",
  },
  {
    quote:
      "They handled our commercial build-out flawlessly. From permits to final inspection, everything was smooth. Our new office space is exactly what we envisioned.",
    author: "Jennifer T.",
    location: "Downtown San Diego",
    project: "Tenant Improvement",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollAnimate variant="fade-up">
            <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">Testimonials</p>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">What Our Clients Say</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-4 text-lg text-muted-foreground">
              Don&apos;t just take our word for it. Here&apos;s what San Diego homeowners and businesses have to say
              about working with us.
            </p>
          </ScrollAnimate>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={150} variant="fade-up">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <p className="text-foreground leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location} · {testimonial.project}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
