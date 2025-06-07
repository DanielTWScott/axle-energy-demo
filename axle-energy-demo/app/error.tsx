"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-red-400 text-5xl mb-6">⚠️</div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">Something went wrong</h2>
        <p className="text-sm sm:text-base text-slate-300 mb-6">
          We're having trouble loading your energy dashboard. This could be due to a network issue or a temporary
          service disruption.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white">
            Try again
          </Button>
          <Button
            variant="outline"
            className="border-slate-500 text-slate-200 hover:bg-slate-700"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </Button>
        </div>
      </div>
    </div>
  )
}
