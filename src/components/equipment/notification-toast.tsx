import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NotificationData } from "@/types/notification"

interface NotificationToastProps {
  notification: NotificationData
  onClose: (id: string) => void
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification.id, onClose])

  const getNotificationConfig = (type: NotificationData["type"]) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          className: "border-green-200 bg-green-50",
          iconClassName: "text-green-600",
        }
      case "error":
        return {
          icon: AlertCircle,
          className: "border-red-200 bg-red-50",
          iconClassName: "text-red-600",
        }
      case "warning":
        return {
          icon: AlertTriangle,
          className: "border-yellow-200 bg-yellow-50",
          iconClassName: "text-yellow-600",
        }
      case "info":
        return {
          icon: Info,
          className: "border-blue-200 bg-blue-50",
          iconClassName: "text-blue-600",
        }
    }
  }

  const config = getNotificationConfig(notification.type)
  const Icon = config.icon

  return (
    <Card className={cn("p-4 shadow-lg", config.className)}>
      <div className="flex items-start space-x-3">
        <Icon className={cn("w-5 h-5 mt-0.5", config.iconClassName)} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{notification.title}</h4>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onClose(notification.id)}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

interface NotificationContainerProps {
  notifications: NotificationData[]
  onClose: (id: string) => void
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

export type { NotificationData }
