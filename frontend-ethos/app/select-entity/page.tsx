"use client"

import { UniversalSearch } from "@/components/universal-search"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, UserCheck, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SelectEntityPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleEntitySelect = (type: string) => {
    setSelectedType(type)
    setTimeout(() => {
      router.push(`/dashboard/entities?type=${type}`)
    }, 600)
  }

  const handleBack = () => {
    router.push("/")
  }

  const entityTypes = [
    {
      id: "student",
      title: "Student",
      description: "Track student activity, attendance, and access patterns across campus",
      icon: GraduationCap,
      gradient: "bg-gradient-to-br from-blue-500/30 to-cyan-500/30",
      stats: { total: "8,234", active: "7,891" },
    },
    {
      id: "faculty",
      title: "Faculty",
      description: "Monitor faculty movements, office hours, and facility usage",
      icon: Briefcase,
      gradient: "bg-gradient-to-br from-purple-500/30 to-pink-500/30",
      stats: { total: "456", active: "423" },
    },
    {
      id: "staff",
      title: "Staff",
      description: "Track staff access, work schedules, and operational activities",
      icon: UserCheck,
      gradient: "bg-gradient-to-br from-teal-500/30 to-emerald-500/30",
      stats: { total: "1,234", active: "1,156" },
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

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Select Entity Type</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Choose the type of entity you want to monitor and analyze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {entityTypes.map((entity, index) => {
            const Icon = entity.icon
            return (
              <Card
                key={entity.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group ${
                  selectedType === entity.id ? "scale-zoom-animation" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleEntitySelect(entity.id)}
              >
                <div
                  className={`absolute inset-0 ${entity.gradient} opacity-50 group-hover:opacity-70 transition-opacity`}
                />
                <div className="relative p-8">
                  <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{entity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{entity.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <div className="text-2xl font-bold text-primary">{entity.stats.total}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">{entity.stats.active}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
