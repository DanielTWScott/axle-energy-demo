// Application constants and configuration
export const APP_CONFIG = {
  name: "Axle Energy Demo",
  description: "Smart Home Energy Optimization Platform",
  version: "1.0.0",
  author: {
    name: "Daniel Scott",
    email: "danieltwscott@gmail.com",
    github: "https://github.com/danieltwscott",
    repository: "https://github.com/danieltwscott/axle-energy-demo",
  },
  urls: {
    production: "https://axle-energy-demo.vercel.app",
    repository: "https://github.com/danieltwscott/axle-energy-demo",
    issues: "https://github.com/danieltwscott/axle-energy-demo/issues",
  },
  contact: {
    email: "danieltwscott@gmail.com",
    support: "danieltwscott@gmail.com",
  },
  social: {
    twitter: "@danieltwscott", // Update with your actual Twitter handle
    linkedin: "https://linkedin.com/in/danieltwscott", // Update with your LinkedIn
  },
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    gaId: process.env.NEXT_PUBLIC_GA_ID,
  },
} as const

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  fallbackEnabled: true,
} as const

export const DEMO_DATA = {
  portfolioSize: 15247,
  totalCapacity: 187.3,
  successRate: 94.2,
  avgMonthlySavings: 156.7,
  carbonSavedDaily: 23.7,
} as const
