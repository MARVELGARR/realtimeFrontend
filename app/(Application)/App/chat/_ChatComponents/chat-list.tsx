"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar";
import { ConversationResponse, useSearchQuery } from "@/actions/api-actions/userAction/getSearch";
import ChatPageHeader from "./chatPageHeader";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import ConversatonListItem from "@/components/myComponents/conversations/conversationListItem";
import { Loader2 } from "lucide-react";
import ZustanFilterStore from "@/store/useSearchFilter";
import GroupListItem from "@/components/myComponents/conversations/groupListItems";

export function ChatList() {
  const [searchWord, setSearchWord] = useState("");
  const filterState = ZustanFilterStore((state) => state.filters);
  const debouncedResult = useDebounce(searchWord, 500);
  const { data, isLoading, isError } = useSearchQuery(debouncedResult, 1, 10, filterState);

  const render = (filterData: ConversationResponse | undefined) => {
    if (isLoading) {
      return <div className="w-full flex items-center">Fetching Conversations</div>;
    }

    if (isError || !filterData) {
      return <div className="w-full flex items-center">No result</div>;
    }

    if (filterData.directConversations.length < 1) {
      return <div className="w-full flex items-center">There is no conversation</div>;
    }

    if (filterData.directConversations.length > 0) {
      return (
        <>
          {filterState.id === "all" ? (<>
            <div className="w-full flex items-center">
            <strong className="font-bold">Conversations</strong>
          </div>
          <div>
            {filterData.directConversations.map((convo) => (
              <ConversatonListItem key={convo.id} conversation={convo} />
            ))}
          </div>
          <div className="w-full flex items-center">
            <strong className="font-bold">Groups</strong>
          </div>
          <div>
            {filterData?.groupConversations.map((convo) => (
              <GroupListItem key={convo?.id} conversation={convo} />
            ))}
          </div>
            </>) : filterState.id == "groups" ? (
          <>
          <div className="w-full flex items-center">
            <strong className="font-bold">Groups</strong>
          </div>
          <div>
            {filterData.groupConversations.map((convo) => (
              <GroupListItem key={convo?.id} conversation={convo} />
            ))}
          </div>
        </>): (<></>)}
        </>
      );
    }


    return null;
  };

  return (
    <div className="w-full h-full border-r border-gray-200 flex flex-col bg-white">
      <ChatPageHeader />
      <div className="p-4">
        <SearchBar placeholder="Search or start new chat" value={searchWord} onChange={(value: string) => setSearchWord(value)} />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2">{render(data)}</div>
        {isLoading && <Loader2 className="w-3 h-3" />}
      </ScrollArea>
    </div>
  );
}