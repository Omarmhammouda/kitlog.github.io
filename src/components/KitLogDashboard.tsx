import { useState } from "react"
import { DashboardPage } from "./dashboard-page"
import { InventoryPage } from "./inventory-page"
import { GearDetailPage } from "./gear-detail-page"
import { CheckoutPage } from "./checkout-page"
import { CheckinPage } from "./checkin-page"
import { AddGearPage } from "./add-gear-page"
import { LoginPage } from "./login-page"
import { OnboardingPage } from "./onboarding-page"
import type { GearItem, Project } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Bell, Search, Package } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SettingsPage } from "./settings-page"
import { NotificationContainer, type NotificationData } from "./equipment/notification-toast"

export default function KitLogDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [inventoryFilter, setInventoryFilter] = useState("all")

  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => [...prev, notification])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowOnboarding(false)
  }

  const handleOnboardingComplete = () => {
    setIsAuthenticated(true)
    setShowOnboarding(false)
  }

  const handleLogoClick = () => {
    setActiveSection("dashboard")
    setSelectedGear(null)
    setSelectedProject(null)
  }

  const handleBackToDashboard = () => {
    setActiveSection("dashboard")
    setSelectedGear(null)
    setSelectedProject(null)
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
  }

  // Show login/onboarding if not authenticated
  if (!isAuthenticated) {
    if (showOnboarding) {
      return <OnboardingPage onComplete={handleOnboardingComplete} onBackToLogin={() => setShowOnboarding(false)} />
    }
    return <LoginPage onLogin={handleLogin} onShowOnboarding={() => setShowOnboarding(true)} />
  }

  const renderContent = () => {
    if (selectedGear) {
      return <GearDetailPage gear={selectedGear} onBack={() => setSelectedGear(null)} />
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardPage
            onSectionChange={setActiveSection}
            onNotification={addNotification}
            onFilterChange={setInventoryFilter}
            onProjectSelect={handleProjectSelect}
          />
        )
      case "inventory":
        return (
          <InventoryPage
            onGearSelect={setSelectedGear}
            onBack={handleBackToDashboard}
            initialFilter={inventoryFilter}
          />
        )
      case "checkout":
        return <CheckoutPage onNotification={addNotification} onBack={handleBackToDashboard} />
      case "checkin":
        return (
          <CheckinPage
            onBack={handleBackToDashboard}
            selectedProject={selectedProject}
            onNotification={addNotification}
          />
        )
      case "addgear":
        return <AddGearPage onBack={handleBackToDashboard} onNotification={addNotification} />
      case "settings":
        return <SettingsPage />
      default:
        return (
          <DashboardPage
            onSectionChange={setActiveSection}
            onNotification={addNotification}
            onFilterChange={setInventoryFilter}
            onProjectSelect={handleProjectSelect}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">KitLog</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSection("settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">{renderContent()}</main>

      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </div>
  )
}
