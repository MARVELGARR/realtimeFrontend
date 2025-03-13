"use client"

import type React from "react"

import type { Message as ImportedMessageType, User } from "@/actions/api-actions/messageActions/getConversation"
import { useRef, useState } from "react"
import { DropdownMenuMessageOptions } from "./messageOptions"

export type MessageType = ImportedMessageType

interface MessageProps {
  currentUserId: string
  recepientId: string
  message: MessageType
  currentProfileId: string
}

const Message: React.FC<MessageProps> = ({ message, currentProfileId, currentUserId, recepientId }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true)
      console.log("Hover event triggered!")
    }, 1000) // 1-second delay
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Check if the mouse is moving to the dropdown
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Only close if dropdown is not open
      if (!isDropdownOpen) {
        setIsHovered(false)
      }
    }
  }

  // Handle dropdown state changes
  const handleDropdownOpenChange = (open: boolean) => {
    setIsDropdownOpen(open)

    // If dropdown is closed and not hovering, hide the dropdown container
    if (!open && !isHovered) {
      setIsHovered(false)
    }
  }

  const isMyMessage = message.userId === currentUserId
  const messageContent = message.content

   const isMessageLiked = !message.StarredMessage ? false : (message.StarredMessage.profileId === currentProfileId)


  return (
    <div
      ref={containerRef}
      className={`mb-4 w-full px-4 ${message.userId === currentUserId ? "justify-end" : "justify-start"} flex items-center gap-2 w-full  relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div key={message.id} className={`w-fit relative`}>
        {isHovered && (
          <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${message.userId === currentUserId ? "-left-5 ": " -right-5"}`}>
            <DropdownMenuMessageOptions isMessageLiked={isMessageLiked} currentProfileId={currentProfileId} messageContent={messageContent} isMyMessage={isMyMessage} recepientId={recepientId}  messageId={message.id as string} onOpenChange={handleDropdownOpenChange} />
          </div>
        )}
        <div
          className={`inline-block p-2 rounded-lg ${
            message.userId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <p>{message.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{message.updatedAt}</p>
      </div>
    </div>
  )
}

export default Message
