import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockGearData, mockProjects } from "@/lib/mock-data"
import { Package, AlertTriangle, CheckCircle, Plus, Eye, RotateCcw } from "lucide-react"
import { CheckinModal, type CheckinData } from "./equipment/checkin-modal"
import { useState } from "react"
import type { NotificationData } from "@/types/notification"
import { SearchInput } from "./equipment/search-input"
import { ProjectCard } from "./equipment/project-card"
import type { Project } from "@/lib/mock-data"

interface DashboardPageProps {
  onSectionChange: (section: string) => void
  onNotification?: (notification: NotificationData) => void
  onFilterChange?: (filter: string) => void
  onProjectSelect?: (project: Project) => void
}

export function DashboardPage({
  onSectionChange,
  onNotification,
  onFilterChange,
  onProjectSelect,
}: DashboardPageProps) {
  const totalGear = mockGearData.length
  const inUse = mockGearData.filter((item) => item.status === "in-use").length
  const underMaintenance = mockGearData.filter((item) => item.status === "maintenance").length
  const available = mockGearData.filter((item) => item.status === "available").length
  const [showCheckinModal, setShowCheckinModal] = useState(false)
  const checkedOutGear = mockGearData.filter((item) => item.status === "in-use")

  const handleCheckin = (checkinData: CheckinData) => {
    console.log("Checking in gear:", checkinData)

    if (onNotification) {
      onNotification({
        id: Date.now().toString(),
        type: "success",
        title: "Equipment Checked In",
        message: `Successfully checked in ${checkinData.gearIds.length} item(s)`,
      })
    }
  }

  const handleKPIClick = (filter: string) => {
    onSectionChange("inventory")
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  const handleProjectDetails = (project: Project) => {
    if (onProjectSelect) {
      onProjectSelect(project)
    }
    onSectionChange("checkin")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Header with Search and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SearchInput
            placeholder="Search gear, users, or projects..."
            value=""
            onChange={() => {}}
            className="flex-1 max-w-md"
          />

          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => onSectionChange("checkout")}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Check Out
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setShowCheckinModal(true)}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Check In
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => onSectionChange("addgear")}>
              <Plus className="w-4 h-4 mr-1" />
              Add Gear
            </Button>
          </div>
        </div>

        {/* Clickable KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card
            className="p-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-gray-50"
            onClick={() => handleKPIClick("all")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-foreground">{totalGear}</div>
                <p className="text-xs text-muted-foreground">Total Gear</p>
              </div>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-green-50"
            onClick={() => handleKPIClick("available")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-green-600">{available}</div>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-orange-50"
            onClick={() => handleKPIClick("in-use")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-primary">{inUse}</div>
                <p className="text-xs text-muted-foreground">In Use</p>
              </div>
              <Eye className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-gray-50"
            onClick={() => handleKPIClick("maintenance")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-600">{underMaintenance}</div>
                <p className="text-xs text-muted-foreground">Maintenance</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
          </Card>
        </div>
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onViewDetails={handleProjectDetails} />
            ))}
          </div>
        </CardContent>
      </Card>

      <CheckinModal
        isOpen={showCheckinModal}
        onClose={() => setShowCheckinModal(false)}
        gear={checkedOutGear}
        onCheckin={handleCheckin}
      />
    </div>
  )
}
