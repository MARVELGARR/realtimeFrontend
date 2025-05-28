"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Copy, Send, Trash2Icon } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

import type { convoDetails } from "@/hooks/ChatHooks/useGetConvoDetails";
import type { MessagesProp } from "@/app/(navigationRoute)/(application)/Application/chat/[id]/page";
import { useParams } from "next/navigation";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import { useSearchParams } from "next/navigation";
import { socket } from "@/configs/socket";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import MessageCard from "../MessageComponents/messageCard";
import { useSelection } from "@/store/useMessageSelector";
import { useAlertModal } from "@/store/useAlertModalStore";

type ChatViewProp = {
  conversationType: "DIRECT" | "GROUP";
  participants: convoDetails["participants"];
  messages: MessagesProp["messages"];
  loadMoreMessages: () => Promise<void>;
  hasMoreMessages: boolean;
  isLoadingMessages: boolean;
  sendMessage: (newMessage: {
    conversationType?: "DIRECT" | "GROUP";
    message?: string;
    currentUserId: string;
    receiverId?: string;
    conversationId?: string;
  }) => Promise<void>;
  currentUserId: string;
  groupName?: string;
  groupId?: string;
  conversationId: string;
};

const ChatViewContext = createContext<ChatViewProp | null>(null);

export function useChatView() {
  const context = useContext(ChatViewContext);
  if (!context) {
    throw new Error("useChatView must be used within a ChatView provider");
  }
  return context;
}

export function ChatView({
  children,
  conversationType,
  participants,
  messages,
  loadMoreMessages,
  hasMoreMessages,
  isLoadingMessages,
  sendMessage,
  currentUserId,
  groupName,
  groupId,
  conversationId,
}: {
  children: ReactNode;
  conversationType: "DIRECT" | "GROUP";
  participants: convoDetails["participants"];
  messages: MessagesProp["messages"];
  loadMoreMessages: () => Promise<void>;
  hasMoreMessages: boolean;
  isLoadingMessages: boolean;
  sendMessage: (newMessage: {
    conversationType?: "DIRECT" | "GROUP";
    message?: string;
    currentUserId: string;
    receiverId?: string;
    conversationId?: string;
  }) => Promise<void>;
  currentUserId: string;
  groupName?: string;
  groupId?: string;
  conversationId: string;
}) {
  useEffect(() => {
    if (conversationId) {
      socket.emit("join-conversation", conversationId);
    }
  }, [conversationId]);
  return (
    <ChatViewContext.Provider
      value={{
        conversationType,
        participants,
        messages,
        loadMoreMessages,
        hasMoreMessages,
        isLoadingMessages,
        sendMessage,
        conversationId,
        currentUserId,
        groupId,
        groupName,
      }}
    >
      <div className="flex flex-col h-full">{children}</div>
    </ChatViewContext.Provider>
  );
}

export function ChatHeader() {
  const { conversationType, groupName, participants, currentUserId } =
    useChatView();

    const {onOpen} = useAlertModal()

  const reciever = participants?.find((who) => who.userId !== currentUserId);
  const { selections, clearSelections } = useSelection();
  return (
    <div className="chat-header h-[4rem] p-3 border-b flex items-center gap-3">
      {conversationType === "GROUP" && participants.length > 1 ? (
        <div className="relative h-12 w-12">
          {participants.slice(0, 3).map((p, i) => (
            <Avatar
              key={p.id}
              className={cn(
                "h-8 w-8 border-2 border-white dark:border-gray-900 absolute",
                i === 0 && "top-0 left-0",
                i === 1 && "top-0 right-0",
                i === 2 && "bottom-0 left-1/4"
              )}
            >
              <AvatarImage
                src={
                  p.user.image ||
                  p.user.profile.profilePicture ||
                  "/placeholder.svg"
                }
                alt={groupName}
              />
              <AvatarFallback>
                {p.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      ) : (
        <div className="individual-header w-full flex items-center gap-2">
          {participants && (
            <div className="w-full flex items-center ">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      reciever?.user.image ||
                      reciever?.user.profile.profilePicture ||
                      "/placeholder.svg"
                    }
                    alt={reciever?.user.name}
                  />
                  <AvatarFallback>
                    {reciever?.user.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{reciever?.user.name}</span>
              </div>
              {selections && selections?.length && (
                <div className="flex ml-auto items-center gap-4">
                  <Trash2Icon onClick={()=>onOpen("delete-multiple-message")} className=" text-red-700 hover:text-red-500 cursor-pointer" />
                  <Copy className="cursor-pointer text-gray-400 hover:text-white" />
                  <Button
                    className="cursor-pointer bg-cyan-500 hover:bg-red-500 p-2"
                    onClick={clearSelections}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TextView() {
  const {
    messages,
    loadMoreMessages,
    hasMoreMessages,
    isLoadingMessages,
    participants,
    currentUserId,
  } = useChatView();

  // Using react-intersection-observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px 0px 0px 0px", // Load more messages before user reaches the top
  });

  // useEffect(() => {

  //   scrollToBottom();
  // }, []);

  useEffect(() => {
    afterFetchScroll();
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const buttomRef = useRef<HTMLDivElement>(null);

  // Get participant by ID for displaying sender info
  const getParticipant = (id: string) => {
    return participants?.find((p) => p.userId === id);
  };

  const scrollToBottom = () => {
    buttomRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const afterFetchScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  // Load more messages when the loading element comes into view
  useEffect(() => {
    if (inView && hasMoreMessages && !isLoadingMessages) {
      console.log("me", inView);
      loadMoreMessages();
    }
  }, [inView, loadMoreMessages, hasMoreMessages, isLoadingMessages]);

  return (
    <ScrollArea
      className="flex-1 gap-4 h-full  overflow-y-auto p-4"
      ref={scrollAreaRef}
    >
      {/* Loading indicator for infinite scroll with intersection observer ref */}
      <div className="h-10 flex items-center justify-center sticky top-0 z-10">
        {isLoadingMessages && (
          <div className="animate-pulse text-sm text-gray-500">
            Loading more messages...
          </div>
        )}
      </div>
      {messages.length < 1 && (
        <div className="w-full h-full flex items-center justify-center text-white">No Chat Yet!!    Start a new chat</div>
      )}

      {/* Messages */}
      {messages?.map((message, index) => {
        const isCurrentUser = message.userId === currentUserId;
        const sender = getParticipant(message.userId);
        const isFirstMessage = index === 0;
        const isSecondMessage = index === 2;

        return (
          <MessageCard
            key={message.id}
            ref={isFirstMessage ? ref : isSecondMessage ? messagesEndRef : null} // Pass ref only to first message for infinite scroll
            message={message}
            conversationId={message.conversationId}
            isCurrentUser={isCurrentUser}
            sender={
              sender
                ? {
                    name: sender.user.name,
                    image: sender.user.image,
                    profilePicture: sender.user.profile?.profilePicture,
                  }
                : null
            }
          />
        );
      })}

      <div ref={buttomRef} className="text-white w-full h-full items-center justify-center"></div>
    </ScrollArea>
  );
}

export function ChatInput() {
  const { user } = useUserSession();
  const { sendMessage, conversationType, conversationId } = useChatView();
  const [content, setContent] = useState("");
  const { id } = useParams();

  const searchParams = useSearchParams();
  const search = searchParams.get("recieverId");

  const handleSendMessage = () => {
    if (content?.trim() || !content) {
      sendMessage({
        conversationId,
        conversationType,
        message: content,
        currentUserId: user?.id!,
        receiverId: search as string,
      });
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full flex items-center gap-2 p-3">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button
        onClick={handleSendMessage}
        className="bg-green-600 hover:bg-green-700 text-white"
        disabled={!content.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
