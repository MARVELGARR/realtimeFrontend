"use client";
import { GroupConversationProp, GroupMessageType } from "@/actions/api-actions/messageActions/getConversationWithConversationId";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelection } from "@/store/useMessageSelection";
import { DeleteMessagesDemo } from "../utilityComponent/deleteMessagesDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import useDeleteMessages from "@/hooks/messageHooks/useDeleteMessages";
import Message from "../chat/message";
import { GroupMessageForm } from "../chat/groupMessageForm";
import GroupMessage from "../chat/groupMessage";
import { useSession } from "@/providers/sessionProvider";
import { GroupProfilePicDropdown } from "../chat/GroupProfilePicDropdown";
import { socket } from "@/socket/socket";
import { useEffect, useState } from "react";
import { CurrentUserType } from "../utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import useGroupConversation from "@/hooks/messageHooks/useGroupConversationHook";
import { useSearchParams } from "next/navigation";
import { groupMessageProp } from "@/actions/api-actions/messageActions/sendGroupMessage";

type groupChatViewProp = {
  className?: string;
};
export const GroupChatView = ({  className }: groupChatViewProp) => {
  const queryParams = useSearchParams()
  const { selections, setSelections, clearSelections } = useSelection();
  const [incomingMessages, setIncomingMessages] = useState<groupMessageProp[]>([])
 
  const conversationId = queryParams.get("conversationId")
 const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()
 
 const {groupConversation, isLoadingGroupConversation} =useGroupConversation(conversationId as string)

  const groupName = groupConversation?.group.name;
  const groupImage = groupConversation?.group.groupImage;
  const groupId = groupConversation?.groupId;
  const groupBio = groupConversation?.group.descriptions;
  const userId = currentUser?.id;

  useEffect(() => {
    if (groupId && conversationId && userId) {
      socket.emit("join-conversation", { conversationId, groupId, userId })
      console.log("Join-conversation event emitted!")

      // Listen for new messages
      const handleNewMessage = ({ ...prop}: groupMessageProp) => {
        const newMessage: groupMessageProp = {
          ...prop
        }

        setIncomingMessages((prev) => [...prev, newMessage])
      }

      socket.on("receive-group-message", handleNewMessage)

      return () => {
        socket.off("receive-group-message", handleNewMessage)
      }
    }
  }, [userId, groupId, conversationId])



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
      <div className="p-4 border-b border-gray-200 flex justify-between item-center">
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
      <ScrollArea className="flex-1 py-4 w-full">
      {groupConversation?.messages?.length || incomingMessages.length ? (
        groupConversation?.messages.map((message) => (
          <GroupMessage
            className={selections?.includes(message.id) ? " bg-green-200/[20%] " : ""}
            key={message.id}
            message={message}
            conversationId={conversationId as string}
            currentProfileId={currentUserProfile as string}
          />
        ))
      ) : (
        <div className="w-full h-full">No messages yet start! new chat</div>
      )}
    </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <GroupMessageForm
          groupId={groupConversation?.groupId}
          conversationId={groupConversation?.id || ""}
        />
      </div>
    </div>
  );
};



