"use client"

import { Search, Filter, MapPin, Users, Building2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function UniversalSearch() {
  const [filters, setFilters] = useState({
    entities: true,
    locations: true,
    assets: true,
    anomalies: true,
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-primary" />
              </div>
              <span className="font-semibold text-lg">Saptang</span>
            </div>
          </div>

          <div className="flex-1 relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search entities, locations, assets, or anomalies..."
              className="pl-10 pr-4 h-11 bg-secondary/50 border-border focus-visible:ring-primary"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-11 w-11 bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem
                checked={filters.entities}
                onCheckedChange={(checked) => setFilters({ ...filters, entities: checked })}
              >
                <Users className="w-4 h-4 mr-2" />
                Entities
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.locations}
                onCheckedChange={(checked) => setFilters({ ...filters, locations: checked })}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Locations
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.assets}
                onCheckedChange={(checked) => setFilters({ ...filters, assets: checked })}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Assets
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.anomalies}
                onCheckedChange={(checked) => setFilters({ ...filters, anomalies: checked })}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Anomalies
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
