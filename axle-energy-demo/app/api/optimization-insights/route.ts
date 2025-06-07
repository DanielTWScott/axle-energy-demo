import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate insights from Axle's real DER optimization experience
    const optimizationInsights = {
      portfolioPerformance: {
        assetsOptimized: 15247,
        totalCapacity: 187.3, // MW
        dailyRevenue: 47382, // £
        optimizationEvents: 156789,
        successRate: 94.2, // %
      },
      realTimeOptimization: {
        currentlyCharging: 8934,
        currentlyDischarging: 3421,
        standbyAssets: 2892,
        gridServicesActive: 12156,
      },
      marketParticipation: {
        energyArbitrage: { active: 15247, revenue: 28450 },
        frequencyResponse: { active: 12156, revenue: 12890 },
        capacityMarket: { active: 8934, revenue: 4567 },
        demandFlexibility: { active: 6789, revenue: 1475 },
      },
      predictiveAccuracy: {
        priceForecasting: 87.3, // % accuracy
        demandPrediction: 91.7,
        renewableForecasting: 84.9,
        optimizationSuccess: 94.2,
      },
      customerSegments: [
        {
          segment: "Premium Residential",
          count: 5847,
          avgRevenue: 156.7, // £/month
          satisfaction: 96.2,
          assets: ["Tesla Powerwall", "Solar", "EV"],
        },
        {
          segment: "Standard Residential",
          count: 7834,
          avgRevenue: 89.3,
          satisfaction: 92.1,
          assets: ["Battery Storage", "Solar"],
        },
        {
          segment: "Community Energy",
          count: 1566,
          avgRevenue: 234.8,
          satisfaction: 94.7,
          assets: ["Shared Storage", "Community Solar"],
        },
      ],
      regionalPerformance: [
        { region: "Greater London", assets: 4567, avgRevenue: 167.8, performance: 96.1 },
        { region: "South East", assets: 3421, avgRevenue: 145.2, performance: 93.7 },
        { region: "Scotland", assets: 2890, avgRevenue: 134.6, performance: 91.2 },
        { region: "North West", assets: 2156, avgRevenue: 128.9, performance: 89.8 },
        { region: "South West", assets: 2213, avgRevenue: 152.3, performance: 94.5 },
      ],
    }

    return NextResponse.json(optimizationInsights)
  } catch (error) {
    console.error("Error generating optimization insights:", error)
    return NextResponse.json({ error: "Failed to fetch optimization insights" }, { status: 500 })
  }
}
