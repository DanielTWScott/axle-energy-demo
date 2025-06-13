import { APP_CONFIG } from "@/lib/constants"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-2">Loading Your Green Energy Dashboard...</h2>
        <p className="text-sm sm:text-base text-slate-300 mb-4">
          Optimizing for maximum savings and minimum carbon impact
        </p>
        <div className="text-xs text-slate-400">
          {APP_CONFIG.name} by{" "}
          <a href={`mailto:${APP_CONFIG.author.email}`} className="text-green-400 hover:text-green-300">
            {APP_CONFIG.author.name}
          </a>
        </div>
      </div>
    </div>
  )
}
