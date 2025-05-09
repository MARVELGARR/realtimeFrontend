'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { createContext, ReactNode, useContext } from "react";

type Participant = {
  id: string;
  name: string;
  avatar: string;
};

type ChatViewProp = {
  conversationType: string;
  participants: Participant[];
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
}: {
  children: ReactNode;
  conversationType: string;
  participants: Participant[];
}) {
  return (
    <ChatViewContext.Provider value={{ conversationType, participants }}>
      {children}
    </ChatViewContext.Provider>
  );
}

export function ChatHeader() {
  const { conversationType, participants } = useChatView();

  return (
    <div className="chat-header">
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
              <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.name} />
              <AvatarFallback>{p.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      ) : (
        <div className="individual-header flex items-center gap-2">
          <img
            src={participants[0]?.avatar || "/placeholder.svg"}
            alt={participants[0]?.name}
            className="h-10 w-10 rounded-full"
          />
          <span>{participants[0]?.name}</span>
        </div>
      )}
    </div>
  );
}
