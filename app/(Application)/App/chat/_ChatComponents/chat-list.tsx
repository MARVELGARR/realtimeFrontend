"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"

import { useSearchQuery } from "@/actions/api-actions/userAction/getSearch"
import ChatPageHeader from "./chatPageHeader"

import useDebounce from "@/hooks/utilityHooks/useDebounce"
import UserList from "@/components/myComponents/conversations/userList"


type ChatItem = {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  type: "conversation" | "group" | "user"
  avatar: string
}

export function ChatList() {
  const [searchWord, setSearchWord] = useState("")

  const debouncedResult = useDebounce(searchWord, 500)
  const { data, isLoading } = useSearchQuery(debouncedResult, 1, 10)
  


  return (
    <div className="w-full h-full border-r border-gray-200 flex flex-col bg-white">
      <ChatPageHeader />
      <div className="p-4">
        <SearchBar placeholder="Search or start new chat" value={searchWord} onChange={(value: string) => setSearchWord(value)} />
      </div>
      <ScrollArea className="flex-1 ">
        <div className="space-y-2">

          {data?.users.map((item)=>{
            return(

              <UserList data={item!}/>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
