export interface GearItem {
  id: string
  name: string
  type: string
  serialNumber: string
  condition: "excellent" | "good" | "fair" | "poor"
  status: "available" | "in-use" | "maintenance"
  assignedTo?: string
  assignedJob?: string
  image?: string
  lastCheckedOut?: string
  notes?: string
  cost?: number
  purchaseDate?: string
  expectedReturn?: string
}

export interface Project {
  id: string
  name: string
  assignedTo: string
  gearCount: number
  checkoutDate: string
  expectedReturn: string
  status: "active" | "completed" | "overdue"
  description?: string
  gearItems: string[] // Array of gear IDs
}

export const mockGearData: GearItem[] = [
  {
    id: "1",
    name: "Canon 5D Mark IV",
    type: "Camera",
    serialNumber: "CN001234567",
    condition: "excellent",
    status: "in-use",
    assignedTo: "John Smith",
    assignedJob: "Wedding Shoot - Johnson",
    image: "/placeholder.svg?height=200&width=300",
    notes: "Recently serviced",
    cost: 2500,
    purchaseDate: "2023-01-15",
    lastCheckedOut: "2024-01-15",
    expectedReturn: "2024-01-22",
  },
  {
    id: "2",
    name: "Sony FX3",
    type: "Camera",
    serialNumber: "SN987654321",
    condition: "good",
    status: "in-use",
    assignedTo: "Sarah Wilson",
    assignedJob: "Corporate Video",
    image: "/placeholder.svg?height=200&width=300",
    lastCheckedOut: "2024-01-12",
    cost: 3200,
    purchaseDate: "2023-03-20",
    expectedReturn: "2024-01-19",
  },
  {
    id: "3",
    name: "Canon 24-70mm f/2.8L",
    type: "Lens",
    serialNumber: "CL445566778",
    condition: "excellent",
    status: "available",
    image: "/placeholder.svg?height=200&width=300",
    cost: 1800,
    purchaseDate: "2023-02-10",
  },
  {
    id: "4",
    name: "Manfrotto Carbon Tripod",
    type: "Support",
    serialNumber: "MF112233445",
    condition: "good",
    status: "maintenance",
    notes: "Leg lock needs repair",
    image: "/placeholder.svg?height=200&width=300",
    cost: 450,
    purchaseDate: "2022-11-05",
  },
  {
    id: "5",
    name: "Rode VideoMic Pro",
    type: "Audio",
    serialNumber: "RD556677889",
    condition: "excellent",
    status: "in-use",
    assignedTo: "Mike Chen",
    assignedJob: "Product Photography",
    image: "/placeholder.svg?height=200&width=300",
    lastCheckedOut: "2024-01-10",
    cost: 280,
    purchaseDate: "2023-05-12",
    expectedReturn: "2024-01-17",
  },
  {
    id: "6",
    name: "Godox AD600Pro",
    type: "Lighting",
    serialNumber: "GX778899001",
    condition: "good",
    status: "available",
    image: "/placeholder.svg?height=200&width=300",
    cost: 650,
    purchaseDate: "2023-04-08",
  },
  {
    id: "7",
    name: 'MacBook Pro 16"',
    type: "Computer",
    serialNumber: "AP123456789",
    condition: "excellent",
    status: "in-use",
    assignedTo: "Emma Davis",
    assignedJob: "Event Coverage",
    image: "/placeholder.svg?height=200&width=300",
    lastCheckedOut: "2024-01-08",
    cost: 2800,
    purchaseDate: "2023-06-15",
    expectedReturn: "2024-01-15",
  },
  {
    id: "8",
    name: "DJI Ronin-S",
    type: "Stabilizer",
    serialNumber: "DJ334455667",
    condition: "good",
    status: "available",
    image: "/placeholder.svg?height=200&width=300",
    cost: 750,
    purchaseDate: "2023-07-22",
  },
]

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Wedding Shoot - Johnson",
    assignedTo: "John Smith",
    gearCount: 3,
    checkoutDate: "2024-01-15",
    expectedReturn: "2024-01-22",
    status: "active",
    description: "Wedding photography for Johnson family",
    gearItems: ["1", "3", "6"],
  },
  {
    id: "2",
    name: "Corporate Video",
    assignedTo: "Sarah Wilson",
    gearCount: 2,
    checkoutDate: "2024-01-12",
    expectedReturn: "2024-01-19",
    status: "active",
    description: "Corporate promotional video production",
    gearItems: ["2", "5"],
  },
  {
    id: "3",
    name: "Product Photography",
    assignedTo: "Mike Chen",
    gearCount: 4,
    checkoutDate: "2024-01-10",
    expectedReturn: "2024-01-17",
    status: "overdue",
    description: "E-commerce product photography session",
    gearItems: ["5", "6", "7", "8"],
  },
  {
    id: "4",
    name: "Event Coverage",
    assignedTo: "Emma Davis",
    gearCount: 2,
    checkoutDate: "2024-01-08",
    expectedReturn: "2024-01-15",
    status: "overdue",
    description: "Corporate event documentation",
    gearItems: ["7", "1"],
  },
]

export const mockUsers = [
  { id: "1", name: "John Smith", role: "Photographer" },
  { id: "2", name: "Sarah Wilson", role: "Videographer" },
  { id: "3", name: "Mike Chen", role: "Editor" },
  { id: "4", name: "Emma Davis", role: "Producer" },
  { id: "5", name: "Alex Johnson", role: "Assistant" },
]

export const mockJobs = [
  { id: "1", name: "Wedding Shoot - Johnson", date: "2024-01-20" },
  { id: "2", name: "Corporate Video", date: "2024-01-18" },
  { id: "3", name: "Product Photography", date: "2024-01-22" },
  { id: "4", name: "Event Coverage", date: "2024-01-25" },
  { id: "5", name: "Post Production", date: "2024-01-15" },
]
