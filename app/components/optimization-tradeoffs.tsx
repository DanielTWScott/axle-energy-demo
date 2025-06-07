"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, Leaf, PoundSterling, User } from "lucide-react"
import { useState, useEffect } from "react"

interface OptimizationDecision {
  action: "charge" | "discharge" | "hold"
  reason: string
  financialImpact: number
  carbonImpact: number
  tradeoffAnalysis: {
    pureFinancial: { action: string; value: number }
    pureEnvironmental: { action: string; value: number }
    balanced: { action: string; financialScore: number; environmentalScore: number }
  }
}

interface OptimizationTradeoffsProps {
  carbonIntensity: number
  electricityPrice: number
}

export function OptimizationTradeoffs({ carbonIntensity, electricityPrice }: OptimizationTradeoffsProps) {
  const [preference, setPreference] = useState<"savings" | "green" | "balanced">("balanced")
  const [decision, setDecision] = useState<OptimizationDecision | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDecision = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/optimization-engine?carbonIntensity=${carbonIntensity}&electricityPrice=${electricityPrice}&preference=${preference}`,
        )
        const data = await response.json()
        setDecision(data)
      } catch (error) {
        console.error("Error fetching optimization decision:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDecision()
  }, [carbonIntensity, electricityPrice, preference])

  const getActionIcon = (action: string) => {
    switch (action) {
      case "charge":
        return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
      case "discharge":
        return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
      default:
        return <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "charge":
        return "text-green-300"
      case "discharge":
        return "text-orange-300"
      default:
        return "text-slate-300"
    }
  }

  if (isLoading || !decision) {
    return (
      <Card className="bg-slate-800 border-slate-600">
        <CardContent className="p-4 sm:p-6">
          <div className="animate-pulse text-slate-300 text-sm sm:text-base">Loading optimization analysis...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-blue-900/20 border-blue-800">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-100 text-lg sm:text-xl">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          <PoundSterling className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          <span className="hidden sm:inline">Your Optimization Preferences</span>
          <span className="sm:hidden">Your Preferences</span>
        </CardTitle>
        <CardDescription className="text-slate-300 text-sm">
          Customize how we balance your financial savings with environmental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Customer Preference Selector */}
        <div className="mb-4 sm:mb-6">
          <h4 className="font-medium mb-3 text-slate-200 text-sm sm:text-base">Your Optimization Priority:</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant={preference === "savings" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreference("savings")}
              className={
                preference === "savings"
                  ? "bg-yellow-600 text-white text-xs sm:text-sm"
                  : "border-slate-500 text-slate-200 hover:bg-slate-700 text-xs sm:text-sm"
              }
            >
              <PoundSterling className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Max Savings
            </Button>
            <Button
              variant={preference === "balanced" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreference("balanced")}
              className={
                preference === "balanced"
                  ? "bg-blue-600 text-white text-xs sm:text-sm"
                  : "border-slate-500 text-slate-200 hover:bg-slate-700 text-xs sm:text-sm"
              }
            >
              Balanced
            </Button>
            <Button
              variant={preference === "green" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreference("green")}
              className={
                preference === "green"
                  ? "bg-green-600 text-white text-xs sm:text-sm"
                  : "border-slate-500 text-slate-200 hover:bg-slate-700 text-xs sm:text-sm"
              }
            >
              <Leaf className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Max Green
            </Button>
          </div>
        </div>

        {/* Current Decision */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-700 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
            <h4 className="font-medium text-slate-100 text-sm sm:text-base">Your Current Recommendation:</h4>
            <div className="flex items-center gap-2">
              {getActionIcon(decision.action)}
              <span className={`font-semibold capitalize text-sm sm:text-base ${getActionColor(decision.action)}`}>
                {decision.action === "charge"
                  ? "Charge Your Battery"
                  : decision.action === "discharge"
                    ? "Use Your Battery"
                    : "Hold Position"}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mb-3">{decision.reason}</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <div className="text-base sm:text-lg font-semibold text-yellow-300">
                £{decision.financialImpact.toFixed(2)}
              </div>
              <div className="text-xs text-slate-400">Your daily financial impact</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-green-300">
                {decision.carbonImpact.toFixed(1)} kg
              </div>
              <div className="text-xs text-slate-400">CO₂ you save per day</div>
            </div>
          </div>
        </div>

        {/* Trade-off Analysis */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700 h-auto">
            <TabsTrigger value="comparison" className="text-slate-200 text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">Strategy Comparison</span>
              <span className="sm:hidden">Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="text-slate-200 text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">What-If Scenarios</span>
              <span className="sm:hidden">Scenarios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Pure Financial */}
              <div className="p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="font-medium text-xs sm:text-sm text-slate-200">Pure Financial</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {getActionIcon(decision.tradeoffAnalysis.pureFinancial.action)}
                  <span className="capitalize text-xs sm:text-sm text-slate-300">
                    {decision.tradeoffAnalysis.pureFinancial.action}
                  </span>
                </div>
                <div className="text-yellow-300 font-semibold text-sm sm:text-base">
                  £{decision.tradeoffAnalysis.pureFinancial.value.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400">Your daily savings</div>
              </div>

              {/* Pure Environmental */}
              <div className="p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="font-medium text-xs sm:text-sm text-slate-200">Pure Environmental</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {getActionIcon(decision.tradeoffAnalysis.pureEnvironmental.action)}
                  <span className="capitalize text-xs sm:text-sm text-slate-300">
                    {decision.tradeoffAnalysis.pureEnvironmental.action}
                  </span>
                </div>
                <div className="text-green-300 font-semibold text-sm sm:text-base">
                  {decision.tradeoffAnalysis.pureEnvironmental.value.toFixed(1)} kg
                </div>
                <div className="text-xs text-slate-400">CO₂ you save</div>
              </div>

              {/* Your Choice */}
              <div className="p-3 bg-blue-900/30 border border-blue-600 rounded-lg lg:col-span-1 col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-xs sm:text-sm text-slate-200">Your Choice ({preference})</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {getActionIcon(decision.action)}
                  <span className="capitalize text-xs sm:text-sm text-slate-300">{decision.action}</span>
                </div>
                <div className="text-blue-300 font-semibold text-sm sm:text-base">
                  £{decision.financialImpact.toFixed(2)} + {decision.carbonImpact.toFixed(1)}kg
                </div>
                <div className="text-xs text-slate-400">Your combined benefit</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-3">
            <div className="space-y-3">
              <div className="p-3 bg-slate-700 rounded-lg">
                <h5 className="font-medium mb-2 text-slate-200 text-sm">If electricity was £20/MWh (very cheap):</h5>
                <p className="text-xs sm:text-sm text-slate-300">
                  Financial strategy: <span className="text-green-300">Charge aggressively</span> (+£5.20/day)
                  <br />
                  Environmental impact: Depends on carbon intensity
                </p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <h5 className="font-medium mb-2 text-slate-200 text-sm">
                  If carbon intensity was 50 gCO₂/kWh (very clean):
                </h5>
                <p className="text-xs sm:text-sm text-slate-300">
                  Environmental strategy: <span className="text-green-300">Charge immediately</span> (-4.2kg CO₂/day)
                  <br />
                  Financial impact: Depends on electricity price
                </p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <h5 className="font-medium mb-2 text-slate-200 text-sm">
                  Conflict scenario (cheap but dirty electricity):
                </h5>
                <p className="text-xs sm:text-sm text-slate-300">
                  Your <span className="text-blue-300">{preference}</span> preference determines the decision.
                  <br />
                  {preference === "savings" && "Prioritizes cost savings despite higher carbon"}
                  {preference === "green" && "Avoids charging despite financial opportunity"}
                  {preference === "balanced" && "Finds middle ground based on severity of trade-off"}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
