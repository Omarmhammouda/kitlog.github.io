import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "./equipment/status-badge"
import type { GearItem } from "@/lib/mock-data"
import { ArrowLeft, Calendar, DollarSign, Hash, User } from "lucide-react"

interface GearDetailPageProps {
  gear: GearItem
  onBack: () => void
}

export function GearDetailPage({ gear, onBack }: GearDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{gear.name}</h1>
          <p className="text-muted-foreground mt-2">{gear.type}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-6">
                <img
                  src={gear.image || "/placeholder.svg?height=400&width=600"}
                  alt={gear.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {gear.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p className="text-muted-foreground">{gear.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <StatusBadge status={gear.status} />
              </div>

              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{gear.serialNumber}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Condition:</span>
                <span className="text-sm text-muted-foreground capitalize">{gear.condition}</span>
              </div>

              {gear.cost && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">${gear.cost.toLocaleString()}</span>
                </div>
              )}

              {gear.purchaseDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Purchased {gear.purchaseDate}</span>
                </div>
              )}

              {gear.assignedTo && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Assigned to {gear.assignedTo}</span>
                </div>
              )}

              {gear.expectedReturn && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Due back {gear.expectedReturn}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
