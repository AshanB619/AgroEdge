import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface CropRecommendationProps {
  className?: string
}

export function CropRecommendation({ className }: CropRecommendationProps) {
  // This would come from your API/database in a real application
  const cropData = {
    crop_type: "Cabbage",
    veg_variety: "Green Coronet",
    expected_harvest: 44281.15,
    confidence_score: 92,
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Recommended Crop</CardTitle>
        <CardDescription>Based on your farm conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-10 w-10 text-primary" />
          </div>

          <h3 className="text-2xl font-bold">{cropData.crop_type}</h3>
          <p className="text-muted-foreground">{cropData.veg_variety}</p>

          <div className="mt-4 flex w-full justify-between">
            <div>
              <p className="text-sm font-medium">Expected Yield</p>
              <p className="text-lg font-semibold">{cropData.expected_harvest.toLocaleString()} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium">Confidence</p>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {cropData.confidence_score}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

