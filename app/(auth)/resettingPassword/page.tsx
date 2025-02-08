"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import verifyingPasswordReset from "@/actions/api-actions/authActions/verifyingPasswordReset"
import { Loader2 } from "lucide-react"

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const token = searchParams.token as string
  const userId = searchParams.userId as string

  const { data } = useQuery({
    queryKey: ["verifyingPasswordReset", token, userId],
    queryFn: () => verifyingPasswordReset(token, userId),
    enabled: !!token && !!userId,
    
  })
  if(data){
    router.push(`/newPassword?token=${token}`)
  }



    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-lg font-medium">Verifying your request...</p>
      </div>
    )
  

}

