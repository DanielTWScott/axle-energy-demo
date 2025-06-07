import { Button } from "@/components/ui/button"
import { Mail, Github, ExternalLink } from "lucide-react"

export function FooterContact() {
  return (
    <div className="mt-8 sm:mt-12 text-center border-t border-slate-600 pt-6 sm:pt-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-slate-100">Join the Green Energy Revolution</h3>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Axle's carbon-aware optimization helps you save money while reducing your environmental impact. Every
          optimized battery contributes to a cleaner, more sustainable energy system.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 mb-6">
        <Button variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-700 w-full sm:w-auto">
          Learn More
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">Get Started Today</Button>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <a
          href="mailto:danieltwscott@gmail.com"
          className="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">danieltwscott@gmail.com</span>
        </a>
        <a
          href="https://github.com/danieltwscott/axle-energy-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm">View Source Code</span>
        </a>
        <a
          href="https://axle-energy-demo.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Live Demo</span>
        </a>
      </div>

      <div className="text-xs sm:text-sm text-slate-400 space-y-1">
        <div>Real-time carbon data from UK National Grid ESO</div>
        <div>
          Demo created by{" "}
          <a href="mailto:danieltwscott@gmail.com" className="text-green-400 hover:text-green-300">
            Daniel Scott
          </a>{" "}
          for Axle Energy
        </div>
      </div>
    </div>
  )
}
