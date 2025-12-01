"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"

const featuredProjects = [
  {
    id: "1",
    title: "Pacific Beach Modern ADU",
    location: "Pacific Beach, San Diego",
    image: "/modern-detached-adu-small-house-exterior-clean-fac.jpg",
    tags: ["ADU", "New Construction"],
  },
  {
    id: "2",
    title: "La Jolla Kitchen Remodel",
    location: "La Jolla, San Diego",
    image: "/luxury-modern-white-kitchen-remodel-marble-counter.jpg",
    tags: ["Remodel", "Kitchen"],
  },
  {
    id: "3",
    title: "Pacific Beach ADU Extension",
    location: "Pacific Beach, San Diego",
    image: "/modern-adu-small-house-pacific-beach-san-diego-ext.jpg",
    tags: ["ADU", "New Construction"],
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <ScrollAnimate variant="fade-up">
              <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">Our Work</p>
            </ScrollAnimate>
            <ScrollAnimate variant="fade-up" delay={100}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Featured Projects</h2>
            </ScrollAnimate>
          </div>
          <ScrollAnimate variant="fade-left" delay={200}>
            <Button variant="outline" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </ScrollAnimate>
        </div>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={150}
          variant="scale"
        >
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group">
              <div className="relative overflow-hidden rounded-lg bg-card aspect-[4/3]">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
