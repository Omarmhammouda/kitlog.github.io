import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "./equipment/search-input"
import { TabGroup } from "./equipment/tab-group"
import { GearCard } from "./equipment/gear-card"
import { mockGearData, type GearItem } from "@/lib/mock-data"
import { Plus, Filter, Package, ArrowLeft } from "lucide-react"

interface InventoryPageProps {
  onGearSelect: (gear: GearItem) => void
  onBack: () => void
  initialFilter?: string
}

export function InventoryPage({ onGearSelect, onBack, initialFilter = "all" }: InventoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState(initialFilter)

  useEffect(() => {
    setActiveTab(initialFilter)
  }, [initialFilter])

  const filteredGear = mockGearData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || item.status === activeTab

    return matchesSearch && matchesTab
  })

  const tabs = [
    { id: "all", label: "All", count: mockGearData.length },
    { id: "available", label: "Available", count: mockGearData.filter((item) => item.status === "available").length },
    { id: "in-use", label: "In Use", count: mockGearData.filter((item) => item.status === "in-use").length },
    {
      id: "maintenance",
      label: "Maintenance",
      count: mockGearData.filter((item) => item.status === "maintenance").length,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground mt-2">Manage your gear collection</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Gear
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <SearchInput
          placeholder="Search gear by name, type, or serial number..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        <Button variant="outline" className="lg:w-auto bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Gear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGear.map((gear) => (
          <GearCard key={gear.id} gear={gear} onView={onGearSelect} />
        ))}
      </div>

      {filteredGear.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No gear found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first piece of gear"}
          </p>
        </div>
      )}
    </div>
  )
}
