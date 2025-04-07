"use client";
import { CurrentUserType } from "@/components/myComponents/utilityComponent/types";
import { GetAndSetMessageRead } from "@/hooks/utilityHooks/usemessageRead";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import io from "socket.io-client";

export const socket = io(`ws://${process.env.NEXT_PUBLIC_API_URL_WBESOCKET}`, {
    transports: ["websocket"],
});

const messageCount = GetAndSetMessageRead("messageCount").getItem();

// Removed duplicate declaration of currentUser

socket.on("unread-message", ({ from, unreadCount }: {from: string, unreadCount: any}) => {
    // Get current data
    const stored = localStorage.getItem("unreadMessages");
    const unreadMessages = stored ? JSON.parse(stored) : {};
  
    // Update count for this user
    unreadMessages[from] = unreadCount;
  
    // Save it back
    localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
  });

  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem();

if (currentUser) {
  const stored = localStorage.getItem("unreadMessages");
  const unreadMessages = stored ? JSON.parse(stored) : {};

  socket.emit("connect", {
    userId: currentUser.id,
    messages: unreadMessages,
  });
}

socket.on("disconnect", () => {
    sessionStorage.setItem("status", "offline");
    console.log("Socket disconnected");
});

socket.on("connect_error", (error: any) => {
    console.error("Socket connection error:", error);
});