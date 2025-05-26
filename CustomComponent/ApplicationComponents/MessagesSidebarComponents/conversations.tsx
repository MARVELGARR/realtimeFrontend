"use client";
import SearchBar from "@/CustomComponent/utilityComponent/searchBar";
import { apiClient } from "@/utils/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConversationList } from "../conversation/conversationList";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import useDebounce from "@/hooks/UtilityHooks/useDebounce";

export interface ConversationsResponse {
  conversations: Conversation[];
  totalCount: number;
}

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  groupId: string | null;
  conversationType: 'DIRECT' | 'GROUP';
  group: Group | null;
  unreadStates: UnreadState[];
  participants: Participant[];
  messages: Message[];
}

export interface Group {
  id: string;
  name: string;
  groupImage: string | null;
  disappearingMessages: 'OFF' | 'ON';
  createdAt: string;
  updatedAt: string;
  descriptions: string | null;
  creatorId: string;
  adminId: string;
}

export interface UnreadState {
  unreadCount: number;
  lastReadAt: string;
}

export interface Participant {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  conversationId: string;
  groupId: string | null;
  groupRole: 'PARTICIPANT' | 'ADMIN';
  user: User;
}

export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: 'DIRECT' | 'GROUP';
  userId: string;
  conversationId: string;
  editableUntil: string;
}


const Conversations = () => {
  const {user} = useUserSession()
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm)

  const limit = 3;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["convrsations", limit, debouncedSearchTerm],
    queryFn: ({ pageParam = 0 }) =>
      apiClient<ConversationsResponse>("/conversations", {
        method: "GET",
        queryParams: {
          limit,
          searchTerm: debouncedSearchTerm,
          offset: pageParam,
        },
        headers: "Application/Json",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.totalCount;
      const nextOffset = allPages.length * limit;
      return nextOffset < totalItems ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
  if(!data){
    return <div className="w-full h-full flex items-center">No conversation Yet</div>
  }
const conversations = data?.pages.flatMap((page) => page.conversations) || [];


const Friends = conversations.filter((convo)=>{
  
})



const currentUserId = user?.id as string

  return (
    <div className="">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <div className=" mt-4">
        {conversations && (<ConversationList currentUserId={currentUserId!} conversations={conversations!}/>)}
      </div>
    </div>
  );
};

export default Conversations;
