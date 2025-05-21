"use client";
import SearchBar from "@/CustomComponent/utilityComponent/searchBar";
import { apiClient } from "@/utils/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConversationList } from "../conversation/conversationList";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import useDebounce from "@/hooks/UtilityHooks/useDebounce";

export interface ConversationResponse {
  conversations: Conversation[];
  totalCount: number;
}

type ParticipantUserProp = {
  id: string;
  name: string;
  email: string;

  image: string;
};

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  groupId: string | null;
  unreadStates: UnreadState[]; // currently empty, define properly if needed
  participants: Participant[];
  messages: Message[];
}

export interface UnreadState {
  // Define this properly if structure is known
  unreadCount: number,
  lastReadAt: Date,
}

export interface Participant {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  conversationId: string;
  groupId: string | null;
  groupRole: "PARTICIPANT" | string; // Extend if needed
  
  user: ParticipantUserProp;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: "DIRECT" | string; // Extend if needed
  userId: string;
  conversationId: string;
  editableUntil: string;
}

const Conversations = () => {
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
      apiClient<ConversationResponse>("/conversations", {
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
    return "kmddasdsd"
  }
const conversations = data?.pages.flatMap((page) => page.conversations) || [];


const Friends = conversations.filter((convo)=>{
  
})

const {user} = useUserSession()

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
