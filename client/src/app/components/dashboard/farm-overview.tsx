import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Ruler, FlaskRoundIcon as Flask, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

interface FarmOverviewProps {
  className?: string
}

interface CropRecommendationPropd {
    className? : string
}

export function FarmOverview({ className }: FarmOverviewProps) {
  // This would come from your API/database in a real application
  const farmData = {
    farm_size: 439,
    district: "Kandy",
    soil_type: "Regosol Soil",
    soil_ph: 6.47,
    water_source: "Irrigation Schemes",
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Farm Overview</CardTitle>
        <CardDescription>Key details about your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Location</p>
              <p className="text-sm text-muted-foreground">{farmData.district}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Ruler className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Farm Size</p>
              <p className="text-sm text-muted-foreground">{farmData.farm_size} acres</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Flask className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Soil Information</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{farmData.soil_type}</p>
                <Badge variant="outline">pH {farmData.soil_ph}</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Water Source</p>
              <p className="text-sm text-muted-foreground">{farmData.water_source}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


