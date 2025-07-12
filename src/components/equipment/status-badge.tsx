import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface StatusBadgeProps {
  status: "available" | "in-use" | "maintenance"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      label: "Available",
      variant: "default" as const,
      className: "bg-green-100 text-green-800 hover:bg-green-100",
      icon: CheckCircle,
    },
    "in-use": {
      label: "In Use",
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      icon: Clock,
    },
    maintenance: {
      label: "Maintenance",
      variant: "destructive" as const,
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      icon: AlertTriangle,
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
