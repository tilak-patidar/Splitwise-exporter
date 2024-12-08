import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoginButton } from "./loginButton"
import { LoginLogo } from "./loginLogo"

export function LoginCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-6">
        <LoginLogo />
        <div className="space-y-2">
          <h1 className="font-geist-sans text-2xl font-semibold text-center">
            SplitwiseSync
          </h1>
          <p className="font-geist-sans text-center text-muted-foreground text-sm">
            Login with your Splitwise account to manage expenses and generate custom reports
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <LoginButton />
      </CardContent>
    </Card>
  )
}