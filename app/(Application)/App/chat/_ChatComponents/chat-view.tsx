"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageForm } from "@/components/myComponents/chat/messageForm";
import { useQuery } from "@tanstack/react-query";
import getConversationsWithrecepientId from "@/actions/api-actions/messageActions/getConversation";
import userSession from "@/store/userSession";

export function ChatView() {
  const queryParams = new URLSearchParams(window.location.search);
  const recepientId = queryParams.get("recepientId");
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", { recepientId }],
    queryFn: () => getConversationsWithrecepientId(recepientId as string),
  });

  
  const currentUserId = localStorage.getItem("userId")


  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Alice</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <>
          {data?.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.userId === currentUserId ? "text-right" : " text-left"}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.userId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.updatedAt}</p>
            </div>
          ))}
        </>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <MessageForm conversationId={data?.id} reciepientId={recepientId as string} />
        </div>
      </div>
    </div>
  );
}