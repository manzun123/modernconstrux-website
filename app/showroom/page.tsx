"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Eye, Home, Phone } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

const showroomProjects = [
  {
    title: "Modern ADU Interior",
    subtitle: "Bright, open living spaces with natural light",
    image: "/adu-modern-living-room-interior-bright-natural-lig.jpg",
  },
  {
    title: "Luxury Kitchen Remodel",
    subtitle: "High-end finishes and professional appliances",
    image: "/luxury-kitchen-remodel-modern-white-marble-san-die.jpg",
  },
  {
    title: "Pacific Beach ADU",
    subtitle: "Contemporary design in San Diego neighborhoods",
    image: "/modern-adu-exterior-pacific-beach.jpg",
  },
]

export default function ShowroomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Virtual Showroom
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Walk through ADUs, remodels, and apartment upgrades in immersive 3D before you build.
            Experience our finished projects from every angle and visualize your dream space.
          </p>
        </div>
      </section>

      {/* 3D Viewer Placeholder */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-700 ring-1 ring-slate-600 flex items-center justify-center">
            {/* Example future embed:
            <iframe src="https://example.com/3d-tour" className="h-full w-full border-0" allowFullScreen />
            */}
            <div className="text-center p-8">
              <Eye className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">3D Tour Coming Soon</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                This area will display an interactive Matterport/WebGL showroom where you can explore our completed projects in full 3D.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Cards Grid */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-400 text-lg">Explore our recent work and get inspired</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showroomProjects.map((project, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700 hover:border-accent/50 transition-all duration-300 group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{project.subtitle}</p>
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-accent hover:border-accent">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="bg-slate-900 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Home className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                <p className="text-slate-400 mb-6">
                  Get a free consultation and see how we can bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-accent hover:border-accent" asChild>
                    <a href="tel:+18587440521">
                      <Phone className="w-4 h-4 mr-2" />
                      (858) 744-0521
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
