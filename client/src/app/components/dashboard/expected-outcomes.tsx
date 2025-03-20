"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface ExpectedOutcomesProps {
  className?: string
}

export function ExpectedOutcomes({ className }: ExpectedOutcomesProps) {
  // This would come from your API/database in a real application
  const harvestData = {
    expected_harvest: 44281.15,
    actual_harvest: 52881.65,
    difference_percentage: 19.4,
    monthly_data: [
      { month: "Month 1", expected: 0, actual: 0 },
      { month: "Month 2", expected: 0, actual: 0 },
      { month: "Month 3", expected: 11070, actual: 13220 },
      { month: "Month 4", expected: 33211, actual: 39661 },
      { month: "Month 5", expected: 44281, actual: 52882 },
    ],
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Expected Outcomes</CardTitle>
        <CardDescription>Projected vs. actual harvest from similar farms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <p className="text-sm font-medium">Expected Harvest</p>
            <p className="text-lg font-semibold">{harvestData.expected_harvest.toLocaleString()} kg</p>
          </div>
          <div className="rounded-lg border p-3 bg-green-50">
            <p className="text-sm font-medium">Actual Harvest (avg.)</p>
            <p className="text-lg font-semibold text-green-700">
              {harvestData.actual_harvest.toLocaleString()} kg
              <span className="ml-1 text-xs">(+{harvestData.difference_percentage}%)</span>
            </p>
          </div>
        </div>

        <div className="h-[200px]">
          <ChartContainer
            config={{
              expected: {
                label: "Expected Harvest",
                color: "hsl(var(--chart-1))",
              },
              actual: {
                label: "Actual Harvest",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={harvestData.monthly_data}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="expected" stroke="var(--color-expected)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

