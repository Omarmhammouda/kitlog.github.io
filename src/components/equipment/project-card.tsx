import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/mock-data"
import { Calendar, User, Package, Clock, AlertTriangle } from "lucide-react"

interface ProjectCardProps {
  project: Project
  onViewDetails?: (project: Project) => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const getStatusConfig = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          className: "bg-green-100 text-green-800",
          icon: Clock,
        }
      case "completed":
        return {
          label: "Completed",
          className: "bg-blue-100 text-blue-800",
          icon: Package,
        }
      case "overdue":
        return {
          label: "Overdue",
          className: "bg-red-100 text-red-800",
          icon: AlertTriangle,
        }
    }
  }

  const statusConfig = getStatusConfig(project.status)
  const StatusIcon = statusConfig.icon

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <Badge className={statusConfig.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="w-4 h-4 mr-2" />
          {project.assignedTo}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="w-4 h-4 mr-2" />
          {project.gearCount} items
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          Due: {project.expectedReturn}
        </div>

        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(project)}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
