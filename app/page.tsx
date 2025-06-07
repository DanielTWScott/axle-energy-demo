"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, User, Users, Home, Globe } from "lucide-react"
import { OptimizationTradeoffs } from "./components/optimization-tradeoffs"

interface CarbonData {
  data: Array<{
    from: string
    to: string
    intensity: {
      forecast: number
      actual: number
      index: string
    }
  }>
}

interface OptimizationInsights {
  portfolioPerformance: {
    assetsOptimized: number
    totalCapacity: number
    dailyRevenue: number
    carbonSaved: number
    successRate: number
  }
  environmentalImpact: {
    dailyCarbonSaved: number
    monthlyEquivalent: string
    yearlyProjection: number
    treesEquivalent: number
  }
  customerBenefits: {
    avgMonthlySavings: number
    avgCarbonReduction: number
    greenEnergyUsage: number
    gridStressReduction: number
  }
}

export default function AxleResidentialPlatform() {
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null)
  const [optimizationData, setOptimizationData] = useState<OptimizationInsights | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate current electricity price (in real app, this would come from an API)
  const [currentElectricityPrice] = useState(52.3) // £/MWh

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)

        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 10000))

        const fetchPromise = fetch("/api/carbon-intensity", {
          headers: { "Cache-Control": "no-cache" },
        })

        const carbonResponse = (await Promise.race([fetchPromise, timeoutPromise])) as Response

        let carbonData = null
        if (carbonResponse.ok) {
          carbonData = await carbonResponse.json()
        }

        // Generate enhanced optimization data with carbon focus
        const optimizationData = {
          portfolioPerformance: {
            assetsOptimized: 15247,
            totalCapacity: 187.3,
            dailyRevenue: 47382,
            carbonSaved: 23.7, // tonnes CO2 saved today
            successRate: 94.2,
          },
          environmentalImpact: {
            dailyCarbonSaved: 23.7, // tonnes
            monthlyEquivalent: "711 tonnes (equivalent to 142 cars off the road)",
            yearlyProjection: 8651, // tonnes
            treesEquivalent: 393, // trees planted equivalent for today
          },
          customerBenefits: {
            avgMonthlySavings: 156.7, // £
            avgCarbonReduction: 1.8, // tonnes per year per customer
            greenEnergyUsage: 78.3, // % of energy from clean sources
            gridStressReduction: 12.4, // % reduction in peak demand
          },
        }

        setCarbonData(carbonData)
        setOptimizationData(optimizationData)
        setLastUpdated(new Date())
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Failed to load data")

        // Set fallback data so the app still works
        const fallbackOptimizationData = {
          portfolioPerformance: {
            assetsOptimized: 15247,
            totalCapacity: 187.3,
            dailyRevenue: 47382,
            carbonSaved: 23.7,
            successRate: 94.2,
          },
          environmentalImpact: {
            dailyCarbonSaved: 23.7,
            monthlyEquivalent: "711 tonnes (equivalent to 142 cars off the road)",
            yearlyProjection: 8651,
            treesEquivalent: 393,
          },
          customerBenefits: {
            avgMonthlySavings: 156.7,
            avgCarbonReduction: 1.8,
            greenEnergyUsage: 78.3,
            gridStressReduction: 12.4,
          },
        }

        setOptimizationData(fallbackOptimizationData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const getCurrentIntensity = () => {
    return carbonData?.data?.[0]?.intensity?.actual || 180
  }

  const getIntensityLevel = (intensity: number) => {
    if (intensity < 150) return { level: "Very Low", color: "text-green-400", bg: "bg-green-500/30" }
    if (intensity < 250) return { level: "Low", color: "text-green-300", bg: "bg-green-400/30" }
    if (intensity < 350) return { level: "Moderate", color: "text-yellow-300", bg: "bg-yellow-500/30" }
    if (intensity < 450) return { level: "High", color: "text-orange-300", bg: "bg-orange-500/30" }
    return { level: "Very High", color: "text-red-300", bg: "bg-red-500/30" }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-2">
            Loading Your Green Energy Dashboard...
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-4">
            Optimizing for maximum savings and minimum carbon impact
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <p className="text-yellow-300 text-sm">Note: Using demo data due to API limitations in production</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const currentIntensity = getCurrentIntensity()
  const intensityInfo = getIntensityLevel(currentIntensity)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
            <p className="text-yellow-300 text-sm">
              ⚠️ Demo Mode: Using simulated data due to API limitations. In production, this would show live UK grid
              data.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Axle Energy
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 mb-2">Smart Home Energy Optimization</p>
          <p className="text-sm sm:text-base text-slate-300 mb-4">
            Maximizing your savings while minimizing your carbon footprint
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <span className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-green-400" />
              Carbon-optimized
            </span>
          </div>
        </div>

        {/* Current Grid Status */}
        <Card className="bg-slate-800 border-slate-600 mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
              <Zap className="w-5 h-5 text-yellow-400" />
              Current UK Grid Conditions
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm">
              Real-time carbon intensity and electricity pricing that affects all customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-slate-100">{currentIntensity}</div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">gCO₂/kWh</div>
                <Badge className={`${intensityInfo.bg} ${intensityInfo.color} border-0 font-medium text-xs`}>
                  {intensityInfo.level} Carbon
                </Badge>
              </div>

              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-slate-100">£{currentElectricityPrice}</div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">per MWh</div>
                <Badge className="bg-blue-500/30 text-blue-300 border-0 font-medium text-xs">Current Price</Badge>
              </div>

              <div className="text-center col-span-2 lg:col-span-1">
                <div className="text-lg sm:text-2xl font-bold text-green-300 mb-2">
                  {currentIntensity < 150
                    ? "Charge Now"
                    : currentIntensity > 350 || currentElectricityPrice > 80
                      ? "Use Battery"
                      : currentIntensity < 250 && currentElectricityPrice < 60
                        ? "Good to Charge"
                        : "Evaluate"}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">Your Recommendation</div>
                <div className="text-xs text-slate-400">
                  {currentIntensity < 150
                    ? "Very clean grid - charge immediately"
                    : currentIntensity > 350 || currentElectricityPrice > 80
                      ? "High carbon/price - use stored energy"
                      : currentIntensity < 250 && currentElectricityPrice < 60
                        ? "Favorable conditions for charging"
                        : "Mixed signals - see detailed analysis below"}
                </div>
              </div>

              <div className="text-center col-span-2 lg:col-span-1">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-2">
                  {optimizationData?.environmentalImpact.treesEquivalent}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">Trees Planted Today</div>
                <div className="text-xs text-slate-400">By all Axle customers combined</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Personal Benefits Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Your Personal Benefits</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
            <Card className="bg-blue-900/20 border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                  Your Monthly Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-yellow-300">
                  £{optimizationData?.customerBenefits.avgMonthlySavings}
                </div>
                <p className="text-xs text-slate-400 mt-1">Average savings on your bill</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Your Carbon Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-green-300">
                  {optimizationData?.customerBenefits.avgCarbonReduction} tonnes
                </div>
                <p className="text-xs text-slate-400 mt-1">CO₂ you save per year</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">
                  <span className="hidden sm:inline">Your Green Energy Usage</span>
                  <span className="sm:hidden">Green Energy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-green-300">
                  {optimizationData?.customerBenefits.greenEnergyUsage}%
                </div>
                <p className="text-xs text-slate-400 mt-1">Your clean energy consumption</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Your Grid Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-blue-300">
                  {optimizationData?.customerBenefits.gridStressReduction}%
                </div>
                <p className="text-xs text-slate-400 mt-1">Your peak demand reduction</p>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Trade-offs Analysis */}
          <OptimizationTradeoffs carbonIntensity={currentIntensity} electricityPrice={currentElectricityPrice} />
        </div>

        {/* Platform Performance Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Axle Platform Performance</h2>
            <Badge className="bg-slate-700 text-slate-300">All 15,000+ Customers</Badge>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">
                  <span className="hidden sm:inline">Home Batteries Managed</span>
                  <span className="sm:hidden">Batteries</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-blue-300">
                  {optimizationData?.portfolioPerformance.assetsOptimized.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-1">Homes in our network</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Network Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-green-300">
                  {optimizationData?.portfolioPerformance.totalCapacity} MW
                </div>
                <p className="text-xs text-slate-400 mt-1">Combined storage power</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Total Daily Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-yellow-300">
                  £{optimizationData?.portfolioPerformance.dailyRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-1">Across all customers today</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Platform Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-purple-300">
                  {optimizationData?.portfolioPerformance.successRate}%
                </div>
                <p className="text-xs text-slate-400 mt-1">Optimization success rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-green-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Combined Environmental Impact</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Carbon Saved Today</span>
                  <span className="sm:hidden">Carbon Saved</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-green-300">
                  {optimizationData?.environmentalImpact.dailyCarbonSaved} tonnes
                </div>
                <p className="text-xs text-slate-400 mt-1">All customers combined</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Monthly Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base sm:text-lg font-bold text-green-300">711 tonnes</div>
                <p className="text-xs text-slate-400 mt-1">= 142 cars off the road</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Yearly Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base sm:text-lg font-bold text-green-300">
                  {optimizationData?.environmentalImpact.yearlyProjection.toLocaleString()} tonnes
                </div>
                <p className="text-xs text-slate-400 mt-1">Annual carbon reduction</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Trees Equivalent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold text-green-300">
                  {optimizationData?.environmentalImpact.treesEquivalent}
                </div>
                <p className="text-xs text-slate-400 mt-1">Trees planted equivalent (today)</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="mt-8 sm:mt-12 text-center border-t border-slate-600 pt-6 sm:pt-8">
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
      </div>
    </div>
  )
}
