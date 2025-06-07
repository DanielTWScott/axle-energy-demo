import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔋</div>
        <h1 className="text-3xl font-bold text-slate-100 mb-4">Page Not Found</h1>
        <p className="text-slate-300 mb-6">
          The energy optimization page you're looking for doesn't exist. Let's get you back to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-700" asChild>
            <Link href="mailto:danieltwscott@gmail.com">Contact Support</Link>
          </Button>
        </div>
        <div className="mt-6 text-sm text-slate-400">
          Axle Energy Demo by{" "}
          <a href="mailto:danieltwscott@gmail.com" className="text-green-400 hover:text-green-300">
            Daniel Scott
          </a>
        </div>
      </div>
    </div>
  )
}
