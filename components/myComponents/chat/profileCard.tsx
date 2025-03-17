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

type ProfileCardDialogProps = {
  className?: string
  recepientId: string
  recepientName: string
  isFriend?: boolean
}

export function ProfileCardDialog({ className, recepientName, recepientId,  }: ProfileCardDialogProps) {
  const { data, isGettingRecepientProfile } = useGetRecepientProfile(recepientId)
  const {addingMessage, isAddingMessage} = useAddFriend(recepientId)

  const isFriend = data?.friends?.some((frnd)=>frnd.friendId === recepientId) 

  const handleAddFriend = async() => {
    addingMessage(recepientId).then(()=>{
        toast({
            title: "Friend Added",
            variant:"success"
        })
    }).catch((error)=>{
        toast({
            title: "Friend request failed",
            variant:"destructive"
        })
    })
  }

  const handleUnfriend = () => {
    // Implement your unfriend logic here
    console.log(`Removing ${recepientName} from friends`)
    // You would typically call an API endpoint here
  }

  const handleBlockUser = () => {
    // Implement your block user logic here
    console.log(`Blocking ${recepientName}`)
    // You would typically call an API endpoint here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" w-full flex justify-start pl-2 py-4 align-left border-none  h-5 " variant="outline"> <span className="align-left">profile</span> </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(className, "w-[425px] mx-auto top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2")}
      >
        {isGettingRecepientProfile ? (
          <ProfileSkeleton />
        ) : !data ? (
          <div className="py-6 text-center text-muted-foreground">Could not load profile information</div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={data?.profile?.profilePicture || data.image} alt={data.name} />
                <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{data.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {data.profile?.nickname && `@${data.profile?.nickname}`}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              {data.profile?.bio && (
                <div>
                  <h4 className="mb-2 font-medium">Bio</h4>
                  <p className="text-sm text-muted-foreground">{data.profile?.bio}</p>
                </div>
              )}

              <div className="grid gap-3">
                <ProfileItem icon={<Mail className="h-4 w-4" />} label="Email" value={data.email} />

                {data.profile?.phoneNumber && (
                  <ProfileItem icon={<Phone className="h-4 w-4" />} label="Phone" value={data.profile?.phoneNumber} />
                )}

                {data.profile?.birthDay && (
                  <ProfileItem
                    icon={<CalendarIcon className="h-4 w-4" />}
                    label="Birthday"
                    value={format(new Date(data.profile?.birthDay), "PPP")}
                  />
                )}

                {data.profile?.gender && (
                  <ProfileItem
                    icon={<User className="h-4 w-4" />}
                    label="Gender"
                    value={data.profile?.gender.charAt(0) + data.profile?.gender.slice(1).toLowerCase()}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex justify-between gap-2">
                {isFriend ? (
                  <Button variant="outline" className="flex-1 gap-2" onClick={handleUnfriend}>
                    <UserMinus className="h-4 w-4" />
                    Unfriend
                  </Button>
                ) : (
                  <Button disabled={isAddingMessage} variant="default" className="flex-1 gap-2 bg-green-500" onClick={handleAddFriend}>
                    <UserPlus className="h-4 w-4" />
                    Add Friend
                  </Button>
                )}
                <Button variant="destructive" className="flex-1 gap-2" onClick={handleBlockUser}>
                  <UserX className="h-4 w-4" />
                  Block
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Helper component for profile items
function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

// Loading skeleton
function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2 text-center">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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


