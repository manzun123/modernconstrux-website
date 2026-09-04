"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Gallery images - mix of local and high-quality Unsplash images
const galleryImages = [
  // Unsplash - Modern kitchen remodel
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90",
  // Local images
  "/luxury-modern-white-kitchen-remodel-marble-counter.jpg",
  "/luxury-kitchen-white-cabinets-calacatta-marble-isl.jpg",
  "/kitchen-island-professional-wolf-appliances-modern.jpg",
  "/luxury-kitchen-remodel-modern-white-marble-san-die.jpg",
  "/adu-modern-living-room-interior-bright-natural-lig.jpg",
  "/kitchen-dining-area-open-floor-plan-luxury-home.jpg",
  "/small-modern-kitchen-white-cabinets-quartz-counter.jpg",
  "/adu-bedroom-large-windows-natural-light-modern-min.jpg",
  "/modern-adu-exterior-backyard-san-diego-clean-desig.jpg",
]

function ZoomGalleryImage({ image }: { image: string }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => { setIsZoomed(false); setPosition({ x: 50, y: 50 }); }}
    >
      <img
        src={image}
        alt="Project showcase"
        className="w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: isZoomed ? "scale(1.5)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative bg-primary py-24">
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
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-accent font-medium mb-2 uppercase tracking-wide text-sm">Our Portfolio</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight">Our Work</h1>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Browse our collection of completed projects across San Diego. Quality craftsmanship you can see.
              </p>
            </div>
          </div>
        </section>

        {/* Large Scrolling Image Gallery */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <ZoomGalleryImage key={index} image={image} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - At Bottom */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let's discuss your vision and create something amazing together.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
