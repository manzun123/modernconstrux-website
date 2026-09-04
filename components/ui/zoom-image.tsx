"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

interface ZoomImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  quality?: number
  sizes?: string
  priority?: boolean
  zoomScale?: number
}

export function ZoomImage({
  src,
  alt,
  fill = true,
  className = "",
  quality = 95,
  sizes,
  priority = false,
  zoomScale = 1.5,
}: ZoomImageProps) {
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

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
    setPosition({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
        quality={quality}
        sizes={sizes}
        priority={priority}
        style={{
          transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}

// Simple zoom version for non-Next Image elements (like collage bands using img tags)
export function ZoomImg({
  src,
  alt,
  className = "",
  zoomScale = 1.5,
}: {
  src: string
  alt: string
  className?: string
  zoomScale?: number
}) {
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

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
    setPosition({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-transform duration-300 ease-out will-change-transform ${className}`}
        style={{
          transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}

