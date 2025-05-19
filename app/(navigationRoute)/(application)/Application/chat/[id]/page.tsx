"use client";
import {
  ChatHeader,
  TextView,
  ChatView,
} from "@/CustomComponent/ChatComponent/chatView";
import { ChatInput } from "@/CustomComponent/ChatComponent/chatView";
import useChatSocket from "@/hooks/ChatHooks/useChatSocket";
import useGetConvoDetails from "@/hooks/ChatHooks/useGetConvoDetails";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import { UserWithProfile } from "@/types";
import { apiClient } from "@/utils/clientApi";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export type messageProp = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "DIRECT" | "GROUP";
  userId: string;
  conversationId: string;
  editableUntil: Date;
};
export type MessagesProp = {
  messages: messageProp[];
  totalCount: number;
};

const ChatViewPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState<messageProp[]>([])
  

  if (!id) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No User Found
      </div>
    );
  }

  const {user} = useUserSession()

  const { convoDetails, isGettingConvoDetails } = useGetConvoDetails(
    id as string
  );

  const chatType = convoDetails?.conversationType;
  const participants = convoDetails?.participants;
  const conversationId = convoDetails?.id

  const queryClient = useQueryClient()
  

  const limit = 9;
  const { data: GottenMessages ,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    isFetched, 
    

  } = useInfiniteQuery({
    queryKey: ["messages", id],
    queryFn: ({ pageParam = 0 }) =>
      apiClient<MessagesProp>("/messages", {
        method: "GET",
        param: id as string,
        queryParams: {
          limit,
          offset: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.totalCount;
      const nextOffset = allPages.length * limit;
      return nextOffset < totalItems ? nextOffset : undefined;
    },
    initialPageParam: 0,

    
  });
  useEffect(() => {

      const gottenMessages = GottenMessages?.pages.flatMap((item)=>item.messages).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  if (gottenMessages && !isLoading) {
    setMessages(gottenMessages); 
  }
}, [isFetched, GottenMessages]);

//   const {sendMessage, isSendingMessage} = useSendMessage()
  const {sendMessage} = useChatSocket({ conversationId: id as string, setMessages,  });


  return (
    <div className='h-screen'>
    <ChatView
      conversationType={chatType!}
      participants={participants!} 
      messages={messages!}
      loadMoreMessages={async () => {
        await fetchNextPage();
      }}
      hasMoreMessages={hasNextPage}
      isLoadingMessages={isFetchingNextPage}
      sendMessage={async (newMessage) => await sendMessage({ 
        ...newMessage, 
        conversationType: chatType === "DIRECT" ? "DIRECT" : "GROUP" 
      })}
      currentUserId={user?.id!}
      conversationId={conversationId!}
    >
      
      <ChatHeader />
      <TextView  />
      <ChatInput />
    </ChatView>
    </div>
  );
};

export default ChatViewPage;
