"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar";
import {  ConversationResponse, useSearchQuery } from "@/actions/api-actions/userAction/getSearch";
import ChatPageHeader from "./chatPageHeader";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import ConversatonListItem from "@/components/myComponents/conversations/conversationListItem";
import { Loader2 } from "lucide-react";
import ZustanFilterStore from "@/store/useSearchFilter";
import GroupListItem from "@/components/myComponents/conversations/groupListItems";

export function ChatList() {
  const [searchWord, setSearchWord] = useState("");
  const filterState = ZustanFilterStore((state)=>state.filters)
  const debouncedResult = useDebounce(searchWord, 500);
  const { data, isLoading } = useSearchQuery(debouncedResult, 1, 10, filterState);



  const render = (filterData: ConversationResponse) => {
    if (!filterData && isLoading === false) {
      return <div className="">No result</div>;
    }
    if(isLoading){
      return <div className="w-full flex items-center ">Fetching Conversations</div>
    }

    if (filterData.directConversations.length < 1) {
      return <div className="w-full flex items-center ">There is no conversation</div>;
    }


    

    if (filterData.directConversations.length > 0 ) {
      return (
        <>
          <div className="w-full flex items-center ">
            <strong className="font-bold ">Conversations</strong>
          </div>
          <div className="">
            {filterData.directConversations.map((convo) => (
              <ConversatonListItem key={convo.id} conversation={convo} />
            ))}
          </div>
        </>
      );
    }

    if(filterState.id === "groups"){
      <>
          <div className="w-full flex items-center ">
            <strong className="font-bold ">Groups</strong>
          </div>
          <div className="">
            {filterData.groupConversations.map((convo) => {
              return (
                <GroupListItem key={convo?.id} conversation={convo}/>
              )
            })}
          </div>
        </>
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
        {isLoading && (<Loader2 className="w-3 h-3"/>) }
      </ScrollArea>
    </div>
  );
}