"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { APP_CONFIG } from "@/lib/constants"

// Google Analytics component
export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!APP_CONFIG.analytics.enabled || !APP_CONFIG.analytics.gaId) return

    // Load Google Analytics
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.analytics.gaId}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      window.gtag =
        window.gtag ||
        (() => {
          ;(window.gtag.q = window.gtag.q || []).push(arguments)
        })
      window.gtag("js", new Date())
      window.gtag("config", APP_CONFIG.analytics.gaId!, {
        page_title: "Axle Energy Demo",
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: "demo_version",
        },
      })
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!APP_CONFIG.analytics.enabled || !window.gtag) return

    window.gtag("config", APP_CONFIG.analytics.gaId!, {
      page_path: pathname,
    })
  }, [pathname])

  return null
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
