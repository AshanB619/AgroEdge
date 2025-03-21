"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaRegIdCard } from "react-icons/fa6";
import { LuCircleUserRound } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import { HiDownload, HiOutlineCurrencyDollar } from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Sample data to show how it would look
const sampleReport = {
  farmerName: "John Doe",
  farmerId: "F-12345",
  finalScore: 78.5,
  criteria: [
    {
      criterion: "Yield per perch",
      score: 85,
      weight: 20,
      weightContribution: 17,
    },
    {
      criterion: "Cost per kg",
      score: 70,
      weight: 15,
      weightContribution: 10.5,
    },
    {
      criterion: "Fertilizer Efficiency",
      score: 90,
      weight: 10,
      weightContribution: 9,
    },
    {
      criterion: "Pesticide Efficiency",
      score: 65,
      weight: 10,
      weightContribution: 6.5,
    },
    {
      criterion: "Water Efficiency",
      score: 80,
      weight: 10,
      weightContribution: 8,
    },
    {
      criterion: "Labor Efficiency",
      score: 60,
      weight: 10,
      weightContribution: 6,
    },
    {
      criterion: "Seed Efficiency",
      score: 95,
      weight: 10,
      weightContribution: 9.5,
    },
  ],
  recommendations: [
    "Implement drip irrigation to improve water efficiency by 15%",
    "Switch to organic pesticides to improve environmental sustainability",
    "Reduce labor costs by implementing smart scheduling",
    "Consider using high-yield seed varieties for next season",
    "Switch to organic pesticides to improve environmental sustainability",
    "Consider using high-yield seed varieties for next season",
    "Reduce labor costs by implementing smart scheduling",
    "Consider using high-yield seed varieties for next season",
    "Switch to organic pesticides to improve environmental sustainability",
    "Consider using high-yield seed varieties for next season",
  ],
};

export default function FarmerReportDemo() {
  // Function to handle downloading the report as PDF

  const handleDownloadReport = () => {
    console.log("Downloading report...");
    const reportElement = document.querySelector(
      ".relative.flex.flex-col.p-4"
    ) as HTMLElement;

    if (!reportElement) {
      console.error("Report element not found");
      return;
    }

    html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      height: reportElement.scrollHeight,
      windowHeight: reportElement.scrollHeight,
    })
      .then((canvas) => {
        // Create a new jsPDF instance
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate dimensions
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Get the image data from canvas
        const imgData = canvas.toDataURL("image/png");

        // Add image to PDF
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if the content overflows a single page
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Create a filename with farmer name and ID
        const filename = `${sampleReport.farmerName}_${sampleReport.farmerId}_Report.pdf`;

        // Save the PDF
        pdf.save(filename);

        console.log("Report downloaded successfully");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  //Function to handle route to prices page
  const router = useRouter();
  const handlePrices = () => {
    router.push("/price");
    console.log("Redirecting to prices page...");
  };
  // Function to handle returning to home
  const handleReturnHome = () => {
    router.push("/");
    console.log("Returning to home...");
  };

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
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3 ">
              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <LuCircleUserRound className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white " />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Farmer Name</h3>
                  <p className="text-xl font-semibold">
                    {sampleReport.farmerName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <FaRegIdCard className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Farmer ID</h3>
                  <p className="text-xl font-semibold">
                    {sampleReport.farmerId}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <TbReportAnalytics className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Final Score</h3>
                  <p className="text-xl font-semibold">
                    {sampleReport.finalScore}/100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Criteria Table */}
          <div className="mb-8">
            <h2 className="mt-8 mb-6 text-xl font-semibold text-black">
              Performance Criteria
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-green-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="p-3 text-left border">Criterion</th>
                    <th className="p-3 text-center border">Score (0-100)</th>
                    <th className="p-3 text-center border">Weight (%)</th>
                    <th className="p-3 text-center border">
                      Weight Contribution
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReport.criteria.map((criterion, index) => (
                    <tr
                      key={index}
                      className="border hover:bg-gray-50 dark:hover:bg-green-300"
                    >
                      <td className="p-3 border">{criterion.criterion}</td>
                      <td className="p-3 text-center border">
                        {criterion.score}
                      </td>
                      <td className="p-3 text-center border">
                        {criterion.weight}%
                      </td>
                      <td className="p-3 text-center border">
                        {criterion.weightContribution.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations Section */}
          <div>
            <h2 className="mt-8 mb-6 text-xl font-semibold">
              Recommendations from Team{" "}
              <span className="text-green-400">AgroEdge...</span>
            </h2>
            <ul className="pl-5 space-y-2 list-disc">
              {sampleReport.recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-500 ">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
          {/* Button container with absolute positioning */}

          <div className="absolute bottom-0 right-0 flex pb-4 pr-4 space-x-4">
            <button
              onClick={handleDownloadReport}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-green-400 rounded-md hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <HiDownload className="w-5 h-5 mr-2" />
              Download Report
            </button>

            <button
              onClick={handlePrices}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-indigo-300 rounded-md hover:bg-indigo-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <HiOutlineCurrencyDollar className="w-5 h-5 mr-2" />
              See vegetable prices
            </button>
            <button
              onClick={handleReturnHome}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <HiHome className="w-5 h-5 mr-2" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
