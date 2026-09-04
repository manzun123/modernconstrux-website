"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Phone } from "lucide-react"
import { Footer } from "@/components/footer"

export default function ShowroomPage() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white flex flex-col relative">
        {/* Brand Logo Overlay - Top Right */}
        <div className="absolute top-24 right-6 lg:top-28 lg:right-10 z-20">
          <Image
            src="/no background logo.png"
            alt="Modern Construx"
            width={160}
            height={160}
            className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain brightness-0 invert opacity-75"
          />
        </div>
        
        {/* Coming Soon Section */}
        <section className="flex-1 flex items-center justify-center px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <Eye className="w-20 h-20 text-accent mx-auto mb-6" />
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                Coming Soon
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Virtual Showroom
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              We're building something exciting! Soon you'll be able to walk through our ADUs, 
              remodels, and apartment upgrades in immersive 3D before you build.
            </p>
            
            <p className="text-slate-400 mb-12">
              Want to be notified when it's ready? Get in touch and we'll let you know!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
