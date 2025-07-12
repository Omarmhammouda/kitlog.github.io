import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import type { NotificationData } from "@/types/notification"

interface CheckinPageProps {
  onBack: () => void
  selectedProject?: Project | null
  onNotification?: (notification: NotificationData) => void
}

export function CheckinPage({ onBack, selectedProject }: CheckinPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Check In Equipment</h1>
          <p className="text-muted-foreground mt-2">Return equipment from projects</p>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-muted-foreground">Check-in page - Coming soon!</p>
        {selectedProject && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected project: {selectedProject.name}
          </p>
        )}
      </div>
    </div>
  )
}
