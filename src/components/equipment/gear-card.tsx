import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"
import type { GearItem } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"

interface GearCardProps {
  gear: GearItem
  onView?: (gear: GearItem) => void
  onEdit?: (gear: GearItem) => void
}

export function GearCard({ gear, onView, onEdit }: GearCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={gear.image || "/placeholder.svg?height=200&width=300"}
            alt={gear.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{gear.name}</h3>
          <p className="text-sm text-muted-foreground">{gear.type}</p>
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={gear.status} />
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onView?.(gear)} className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit?.(gear)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {gear.assignedTo && (
          <div className="text-xs text-muted-foreground">
            <p>Assigned to: {gear.assignedTo}</p>
            {gear.assignedJob && <p>Job: {gear.assignedJob}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
