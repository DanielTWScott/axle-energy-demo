import { NextResponse } from "next/server"

// Fallback data structure that matches the Carbon Intensity API response
const FALLBACK_DATA = {
  data: [
    {
      from: new Date().toISOString(),
      to: new Date(Date.now() + 1800000).toISOString(), // 30 minutes later
      intensity: {
        forecast: 200,
        actual: 210,
        index: "moderate",
      },
    },
  ],
}

export async function GET() {
  try {
    // Set up timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Fetch data from the Carbon Intensity API
    const response = await fetch("https://api.carbonintensity.org.uk/intensity", {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    // Clear the timeout since the request completed
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`Carbon Intensity API responded with status: ${response.status}`)
      // Return fallback data with a 200 status to prevent client errors
      return NextResponse.json(FALLBACK_DATA, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "X-Data-Source": "fallback",
        },
      })
    }

    const data = await response.json()

    // Validate the response structure
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn("Carbon Intensity API returned unexpected data structure:", data)
      return NextResponse.json(FALLBACK_DATA, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "X-Data-Source": "fallback",
        },
      })
    }

    // Add metadata to help with debugging and monitoring
    const enhancedData = {
      ...data,
      _metadata: {
        timestamp: new Date().toISOString(),
        source: "UK Carbon Intensity API",
        refreshAfter: new Date(Date.now() + 60000).toISOString(), // 60 seconds from now
      },
    }

    // Return the data with appropriate CORS headers
    return NextResponse.json(enhancedData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "X-Data-Source": "live",
        "Cache-Control": "max-age=60", // Browser caching hint
      },
    })
  } catch (error) {
    console.error("Error fetching carbon intensity data:", error)

    // Determine if it was a timeout
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const isTimeout = errorMessage.includes("abort") || errorMessage.includes("timeout")

    return NextResponse.json(
      {
        ...FALLBACK_DATA,
        error: isTimeout ? "Request timed out" : "Failed to fetch carbon intensity data",
        _metadata: {
          timestamp: new Date().toISOString(),
          source: "fallback",
          errorType: isTimeout ? "timeout" : "api_error",
        },
      },
      {
        status: 200, // Return 200 with fallback data instead of 500
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "X-Data-Source": "fallback",
        },
      },
    )
  }
}
