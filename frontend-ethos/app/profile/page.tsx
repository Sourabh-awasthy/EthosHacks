"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Clock, User, CreditCard, ScanFace, Building2, AlertTriangle } from "lucide-react"
import { UniversalSearch } from "@/components/universal-search"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [timeRange, setTimeRange] = useState("today")
  const [showCustomRange, setShowCustomRange] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Mock data - in real app, this would come from API based on search query
  const profileData = {
    name: query || "John Doe",
    type: "Student",
    cardId: "CARD-2024-1234",
    entityId: "ENT-STU-5678",
    faceId: "FACE-9012",
    currentLocation: "Library - 2nd Floor",
    mostSeenAt: "Computer Science Lab",
    lastSeen: "2 minutes ago",
    totalAnomalies: 3,
  }

  // Mock timeline data
  const allTimelineData = [
    {
      id: 1,
      timestamp: "2024-10-05 14:30:00",
      activity: "Entry Swipe",
      location: "Library - Main Entrance",
      details: "Card swipe detected",
      type: "entry",
    },
    {
      id: 2,
      timestamp: "2024-10-05 14:32:00",
      activity: "Wi-Fi Connection",
      location: "Library - 2nd Floor",
      details: "Connected to campus Wi-Fi",
      type: "wifi",
    },
    {
      id: 3,
      timestamp: "2024-10-05 13:15:00",
      activity: "CCTV Detection",
      location: "Computer Science Lab",
      details: "Face recognition match",
      type: "cctv",
    },
    {
      id: 4,
      timestamp: "2024-10-05 12:00:00",
      activity: "Cafeteria Purchase",
      location: "Main Cafeteria",
      details: "Transaction completed",
      type: "transaction",
    },
    {
      id: 5,
      timestamp: "2024-10-05 09:00:00",
      activity: "Entry Swipe",
      location: "Main Gate",
      details: "Campus entry recorded",
      type: "entry",
    },
    {
      id: 6,
      timestamp: "2024-10-04 16:45:00",
      activity: "Exit Swipe",
      location: "Main Gate",
      details: "Campus exit recorded",
      type: "entry",
    },
    {
      id: 7,
      timestamp: "2024-10-04 14:20:00",
      activity: "Library Checkout",
      location: "Library - Main Desk",
      details: "Book borrowed",
      type: "transaction",
    },
  ]

  const getFilteredTimeline = () => {
    const now = new Date()
    let filteredData = allTimelineData

    if (timeRange === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      filteredData = allTimelineData.filter((item) => new Date(item.timestamp) >= today)
    } else if (timeRange === "yesterday") {
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      filteredData = allTimelineData.filter(
        (item) => new Date(item.timestamp) >= yesterday && new Date(item.timestamp) < today,
      )
    } else if (timeRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filteredData = allTimelineData.filter((item) => new Date(item.timestamp) >= weekAgo)
    } else if (timeRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filteredData = allTimelineData.filter((item) => new Date(item.timestamp) >= monthAgo)
    } else if (timeRange === "custom" && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // Include the entire end date
      filteredData = allTimelineData.filter((item) => {
        const itemDate = new Date(item.timestamp)
        return itemDate >= start && itemDate <= end
      })
    }

    return filteredData
  }

  const timelineData = getFilteredTimeline()

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    if (value === "custom") {
      setShowCustomRange(true)
    } else {
      setShowCustomRange(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "entry":
        return <Building2 className="w-4 h-4" />
      case "wifi":
        return <MapPin className="w-4 h-4" />
      case "cctv":
        return <ScanFace className="w-4 h-4" />
      case "transaction":
        return <CreditCard className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "entry":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      case "wifi":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "cctv":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "transaction":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <UniversalSearch />

      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-2 hover:bg-secondary/50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-balance">{profileData.name}</h1>
              <p className="text-xl text-muted-foreground">{profileData.type}</p>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Last seen: {profileData.lastSeen}
            </Badge>
          </div>

          {/* ID Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Card ID</p>
                  <p className="font-mono font-semibold text-sm">{profileData.cardId}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entity ID</p>
                  <p className="font-mono font-semibold text-sm">{profileData.entityId}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <ScanFace className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Face ID</p>
                  <p className="font-mono font-semibold text-sm">{profileData.faceId}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Anomalies</p>
                  <p className="font-mono font-semibold text-sm">{profileData.totalAnomalies} Linked</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-chart-1" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Currently At</p>
                  <p className="text-lg font-semibold">{profileData.currentLocation}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Most Seen At</p>
                  <p className="text-lg font-semibold">{profileData.mostSeenAt}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Activity Timeline</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-[180px] bg-secondary/50">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showCustomRange && (
            <Card className="p-4 mb-6 bg-card/50 border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-1 w-full">
                  <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (startDate && endDate) {
                      // Trigger re-render with new date range
                      setTimeRange("custom")
                    }
                  }}
                  disabled={!startDate || !endDate}
                  className="w-full sm:w-auto"
                >
                  Apply Range
                </Button>
              </div>
            </Card>
          )}

          {/* Timeline */}
          {timelineData.length === 0 ? (
            <Card className="p-12 bg-card/50 border-border text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No activities found in the selected time range</p>
            </Card>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              {/* Timeline items */}
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <div key={item.id} className="relative pl-16">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${getActivityColor(
                        item.type,
                      )}`}
                    >
                      {getActivityIcon(item.type)}
                    </div>

                    {/* Timeline content */}
                    <Card className="p-5 bg-card/50 border-border hover:bg-card/80 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.activity}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
