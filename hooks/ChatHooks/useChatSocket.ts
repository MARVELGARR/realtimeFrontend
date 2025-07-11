'use client'
import { socket } from "@/configs/socket";
import { useEffect, useState } from "react";
import { messageProp, MessagesProp } from "@/app/(navigationRoute)/(application)/Application/chat/[id]/page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import { useSelection } from "@/store/useMessageSelector";

type useChatSocketProp = {
  conversationId: string;
  setMessages?: React.Dispatch<React.SetStateAction<MessagesProp["messages"]>>
};

const useChatSocket = ({ conversationId, setMessages }: useChatSocketProp) => {
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);


  const queryClient =  useQueryClient()
  const {clearSelections} = useSelection()

  useEffect(() => {
    if (conversationId) {
      socket.emit("join-conversation", conversationId);
      async function fetchMessages(){
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/read-message/${conversationId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          const data = await response.json();
         
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
      fetchMessages()
    }
    queryClient.invalidateQueries({queryKey: ["convrsations"]})
    queryClient.invalidateQueries({queryKey: ["message-count"]})


  }, [conversationId]);

  //Handle Incoming Messages
  useEffect(() => {
    function handleReceiveMessage(message: messageProp){
      if (setMessages) {
        
        setMessages((prev: any[]) => [...prev, message]);
      }
      queryClient.invalidateQueries({queryKey: ["convrsations"]})
      queryClient.invalidateQueries({queryKey: ["message-count"]})
     
    };


    const handleInvalidateConvo = ({messageId, userId}:{messageId: string, userId: string}) =>{
      
      queryClient.invalidateQueries({queryKey: ["messages"]})
      queryClient.invalidateQueries({queryKey: ["convrsations"]})
      queryClient.invalidateQueries({queryKey: ["message-count"]})
      clearSelections()
      toast("messages was deleted ")
    }




    

    function handleTyping(userId: string) {
      setTypingUser(userId);
    }
    function handleOnlineUsers(users: string[]) {
      setOnlineUsers(users);
    }

    socket.on("receive-message", handleReceiveMessage);
    socket.on("user-typing", handleTyping);
    socket.on("online-users", handleOnlineUsers);
    socket.on("message-deleted", handleInvalidateConvo)
    socket.on("multiple-messages-deleted", handleInvalidateConvo)
  
    
    return () => {
      
      socket.off("receive-message", handleReceiveMessage);
      socket.off("user-typing", handleTyping);
      socket.off("online-users", handleOnlineUsers);
      socket.off("online-users", handleOnlineUsers);
      socket.off("message-deleted", handleInvalidateConvo)
      socket.off("multiple-messages-deleted", handleInvalidateConvo)
    };
  },[]);

  const sendMessage = (newMessage: { conversationType?: "DIRECT" | "GROUP", message?: string,  conversationId?: string, recieverId?: string, currentUserId: string}) => {
    socket.emit("send-message", newMessage);
    
  };

  const deleteMessage = (messageId?: string, conversationId?: string) => {
    socket.emit("delete-single-message", { messageId, conversationId });
  }
  const deleteMultipleMessage = (messageIds?: string[], conversationId?: string) => {
    socket.emit("delete-multiple-messages", { messageIds , conversationId });
  }
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
    deleteMessage,
    deleteMultipleMessage
  };
};

export default useChatSocket;
