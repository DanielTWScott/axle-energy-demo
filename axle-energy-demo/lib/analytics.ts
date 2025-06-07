// Google Analytics 4 implementation
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const isAnalyticsEnabled = () => {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && GA_TRACKING_ID && typeof window !== "undefined"
}

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled()) return

  window.gtag("config", GA_TRACKING_ID!, {
    page_title: "Axle Energy Dashboard",
    page_location: window.location.href,
  })
}

// Track page views
export const trackPageView = (url: string) => {
  if (!isAnalyticsEnabled()) return

  window.gtag("config", GA_TRACKING_ID!, {
    page_path: url,
  })
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isAnalyticsEnabled()) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track optimization preference changes
export const trackOptimizationPreference = (preference: "savings" | "green" | "balanced") => {
  trackEvent("preference_change", "optimization", preference)
}

// Track tab changes
export const trackTabChange = (tab: string) => {
  trackEvent("tab_change", "navigation", tab)
}

// Track API errors
export const trackAPIError = (endpoint: string, error: string) => {
  trackEvent("api_error", "error", `${endpoint}: ${error}`)
}
