"use client"

import type { ReactNode, ElementType } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur"
  | "rotate-in"
  | "bounce-in"
  | "slide-reveal"
  | "zoom-fade"
  | "flip-up"

interface ScrollAnimateProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  as?: ElementType
}

const variantStyles: Record<AnimationVariant, { initial: string; visible: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fade: {
    initial: "opacity-0",
    visible: "opacity-100",
  },
  scale: {
    initial: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  blur: {
    initial: "opacity-0 blur-sm",
    visible: "opacity-100 blur-0",
  },
  // New sales-optimized animations
  "rotate-in": {
    initial: "opacity-0 rotate-6 scale-95",
    visible: "opacity-100 rotate-0 scale-100",
  },
  "bounce-in": {
    initial: "opacity-0 scale-90 translate-y-4",
    visible: "opacity-100 scale-100 translate-y-0",
  },
  "slide-reveal": {
    initial: "opacity-0 translate-x-12 skew-x-3",
    visible: "opacity-100 translate-x-0 skew-x-0",
  },
  "zoom-fade": {
    initial: "opacity-0 scale-110 blur-[2px]",
    visible: "opacity-100 scale-100 blur-0",
  },
  "flip-up": {
    initial: "opacity-0 translate-y-6 rotateX-12",
    visible: "opacity-100 translate-y-0 rotateX-0",
  },
}

export function ScrollAnimate({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className,
  as: Component = "div",
}: ScrollAnimateProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()
  const styles = variantStyles[variant]

  return (
    <Component
      ref={ref}
      className={cn("transition-all ease-out", isVisible ? styles.visible : styles.initial, className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  )
}

// Staggered children animation wrapper
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  variant?: AnimationVariant
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  variant = "fade-up",
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()
  const styles = variantStyles[variant]

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn("transition-all duration-700 ease-out", isVisible ? styles.visible : styles.initial)}
              style={{ transitionDelay: `${index * staggerDelay}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
