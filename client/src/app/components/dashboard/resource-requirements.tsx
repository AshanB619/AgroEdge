import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SproutIcon as Seedling, Droplet, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResourceRequirementsProps {
  className?: string
}

export function ResourceRequirements({ className }: ResourceRequirementsProps) {
  // This would come from your API/database in a real application
  const resourceData = {
    seed: {
      source: "Department of Agriculture (DOA)",
      quantity: 329.25,
      cost: 1537.19,
    },
    water: {
      source: "Irrigation Schemes",
      method: "Drip Irrigation",
      usage: 52825.06,
      cost: 4032.37,
    },
    labor: {
      hours: 560,
      wages: 63560,
    },
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Resource Requirements</CardTitle>
        <CardDescription>Estimated resources needed for your crop</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seed">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seed">Seeds</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
          </TabsList>

          <TabsContent value="seed" className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Seedling className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Recommended Source</p>
                <p className="text-sm text-muted-foreground">{resourceData.seed.source}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Quantity Needed</p>
                <p className="text-lg font-semibold">{resourceData.seed.quantity} kg</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Estimated Cost</p>
                <p className="text-lg font-semibold">Rs. {resourceData.seed.cost.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="water" className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Droplet className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Water Source & Method</p>
                <p className="text-sm text-muted-foreground">
                  {resourceData.water.source} • {resourceData.water.method}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Estimated Usage</p>
                <p className="text-lg font-semibold">{resourceData.water.usage.toLocaleString()} liters</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Irrigation Cost</p>
                <p className="text-lg font-semibold">Rs. {resourceData.water.cost.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="labor" className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Labor Requirements</p>
                <p className="text-sm text-muted-foreground">Estimated for full growing season</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Labor Hours</p>
                <p className="text-lg font-semibold">{resourceData.labor.hours} hours</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Estimated Wages</p>
                <p className="text-lg font-semibold">Rs. {resourceData.labor.wages.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

