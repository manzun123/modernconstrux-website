import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { ServicesSection } from "@/components/home/services-section"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-[73px]">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <FeaturedProjects />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
