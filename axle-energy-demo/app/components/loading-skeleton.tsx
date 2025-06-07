import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MetricCardSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24 bg-slate-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 bg-slate-700 mb-2" />
        <Skeleton className="h-3 w-20 bg-slate-700" />
      </CardContent>
    </Card>
  )
}

export function GridStatusSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-600 mb-6 sm:mb-8">
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-48 bg-slate-700 mb-2" />
        <Skeleton className="h-4 w-64 bg-slate-700" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2 bg-slate-700" />
              <Skeleton className="h-4 w-20 mx-auto mb-3 bg-slate-700" />
              <Skeleton className="h-6 w-24 mx-auto bg-slate-700 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
