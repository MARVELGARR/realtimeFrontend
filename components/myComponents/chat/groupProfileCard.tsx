"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CalendarIcon, Mail, Phone, User, UserPlus, UserMinus, UserX } from "lucide-react"
import { format } from "date-fns"
import useGetRecepientProfile from "@/hooks/chatJooks/useGetRecepientProfile"
import useAddFriend from "@/hooks/interactionHooks/useAddfriend"
import { toast } from "@/hooks/use-toast"
import useUnFriend from "@/hooks/interactionHooks/useUnFriend"
import GroupProfile from "@/components/group-profile"
import useGetGroupProfile from "@/hooks/groupHook/useGetGroupProfileHook"

type ProfileRecepient = {
  bio: string
  birthDay: Date
  firstName: string
  lastName: string
  gender: "MALE" | "FEMALE"
  nickname: string
  phoneNumber: string
  profilePicture: string
}

type GetRecepientProfileProps = {
  id: string
  name: string
  email: string
  image: string
  createdAt: string
  updatedAt: string
  profile: ProfileRecepient
}

type GroupProfileCardDialogProps = {
  className?: string
  groupId: string
  groupName: string
  isFriend?: boolean
}

export function GroupProfileCardDialog({ className, groupName, groupId,  }: GroupProfileCardDialogProps) {
  const { data, isGettinggroupProfile } = useGetGroupProfile(groupId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" w-full flex justify-start pl-2 py-4 align-left border-none  h-5 " variant="outline"> <span className="align-left">profile</span> </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(className, "w-[425px] mx-auto top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2")}
      >
        <GroupProfile groupId={""}/>
      </DialogContent>
    </Dialog>
  )
}


// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}


