'use client'
import { socket } from "@/configs/socket";
import { useEffect, useState } from "react";
import { messageProp, MessagesProp } from "@/app/(navigationRoute)/(application)/Application/chat/[id]/page";

type useChatSocketProp = {
  conversationId: string;
  setMessages: React.Dispatch<React.SetStateAction<MessagesProp["messages"]>>
};

const useChatSocket = ({ conversationId, setMessages }: useChatSocketProp) => {
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // useEffect(() => {
  //   if (conversationId) {
  //     socket.emit("join-conversation", conversationId);
  //   }
  // }, [conversationId]);

  //Handle Incoming Messages
  useEffect(() => {
    function handleReceiveMessage(message: messageProp){
      console.log("recieved message from socket", message)
      setMessages((prev: any[]) => [...prev, message]);
    };

    function handleTyping(userId: string) {
      setTypingUser(userId);
    }
    function handleOnlineUsers(users: string[]) {
      setOnlineUsers(users);
    }

    socket.on("receive-message", handleReceiveMessage);
    socket.on("user-typing", handleTyping);
    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("user-typing", handleTyping);
      socket.off("online-users", handleOnlineUsers);
    };
  },[]);

  const sendMessage = (newMessage: { conversationType?: "DIRECT" | "GROUP", message?: string,  conversationId?: string, recieverId?: string, currentUserId: string}) => {
    socket.emit("send-message", newMessage);
    
  };

  // Emit typing event
  const emitTyping = () => {
    if (conversationId) {
      socket.emit("typing", conversationId);
    }
  };

  return {
    sendMessage,
    emitTyping,
    onlineUsers,
    typingUser,
  };
};

export default useChatSocket;
