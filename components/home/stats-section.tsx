"use client"

import { CheckCircle, Calendar, Award, Users } from "lucide-react"
import { StaggerContainer } from "@/components/scroll-animate"

const stats = [
  {
    value: "250+",
    label: "Projects Completed",
    icon: CheckCircle,
  },
  {
    value: "15+",
    label: "Years Experience",
    icon: Calendar,
  },
  {
    value: "100%",
    label: "Licensed & Insured",
    icon: Award,
  },
  {
    value: "50+",
    label: "5-Star Reviews",
    icon: Users,
  },
]

export function StatsSection() {
  return (
    <section className="bg-secondary py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={100} variant="fade-up">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
