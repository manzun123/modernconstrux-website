"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import {
  Home,
  DollarSign,
  MapPin,
  CheckCircle,
  Building,
  Users,
  Zap,
  Phone,
  ArrowRight,
  AlertCircle,
} from "lucide-react"

const aduTypes = [
  {
    title: "Detached ADU",
    description: "A standalone structure separate from the main house, typically in the backyard.",
    maxSize: "Up to 1,200 sq ft",
    image: "/adu-guide/detached-adu.jpg",
  },
  {
    title: "Attached ADU",
    description: "An addition built onto the existing home, sharing at least one wall.",
    maxSize: "Up to 1,200 sq ft",
    image: "/adu-guide/attached-adu.jpg",
  },
  {
    title: "Garage Conversion",
    description: "Converting an existing garage into a livable dwelling unit.",
    maxSize: "Varies by existing structure",
    image: "/adu-guide/garage-conversion.jpg",
  },
  {
    title: "Junior ADU (JADU)",
    description: "A smaller unit within the existing home footprint, often a converted bedroom.",
    maxSize: "Up to 500 sq ft",
    image: "/adu-guide/jadu.jpg",
  },
]

const permitSteps = [
  {
    step: 1,
    title: "Site Assessment",
    description: "We evaluate your property to determine the best ADU type, placement, and design options.",
    duration: "1-2 days",
  },
  {
    step: 2,
    title: "Design & Plans",
    description:
      "Our architects create detailed plans that comply with San Diego building codes and zoning requirements.",
    duration: "2-4 weeks",
  },
  {
    step: 3,
    title: "Permit Application",
    description: "We submit your plans to the City of San Diego for review and handle all required documentation.",
    duration: "1-2 weeks to submit",
  },
  {
    step: 4,
    title: "City Review",
    description: "The city reviews plans for zoning, building codes, fire safety, and utility connections.",
    duration: "4-8 weeks typical",
  },
  {
    step: 5,
    title: "Permit Approval",
    description: "Once approved, you receive building permits and we can begin construction.",
    duration: "Varies",
  },
  {
    step: 6,
    title: "Construction & Inspections",
    description:
      "We build your ADU with regular city inspections at each phase (foundation, framing, electrical, plumbing, final).",
    duration: "4-6 months",
  },
]

const zoningInfo = [
  {
    icon: MapPin,
    title: "Setback Requirements",
    description:
      "Detached ADUs typically require 4ft side and rear setbacks. Garage conversions may have no setback requirements.",
  },
  {
    icon: Building,
    title: "Height Limits",
    description:
      "ADUs are generally limited to 16ft for detached units, though two-story ADUs up to 18ft may be permitted in some zones.",
  },
  {
    icon: Home,
    title: "Lot Coverage",
    description:
      "San Diego allows ADUs even if they exceed typical lot coverage limits, as long as the ADU is under 800 sq ft.",
  },
  {
    icon: Users,
    title: "Owner Occupancy",
    description: "As of 2020, owner-occupancy requirements are suspended for ADUs permitted before 2025.",
  },
]

const benefits = [
  {
    icon: DollarSign,
    title: "Rental Income",
    description: "Generate $1,500-$3,000+ monthly rental income in San Diego",
  },
  { icon: Users, title: "Multi-Generational Living", description: "Keep family close while maintaining privacy" },
  { icon: Home, title: "Property Value", description: "Increase your home value by 20-30%" },
  { icon: Zap, title: "Flexibility", description: "Home office, guest house, or Airbnb rental" },
]

const faqs = [
  {
    question: "How much does an ADU cost in San Diego?",
    answer:
      "ADU costs typically range from $150,000 to $350,000+ depending on size, finishes, and site conditions. Garage conversions start around $100,000. We provide detailed estimates during our free consultation.",
  },
  {
    question: "Do I need to provide parking for an ADU?",
    answer:
      "In most cases, no. California law eliminates parking requirements for ADUs within half a mile of public transit, in historic districts, or when part of an existing structure. San Diego has adopted these state-wide exemptions.",
  },
  {
    question: "Can I build an ADU on any property?",
    answer:
      "Most single-family and multi-family residential properties in San Diego can have an ADU. Some restrictions apply in certain zones or for properties with HOA covenants. We assess eligibility during our free consultation.",
  },
  {
    question: "How long does the entire ADU process take?",
    answer:
      "From design to move-in ready, expect 8-14 months total. This includes 2-4 weeks for design, 4-8 weeks for permits, and 4-6 months for construction. We work to minimize delays at every stage.",
  },
  {
    question: "Can I use my ADU as a short-term rental (Airbnb)?",
    answer:
      "San Diego allows short-term rentals in ADUs, but regulations vary by zone. Some areas require a short-term rental permit and have occupancy limits. We can help you understand the rules for your property.",
  },
  {
    question: "What utilities does an ADU need?",
    answer:
      "ADUs need connections for electricity, water, sewer, and typically gas. In many cases, ADUs can connect to existing utilities. Separate meters may be required or optional depending on your rental plans.",
  },
]

export default function ADUGuidePage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/adu-guide/adu-hero.jpg" alt="Modern ADU in San Diego" fill className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Home className="w-4 h-4" />
              Complete ADU Resource
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-4xl">
              Everything You Need to Know About ADUs in San Diego
            </h1>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-6 text-xl text-primary-foreground/80 max-w-2xl">
              Accessory Dwelling Units are transforming San Diego properties. Learn about types, permitting, zoning,
              costs, and how we can help you build your perfect ADU.
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="bounce-in" delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get a Free ADU Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/ai-visualizer">
                  Visualize Your ADU with AI
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* What is an ADU Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollAnimate variant="fade-right">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Understanding ADUs</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">What is an ADU?</h2>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={150}>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  An <strong>Accessory Dwelling Unit (ADU)</strong> is a secondary housing unit on a single-family
                  residential lot. Also known as granny flats, in-law suites, backyard cottages, or casitas, ADUs
                  provide independent living spaces with their own kitchen, bathroom, and sleeping area.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="fade-up" delay={300}>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  California has passed landmark legislation making it easier than ever to build ADUs, and San Diego has
                  embraced these changes to address housing needs while giving homeowners new opportunities for income
                  and flexibility.
                </p>
              </ScrollAnimate>
              <ScrollAnimate variant="bounce-in" delay={450}>
                <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Did You Know?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        San Diego issued over 2,500 ADU permits in 2023 alone - more than any other California city
                        outside Los Angeles.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
            <ScrollAnimate variant="slide-reveal">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src="/adu-guide/what-is-adu.jpg" alt="Modern ADU example" fill className="object-cover" />
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ADU Types */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">ADU Options</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">Types of ADUs</h2>
              <p className="mt-4 text-muted-foreground">
                Choose the ADU type that best fits your property, budget, and goals.
              </p>
            </div>
          </ScrollAnimate>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {aduTypes.map((type, index) => (
              <ScrollAnimate
                key={type.title}
                variant={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={index * 100}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image src={type.image || "/placeholder.svg"} alt={type.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {type.title}
                      <span className="text-sm font-normal text-accent">{type.maxSize}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Build an ADU?</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">Benefits of Adding an ADU</h2>
            </div>
          </ScrollAnimate>
          <StaggerContainer
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            staggerDelay={100}
            variant="bounce-in"
          >
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Permitting Process */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">The Process</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">How ADU Permitting Works in San Diego</h2>
              <p className="mt-4 text-primary-foreground/70">
                We handle the entire permitting process for you. Here's what to expect.
              </p>
            </div>
          </ScrollAnimate>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permitSteps.map((step, index) => (
              <ScrollAnimate key={step.step} variant="flip-up" delay={index * 100}>
                <div className="bg-primary-foreground/5 rounded-xl p-6 h-full border border-primary-foreground/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                      {step.step}
                    </div>
                    <div className="text-sm text-accent">{step.duration}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{step.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning Information */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Zoning & Regulations</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">San Diego ADU Zoning Rules</h2>
              <p className="mt-4 text-muted-foreground">
                Understanding zoning requirements is crucial for ADU planning. Here are the key regulations.
              </p>
            </div>
          </ScrollAnimate>
          <StaggerContainer className="mt-16 grid md:grid-cols-2 gap-8" staggerDelay={150} variant="fade-up">
            {zoningInfo.map((info) => (
              <div key={info.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{info.title}</h3>
                  <p className="mt-1 text-muted-foreground">{info.description}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollAnimate variant="zoom-fade">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">FAQs</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
          </ScrollAnimate>
          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <ScrollAnimate key={index} variant="fade-up" delay={index * 75}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pl-11">
                    <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Build Your ADU?</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={150}>
            <p className="mt-4 text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Get a free consultation and find out if your property is eligible. Our team handles everything from design
              to permits to construction.
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="bounce-in" delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule Free Consultation</Link>
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

      {/* Legal Disclaimer */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">
            Disclaimer: The information on this page is for general guidance only and may not reflect the most current California or local ADU regulations. Zoning rules, setback requirements, utility rules, and permit processes can change. Always confirm requirements with your local city or county building department and consult with a licensed design professional before starting any project. Modern Construx is not liable for decisions made based solely on this information.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
