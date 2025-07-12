import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

interface OnboardingPageProps {
  onComplete: () => void
  onBackToLogin: () => void
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to KitLog</CardTitle>
          <p className="text-muted-foreground">Let's get you set up</p>
        </CardHeader>
        <CardContent>
          <Button onClick={onComplete} className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
