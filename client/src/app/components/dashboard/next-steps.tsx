import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileText, Tractor, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface NextStepsProps {
  className?: string
}

export function NextSteps({ className }: NextStepsProps) {
  const nextSteps = [
    {
      icon: Calendar,
      title: "Create a Crop Calendar",
      description: "Plan your planting, maintenance, and harvesting schedule",
      action: "Create Calendar",
      href: "#",
    },
    {
      icon: Tractor,
      title: "Start a Growing Session",
      description: "Begin tracking your crop's progress and inputs",
      action: "Start Session",
      href: "/activities",
    },
    {
      icon: Users,
      title: "Connect with Mentors",
      description: "Get guidance from experienced farmers in your area",
      action: "Find Mentors",
      href: "#",
    },
    {
      icon: FileText,
      title: "Download Resources",
      description: "Access guides and best practices for your crop",
      action: "View Resources",
      href: "#",
    },
  ]

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Next Steps</CardTitle>
        <CardDescription>Recommended actions to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((step, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className="p-4">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-base font-medium">{step.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{step.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={step.href}>
                    {step.action}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

