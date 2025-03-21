"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageForm } from "@/components/myComponents/chat/messageForm"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import getConversationsWithrecepientId from "@/actions/api-actions/messageActions/getConversation"
import { useSearchParams } from "next/navigation"
import { useSession } from "@/providers/sessionProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Message from "@/components/myComponents/chat/message"
import { Trash2Icon } from "lucide-react"
import { useSelection } from "@/store/useMessageSelection"
import useDeleteMessages from "@/hooks/messageHooks/useDeleteMessages"
import { toast } from "@/hooks/use-toast"
import { DeleteMessagesDemo } from "@/components/myComponents/utilityComponent/deleteMessagesDialog"
import { Button } from "@/components/ui/button"
import useGroupConversation from "@/hooks/messageHooks/useGroupConversationHook"
import GroupChatView from "@/components/myComponents/conversations/groupChatView"
import { ProfilePicDropdown } from "@/components/myComponents/chat/profilePicDropDown"
import useGroupConversation from "@/hooks/messageHooks/useGroupConversationHook"
import GroupChatView from "@/components/myComponents/conversations/groupChatView"

export function ChatView() {
  const queryClient = useQueryClient()

  const queryParams = useSearchParams()
  const recepientId = queryParams.get("recepientId")
  const conversationId = queryParams.get("conversationId")

  
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", { recepientId }],
    queryFn: () => getConversationsWithrecepientId(recepientId as string),
    enabled: !!recepientId,
  })

  const {groupConversation, isLoadingGroupConversation} =useGroupConversation(conversationId as string)
  
  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ["conversation", { recepientId: recepientId }] });
  },[recepientId])

  
  const { currentUser, isGettingCurentUser } = useSession()
  const recepientName = data?.participants.find((user)=>user.user.id !== currentUser?.id)?.user.name
  const recepientProfilePic = data?.participants.find((user)=>user.user.id !== currentUser?.id)?.user.image
  const currentUserId = currentUser?.id
  const profileId = currentUser?.profile.id

  

  const {selections, setSelections, clearSelections } = useSelection()
  const {DeleteMessages, isDeletingMessages} = useDeleteMessages(recepientId as string)

  if ( isLoading ||isGettingCurentUser) {
    return <div>Loading...</div>
  }

  if(!recepientId && !conversationId){
    return (
      <div className="w-full h-full flex justify-center items-center ">No Chat history</div>
    )
  }

  const handleDeleteSelectedMessages = async () =>{
    DeleteMessages(selections!).then(()=>{
      toast({
        title: "messages deleted",
        variant: "success"
      })
      setSelections("")
    }).catch((error)=>{
      toast({
        title: "messages deleted",
        variant: "destructive"
      })
    })
  }

  if(conversationId && groupConversation){
    return (
      <GroupChatView groupConversation={groupConversation}  />
    )
  }

  if(recepientId){
    
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between item-center">
        {selections && selections.length > 0 ? (<>
        <div className="">
          <p className=''> Selected: {selections.length}</p>
          </div></>):(<div className="p-4  border-gray-200 flex gap-[3rem] item-center">

            <ProfilePicDropdown recepientId={recepientId} className=" cursor-pointer" recepientName={recepientName!} recepientProfilePic={recepientProfilePic!}/>

          <h2 className="text-xl font-semibold">{recepientName}</h2>
        </div>)}
        <div className="flex items-center gap-3">

          {selections && selections?.length > 0 &&(
            <DeleteMessagesDemo handleDeleteSelectedMessages={handleDeleteSelectedMessages}/>
          )}
          {selections && selections?.length > 0 &&(
            <Button className=" h-8" onClick={clearSelections} variant={"outline"}>Cancel</Button>
          )}
        </div>
      </div>
      <ScrollArea className="flex-1 py-4 w-full">
        {data?.messages?.length ? (
          data.messages.map((message) => (
            <Message className={selections?.includes(message.id) ? " bg-green-200/[20%] " : ""} key={message.id} message={message} recepientId={recepientId as string} currentProfileId={profileId as string} currentUserId={currentUserId as string}/>
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
}



