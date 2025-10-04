"use client"

import { UniversalSearch } from "@/components/universal-search"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, BookOpen, Coffee, Home, Laptop, Users, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SelectLocationPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setTimeout(() => {
      router.push(`/dashboard/locations?location=${location}`)
    }, 600)
  }

  const handleBack = () => {
    router.push("/")
  }

  const locations = [
    {
      id: "library",
      name: "Library",
      icon: BookOpen,
      position: { top: "20%", left: "30%" },
      stats: { current: 234, capacity: 500 },
      status: "normal",
    },
    {
      id: "auditorium",
      name: "Auditorium",
      icon: Building,
      position: { top: "25%", left: "65%" },
      stats: { current: 89, capacity: 800 },
      status: "normal",
    },
    {
      id: "cafeteria",
      name: "Cafeteria",
      icon: Coffee,
      position: { top: "55%", left: "45%" },
      stats: { current: 156, capacity: 300 },
      status: "normal",
    },
    {
      id: "labs",
      name: "Computer Labs",
      icon: Laptop,
      position: { top: "50%", left: "20%" },
      stats: { current: 189, capacity: 200 },
      status: "warning",
    },
    {
      id: "dorms",
      name: "Dormitories",
      icon: Home,
      position: { top: "70%", left: "70%" },
      stats: { current: 298, capacity: 400 },
      status: "normal",
    },
    {
      id: "admin",
      name: "Admin Building",
      icon: Users,
      position: { top: "35%", left: "50%" },
      stats: { current: 87, capacity: 150 },
      status: "normal",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <UniversalSearch />

      <div className="container mx-auto px-6 pt-28 pb-16 fade-in-animation">
        <div className="max-w-6xl mx-auto mb-6">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Campus Map</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Select a location to view detailed activity and monitoring data
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-6xl mx-auto">
          <Card className="relative h-[600px] bg-secondary/30 overflow-hidden">
            {/* Grid background for map effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-border/30" />
                ))}
              </div>
            </div>

            {/* Campus outline decoration */}
            <div className="absolute inset-8 border-2 border-primary/20 rounded-3xl" />

            {/* Location pins */}
            {locations.map((location, index) => {
              const Icon = location.icon
              const occupancyPercent = (location.stats.current / location.stats.capacity) * 100
              const isSelected = selectedLocation === location.id

              return (
                <div
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
                    isSelected ? "scale-zoom-animation" : ""
                  }`}
                  style={{
                    top: location.position.top,
                    left: location.position.left,
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  {/* Pulse effect */}
                  <div
                    className={`absolute inset-0 rounded-full animate-ping ${
                      location.status === "warning" ? "bg-amber-500/50" : "bg-primary/50"
                    }`}
                  />

                  {/* Pin */}
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${
                      location.status === "warning"
                        ? "bg-amber-500/20 border-2 border-amber-500"
                        : "bg-primary/20 border-2 border-primary"
                    }`}
                  >
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none">
                    <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap">
                      <div className="text-sm font-medium">{location.name}</div>
                    </div>
                  </div>

                  {/* Info card on hover - now positioned lower to avoid overlap with label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <Card className="p-4 min-w-[200px] shadow-2xl">
                      <div className="font-semibold mb-2">{location.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Occupancy: {location.stats.current}/{location.stats.capacity}
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${occupancyPercent > 80 ? "bg-amber-500" : "bg-primary"}`}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              )
            })}
          </Card>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-muted-foreground">High Occupancy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
