"use client"

import Link from "next/link"
import { Home, Building2, Hammer, Store, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"

const services = [
  {
    title: "ADU Construction",
    description: "Custom accessory dwelling units designed to maximize your property's potential and value.",
    icon: Home,
    image: "/modern-adu-accessory-dwelling-unit-san-diego-backy.jpg",
    href: "/projects?filter=adu",
  },
  {
    title: "Full Remodels",
    description: "Complete home transformations from kitchens and bathrooms to whole-house renovations.",
    icon: Hammer,
    image: "/luxury-kitchen-remodel-modern-white-marble-san-die.jpg",
    href: "/projects?filter=remodel",
  },
  {
    title: "Tenant Improvements",
    description: "Commercial space build-outs tailored to your business needs and brand identity.",
    icon: Building2,
    image: "/modern-office-tenant-improvement-commercial-space.jpg",
    href: "/projects?filter=commercial",
  },
  {
    title: "Commercial Work",
    description: "Ground-up commercial construction and renovations for businesses of all sizes.",
    icon: Store,
    image: "/commercial-building-construction-modern-retail-spa.jpg",
    href: "/projects?filter=commercial",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <ScrollAnimate variant="fade-up">
            <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">What We Do</p>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Our Services</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-4 text-lg text-muted-foreground">
              From residential remodels to commercial build-outs, we deliver quality construction services across San
              Diego County.
            </p>
          </ScrollAnimate>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={150} variant="fade-up">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group">
              <Card className="overflow-hidden border-border hover:border-accent/50 transition-colors h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                    {service.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
