"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { UniversalSearch } from "@/components/universal-search"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  User,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  UserCheck,
} from "lucide-react"

export default function EntityListPage() {
  const params = useParams()
  const router = useRouter()
  const type = params.type as string

  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Mock data - in real app, this would come from API
  const generateMockEntities = (entityType: string) => {
    const count = entityType === "student" ? 8234 : entityType === "faculty" ? 456 : 1234
    const entities = []

    for (let i = 1; i <= count; i++) {
      entities.push({
        id: `${entityType}-${i}`,
        name: `${entityType === "student" ? "Student" : entityType === "faculty" ? "Dr." : "Staff"} ${i < 10 ? "0" + i : i}`,
        entityId: `ENT-${entityType.substring(0, 3).toUpperCase()}-${1000 + i}`,
        cardId: `CARD-2024-${1000 + i}`,
        department:
          entityType === "student"
            ? ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"][i % 4]
            : entityType === "faculty"
              ? ["Computer Science", "Mathematics", "Physics", "Chemistry"][i % 4]
              : ["Administration", "Maintenance", "Security", "IT Support"][i % 4],
        currentLocation: ["Library", "Cafeteria", "Lab Building", "Admin Block", "Sports Complex"][i % 5],
        lastSeen: `${Math.floor(Math.random() * 60)} minutes ago`,
        status: Math.random() > 0.1 ? "active" : "inactive",
      })
    }

    return entities
  }

  const allEntities = generateMockEntities(type)

  // Filter entities based on search query
  const filteredEntities = allEntities.filter(
    (entity) =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.entityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEntities = filteredEntities.slice(startIndex, endIndex)

  const handleEntityClick = (entity: any) => {
    router.push(`/profile?q=${encodeURIComponent(entity.name)}&id=${entity.entityId}`)
  }

  const getTypeIcon = () => {
    switch (type) {
      case "student":
        return <GraduationCap className="w-6 h-6" />
      case "faculty":
        return <Briefcase className="w-6 h-6" />
      case "staff":
        return <UserCheck className="w-6 h-6" />
      default:
        return <User className="w-6 h-6" />
    }
  }

  const getTypeTitle = () => {
    return type.charAt(0).toUpperCase() + type.slice(1) + "s"
  }

  return (
    <div className="min-h-screen bg-background">
      <UniversalSearch />

      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/select-entity")}
          className="mb-6 -ml-2 hover:bg-secondary/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Entity Types
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">{getTypeIcon()}</div>
            <div>
              <h1 className="text-4xl font-bold text-balance">{getTypeTitle()}</h1>
              <p className="text-lg text-muted-foreground">
                {filteredEntities.length} {filteredEntities.length === 1 ? "result" : "results"} found
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              className="pl-10 bg-secondary/50"
            />
          </div>
        </div>

        {/* Entity Grid */}
        {currentEntities.length === 0 ? (
          <Card className="p-12 bg-card/50 border-border text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No {type}s found matching your search</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {currentEntities.map((entity) => (
                <Card
                  key={entity.id}
                  className="p-5 bg-card/50 border-border hover:bg-card/80 hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => handleEntityClick(entity)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant={entity.status === "active" ? "default" : "secondary"} className="text-xs">
                      {entity.status}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {entity.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{entity.department}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span className="font-mono">{entity.entityId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{entity.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{entity.lastSeen}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <span className="ml-4 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
