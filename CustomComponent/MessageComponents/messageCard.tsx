"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import MessageOptions from "./messageOption";
import { IoCheckboxOutline } from "react-icons/io5";
import { useSelection } from "@/store/useMessageSelector";
import { Checkbox } from "@/components/ui/checkbox";
// Define the props for the MessageCard component
export type MessageCardProps = {
  message: {
    id: string;
    content: string;
    createdAt: string | Date;
    userId: string;
  };
  conversationId?: string
  isCurrentUser: boolean;
  sender?: {
    name: string;
    image?: string;
    profilePicture?: string;
  } | null;
};

// Use forwardRef to create a component that can accept a ref from its parent
const MessageCard = forwardRef<HTMLDivElement, MessageCardProps>(
  ({ message, isCurrentUser, conversationId, sender }, ref) => {
    const { selections, removeSelections, setSelections } = useSelection();
    return (
      <div
  ref={ref}
  className={cn(
    "flex items-end gap-2 flex-1",
    isCurrentUser ? "justify-end" : "justify-start"
  )}
>
  {/* Show checkbox first if not current user, otherwise last */}
  {!isCurrentUser && selections && selections?.length > 0 && (
    <Checkbox
      id={message.id}
      checked={selections?.includes(message.id)}
      onCheckedChange={(checked) =>
        checked ? setSelections(message.id) : removeSelections(message.id)
      }
    />
  )}

  {!isCurrentUser && (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={sender?.image || sender?.profilePicture || "/placeholder.svg"}
        alt={sender?.name || "User"}
      />
      <AvatarFallback>
        {sender?.name?.substring(0, 2).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  )}

  <div className="relative flex flex-col min-w-[30%] max-w-[70%]">
    {!isCurrentUser && (
      <span className="text-xs text-gray-500 mb-1">{sender?.name}</span>
    )}
    <div
      className={cn(
        "p-3 rounded-lg mb-5",
        isCurrentUser
          ? "bg-cyan-700 text-black rounded-br-none"
          : "bg-cyan-400 dark:bg-gray-700 rounded-bl-none"
      )}
    >
      {message.content}
      <MessageOptions
        id={message.id}
        content={message.content}
        conversationId={conversationId}
        className={`${
          isCurrentUser ? "left-3" : " right-3 "
        } cursor-pointer z-[9999] absolute`}
      />
      <div
        className={`text-xs mt-1 opacity-70 ${
          isCurrentUser ? "text-right" : "text-left"
        }`}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  </div>

  {/* Checkbox on the right side for current user */}
  {isCurrentUser && selections && selections?.length > 0 && (
    <Checkbox
      id={message.id}
      checked={selections?.includes(message.id)}
      onCheckedChange={(checked) =>
        checked ? setSelections(message.id) : removeSelections(message.id)
      }
    />
  )}
</div>

    );
  }
);

// Add a display name for the component (helpful for debugging)
MessageCard.displayName = "MessageCard";

export default MessageCard;
