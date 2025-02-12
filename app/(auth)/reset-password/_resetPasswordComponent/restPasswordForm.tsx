"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { QueryClient, useMutation } from "@tanstack/react-query"
import resetPassword from "@/actions/api-actions/authActions/resetPassword"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export type EmailFormType = z.infer<typeof formSchema>

const queryClient = new QueryClient()

export function ResetPasswordForm() {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })


  const {mutateAsync: sendingEmail, isPending: isSendingEmail, } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (data: EmailFormType)=>resetPassword(data)
  })

  async function onSubmit(values: EmailFormType) {
    sendingEmail(values).then((data)=>{
      toast({
        title: "Email sent",
        variant: "default",
        description: JSON.stringify(data),
        duration: 500
      })
      queryClient.invalidateQueries({ queryKey: ["forgotPassword"] })
      router.push('/passwordVerification')
    }).catch((error)=>{
      toast({
        title: "Email sent",
        variant: "default",
        description: JSON.stringify(error),
        duration: 500
      })
    })

  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email address and we &apos ll send you a link to reset your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input placeholder="Enter your email" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSendingEmail}>
            {isSendingEmail ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

