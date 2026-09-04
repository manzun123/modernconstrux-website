"use client"

import Link from "next/link"
import Image from "next/image"
import { ScrollAnimate } from "@/components/scroll-animate"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Phone } from "lucide-react"
import { Footer } from "@/components/footer"

export default function WarrantyPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
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
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-10 h-10 text-accent" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Warranty & Guarantees
              </h1>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={200}>
            <p className="text-xl text-primary-foreground/80 max-w-3xl">
              Modern Construx stands behind the quality of its construction.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Warranty Details */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* 1-Year Workmanship Warranty */}
          <ScrollAnimate variant="fade-up">
            <div className="flex items-start gap-6 mb-12 p-8 bg-muted/30 rounded-2xl border border-border">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  1-Year Workmanship Warranty
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  All projects include a 1-Year Workmanship Warranty covering labor and installation.
                </p>
              </div>
            </div>
          </ScrollAnimate>

          {/* 8-Year Structural Warranty */}
          <ScrollAnimate variant="fade-up" delay={150}>
            <div className="flex items-start gap-6 mb-12 p-8 bg-muted/30 rounded-2xl border border-border">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  8-Year Structural Warranty
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In addition, all structural work performed by Modern Construx is backed by an 8-Year Structural Warranty.
                </p>
              </div>
            </div>
          </ScrollAnimate>

          {/* Additional Info */}
          <ScrollAnimate variant="fade-up" delay={300}>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                These warranties are provided with every contract and are designed to protect your investment, ensure long-term performance, and give homeowners peace of mind that their project is built to last.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If any issues related to covered workmanship or structural integrity arise within the warranty period, Modern Construx will address them promptly and professionally in accordance with the warranty terms.
              </p>
            </div>
          </ScrollAnimate>

          {/* Warranty Registration Form */}
          <ScrollAnimate variant="fade-up" delay={400}>
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Warranty Registration
              </h3>
              <p className="text-muted-foreground mb-8">
                Register your project to activate warranty coverage and keep your documentation on file.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="(858) 555-1234"
                    />
                  </div>
                  
                  {/* Project Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Project Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="123 Main St, San Diego, CA 92101"
                    />
                  </div>
                  
                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                      Project Type <span className="text-accent">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    >
                      <option value="">Select project type...</option>
                      <option value="adu">ADU</option>
                      <option value="remodel">Remodel</option>
                      <option value="new-construction">New Construction</option>
                      <option value="roofing">Roofing</option>
                      <option value="concrete">Concrete</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Completion Date */}
                  <div>
                    <label htmlFor="completionDate" className="block text-sm font-medium text-foreground mb-2">
                      Completion Date <span className="text-accent">*</span>
                    </label>
                    <input
                      type="date"
                      id="completionDate"
                      name="completionDate"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                {/* Contract Number (optional) */}
                <div>
                  <label htmlFor="contractNumber" className="block text-sm font-medium text-foreground mb-2">
                    Contract Number <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="contractNumber"
                    name="contractNumber"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
                
                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                    Additional Notes / Warranty Details <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    placeholder="Enter any additional details about your project or warranty coverage..."
                  />
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Submit Warranty Registration
                  </Button>
                </div>
              </form>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <ScrollAnimate variant="zoom-fade">
            <h2 className="text-3xl md:text-4xl font-bold">Have Questions About Our Warranty?</h2>
          </ScrollAnimate>
          <ScrollAnimate variant="fade-up" delay={150}>
            <p className="mt-4 text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Contact us to learn more about our warranty coverage and how we stand behind every project.
            </p>
          </ScrollAnimate>
          <ScrollAnimate variant="bounce-in" delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
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

