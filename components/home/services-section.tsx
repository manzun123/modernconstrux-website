"use client"

import Image from "next/image"
import { ScrollAnimate } from "@/components/scroll-animate"

const services = [
  {
    title: "New Construction",
    description: "Ground-up custom home building with modern design, quality materials, and expert craftsmanship.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=95",
  },
  {
    title: "ADU Construction",
    description: "Custom accessory dwelling units designed to maximize your property's potential and value.",
    image: "/attachedGCon.png",
  },
  {
    title: "Full Remodels",
    description: "Complete home transformations from kitchens and bathrooms to whole-house renovations.",
    image: "/Beforeandafterremodel.png",
  },
  {
    title: "Bathroom Remodels",
    description: "Luxury bathroom transformations with modern fixtures, custom vanities, and spa-like finishes.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1920&q=95",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-4">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-6 text-center">
          <ScrollAnimate variant="fade-up">
            <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">What We Do</p>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Our Services</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From residential remodels to commercial build-outs, we deliver quality construction services across San
              Diego County.
            </p>
          </ScrollAnimate>
        </div>

        {/* Editorial Service Cards - Text Offset at Top Corner */}
        <div className="space-y-12 lg:space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0
            return (
              <ScrollAnimate key={service.title} variant="fade-up">
                <div className="relative">
                  {/* Image - Static (no zoom) */}
                  <div className={`lg:w-[68%] ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                    <div className="relative aspect-[16/8] lg:aspect-[21/8] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        quality={95}
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Text Content - Offset at Top Corner */}
                  <div className={`mt-6 lg:mt-0 lg:absolute lg:top-0 lg:w-[32%] lg:-translate-y-16 ${isEven ? 'lg:-left-6' : 'lg:-right-6'}`}>
                    <div className="bg-background/95 backdrop-blur-sm p-6 lg:p-8 rounded-xl lg:shadow-lg space-y-4">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <div className="h-1 w-16 bg-accent" />
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            )
          })}
        </div>
      </div>
    </section>
  )
}
