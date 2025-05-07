"use client";

import { FC, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

interface ConversationCardRootProps {
  isActive?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Root: FC<ConversationCardRootProps> = ({ isActive = false, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isActive ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-900"
      )}
    >
      {children}
    </div>
  );
};

interface AvatarProps {
  type: "direct" | "group";
  participants: User[];
}

const UserAvatars: FC<AvatarProps> = ({ type, participants }) => {
  if (type === "direct") {
    const user = participants[0];
    return (
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    );
  }

  return (
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
  );
};

interface ContentProps {
  type: "direct" | "group";
  participants: User[];
  groupName?: string;
  lastMessage?: Message;
}

const Content: FC<ContentProps> = ({ type, participants, groupName, lastMessage }) => {
  const lastMessageSender = lastMessage
    ? participants.find((p) => p.id === lastMessage.senderId)
    : undefined;

  const otherParticipant = type === "direct" ? participants[0] : undefined;

  const formattedTime = lastMessage?.timestamp
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date(lastMessage.timestamp))
    : "";

  return (
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h3 className="font-medium text-sm truncate">
          {type === "direct" ? otherParticipant?.name : groupName}
        </h3>
        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{formattedTime}</span>
      </div>
      <p className="text-sm text-gray-500 truncate">
        {lastMessage && (
          <>
            {type === "group" && lastMessageSender && (
              <span className="font-medium">{lastMessageSender.name}: </span>
            )}
            {lastMessage.content}
          </>
        )}
      </p>
    </div>
  );
};

interface UnreadBadgeProps {
  unreadCount?: number;
}

const UnreadBadge: FC<UnreadBadgeProps> = ({ unreadCount = 0 }) =>
  unreadCount > 0 ? (
    <div className="flex-shrink-0 ml-2">
      <span className="flex items-center justify-center h-5 w-5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    </div>
  ) : null;

export const ConversationCard = {
  Root,
  Avatars: UserAvatars,
  Content,
  UnreadBadge,
};
