import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export function EmailSentConfirmation() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          We have sent an email to your inbox with further instructions. Please check your email and follow the link to
          complete the process.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/reset-password">Resend Email</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

