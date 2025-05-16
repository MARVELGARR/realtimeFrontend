"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"
import { createContext, type ReactNode, useContext, useRef, useEffect, useState } from "react"

import { convoDetails } from "@/hooks/ChatHooks/useGetConvoDetails"
import { MessagesProp } from "@/app/(navigationRoute)/(application)/Application/chat/[id]/page"
import { useParams } from "next/navigation"
import { useUserSession } from "@/providers/UserProvider/userSessionProvider"
import { useSearchParams } from "next/navigation"
import { socket } from "@/configs/socket"

type ChatViewProp = {
  conversationType: "DIRECT" | "GROUP"
  participants: convoDetails["participants"]
  messages: MessagesProp["messages"]
  loadMoreMessages: () => Promise<void>
  hasMoreMessages: boolean
  isLoadingMessages: boolean
  sendMessage: (newMessage: { conversationType?: "DIRECT" | "GROUP", message?: string, currentUserId: string, receiverId?: string, conversationId?: string }) => Promise<void>
  currentUserId: string
  groupName?: string
  groupId?: string,
  conversationId: string
}

const ChatViewContext = createContext<ChatViewProp | null>(null)

export function useChatView() {
  const context = useContext(ChatViewContext)
  if (!context) {
    throw new Error("useChatView must be used within a ChatView provider")
  }
  return context
}

export function ChatView({
  children,
  conversationType,
  participants,
  messages,
  loadMoreMessages,
  hasMoreMessages,
  isLoadingMessages,
  sendMessage,
  currentUserId,
  groupName,
  groupId,
  conversationId

}: {
  children: ReactNode
  conversationType: "DIRECT" | "GROUP"
  participants: convoDetails["participants"]
  messages: MessagesProp["messages"]
  loadMoreMessages: () => Promise<void>
  hasMoreMessages: boolean
  isLoadingMessages: boolean
  sendMessage: (newMessage: { conversationType?: "DIRECT" | "GROUP"; message?: string; currentUserId: string, receiverId?: string; conversationId?: string }) => Promise<void>
  currentUserId: string,
  groupName?: string
  groupId?: string
    conversationId: string
}) {

    useEffect(() => {
      if (conversationId) {
        socket.emit("join-conversation", conversationId);
      }
    }, [conversationId]);
  return (
    <ChatViewContext.Provider
      value={{
        conversationType,
        participants,
        messages,
        loadMoreMessages,
        hasMoreMessages,
        isLoadingMessages,
        sendMessage,
        conversationId,
        currentUserId,
        groupId,
        groupName
      }}
    >
      <div className="flex flex-col h-full">{children}</div>
    </ChatViewContext.Provider>
  )
}

export function ChatHeader() {
  const { conversationType, groupName, participants, currentUserId } = useChatView()

  const reciever = participants?.find((who)=>who.userId !== currentUserId)

  return (
    <div className="chat-header p-3 border-b flex items-center gap-3">
      {conversationType === "GROUP" && participants.length > 1 ? (
        <div className="relative h-12 w-12">
          {participants.slice(0, 3).map((p, i) => (
            
            <Avatar
              key={p.id}
              className={cn(
                "h-8 w-8 border-2 border-white dark:border-gray-900 absolute",
                i === 0 && "top-0 left-0",
                i === 1 && "top-0 right-0",
                i === 2 && "bottom-0 left-1/4",
              )}
            >
              <AvatarImage src={p.user.image || p.user.profile.profilePicture || "/placeholder.svg"} alt={groupName} />
              <AvatarFallback>{p.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      ) : (
        <div className="individual-header flex items-center gap-2">
          {participants && (
            <>
            <Avatar className="h-10 w-10">
            <AvatarImage src={reciever?.user.image || reciever?.user.profile.profilePicture  || "/placeholder.svg"} alt={reciever?.user.name} />
            <AvatarFallback>{reciever?.user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{reciever?.user.name}</span>
          </>)}
          
        </div>
      )}
    </div>
  )
}

export function TextView() {
  const { messages, loadMoreMessages, hasMoreMessages, isLoadingMessages, participants, currentUserId } = useChatView()

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [initialScroll, setInitialScroll] = useState(true)



  // Get participant by ID for displaying sender info
  const getParticipant = (id: string) => {
    return (
      participants?.find((p) => p.userId === id)
    )
  }

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messagesEndRef.current && initialScroll) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" })
      setInitialScroll(false)
    }
  }, [messages, initialScroll])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (loadingRef.current && hasMoreMessages) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting && !isLoadingMessages && hasMoreMessages) {
            loadMoreMessages()
          }
        },
        { threshold: 0.1 },
      )

      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreMessages, hasMoreMessages, isLoadingMessages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      
      {/* Loading indicator for infinite scroll */}
      <div ref={loadingRef} className="h-10 flex items-center justify-center">
        {isLoadingMessages && hasMoreMessages && (
          <div className="animate-pulse text-sm text-gray-500">Loading more messages...</div>
        )}
      </div>


      {/* Messages */}
      {messages?.map((message) => {
        const isCurrentUser = message.userId === currentUserId
        const sender = getParticipant(message.userId)

        return (
          <div
            key={message.id}
            className={cn("flex h-auto items-end gap-2 flex-1", isCurrentUser ? "justify-end" : "justify-start")}
          >
            {!isCurrentUser && (
              <Avatar className="h-8 w-8">
          <AvatarImage src={sender?.user.image || sender?.user.profile.profilePicture || "/placeholder.svg"} alt={sender?.user.name} />
          <AvatarFallback>{sender?.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col max-w-[70%]">
              {!isCurrentUser && <span className="text-xs text-gray-500 mb-1">{sender?.user.name}</span>}
              <div
          className={cn(
            "p-3 rounded-lg",
            isCurrentUser
              ? "bg-cyan-700 text-black rounded-br-none"
              : "bg-cyan-400 dark:bg-gray-700 rounded-bl-none",
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
      })}

      {/* Anchor for scrolling to the most recent message */}
      <div ref={messagesEndRef} />
    </div>
  )
}

export function ChatInput() {
  const {user} = useUserSession()
  const { sendMessage, conversationType, conversationId } = useChatView()
  // const [message, setMessage] = useState<{newMessage: { conversationType?: "DIRECT" | "DIRECT", message?: string, receiverId?: string, conversationId?: string}}>()
  const [content, setContent] = useState('')
  const {id} = useParams()

    const searchParams = useSearchParams()
  const search = searchParams.get('recieverId')

  
  const handleSendMessage = () => {
    if (content?.trim() || !content) {
      sendMessage({conversationId, conversationType, message: content, currentUserId: user?.id!, receiverId:   search as string})
      
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full h-[4rem] flex items-center gap-2 p-3 border-t">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button
        onClick={handleSendMessage}
        className="bg-green-600 hover:bg-green-700 text-white"
        disabled={!content.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
