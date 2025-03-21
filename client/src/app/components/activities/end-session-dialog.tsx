
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface EndSessionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    sessionId : string
}

export function EndSessionDialog({ open, onOpenChange, sessionId }: EndSessionDialogProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        actual_hrvest: "",
        
      })

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        try {
          // In a real app, this would be an API call to end the session
          await new Promise((resolve) => setTimeout(resolve, 1500))
    
          // Redirect to the activities page
          router.push("/activities")
          onOpenChange(false)
        } catch (error) {
          console.error("Error ending session:", error)
        } finally {
          setIsSubmitting(false)
        }
      }

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>End Crop Session</DialogTitle>
              <DialogDescription>Enter the harvest details to complete this crop session.</DialogDescription>
            </DialogHeader>
    
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md text-amber-800 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-sm">
                This action will mark the session as completed. You won't be able to add more daily inputs after ending the
                session.
              </p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className ="space-y-2">
                    <Label htmlFor="actual_harvest">Actual Harvest(acres)</Label>
                    <Input id="actual_harvest" name="actual_harvest" value={formData.actual_hrvest} onChange={handleChange} required/>
                </div>
              </div>
    
    
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-300 hover:text-green-900">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ending Session...
                    </>
                  ) : (
                    "End Session"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )
    
}