"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Zap, TrendingUp, Shield } from "lucide-react"
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
              Current Market Conditions
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm">
              Real-time carbon intensity and electricity pricing
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
                  {currentIntensity < 200 && currentElectricityPrice < 40
                    ? "Charge Now"
                    : currentIntensity > 350 || currentElectricityPrice > 70
                      ? "Use Battery"
                      : "Evaluate"}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">Quick Recommendation</div>
                <div className="text-xs text-slate-400">See detailed analysis below</div>
              </div>

              <div className="text-center col-span-2 lg:col-span-1">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-2">
                  {optimizationData?.environmentalImpact.treesEquivalent}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">Trees Planted Equivalent</div>
                <div className="text-xs text-slate-400">Carbon saved today across all customers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Trade-offs Analysis */}
        <div className="mb-6 sm:mb-8">
          <OptimizationTradeoffs carbonIntensity={currentIntensity} electricityPrice={currentElectricityPrice} />
        </div>

        <Tabs defaultValue="environmental-impact" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-600 h-auto">
            <TabsTrigger
              value="environmental-impact"
              className="data-[state=active]:bg-green-600 text-slate-200 text-xs sm:text-sm py-2 px-1 sm:px-3"
            >
              <span className="hidden sm:inline">Environmental Impact</span>
              <span className="sm:hidden">Environment</span>
            </TabsTrigger>
            <TabsTrigger
              value="customer-benefits"
              className="data-[state=active]:bg-green-600 text-slate-200 text-xs sm:text-sm py-2 px-1 sm:px-3"
            >
              <span className="hidden sm:inline">Your Benefits</span>
              <span className="sm:hidden">Benefits</span>
            </TabsTrigger>
            <TabsTrigger
              value="portfolio-performance"
              className="data-[state=active]:bg-green-600 text-slate-200 text-xs sm:text-sm py-2 px-1 sm:px-3"
            >
              <span className="hidden sm:inline">Platform Performance</span>
              <span className="sm:hidden">Performance</span>
            </TabsTrigger>
          </TabsList>

          {/* Environmental Impact Tab */}
          <TabsContent value="environmental-impact" className="space-y-4 sm:space-y-6">
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
                  <p className="text-xs text-slate-400 mt-1">CO₂ emissions prevented</p>
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

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  Carbon-Aware Optimization in Action
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm">
                  How Axle automatically reduces your carbon footprint while maximizing savings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-700 rounded-lg gap-2 sm:gap-0">
                    <div>
                      <h4 className="font-medium text-slate-100 text-sm sm:text-base">Smart Charging Schedule</h4>
                      <p className="text-xs sm:text-sm text-slate-300">
                        Automatically charges your battery when grid carbon intensity is lowest
                      </p>
                    </div>
                    <Badge className="bg-green-500/30 text-green-300 border-0 self-start sm:self-center">Active</Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-700 rounded-lg gap-2 sm:gap-0">
                    <div>
                      <h4 className="font-medium text-slate-100 text-sm sm:text-base">Peak Avoidance</h4>
                      <p className="text-xs sm:text-sm text-slate-300">
                        Uses stored clean energy during high-carbon periods
                      </p>
                    </div>
                    <Badge className="bg-green-500/30 text-green-300 border-0 self-start sm:self-center">Active</Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-700 rounded-lg gap-2 sm:gap-0">
                    <div>
                      <h4 className="font-medium text-slate-100 text-sm sm:text-base">Solar Optimization</h4>
                      <p className="text-xs sm:text-sm text-slate-300">
                        Maximizes use of your own clean solar generation
                      </p>
                    </div>
                    <Badge className="bg-green-500/30 text-green-300 border-0 self-start sm:self-center">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Benefits Tab */}
          <TabsContent value="customer-benefits" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Monthly Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-yellow-300">
                    £{optimizationData?.customerBenefits.avgMonthlySavings}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Average per customer</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Carbon Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-green-300">
                    {optimizationData?.customerBenefits.avgCarbonReduction} tonnes
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Per year per customer</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">
                    <span className="hidden sm:inline">Green Energy Usage</span>
                    <span className="sm:hidden">Green Energy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-green-300">
                    {optimizationData?.customerBenefits.greenEnergyUsage}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Clean energy consumption</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Grid Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-blue-300">
                    {optimizationData?.customerBenefits.gridStressReduction}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Peak demand reduction</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  Why Choose Axle's Carbon-Smart Optimization?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">Real-Time Carbon Data</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          Uses live UK grid carbon intensity to make the greenest decisions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">Dual Optimization</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          Maximizes both financial savings AND environmental benefits
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">Proven Results</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          94.2% success rate across 15,000+ optimized batteries
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">Automatic Operation</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          No manual intervention required - works 24/7 in the background
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">Future-Proof</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          Adapts to changing grid conditions and energy markets
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-slate-100 text-sm sm:text-base">ESG Reporting</h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          Detailed carbon impact reports for sustainability goals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Performance Tab */}
          <TabsContent value="portfolio-performance" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">
                    <span className="hidden sm:inline">Assets Optimized</span>
                    <span className="sm:hidden">Assets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-blue-300">
                    {optimizationData?.portfolioPerformance.assetsOptimized.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    <span className="hidden sm:inline">Home batteries under management</span>
                    <span className="sm:hidden">Batteries managed</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Total Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-green-300">
                    {optimizationData?.portfolioPerformance.totalCapacity} MW
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    <span className="hidden sm:inline">Aggregated storage capacity</span>
                    <span className="sm:hidden">Storage capacity</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Daily Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-yellow-300">
                    £{optimizationData?.portfolioPerformance.dailyRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    <span className="hidden sm:inline">Generated for customers today</span>
                    <span className="sm:hidden">Generated today</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-300">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-purple-300">
                    {optimizationData?.portfolioPerformance.successRate}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Optimization accuracy</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center border-t border-slate-600 pt-6 sm:pt-8">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-slate-100">Join the Green Energy Revolution</h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Axle's carbon-aware optimization helps you save money while reducing your environmental impact. Every
              optimized battery contributes to a cleaner, more sustainable energy system.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Button variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-700 w-full sm:w-auto">
              Learn More
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">Get Started Today</Button>
          </div>

          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-400">
            Real-time carbon data from UK National Grid ESO
          </div>
        </div>
      </div>
    </div>
  )
}
