"use client"

import { useState, useRef, useCallback } from "react"
import { ScrollAnimate } from "@/components/scroll-animate"

interface CollageBandProps {
  heading: string
  caption: string
  image: string
  alt: string
  flip?: boolean
}

export function CollageBand({ heading, caption, image, alt, flip = false }: CollageBandProps) {
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
    <section className="py-12">
      <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[55vh] lg:min-h-[60vh]`}>
        {/* Text Side */}
        <div className="lg:w-[35%] flex items-center justify-center bg-muted/30 px-6 py-8 lg:py-0">
          <ScrollAnimate variant="fade-up">
            <div className="max-w-md text-center lg:text-left">
              <p className="text-accent font-medium mb-3 uppercase tracking-wide text-sm">{heading}</p>
              <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">{caption}</p>
            </div>
          </ScrollAnimate>
        </div>
        
        {/* Image Side with Zoom */}
        <div 
          ref={containerRef}
          className="lg:w-[65%] relative min-h-[50vh] lg:min-h-0 overflow-hidden cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => { setIsZoomed(false); setPosition({ x: 50, y: 50 }); }}
        >
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: isZoomed ? "scale(1.4)" : "scale(1)",
              transformOrigin: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      </div>
    </section>
  )
}

