"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { ScrollAnimate, StaggerContainer } from "@/components/scroll-animate"

const navigation = {
  services: [
    { name: "ADU Construction", href: "/projects?filter=adu" },
    { name: "Full Remodels", href: "/projects?filter=remodel" },
    { name: "Tenant Improvements", href: "/projects?filter=commercial" },
    { name: "Commercial Work", href: "/projects?filter=commercial" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "ADU Guide", href: "/adu-guide" },
    { name: "Projects", href: "/projects" },
    { name: "3D Showroom", href: "/showroom" },
    { name: "AI Visualizer", href: "/ai-visualizer" },
    { name: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          staggerDelay={100}
          variant="fade-up"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Modern Construx Logo"
                width={44}
                height={44}
                className="w-11 h-11 bg-white rounded-sm p-1"
              />
              <span className="font-bold text-xl">Modern Construx</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              San Diego&apos;s trusted general contractor for ADUs, remodels, and commercial construction. Licensed,
              insured, and committed to excellence.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  113 West G St #408
                  <br />
                  San Diego, CA
                </span>
              </li>
              <li>
                <a
                  href="tel:+18587440521"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  (858) 744-0521
                </a>
              </li>
              <li>
                <a
                  href="mailto:Manuel@modernconstrux.xyz"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  Manuel@modernconstrux.xyz
                </a>
              </li>
            </ul>
          </div>
        </StaggerContainer>

        <ScrollAnimate variant="fade-up" delay={400}>
          <div className="mt-12 pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-primary-foreground/60">
                © {new Date().getFullYear()} Modern Construx. All rights reserved.
              </p>
              <p className="text-sm text-primary-foreground/60">CA Contractor License #1103813</p>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </footer>
  )
}
