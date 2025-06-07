import { NextResponse } from "next/server"

export async function GET() {
  // Use fallback data by default since external APIs may be unreliable in deployment
  const generateRealisticMarketData = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    // Simulate realistic carbon intensity (varies by time of day)
    const baseIntensity = 180
    const timeVariation = Math.sin(((currentHour - 6) / 24) * 2 * Math.PI) * 50
    const currentIntensity = Math.max(100, Math.min(400, baseIntensity + timeVariation + (Math.random() - 0.5) * 40))

    // Simulate solar generation (higher during day, zero at night)
    const solarMultiplier = Math.max(0, Math.sin(((currentHour - 6) / 12) * Math.PI))
    const currentSolar = Math.round(solarMultiplier * 12000 * (0.8 + Math.random() * 0.4))

    // Generate price forecasting based on realistic patterns
    const generatePriceForecast = () => {
      const basePrice = 50 // £/MWh
      const carbonMultiplier = currentIntensity / 200
      const solarMultiplier = Math.max(0.5, 1 - currentSolar / 15000)

      const forecasts = []
      for (let hour = 0; hour < 48; hour++) {
        const futureHour = (currentHour + hour) % 24
        const timeVariation = Math.sin(((futureHour - 6) / 24) * 2 * Math.PI) * 0.3 + 0.7
        const randomVariation = 0.9 + Math.random() * 0.2
        const weekendMultiplier = [0, 6].includes(new Date(Date.now() + hour * 3600000).getDay()) ? 0.85 : 1

        const price =
          basePrice * carbonMultiplier * solarMultiplier * timeVariation * randomVariation * weekendMultiplier
        const confidence = Math.max(60, 95 - hour * 1.5)

        forecasts.push({
          hour: hour,
          timestamp: new Date(Date.now() + hour * 3600000).toISOString(),
          price: Math.round(price * 100) / 100,
          confidence: Math.round(confidence),
          carbonIntensity: Math.round(currentIntensity * (0.8 + Math.random() * 0.4)),
          solarGeneration: Math.max(0, currentSolar * (0.5 + Math.random() * 1.0)),
        })
      }
      return forecasts
    }

    return {
      currentConditions: {
        carbonIntensity: Math.round(currentIntensity),
        solarGeneration: currentSolar,
        timestamp: currentTime.toISOString(),
      },
      priceForecast: generatePriceForecast(),
      optimizationRecommendations: {
        batteryCharging: currentIntensity < 150 ? "Recommended" : currentIntensity > 300 ? "Avoid" : "Optional",
        solarExport: currentSolar > 5000 ? "High value" : currentSolar > 2000 ? "Medium value" : "Low value",
        demandShifting: currentIntensity > 300 ? "Critical" : currentIntensity > 250 ? "Recommended" : "Optional",
      },
      marketInsights: {
        peakPriceWindow: "17:00-19:00 today",
        lowPriceWindow: "02:00-05:00 tomorrow",
        renewablesForecast:
          currentSolar > 8000 ? "High solar generation expected 10:00-16:00" : "Moderate solar generation expected",
        gridStress: currentIntensity > 350 ? "High" : currentIntensity > 250 ? "Medium" : "Low",
      },
      dataSource: "Simulated based on realistic UK energy patterns",
    }
  }

  try {
    // Try to fetch real data, but with very short timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    // Use our dedicated carbon intensity API
    const carbonPromise = fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000"}/api/carbon-intensity`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      },
    ).catch(() => null)

    const solarPromise = fetch("https://www.solar.sheffield.ac.uk/pvlive/api/v4/gsp/0", {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 300 },
    }).catch(() => null)

    const [carbonDataResponse, solarResponse] = await Promise.all([carbonPromise, solarPromise])
    clearTimeout(timeoutId)

    let realCarbonIntensity = null
    let realSolarGeneration = null

    // Try to parse carbon data
    if (carbonDataResponse && carbonDataResponse.ok) {
      try {
        const carbonData = await carbonDataResponse.json()
        realCarbonIntensity = carbonData.data?.[0]?.intensity?.actual
      } catch (e) {
        console.log("Failed to parse carbon data")
      }
    }

    // Try to parse solar data
    if (solarResponse && solarResponse.ok) {
      try {
        const solarData = await solarResponse.json()
        realSolarGeneration = solarData.data?.[0]?.[1]
      } catch (e) {
        console.log("Failed to parse solar data")
      }
    }

    // Generate market data with real data if available, otherwise use simulation
    const marketData = generateRealisticMarketData()

    // Override with real data if we got it
    if (realCarbonIntensity) {
      marketData.currentConditions.carbonIntensity = realCarbonIntensity
      marketData.dataSource = "Real UK Carbon Intensity API + Simulated forecasting"
    }

    if (realSolarGeneration) {
      marketData.currentConditions.solarGeneration = realSolarGeneration
      marketData.dataSource = "Real UK Solar + Carbon APIs + Simulated forecasting"
    }

    return NextResponse.json(marketData)
  } catch (error) {
    console.log("Using fallback market data due to API issues")

    // Return realistic simulated data
    return NextResponse.json(generateRealisticMarketData())
  }
}
