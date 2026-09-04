"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Users, Clock, Mail, Phone } from "lucide-react"
import { Footer } from "@/components/footer"

// TODO: Later, add real updated team photos and optional contact methods (no direct emails).
const teamMembers = [
  {
    name: "Manuel Zuniga",
    role: "Founder & Lead Project Manager",
    bio: "Manuel brings hands-on leadership and deep field experience to every project. With a background rooted in construction operations and project execution, he founded Modern Construx to create a company built on accountability, quality, and transparency. Manuel is personally involved in project planning, scheduling, and client communication, ensuring every project is delivered with precision and professionalism. His leadership philosophy is simple: build it right, communicate clearly, and always stand behind the work.",
    image: "/team/manuel-zuniga.jpg",
    email: "manuel@modernconstrux.xyz",
  },
  {
    name: "Frances Garcia",
    role: "Project Manager",
    bio: "Frances coordinates project timelines, manages logistics, and keeps each project running smoothly. With a focus on organization and attention to detail, she ensures homeowners, crews, and vendors stay aligned throughout the construction process.",
    image: "/team/frances-garcia.jpg",
    email: "frances@modernconstrux.xyz",
  },
  {
    name: "Marcella Zuniga",
    role: "Project Manager",
    bio: "With over 10 years of experience in construction management, Marcella ensures every project is delivered on time and exceeds client expectations. Her expertise in scheduling, budgeting, and client relations keeps projects moving forward efficiently.",
    image: "/team/marcella-zuniga.jpg",
    email: "marcella@modernconstrux.xyz",
  },
  {
    name: "Solomon Gill",
    role: "Superintendent",
    bio: "Santos brings decades of hands-on construction expertise to every job site. As superintendent, he oversees daily operations, coordinates crews, and ensures quality craftsmanship and safety standards are always met on every project.",
    image: "/team/santos-gill.jpg",
    email: "santos@modernconstrux.xyz",
  },
  {
    name: "Vince Orengo",
    role: "Project Manager",
    bio: "A seasoned veteran with 25+ years in the industry, Vince specializes in complex remodels and commercial tenant improvements. His deep technical knowledge and problem-solving skills make him invaluable on challenging projects.",
    image: "/team/vince-orengo.jpg",
    email: "vince@modernconstrux.xyz",
  },
  {
    name: "Miguel Farias",
    role: "Project Manager",
    bio: "Miguel brings strong field coordination and client communication skills to every project. With extensive knowledge and experience in drywall, finishing, and paint work, he ensures every surface meets the highest quality standards from start to finish.",
    image: "/team/miguel-farias.jpg",
    email: "miguel@modernconstrux.xyz",
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
        
        {/* Brand Logo Overlay - Top Right */}
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <Image
            src="/no background logo.png"
            alt="Modern Construx"
            width={160}
            height={160}
            className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain brightness-0 invert opacity-75"
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-4xl">
              Building San Diego&apos;s Future, One Project at a Time
            </h1>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-6 text-xl text-primary-foreground/80 max-w-3xl">
              Modern Construx is a full-service general contractor serving San Diego County and the surrounding Southern California region. We specialize in residential construction, ADU development, full home remodels, and commercial improvements. Our focus is simple: deliver high-quality projects, clear communication, and dependable results from start to finish.
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

      {/* Contractors Image & Positioning Copy Section */}
      <section className="bg-secondary/30 pt-10 lg:pt-14 pb-32 lg:pb-48">
        {/* Safety Banner */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">0</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Jobsite Accidents</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">OSHA 10</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Certified Team</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">OSHA 30</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Certified Team</div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <ScrollAnimate variant="fade-right">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">Designers and Builders — The Best of Both Worlds</h2>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  At Modern Construx, we combine strong leadership, skilled in-house crews, and disciplined project management to execute projects efficiently and professionally. Our team brings together more than 50 years of experience in the construction industry, allowing us to handle everything from complex structural work to high-end finishes with confidence and precision. Every project is approached with careful planning, transparent communication, and accountability at every stage.
                </p>
              </div>
            </ScrollAnimate>
            {/* Image - Natural fit showing full content */}
            <ScrollAnimate variant="fade-left">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/santosky.jpg" 
                  alt="Two professionals reviewing construction plans on a jobsite" 
                  fill 
                  className="object-cover object-top"
                  quality={95}
                />
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimate variant="slide-reveal">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src="/2metalframing.jpg" alt="Our construction team at work on a commercial framing project" fill className="object-cover" />
              </div>
            </ScrollAnimate>
            <div>
              <ScrollAnimate variant="fade-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">Our Story</h2>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={150}>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Modern Construx was founded with a vision to raise the standard of construction in San Diego. We saw an industry filled with shortcuts, miscommunication, and uncertainty for homeowners and property owners, and we built our company around doing the opposite.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={300}>
                <p className="mt-4 text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  We combine time-tested craftsmanship with modern technology, including AI-powered design visualization and advanced project coordination tools, to give clients a smoother, more predictable building experience. From ADUs and major remodels to commercial tenant improvements, our mission is not just to build structures, but to build long-term trust through quality work and professional execution.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="bounce-in" delay={450}>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-accent">250+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">50+</div>
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
                <Card className="group hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                    <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
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
      <Footer />
    </main>
  )
}
