export interface NotificationData {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
}
