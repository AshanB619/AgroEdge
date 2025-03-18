'use client';

import React from 'react';
// import { FaRegIdCard } from "react-icons/fa";

// Sample data to show how it would look
const sampleReport = {
  farmerName: "John Doe",
  farmerId: "F-12345",
  finalScore: 78.5,
  criteria: [
    { criterion: "Yield per perch", score: 85, weight: 20, weightContribution: 17 },
    { criterion: "Cost per kg", score: 70, weight: 15, weightContribution: 10.5 },
    
    { criterion: "Fertilizer Efficiency", score: 90, weight: 10, weightContribution: 9 },
    { criterion: "Pesticide Efficiency", score: 65, weight: 10, weightContribution: 6.5 },
    { criterion: "Water Efficiency", score: 80, weight: 10, weightContribution: 8 },
    { criterion: "Labor Efficiency", score: 60, weight: 10, weightContribution: 6 },
    { criterion: "Seed Efficiency", score: 95, weight: 10, weightContribution: 9.5 }
  ],
  recommendations: [
    "Implement drip irrigation to improve water efficiency by 15%",
    "Switch to organic pesticides to improve environmental sustainability",
    "Reduce labor costs by implementing smart scheduling",
    "Consider using high-yield seed varieties for next season",
    "Switch to organic pesticides to improve environmental sustainability",
  ]
};

export default function FarmerReportDemo() {
  return (
    <div className="w-full p-6 bg-white">
      <div className="relative h-full p-2 border rounded-2xl md:rounded-3xl md:p-3">
        {/* Mock GlowingEffect for preview purposes */}
        <div className="absolute inset-0 border-2 border-green-300 opacity-50 rounded-2xl" />
        
        <div className="relative flex flex-col p-4 overflow-hidden border shadow-lg rounded-xl sm:p-6 md:p-8 lg:p-10">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="font-sans text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
              Farmer Performance Report
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
              <div className="p-4 border border-green-300 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">Farmer Name</h3>
                <p className="text-xl font-semibold">{sampleReport.farmerName}</p>
              </div>
              <div className="p-4 border border-green-300 rounded-lg bg-gray-50 ">
              {/* //<FaRegIdCard /> */}

                <h3 className="text-lg font-medium">Farmer ID</h3>
                <p className="text-xl font-semibold">{sampleReport.farmerId}</p>
              </div>
              <div className="p-4 border border-green-300 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">Final Score</h3>
                <p className="text-xl font-semibold">{sampleReport.finalScore}/100</p>
              </div>
            </div>
          </div>

          {/* Criteria Table */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-black">Performance Criteria</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-green-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="p-3 text-left border">Criterion</th>
                    <th className="p-3 text-center border">Score (0-100)</th>
                    <th className="p-3 text-center border">Weight (%)</th>
                    <th className="p-3 text-center border">Weight Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReport.criteria.map((criterion, index) => (
                    <tr key={index} className="border hover:bg-gray-50 dark:hover:bg-green-300">
                      <td className="p-3 border">{criterion.criterion}</td>
                      <td className="p-3 text-center border">{criterion.score}</td>
                      <td className="p-3 text-center border">{criterion.weight}%</td>
                      <td className="p-3 text-center border">{criterion.weightContribution.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Recommendations</h2>
            <ul className="pl-5 space-y-2 list-disc">
              {sampleReport.recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-500 ">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}