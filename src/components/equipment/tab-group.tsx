import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  count: number
}

interface TabGroupProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function TabGroup({ tabs, activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "h-auto py-2 px-4",
            activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-transparent"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "ml-2 px-2 py-0.5 rounded-full text-xs",
              activeTab === tab.id
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {tab.count}
          </span>
        </Button>
      ))}
    </div>
  )
}
