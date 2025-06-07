// Simple feature flag system
export const featureFlags = {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  enableRealTimeUpdates: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES === "true",
  enableOptimizationAnalysis: process.env.NEXT_PUBLIC_ENABLE_OPTIMIZATION_ANALYSIS === "true",
  enablePortfolioMetrics: process.env.NEXT_PUBLIC_ENABLE_PORTFOLIO_METRICS === "true",
  enableEnvironmentalTracking: process.env.NEXT_PUBLIC_ENABLE_ENVIRONMENTAL_TRACKING === "true",
  debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
  enablePerformanceMonitoring: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === "true",
} as const

export type FeatureFlag = keyof typeof featureFlags

export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  return featureFlags[flag] ?? false
}

// Development helper
export const getAllFeatureFlags = () => {
  if (process.env.NODE_ENV === "development") {
    return featureFlags
  }
  return {}
}

// Log feature flag status in development
if (process.env.NODE_ENV === "development") {
  console.log("🚩 Feature Flags:", featureFlags)
}
