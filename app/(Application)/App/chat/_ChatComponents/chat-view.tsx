"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

type Message = {
  id: string
  sender: string
  content: string
  timestamp: string
}

const mockMessages: Message[] = [
  { id: "1", sender: "Alice", content: "Hey, how are you?", timestamp: "10:30 AM" },
  { id: "2", sender: "You", content: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
  { id: "3", sender: "Alice", content: "Doing well! Did you finish the project?", timestamp: "10:32 AM" },
  // Add more mock messages as needed
]

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Alice</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === "You" ? "text-right" : ""}`}>
            <div
              className={`inline-block p-2 rounded-lg ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <p>{message.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 mr-2"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

