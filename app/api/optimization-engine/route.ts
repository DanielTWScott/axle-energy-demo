import { NextResponse } from "next/server"

interface OptimizationDecision {
  action: "charge" | "discharge" | "hold"
  reason: string
  financialImpact: number // £ per day
  carbonImpact: number // kg CO2 saved per day
  tradeoffAnalysis: {
    pureFinancial: { action: string; value: number }
    pureEnvironmental: { action: string; value: number }
    balanced: { action: string; financialScore: number; environmentalScore: number }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const carbonIntensity = Number.parseInt(searchParams.get("carbonIntensity") || "200")
  const electricityPrice = Number.parseFloat(searchParams.get("electricityPrice") || "45.0") // £/MWh
  const customerPreference = searchParams.get("preference") || "balanced" // "savings", "green", "balanced"

  try {
    // Simulate optimization decision logic
    const optimizationDecision = calculateOptimizationDecision(carbonIntensity, electricityPrice, customerPreference)

    return NextResponse.json(optimizationDecision)
  } catch (error) {
    console.error("Error calculating optimization decision:", error)
    return NextResponse.json({ error: "Failed to calculate optimization" }, { status: 500 })
  }
}

function calculateOptimizationDecision(
  carbonIntensity: number,
  electricityPrice: number,
  preference: string,
): OptimizationDecision {
  // More realistic thresholds and calculations
  const avgElectricityPrice = 50 // £/MWh baseline
  const avgCarbonIntensity = 200 // gCO2/kWh baseline

  // Calculate financial opportunity (how much above/below average price)
  const priceDeviation = electricityPrice - avgElectricityPrice
  const financialOpportunity = Math.abs(priceDeviation) * 0.08 // £ per day per £/MWh difference

  // Calculate environmental opportunity
  const carbonDeviation = carbonIntensity - avgCarbonIntensity
  const environmentalOpportunity = Math.abs(carbonDeviation) * 0.015 // kg CO2 per day per gCO2/kWh difference

  // Calculate pure financial decision
  const pureFinancial = {
    action:
      electricityPrice < avgElectricityPrice ? "charge" : electricityPrice > avgElectricityPrice ? "discharge" : "hold",
    value: Math.max(0.5, financialOpportunity), // Minimum £0.50/day to show some value
  }

  // Calculate pure environmental decision
  const pureEnvironmental = {
    action:
      carbonIntensity < avgCarbonIntensity ? "charge" : carbonIntensity > avgCarbonIntensity ? "discharge" : "hold",
    value: Math.max(0.3, environmentalOpportunity), // Minimum 0.3kg CO2/day
  }

  // Calculate balanced decision based on customer preference
  let decision: OptimizationDecision

  if (preference === "savings") {
    // 80% weight on financial, 20% on environmental
    decision = {
      action: pureFinancial.action as "charge" | "discharge" | "hold",
      reason: `Optimizing primarily for cost savings. ${
        pureFinancial.action === "charge"
          ? `Electricity is £${Math.abs(priceDeviation).toFixed(1)} below average - good time to charge`
          : pureFinancial.action === "discharge"
            ? `Electricity is £${Math.abs(priceDeviation).toFixed(1)} above average - profitable to discharge`
            : "Electricity prices are near average, maintaining position"
      }`,
      financialImpact: pureFinancial.value * 0.8,
      carbonImpact: pureEnvironmental.value * 0.2,
      tradeoffAnalysis: {
        pureFinancial,
        pureEnvironmental,
        balanced: {
          action: pureFinancial.action,
          financialScore: pureFinancial.value,
          environmentalScore: pureEnvironmental.value * 0.2,
        },
      },
    }
  } else if (preference === "green") {
    // 20% weight on financial, 80% on environmental
    decision = {
      action: pureEnvironmental.action as "charge" | "discharge" | "hold",
      reason: `Optimizing primarily for carbon reduction. ${
        pureEnvironmental.action === "charge"
          ? `Grid carbon is ${Math.abs(carbonDeviation).toFixed(0)} gCO₂/kWh below average - clean energy available`
          : pureEnvironmental.action === "discharge"
            ? `Grid carbon is ${Math.abs(carbonDeviation).toFixed(0)} gCO₂/kWh above average - use stored clean energy`
            : "Grid carbon intensity is near average, maintaining state"
      }`,
      financialImpact: pureFinancial.value * 0.2,
      carbonImpact: pureEnvironmental.value * 0.8,
      tradeoffAnalysis: {
        pureFinancial,
        pureEnvironmental,
        balanced: {
          action: pureEnvironmental.action,
          financialScore: pureFinancial.value * 0.2,
          environmentalScore: pureEnvironmental.value,
        },
      },
    }
  } else {
    // Balanced approach - 60/40 weighting based on which signal is stronger
    const financialSignalStrength = Math.abs(priceDeviation) / 20 // Normalize to 0-1
    const environmentalSignalStrength = Math.abs(carbonDeviation) / 100 // Normalize to 0-1

    let balancedAction: "charge" | "discharge" | "hold"
    let reason: string
    let financialWeight = 0.5
    let environmentalWeight = 0.5

    if (financialSignalStrength > environmentalSignalStrength * 1.5) {
      // Strong financial signal
      balancedAction = pureFinancial.action as "charge" | "discharge" | "hold"
      reason = `Strong price signal (£${Math.abs(priceDeviation).toFixed(1)} from average) drives decision. Carbon impact: ${carbonIntensity > avgCarbonIntensity ? "slightly higher" : "slightly lower"} than average.`
      financialWeight = 0.7
      environmentalWeight = 0.3
    } else if (environmentalSignalStrength > financialSignalStrength * 1.5) {
      // Strong environmental signal
      balancedAction = pureEnvironmental.action as "charge" | "discharge" | "hold"
      reason = `Strong carbon signal (${Math.abs(carbonDeviation).toFixed(0)} gCO₂/kWh from average) drives decision. Price impact: ${electricityPrice > avgElectricityPrice ? "slightly higher cost" : "modest savings"}.`
      financialWeight = 0.3
      environmentalWeight = 0.7
    } else {
      // Both signals present or both weak
      if (pureFinancial.action === pureEnvironmental.action) {
        balancedAction = pureFinancial.action as "charge" | "discharge" | "hold"
        reason = `Both price and carbon signals align - ${balancedAction === "charge" ? "favorable conditions for charging" : balancedAction === "discharge" ? "good time to use stored energy" : "moderate conditions, maintaining position"}.`
      } else {
        balancedAction = "hold"
        reason = `Mixed signals: price favors ${pureFinancial.action}, carbon favors ${pureEnvironmental.action}. Maintaining current position.`
      }
    }

    decision = {
      action: balancedAction,
      reason,
      financialImpact: pureFinancial.value * financialWeight,
      carbonImpact: pureEnvironmental.value * environmentalWeight,
      tradeoffAnalysis: {
        pureFinancial,
        pureEnvironmental,
        balanced: {
          action: balancedAction,
          financialScore: financialSignalStrength,
          environmentalScore: environmentalSignalStrength,
        },
      },
    }
  }

  return decision
}
