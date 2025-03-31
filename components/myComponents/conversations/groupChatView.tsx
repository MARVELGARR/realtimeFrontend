"use client";
import { useSelection } from "@/store/useMessageSelection";
import { DeleteMessagesDemo } from "../utilityComponent/deleteMessagesDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import useDeleteMessages from "@/hooks/messageHooks/useDeleteMessages";
import { GroupMessageForm } from "../chat/groupMessageForm";
import { GroupProfilePicDropdown } from "../chat/GroupProfilePicDropdown";
import { socket } from "@/socket/socket";
import { ForwardedRef, useEffect, useRef, useState } from "react";
import { CurrentUserType } from "../utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import useGroupConversation from "@/hooks/messageHooks/useGroupConversationHook";
import { useSearchParams } from "next/navigation";

import GroupMessageViewPort from "../groupComponent/groupMessageViewPort";

type groupChatViewProp = {
  className?: string;
};
export const GroupChatView = ({  className }: groupChatViewProp) => {
  const queryParams = useSearchParams()
  const { selections, setSelections, clearSelections } = useSelection();
  
 
  const conversationId = queryParams.get("conversationId")
 const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()
 
 const {groupConversation, isLoadingGroupConversation} =useGroupConversation(conversationId as string)

  const groupName = groupConversation?.group.name;
  const groupImage = groupConversation?.group.groupImage;
  const groupId = groupConversation?.groupId;
  const groupBio = groupConversation?.group.descriptions;
  const userId = currentUser?.id;



  useEffect(()=>{
    if (groupId && conversationId && userId) {
      socket.emit("join-group-conversation", { conversationId, groupId, userId })
      console.log("join-group-conversation event emitted!")
    }
  },[])

  const { DeleteMessages, isDeletingMessages } = useDeleteMessages(
    conversationId as string
  );

  const currentUserProfile = currentUser?.profile.id;

  const handleDeleteSelectedMessages = async () => {
    DeleteMessages(selections!)
      .then(() => {
        toast({
          title: "messages deleted",
          variant: "success",
        });
        setSelections("");
      })
      .catch((error) => {
        toast({
          title: "messages deleted",
          variant: "destructive",
        });
      });
  };
  return (
    <div className={cn("w-full h-full flex flex-col")}>
      <div  className="p-4 z-50 border-b overflow-hidden ove border-gray-200 flex justify-between item-center">
        {selections && selections.length > 0 ? (
          <>
            <div className="">
              <p className=""> Selected: {selections.length}</p>
            </div>
          </>
        ) : (
          <div className="p-4  border-gray-200 flex gap-[3rem] item-center">
            <GroupProfilePicDropdown
              groupId={groupId!}
              className=" cursor-pointer"
              groupName={groupName!}
              recepientProfilePic={groupImage!}
            />
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-semibold">{groupName}</h2>
              <p className="">{groupBio}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          {selections && selections?.length > 0 && (
            <DeleteMessagesDemo
              handleDeleteSelectedMessages={handleDeleteSelectedMessages}
              isDeletingMessages={isDeletingMessages}
            />
          )}
          {selections && selections?.length > 0 && (
            <Button
              className=" h-8"
              onClick={clearSelections}
              variant={"outline"}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {!isLoadingGroupConversation ? (<GroupMessageViewPort 
           conversationId={conversationId!}/>) : (
        <div className="">loading</div>
      )}
      
      <div className="p-4 border-t border-gray-200">
        <GroupMessageForm
          groupId={groupConversation?.groupId}
          conversationId={groupConversation?.id || ""}
        />
      </div>
    </div>
  );
};



