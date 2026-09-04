"use client"

import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"

const counties = [
  {
    name: "San Diego County",
    cities: ["San Diego", "Chula Vista", "Oceanside", "Escondido", "Carlsbad", "El Cajon", "Vista", "San Marcos", "Encinitas", "La Jolla", "Del Mar", "Poway"],
  },
  {
    name: "Orange County",
    cities: ["Irvine", "Anaheim", "Santa Ana", "Huntington Beach", "Newport Beach", "Costa Mesa", "Fullerton", "Orange", "Laguna Beach", "Mission Viejo"],
  },
  {
    name: "Los Angeles County",
    cities: ["Los Angeles", "Long Beach", "Glendale", "Santa Monica", "Pasadena", "Torrance", "Burbank", "West Hollywood", "Beverly Hills", "Malibu"],
  },
  {
    name: "Riverside County",
    cities: ["Riverside", "Corona", "Temecula", "Murrieta", "Palm Springs", "Palm Desert", "Menifee", "Hemet", "Lake Elsinore"],
  },
  {
    name: "San Bernardino County",
    cities: ["Ontario", "Rancho Cucamonga", "Fontana", "San Bernardino", "Redlands", "Upland", "Chino", "Chino Hills", "Claremont"],
  },
]

export function ServiceAreasSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <ScrollAnimate variant="fade-up">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium text-sm uppercase tracking-wide">
                Service Areas
              </span>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Proudly Serving All of Southern California
            </h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              From the coast to the inland empire, our experienced crews deliver quality construction throughout the region.
            </p>
          </ScrollAnimate>
        </div>

        {/* Counties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {counties.map((county, index) => (
            <ScrollAnimate key={county.name} variant="fade-up" delay={index * 100}>
              <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3 text-accent">
                  {county.name}
                </h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {county.cities.join(" • ")}
                </p>
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* Additional Info */}
        <ScrollAnimate variant="fade-up" delay={300}>
          <div className="text-center">
            <p className="text-primary-foreground/80 mb-6">
              And surrounding communities throughout Southern California. <br className="hidden sm:block" />
              Not sure if we service your area? Contact us to confirm!
            </p>
            <Button 
              size="lg" 
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/contact">
                Check Availability in Your Area
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}

