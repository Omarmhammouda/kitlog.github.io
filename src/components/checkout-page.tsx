import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchInput } from "./equipment/search-input"
import { StatusBadge } from "./equipment/status-badge"
import { mockGearData, mockUsers, mockJobs } from "@/lib/mock-data"
import { CheckCircle, User, ArrowLeft } from "lucide-react"
import type { NotificationData } from "@/types/notification"

interface CheckoutPageProps {
  onNotification?: (notification: NotificationData) => void
  onBack: () => void
}

export function CheckoutPage({ onNotification, onBack }: CheckoutPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGear, setSelectedGear] = useState<string[]>([])
  const [assignedUser, setAssignedUser] = useState("")
  const [assignedJob, setAssignedJob] = useState("")
  const [customJob, setCustomJob] = useState("")

  const availableGear = mockGearData.filter(
    (item) =>
      item.status === "available" &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleGearToggle = (gearId: string) => {
    setSelectedGear((prev) => (prev.includes(gearId) ? prev.filter((id) => id !== gearId) : [...prev, gearId]))
  }

  const handleCheckout = () => {
    if (selectedGear.length === 0 || !assignedUser) {
      alert("Please select gear and assign to a user")
      return
    }

    const userName = mockUsers.find((u) => u.id === assignedUser)?.name
    const jobName = assignedJob === "custom" ? customJob : mockJobs.find((j) => j.id === assignedJob)?.name

    // Show success notification
    if (onNotification) {
      onNotification({
        id: Date.now().toString(),
        type: "success",
        title: "Equipment Checked Out",
        message: `Successfully checked out ${selectedGear.length} item(s) to ${userName}${jobName ? ` for ${jobName}` : ""}`,
      })
    }

    // Reset form
    setSelectedGear([])
    setAssignedUser("")
    setAssignedJob("")
    setCustomJob("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Check-Out Gear</h1>
          <p className="text-muted-foreground mt-2">Assign equipment to team members for projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Gear */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Available Gear ({availableGear.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchInput placeholder="Search available gear..." value={searchQuery} onChange={setSearchQuery} />

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableGear.map((gear) => (
                  <div key={gear.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      checked={selectedGear.includes(gear.id)}
                      onCheckedChange={() => handleGearToggle(gear.id)}
                    />
                    <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={gear.image || "/placeholder.svg?height=48&width=48"}
                        alt={gear.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{gear.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {gear.type} • {gear.serialNumber}
                      </p>
                    </div>
                    <StatusBadge status={gear.status} />
                  </div>
                ))}
              </div>

              {availableGear.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No available gear found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assignment Form */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 w-5 text-primary" />
                <span>Assignment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="user">Assign to User</Label>
                <Select value={assignedUser} onValueChange={setAssignedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="job">Job/Project</Label>
                <Select value={assignedJob} onValueChange={setAssignedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {assignedJob === "custom" && (
                <div>
                  <Label htmlFor="customJob">Custom Project Name</Label>
                  <Input
                    id="customJob"
                    value={customJob}
                    onChange={(e) => setCustomJob(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Selected Items: {selectedGear.length}</p>
                <Button
                  onClick={handleCheckout}
                  disabled={selectedGear.length === 0 || !assignedUser}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check Out Selected Items
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selected Items Summary */}
          {selectedGear.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Selected Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedGear.map((gearId) => {
                    const gear = mockGearData.find((g) => g.id === gearId)
                    return gear ? (
                      <div key={gearId} className="text-sm">
                        <p className="font-medium">{gear.name}</p>
                        <p className="text-muted-foreground">{gear.type}</p>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
