"use client";

import type React from "react";

import type {
  Message as ImportedMessageType,
  User,
} from "@/actions/api-actions/messageActions/getConversation";
import { useMemo, useRef, useState } from "react";
import { DropdownMenuMessageOptions } from "./messageOptions";
import { cn } from "@/lib/utils";
import { useSelection } from "@/store/useMessageSelection";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

export type MessageType = ImportedMessageType;

interface MessageProps {
  currentUserId: string;
  recepientId: string;
  message: MessageType;
  currentProfileId: string;
  className?: string;
}

const Message: React.FC<MessageProps> = ({
  message,
  currentProfileId,
  className,
  currentUserId,
  recepientId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const isMyMessage = message.userId === currentUserId;

  const isMessageLiked = message.StarredMessage.some((msg)=>msg.messageId === message.id)

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
        className={`absolute ${selections.includes(message.id)? "text-green-300": ""}  ${
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
        <DropdownMenuMessageOptions
          messages={message}
          
          currentProfileId={currentProfileId}
          isMyMessage={isMyMessage}
          recepientId={recepientId}
          onOpenChange={handleDropdownOpenChange}
        />
        </div>
      )}
      <div
        className={`inline-block relative relative px-4 p-2 rounded-lg ${
        message.userId === currentUserId
          ? "bg-blue-500 text-white mr-4"
          : "bg-gray-200 ml-4"
        }`}
      >
        <p>{message.content}</p>

        {isMessageLiked && (<Star fill="orange" className={`w-4 h-4 absolute ${isMyMessage ? " -right-2 -bottom-1" : " -left-2 -bottom-1"} text-orange`} />)}
      </div>
      </div>
    </div>
  );
};

export default Message;
