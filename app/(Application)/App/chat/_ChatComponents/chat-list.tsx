"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar";
import { ApiResponse, useSearchQuery } from "@/actions/api-actions/userAction/getSearch";
import ChatPageHeader from "./chatPageHeader";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import ConversatonListItem from "@/components/myComponents/conversations/conversationListItem";
import { Loader2 } from "lucide-react";

export function ChatList() {
  const [searchWord, setSearchWord] = useState("");

  const debouncedResult = useDebounce(searchWord, 500);
  const { data, isLoading } = useSearchQuery(debouncedResult, 1, 10);

  if (isLoading) {
    return <Loader2 className="w-5 g-5" />;
  }

  const render = (filterData: ApiResponse) => {
    if (!filterData) {
      return <div className="">No result</div>;
    }

    if (!filterData.conversations) {
      return <div className="">No conversation</div>;
    }

    if (filterData.conversations.length < 1) {
      return <div className="">There is no conversation</div>;
    }

    if (filterData.totalResults > 0 && filterData.conversations.length > 0 ) {
      return (
        <>
          <div className="">
            <strong className="font-bold">Conversations</strong>
          </div>
          <div className="">
            {filterData.conversations.map((conversation, index) => (
              <ConversatonListItem key={index} conversation={conversation} />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className="w-full h-full border-r border-gray-200 flex flex-col bg-white">
      <ChatPageHeader />
      <div className="p-4">
        <SearchBar placeholder="Search or start new chat" value={searchWord} onChange={(value: string) => setSearchWord(value)} />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2">{render(data!)}</div>
      </ScrollArea>
    </div>
  );
}