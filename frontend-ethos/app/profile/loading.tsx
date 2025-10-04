import { Skeleton } from "@/components/ui/skeleton"
import { UniversalSearch } from "@/components/universal-search"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      <UniversalSearch />

      <main className="container mx-auto px-6 pt-24 pb-12">
        <Skeleton className="h-10 w-20 mb-6" />

        <div className="mb-8">
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-6 w-32 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </main>
    </div>
  )
}
