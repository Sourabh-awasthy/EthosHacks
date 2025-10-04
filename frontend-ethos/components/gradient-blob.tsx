"use client"

import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface GradientBlobProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  onClick: () => void
  delay?: number
  isZooming?: boolean
}

export function GradientBlob({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  delay = 0,
  isZooming = false,
}: GradientBlobProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full aspect-square rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
        isZooming ? "scale-zoom-animation" : ""
      }`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
      />

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 ${gradient} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-border/50 group-hover:border-primary/50 transition-colors duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <div
          className={`w-20 h-20 rounded-2xl ${gradient} opacity-20 flex items-center justify-center mb-6 transition-all duration-500 ${
            isHovered ? "scale-110 opacity-30" : ""
          }`}
        >
          <Icon className="w-10 h-10 text-foreground" />
        </div>

        <h3 className="text-2xl font-semibold mb-3 text-balance">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs text-pretty">{description}</p>

        {/* Hover Indicator */}
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
          <span>Click to explore</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}
