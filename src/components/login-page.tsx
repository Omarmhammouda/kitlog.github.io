import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
  onShowOnboarding: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to KitLog</CardTitle>
          <p className="text-muted-foreground">Sign in to manage your equipment</p>
        </CardHeader>
        <CardContent>
          <Button onClick={onLogin} className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
