import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Axle Energy Demo - Smart Home Energy Optimization",
  description:
    "AI-powered energy market forecasting and optimization insights powered by real distributed energy resource data. Created by Daniel Scott.",
  authors: [{ name: "Daniel Scott", url: "https://github.com/danieltwscott" }],
  creator: "Daniel Scott",
  publisher: "Daniel Scott",
  keywords: ["energy", "optimization", "carbon", "sustainability", "smart-home", "battery", "solar", "grid", "axle"],
  openGraph: {
    title: "Axle Energy Demo - Smart Home Energy Optimization",
    description: "AI-powered energy optimization platform demo by Daniel Scott",
    url: "https://axle-energy-demo.vercel.app",
    siteName: "Axle Energy Demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axle Energy Demo - Smart Home Energy Optimization",
    description: "AI-powered energy optimization platform demo by Daniel Scott",
    creator: "@danieltwscott", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content="Daniel Scott" />
        <meta name="contact" content="danieltwscott@gmail.com" />
        <link rel="canonical" href="https://axle-energy-demo.vercel.app" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
