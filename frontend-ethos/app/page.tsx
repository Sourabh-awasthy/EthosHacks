"use client"

import { UniversalSearch } from "@/components/universal-search"
import { GradientBlob } from "@/components/gradient-blob"
import { Users, MapPin, Building2, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [zoomingBlob, setZoomingBlob] = useState<string | null>(null)

  const handleBlobClick = (category: string) => {
    setZoomingBlob(category)

    setTimeout(() => {
      if (category === "entities") {
        router.push("/select-entity")
      } else if (category === "locations") {
        router.push("/select-location")
      } else {
        router.push(`/dashboard/${category}`)
      }
    }, 600)
  }

  const blobs = [
    {
      id: "entities",
      title: "Entities",
      description: "Track students, staff, and visitors across campus with unified identity resolution",
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-500/30 to-cyan-500/30",
    },
    {
      id: "locations",
      title: "Locations",
      description: "Monitor activity patterns and access logs across all campus facilities",
      icon: MapPin,
      gradient: "bg-gradient-to-br from-teal-500/30 to-emerald-500/30",
    },
    {
      id: "assets",
      title: "Assets",
      description: "Track equipment, resources, and infrastructure usage in real-time",
      icon: Building2,
      gradient: "bg-gradient-to-br from-cyan-500/30 to-blue-500/30",
    },
    {
      id: "anomalies",
      title: "Anomalies",
      description: "Detect and respond to unusual patterns and security threats proactively",
      icon: AlertTriangle,
      gradient: "bg-gradient-to-br from-amber-500/30 to-orange-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <UniversalSearch />

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-20 fade-in-animation">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Campus Security Monitoring
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            Unified entity resolution and activity tracking for modern campus security. Privacy-aware, explainable, and
            proactive threat detection.
          </p>
        </div>

        {/* Gradient Blobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blobs.map((blob, index) => (
            <div
              key={blob.id}
              className="fade-in-animation"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <GradientBlob
                title={blob.title}
                description={blob.description}
                icon={blob.icon}
                gradient={blob.gradient}
                onClick={() => handleBlobClick(blob.id)}
                delay={index * 100}
                isZooming={zoomingBlob === blob.id}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto fade-in-animation"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { label: "Active Entities", value: "12,847" },
            { label: "Locations Monitored", value: "156" },
            { label: "Data Sources", value: "8" },
            { label: "Anomalies Detected", value: "23" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
