import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { ServicesSection } from "@/components/home/services-section"
import { AllServicesSection } from "@/components/home/all-services-section"
import { CollageBand } from "@/components/home/collage-band"
import { FAQSection } from "@/components/home/faq-section"
import { ServiceAreasSection } from "@/components/home/service-areas-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      
      {/* All Services Grid */}
      <AllServicesSection />
      
      {/* Collage Band 1: Deck Construction */}
      <CollageBand
        heading="Custom Deck Building"
        caption="From rooftop retreats to backyard escapes, we design and build stunning decks tailored to your lifestyle and outdoor vision."
        image="/1deckcollage.png"
        alt="Custom deck construction with ocean views"
      />
      
      {/* Collage Band 2: Water Damage Repair */}
      <CollageBand
        heading="Water Damage Restoration"
        caption="Water damage left untreated can lead to mold, structural decay, and costly repairs. Our team responds quickly to assess, repair, and restore your property—protecting your home and your investment."
        image="/1waterdamage.png"
        alt="Water damage repair and restoration"
        flip
      />

      {/* Collage Band 3: ADU Construction */}
      <CollageBand
        heading="ADU Specialists"
        caption="Accessory Dwelling Units built from the ground up. We handle permits, design, and construction to maximize your property's potential and create beautiful living spaces."
        image="/1aducollage.png"
        alt="ADU construction progress"
      />

      {/* Collage Band 4: Concrete Work */}
      <CollageBand
        heading="Concrete Work"
        caption="Concrete driveways, patios, foundations, slabs, walkways, retaining walls, and all types of structural and flatwork. Our concrete crews are among the most experienced in the region, delivering clean finishes, precise grading, and durable results built to last."
        image="/concretesite.png"
        alt="Professional concrete work and flatwork"
        flip
      />

      {/* Collage Band 5: Commercial & Structural Framing */}
      <CollageBand
        heading="Commercial & Structural Framing"
        caption="Our experienced crews handle complex metal framing for commercial build-outs and large-scale renovations. Precision engineering meets expert craftsmanship on every structural project."
        image="/1metalframing.jpg"
        alt="Commercial metal framing construction"
      />
      
      <TestimonialsSection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* FAQ Section */}
      <FAQSection />

      <CTASection />
      <Footer />
    </>
  )
}
