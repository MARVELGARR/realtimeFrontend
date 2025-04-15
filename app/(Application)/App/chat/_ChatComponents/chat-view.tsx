"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageForm } from "@/components/myComponents/chat/messageForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getConversationsWithrecepientId from "@/actions/api-actions/messageActions/getConversation";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/providers/sessionProvider";
import Message from "@/components/myComponents/chat/message";
import { useSelection } from "@/store/useMessageSelection";
import useDeleteMessages from "@/hooks/messageHooks/useDeleteMessages";
import { toast } from "@/hooks/use-toast";
import { DeleteMessagesDemo } from "@/components/myComponents/utilityComponent/deleteMessagesDialog";
import { Button } from "@/components/ui/button";
import { ProfilePicDropdown } from "@/components/myComponents/chat/profilePicDropDown";
import useGroupConversation from "@/hooks/messageHooks/useGroupConversationHook";
import { GroupChatView } from "@/components/myComponents/conversations/groupChatView";
import ChatViewPort from "./chatViewPort";
import { socket } from "@/socket/socket";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { CurrentUserType } from "@/components/myComponents/utilityComponent/types";
import { getRoomId } from "@/lib/utils";
import onReadMessage from "@/actions/api-actions/chatActions/onReadMessage";
import createStoreSearchWord from "@/store/storeSearchValue";
import useReadMessage from "@/hooks/chatJooks/useReadMessage";

export function ChatView() {
  const queryClient = useQueryClient();

  const queryParams = useSearchParams();
  const recepientId = queryParams.get("recepientId");
  const conversationId = queryParams.get("conversationId");

  const { data, isLoading } = useQuery({
    queryKey: ["conversation", { recepientId }],
    queryFn: () => getConversationsWithrecepientId(recepientId as string),
    enabled: !!recepientId,
  });

  const { groupConversation, isLoadingGroupConversation } =
    useGroupConversation(conversationId as string);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["conversation", { recepientId: recepientId }],
    });
  }, [recepientId]);

  const currentUser =
    useSessionStorage<CurrentUserType>("currentUser").getItem();
  const recepientName = data?.participants.find(
    (user) => user.user.id !== currentUser?.id
  )?.user.name;
  const recepientProfilePic = data?.participants.find(
    (user) => user.user.id !== currentUser?.id
  )?.user.image;
  const currentUserId = currentUser?.id;
  const profileId = currentUser?.profile.id;

  const singleConversationId = data?.id

  const { selections, setSelections, clearSelections } = useSelection();
  const { DeleteMessages, isDeletingMessages } = useDeleteMessages(
    recepientId as string
  );

  const seachword = createStoreSearchWord().getState().searchWord;

  const {isRead} = useReadMessage(singleConversationId as string);

  useEffect(()=>{
    queryClient.invalidateQueries({
      queryKey: ["search", seachword, 1, 10]
    })

  },[isRead])

  useEffect(() => {
    const joinRoom = async() => {
      if (!recepientId || !currentUserId) return;
      console.log("🟢 Emitting join-conversation:", {
        recepientId,
        userId: currentUserId,
      });
      const roomId = getRoomId(currentUserId, recepientId);
      socket.emit("join-conversation", { roomId });
      
    };

    if (!socket.connected) {
      socket.once("connect", () => {
        console.log("✅ Socket connected. Now joining conversation.");
        joinRoom();
      });
    } else {
      joinRoom();
    }

    // Optional: rejoin on reconnect too
    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [recepientId, currentUserId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recepientId && !conversationId) {
    return (
      <div className="w-full h-full flex  justify-center items-center ">
        No Chat history
      </div>
    );
  }

  if (conversationId !== null) {
    <GroupChatView />;
  }

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

  if (recepientId) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between item-center">
          {selections && selections.length > 0 ? (
            <>
              <div className="">
                <p className=""> Selected: {selections.length}</p>
              </div>
            </>
          ) : (
            <div className="p-4  border-gray-200 flex gap-[3rem] item-center">
              <ProfilePicDropdown
                recepientId={recepientId}
                className=" cursor-pointer"
                recepientName={recepientName!}
                recepientProfilePic={recepientProfilePic!}
              />

              <h2 className="text-xl font-semibold">{recepientName}</h2>
            </div>
          )}
          <div className="flex items-center gap-3">
            {selections && selections?.length > 0 && (
              <DeleteMessagesDemo
                isDeletingMessages={isDeletingMessages}
                handleDeleteSelectedMessages={handleDeleteSelectedMessages}
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
        <ChatViewPort
          currentUserId={currentUserId!}
          profileId={profileId!}
          recepientId={recepientId}
          selections={selections!}
          conversationId={data?.id!}
        />
        <div className="p-4 border-t border-gray-200">
          <MessageForm
            conversationId={data?.id || ""}
            reciepientId={recepientId!}
          />
        </div>
      </div>
    );
  }
}
