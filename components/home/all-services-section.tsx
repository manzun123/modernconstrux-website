"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  Home, 
  Hammer, 
  ChefHat, 
  Bath, 
  PlusSquare, 
  Car, 
  Building2, 
  Umbrella,
  Layers,
  Frame,
  PaintBucket,
  Grid3X3,
  Zap,
  Wind,
  TreePine,
  ClipboardCheck,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"

const services = [
  {
    title: "ADU Construction",
    description: "Custom accessory dwelling units to maximize property value and rental income.",
    icon: Home,
  },
  {
    title: "Full Home Remodeling",
    description: "Complete home transformations tailored to your lifestyle and vision.",
    icon: Hammer,
  },
  {
    title: "Kitchen Remodeling",
    description: "Modern kitchen designs with premium cabinetry, countertops, and appliances.",
    icon: ChefHat,
  },
  {
    title: "Bathroom Remodeling",
    description: "Luxury bathroom upgrades with custom tile, fixtures, and spa-like finishes.",
    icon: Bath,
  },
  {
    title: "Room Additions",
    description: "Expand your living space with seamlessly integrated home additions.",
    icon: PlusSquare,
  },
  {
    title: "Garage Conversions",
    description: "Transform unused garage space into functional living areas or ADUs.",
    icon: Car,
  },
  {
    title: "New Construction",
    description: "Ground-up custom home building with modern design and quality materials.",
    icon: Building2,
  },
  {
    title: "Roofing",
    description: "Complete roof replacement, repair, and weatherproofing solutions.",
    icon: Umbrella,
  },
  {
    title: "Concrete & Foundations",
    description: "Driveways, patios, foundations, and structural concrete work.",
    icon: Layers,
  },
  {
    title: "Framing & Structural Work",
    description: "Expert wood and metal framing for residential and commercial projects.",
    icon: Frame,
  },
  {
    title: "Drywall & Painting",
    description: "Professional drywall installation, texturing, and interior/exterior painting.",
    icon: PaintBucket,
  },
  {
    title: "Flooring Installation",
    description: "Hardwood, tile, luxury vinyl, and laminate flooring installation.",
    icon: Grid3X3,
  },
  {
    title: "Electrical & Plumbing",
    description: "Licensed electrical upgrades, plumbing repairs, and new installations.",
    icon: Zap,
  },
  {
    title: "HVAC",
    description: "Heating and cooling system installation, repair, and energy upgrades.",
    icon: Wind,
  },
  {
    title: "Exterior Renovations",
    description: "Siding, windows, doors, decks, and outdoor living spaces.",
    icon: TreePine,
  },
  {
    title: "Permitting & Project Management",
    description: "Full-service permit handling and professional project oversight.",
    icon: ClipboardCheck,
  },
]

export function AllServicesSection() {
  return (
    <section className="bg-background">
      {/* Hero-style Header with Image Background */}
      <div className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/contractors.png"
            alt="Modern Construx contractors reviewing plans"
            fill
            className="object-cover object-center"
            quality={95}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        {/* Text Content Over Image */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <ScrollAnimate variant="fade-up">
              <p className="text-accent font-medium mb-3 uppercase tracking-wide text-sm">
                What We Offer
              </p>
            </ScrollAnimate>
            <ScrollAnimate variant="fade-up" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Complete Construction Services
              </h2>
            </ScrollAnimate>
            <ScrollAnimate variant="fade-up" delay={200}>
              <p className="mt-6 text-lg lg:text-xl text-white/85 leading-relaxed">
                From foundation to finish, we handle every aspect of your project with licensed professionals and quality craftsmanship.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </div>
      
      {/* Services Grid Section */}
      <div className="py-20 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Services Grid */}
        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" 
          staggerDelay={50} 
          variant="fade-up"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 bg-muted/30 rounded-xl border border-border hover:border-accent/50 hover:bg-muted/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollAnimate variant="fade-up" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Don't see your project listed? We handle custom requests—just ask!
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Discuss Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </ScrollAnimate>
        </div>
    </section>
  )
}

