import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { GearItem } from "@/lib/mock-data"
import { StatusBadge } from "./status-badge"

export interface CheckinData {
  gearIds: string[]
  notes?: string
}

interface CheckinModalProps {
  isOpen: boolean
  onClose: () => void
  gear: GearItem[]
  onCheckin: (data: CheckinData) => void
}

export function CheckinModal({ isOpen, onClose, gear, onCheckin }: CheckinModalProps) {
  const [selectedGear, setSelectedGear] = useState<string[]>([])

  const handleGearToggle = (gearId: string) => {
    setSelectedGear((prev) =>
      prev.includes(gearId) ? prev.filter((id) => id !== gearId) : [...prev, gearId]
    )
  }

  const handleCheckin = () => {
    if (selectedGear.length === 0) return

    onCheckin({
      gearIds: selectedGear,
    })

    setSelectedGear([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Check In Equipment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the equipment you want to check in:
          </p>

          <ScrollArea className="max-h-64">
            <div className="space-y-3">
              {gear.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={selectedGear.includes(item.id)}
                    onCheckedChange={() => handleGearToggle(item.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} • Assigned to {item.assignedTo}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCheckin}
              disabled={selectedGear.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              Check In ({selectedGear.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
