"use client";

import { GlowingEffect } from "../components/ui/glowing-effect";
import { ForecastCard } from "../cards/forecast-card";

export default function VegetablePriceForecasting() {
  // Sample data - would normally come from an API
  const forecastData = {
    "district": "Colombo",
    "vegetable": "Carrot",
    "forecast": [
      {
        "date": "2025-02-06",
        "predicted_price": 175.31
      },
      {
        "date": "2025-02-13",
        "predicted_price": 220.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 302.50
      },
      {
        "date": "2025-02-13",
        "predicted_price": 256.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 226.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 276.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 245.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 293.02
      },
      {
        "date": "2025-02-13",
        "predicted_price": 276.02
      },
    ]
  };

  return (
    <div id="forecast" className="flex items-center justify-center w-full px-4 py-10 bg-white">
      <div className="relative w-full max-w-4xl p-6 bg-white border shadow-lg rounded-2xl">
        <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Vegetable Price Forecast By <span className="text-green-400"> AgroEdge...</span>
          </h1>
          <p className="text-center text-gray-600">
            Weekly price prediction for vegetables in Sri Lanka
          </p>
          <ForecastCard data={forecastData} />
        </div>
      </div>
    </div>
  );
}