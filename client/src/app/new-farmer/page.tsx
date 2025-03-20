import { CropRecommendation } from "@/app/components/dashboard/crop-recommendation"
import { DashboardHeader } from "@/app/components/dashboard/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell"
import { ExpectedOutcomes } from "@/app/components/dashboard/expected-outcomes"
import { FarmOverview } from "@/app/components/dashboard/farm-overview"
import { NextSteps } from "@/app/components/dashboard/next-steps"
import { ResourceRequirements } from "@/app/components/dashboard/resource-requirements"
import { SimilarFarmsComparison } from "@/app/components/dashboard/similar-farms-comparison"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "New Farmer Dashboard | AgroEdge",
  description: "Dashboard with personalized crop recommendations for new farmers",
}

export default function NewFarmerDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Welcome to Your Personalized Dashboard"
        text="Based on your farm details, we've prepared recommendations to help you get started."
        className ="p-5 text-center"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-5 ">
        <FarmOverview className="md:col-span-2 lg:col-span-2" />
        <CropRecommendation className="md:col-span-2 lg:col-span-1" />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 p-5">
        <ResourceRequirements />
        <ExpectedOutcomes />
      </div>

      <div className="mt-6 grid gap-6 p-5">
        <SimilarFarmsComparison />
        <NextSteps />
      </div>
    </DashboardShell>
  )
}

