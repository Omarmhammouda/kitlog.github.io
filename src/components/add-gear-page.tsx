import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { NotificationData } from "@/types/notification"

interface AddGearPageProps {
  onBack: () => void
  onNotification?: (notification: NotificationData) => void
}

export function AddGearPage({ onBack }: AddGearPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Equipment</h1>
          <p className="text-muted-foreground mt-2">Add equipment to your inventory</p>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-muted-foreground">Add gear form - Coming soon!</p>
      </div>
    </div>
  )
}
