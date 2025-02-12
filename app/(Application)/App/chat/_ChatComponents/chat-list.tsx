"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Chat = {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
}

const mockChats: Chat[] = [
  { id: "1", name: "Alice", lastMessage: "Hey, how are you?", time: "10:30 AM", unread: 2 },
  { id: "2", name: "Bob", lastMessage: "Can we meet tomorrow?", time: "Yesterday", unread: 0 },
  { id: "3", name: "Charlie", lastMessage: "I sent the report.", time: "Mon", unread: 1 },
  // Add more mock chats as needed
]

export function ChatList() {
  const [chats] = useState<Chat[]>(mockChats)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full h-full border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search chats..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{chat.name}</h3>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            {chat.unread > 0 && (
              <div className="mt-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

