"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageForm } from "@/components/myComponents/chat/messageForm"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import getConversationsWithrecepientId from "@/actions/api-actions/messageActions/getConversation"
import { useSearchParams } from "next/navigation"
import { useSession } from "@/providers/sessionProvider"

export function ChatView() {
  const queryClient = useQueryClient()

  const queryParams = useSearchParams()
  const recepientId = queryParams.get("recepientId")

  
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", { recepientId }],
    queryFn: () => getConversationsWithrecepientId(recepientId as string),
    enabled: !!recepientId,
  })
  
  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ["conversation", { recepientId: recepientId }] });
    console.log(recepientId)
  },[recepientId])

  const { currentUser, isGettingCurentUser } = useSession()

  const currentUserId = currentUser?.id

  if (!recepientId || isLoading ||isGettingCurentUser) {
    return <div>Loading...</div>
  }


  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Chat with {recepientId}</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {data?.messages?.length ? (
          data.messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.userId === currentUserId ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.userId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.updatedAt}</p>
            </div>
          ))
        ) : (
          <div className="w-full h-full">No messages yet start! new chat</div>
        )}
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <MessageForm conversationId={data?.id || ""} reciepientId={recepientId!} />
      </div>
    </div>
  )
}

