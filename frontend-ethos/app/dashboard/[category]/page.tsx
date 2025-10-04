"use client"

import { UniversalSearch } from "@/components/universal-search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function DashboardPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const category = params.category as string
  const entityType = searchParams.get("type")
  const location = searchParams.get("location")

  // Sample data for charts
  const activityData = [
    { time: "00:00", value: 45 },
    { time: "04:00", value: 23 },
    { time: "08:00", value: 156 },
    { time: "12:00", value: 234 },
    { time: "16:00", value: 189 },
    { time: "20:00", value: 98 },
  ]

  const distributionData = [
    { name: "Library", value: 234 },
    { name: "Labs", value: 189 },
    { name: "Cafeteria", value: 156 },
    { name: "Dorms", value: 298 },
    { name: "Admin", value: 87 },
  ]

  const getCategoryTitle = () => {
    if (entityType) {
      return `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} Dashboard`
    }
    if (location) {
      return `${location.charAt(0).toUpperCase() + location.slice(1)} Dashboard`
    }
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  const handleBack = () => {
    if (category === "entities") {
      router.push("/select-entity")
    } else if (category === "locations") {
      router.push("/select-location")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background fade-in-animation">
      <UniversalSearch />

      <div className="container mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">{getCategoryTitle()}</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for {entityType || location || category}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Active</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Peak Activity</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12:00 PM</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-muted-foreground">234 concurrent</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3 text-green-500" />
                <span className="text-green-500">-45%</span> from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>24-hour activity pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Activity",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px] chart-container"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" opacity={0.3} />
                    <XAxis dataKey="time" stroke="hsl(var(--chart-text))" fontSize={12} />
                    <YAxis stroke="hsl(var(--chart-text))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-value1)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-value)", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Distribution</CardTitle>
              <CardDescription>Activity by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Count",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px] chart-container"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--chart-text))" fontSize={12} />
                    <YAxis stroke="hsl(var(--chart-text))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value1)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 min ago", event: "Access granted", location: "Library - Main Entrance", status: "normal" },
                {
                  time: "5 min ago",
                  event: "Unusual pattern detected",
                  location: "Lab Building - 3rd Floor",
                  status: "warning",
                },
                { time: "12 min ago", event: "Access granted", location: "Cafeteria - North Wing", status: "normal" },
                { time: "18 min ago", event: "Access granted", location: "Dorm A - Lobby", status: "normal" },
                {
                  time: "23 min ago",
                  event: "Multiple failed attempts",
                  location: "Admin Building - Server Room",
                  status: "alert",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "alert"
                          ? "bg-destructive"
                          : activity.status === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{activity.event}</div>
                      <div className="text-sm text-muted-foreground">{activity.location}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
