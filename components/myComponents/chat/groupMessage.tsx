"use client";

import type React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { DropdownMenuMessageOptions } from "./messageOptions";
import { cn } from "@/lib/utils";
import { useSelection } from "@/store/useMessageSelection";
import { Checkbox } from "@/components/ui/checkbox";
import { Circle, Star } from "lucide-react";
import { GroupMessageType } from "@/actions/api-actions/messageActions/getConversationWithConversationId";
import { DropdownMenuGroupMessageOptions } from "./groupMessageOptions.tsx";
import useStarGroupMessageHook from "@/hooks/messageHooks/useStaringGroupMessageHook";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { CurrentUserType } from "../utilityComponent/types";
import { socket } from "@/socket/socket";
import useGroupMessageHook from "@/hooks/messageHooks/useGroupMessageHook";

interface incomingMessageObjectProp {
  message: string;
  userId: string;
}

interface MessageProps {
  conversationId: string;
  message: GroupMessageType;
  currentProfileId: string;
  className?: string;
}

const GroupMessage: React.FC<MessageProps> = ({
  message,
  currentProfileId,
  className,
  conversationId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSendingGroupMessage } = useGroupMessageHook(conversationId!);

  const currentUser =
    useSessionStorage<CurrentUserType>("currentUser").getItem();
  const currentUserId = currentUser?.id as string;

  const [incomingMessageObject, setIncomingMessageObject] =
    useState<incomingMessageObjectProp | null>(null);

  const { selections, removeSelections, setSelections } = useSelection();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      console.log("Hover event triggered!");
    }, 1000); // 1-second delay
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Check if the mouse is moving to the dropdown
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Only close if dropdown is not open
      if (!isDropdownOpen) {
        setIsHovered(false);
      }
    }
  };

  // Handle dropdown state changes
  const handleDropdownOpenChange = (open: boolean) => {
    setIsDropdownOpen(open);

    // If dropdown is closed and not hovering, hide the dropdown container
    if (!open && !isHovered) {
      setIsHovered(false);
    }
  };

  const { isStaringGroupMessage } = useStarGroupMessageHook(
    conversationId as string
  );

  const isMyMessage = message.userId === currentUserId;

  const isMessageLiked = message.StarredMessage.some(
    (msg) => msg.messageId === message.id
  );

  useEffect(() => {
    // Listen for messages from backend
    const handleMessage = ({
      message,
      userId,
    }: {
      message: string;
      userId: string;
    }) => {
      setIncomingMessageObject({ message, userId });
      console.log("New message received:", { message, userId });
    };

    socket.on("receive-group-message", handleMessage);

    // Cleanup function to remove listener when component unmounts
    return () => {
      socket.off("receive-group-message", handleMessage);
    };
  }, []);

  const isMe = incomingMessageObject?.userId === currentUserId;

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        ` py-5 px-4 ${
          message.userId === currentUserId ? "justify-end" : "justify-start"
        }  flex items-center gap-2 w-full  relative`
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {selections && selections.length > 0 ? (
        <Checkbox
          className={`absolute ${
            selections.includes(message.id) ? "text-green-300" : ""
          }  ${
            message.userId === currentUserId ? "right-0" : "left-0"
          } text-green-500`}
          id={message.id as string}
          checked={selections?.includes(message.id as string) as boolean}
          onCheckedChange={(checked) => {
            checked ? setSelections(message.id) : removeSelections(message.id);
          }}
        />
      ) : (
        <></>
      )}

      <div key={message.id} className={`w-fit relative`}>
        {isHovered && (
          <div
            className={`absolute ${
              message.userId === currentUserId ? "-left-11" : "-right-11"
            }`}
          >
            <DropdownMenuGroupMessageOptions
              messages={message}
              currentProfileId={currentProfileId}
              isMyMessage={isMyMessage}
              conversationId={conversationId}
              onOpenChange={handleDropdownOpenChange}
            />
          </div>
        )}
       <div
  className={`inline-block relative px-4 p-2 rounded-lg ${
    isMyMessage ? "bg-blue-500 text-white mr-4" : "bg-gray-200 ml-4"
  }`}
>
  {isSendingGroupMessage ? (
    <p>Sending...</p>
  ) : incomingMessageObject && isMe ? (
    <p>{incomingMessageObject.message}</p>
  ) : (
    <p>{message.content}</p>
  )}

  {isMessageLiked && (
    <Star
      fill="orange"
      className={`w-4 h-4 absolute ${
        isMyMessage ? " -right-2 -bottom-1" : " -left-2 -bottom-1"
      }`}
    />
  )}
  {isStaringGroupMessage && (
    <Circle
      fill={"black"}
      className={`w-4 h-4 animate-spin absolute ${
        isMyMessage ? " -right-2 -bottom-1" : " -left-2 -bottom-1"
      }`}
    />
  )}
</div>

      </div>
    </div>
  );
};

export default GroupMessage;
