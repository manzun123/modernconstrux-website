"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Users, Clock, Mail, Phone } from "lucide-react"

const teamMembers = [
  {
    name: "Marcella Zuniga",
    role: "Project Manager",
    bio: "With over 10 years of experience in construction management, Marcella ensures every project is delivered on time and exceeds client expectations.",
    image: "/team/marcella-zuniga.jpg",
    email: "marcella@modernconstrux.xyz",
  },
  {
    name: "Santos Gill",
    role: "Superintendent",
    bio: "Santos brings decades of hands-on construction expertise to every job site, ensuring quality craftsmanship and safety standards are always met.",
    image: "/team/santos-gill.jpg",
    email: "santos@modernconstrux.xyz",
  },
  {
    name: "Vince Orengo",
    role: "Project Manager",
    bio: "A seasoned veteran with 25+ years in the industry, Vince specializes in complex remodels and commercial tenant improvements.",
    image: "/team/vince-orengo.jpg",
    email: "vince@modernconstrux.xyz",
  },
]

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in every project, from small remodels to large commercial builds.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Honest pricing, transparent communication, and delivering exactly what we promise - every time.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We treat every client as a partner, working together to bring your vision to life.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "On time, on budget, and built to last. Our track record speaks for itself.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/about/construction-team-san-diego.jpg"
            alt="Construction team at work"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-4xl">
              Building San Diego&apos;s Future, One Project at a Time
            </h1>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-6 text-xl text-primary-foreground/80 max-w-2xl">
              Modern Construx is a full-service general contractor dedicated to transforming spaces and exceeding
              expectations throughout San Diego County.
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="bounce-in" delay={400}>
            <div className="mt-8 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-accent" />
                <span>CA License #1103813</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-accent" />
                <span>Fully Insured</span>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimate variant="slide-reveal">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src="/about/team-working-on-site.jpg" alt="Our team at work" fill className="object-cover" />
              </div>
            </ScrollAnimate>
            <div>
              <ScrollAnimate variant="fade-right">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Story</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">The Future of Building is Here</h2>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={150}>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Founded with a vision to revolutionize construction in San Diego, Modern Construx combines
                  cutting-edge technology with time-tested craftsmanship. We specialize in ADUs, full home remodels, and
                  commercial tenant improvements.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={300}>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our team brings together decades of combined experience with a fresh, innovative approach. From
                  AI-powered design visualization to sustainable building practices, we&apos;re not just building
                  structures - we&apos;re building the future.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="bounce-in" delay={450}>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-accent">250+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">100%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Values</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">What Drives Us Every Day</h2>
            </div>
          </ScrollAnimate>
          <StaggerContainer
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            staggerDelay={100}
            variant="bounce-in"
          >
            {values.map((value) => (
              <Card key={value.title} className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">Meet the Project Management Team</h2>
              <p className="mt-4 text-muted-foreground">
                Our experienced leadership team brings decades of construction expertise to every project.
              </p>
            </div>
          </ScrollAnimate>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollAnimate
                key={member.name}
                variant={index === 0 ? "rotate-in" : index === 1 ? "flip-up" : "slide-reveal"}
                delay={index * 150}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="text-accent font-medium text-sm">{member.role}</p>
                    <p className="mt-3 text-muted-foreground text-sm">{member.bio}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <ScrollAnimate variant="zoom-fade">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={150}>
            <p className="mt-4 text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Let&apos;s discuss your vision and bring it to life. Contact us today for a free consultation.
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="bounce-in" delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
                asChild
              >
                <a href="tel:+18587440521">
                  <Phone className="w-4 h-4 mr-2" />
                  (858) 744-0521
                </a>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </main>
  )
}
