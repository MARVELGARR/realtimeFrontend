"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

// Define the props for the MessageCard component
export type MessageCardProps = {
  message: {
    id: string
    content: string
    createdAt: string | Date
    userId: string
  }
  isCurrentUser: boolean
  sender?: {
    name: string
    image?: string
    profilePicture?: string
  } | null
}

// Use forwardRef to create a component that can accept a ref from its parent
const MessageCard = forwardRef<HTMLDivElement, MessageCardProps>(({ message, isCurrentUser, sender }, ref) => {
  return (
    <div
      ref={ref} // Forward the ref to this div
      className={cn("flex items-end gap-2 flex-1", isCurrentUser ? "justify-end" : "justify-start")}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={sender?.image || sender?.profilePicture || "/placeholder.svg"}
            alt={sender?.name || "User"}
          />
          <AvatarFallback>{sender?.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col max-w-[70%]">
        {!isCurrentUser && <span className="text-xs text-gray-500 mb-1">{sender?.name}</span>}
        <div
          className={cn(
            "p-3 rounded-lg mb-5",
            isCurrentUser ? "bg-cyan-700 text-black rounded-br-none" : "bg-cyan-400 dark:bg-gray-700 rounded-bl-none",
          )}
        >
          {message.content}

          <div className="text-xs mt-1 opacity-70 text-right">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  )
})

// Add a display name for the component (helpful for debugging)
MessageCard.displayName = "MessageCard"

export default MessageCard
