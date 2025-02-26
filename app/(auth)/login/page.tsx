"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import useLogin from "@/hooks/authHoks/useLogin"
import { toast } from "@/hooks/use-toast"
import googleAuth from "@/actions/api-actions/authActions/googleAuth"
import Cookies from "cookies-js"

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type LoginFormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const {isLoggingIn, loginuser} = useLogin()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    loginuser(data).then((data)=>{
        Cookies.set("user", JSON.stringify(data.user))
        toast({
            title: "Login successfull",
            description: `${data}`,
            variant: "success"
        })
        router.push('/App/chat')
    }).catch((error)=>{
        toast({
            title: "Login Failed",
            description: `${error}`,
            variant: "destructive",
            duration: 5000
        })
    })
  }

  const handleGoogleLogin = async () => {
    try {
        setIsLoading(true)
          await googleAuth()

      } catch (error) {
        toast({
            title: "failed login",
            description: JSON.stringify(error),
            duration: 5000
        })
      } finally {
        setIsLoading(false)
      }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4" disabled={isLoggingIn}>
                {isLoggingIn ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
              </Button>
              <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              className="w-full px-4 py-2 flex justify-center items-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="h-5 w-5" />
              )}
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

