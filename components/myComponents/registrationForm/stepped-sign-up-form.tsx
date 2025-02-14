"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/icons"
import { PersonalInfoStep } from "./personal-info-step"
import { ContactDetailsStep } from "./contact-details-step"
import { AccountSetupStep } from "./account-setup-step"
import useRegister from "@/hooks/authHoks/useRegister"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { QueryClient } from "@tanstack/react-query"
import Cookies from "cookies-js"
import googleAuth from "@/actions/api-actions/authActions/googleAuth"

const formSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})


const queryClient = new QueryClient()

export type RegistrationFormData = z.infer<typeof formSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [step, setStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const router = useRouter()

  const handleSubmitGoogle = async () => {
    try {
      setIsLoading(true)
      await googleAuth()
    } catch (error) {
      console.error("Google authentication failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      gender: "other",
      birthday: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  })

  const {registerUser, isRegisteringUser} = useRegister()

  async function onSubmit(values: RegistrationFormData) {
    registerUser(values).then((data)=>{

      Cookies.set("sessionID", data.sessionId)
      toast({
        title: "Congratulations! you have been registered",
        description: data.message,
        variant: "success",
        duration: 5000
      })
      queryClient.invalidateQueries({ queryKey: ["register"] })
      router.push('/App')

    }).catch((error)=>{
      toast({
        title: "Registration failed",
        description: `${error}`,
        variant: "destructive",
        duration: 5000
      })
    })
    console.log(values)
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = []
    switch (step) {
      case 1:
        fieldsToValidate = ["firstname", "lastname", "gender", "birthday"]
        break
      case 2:
        fieldsToValidate = ["phoneNumber", "email"]
        break
      // No need to validate for step 3 as it's the last step
    }

    const isStepValid = await form.trigger(fieldsToValidate)
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <PersonalInfoStep control={form.control} />}
          {step === 2 && <ContactDetailsStep control={form.control} />}
          {step === 3 && <AccountSetupStep control={form.control} />}

          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isRegisteringUser}>
                {isRegisteringUser && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button variant="outline" disabled={isLoading} onClick={handleSubmitGoogle}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  )
}

