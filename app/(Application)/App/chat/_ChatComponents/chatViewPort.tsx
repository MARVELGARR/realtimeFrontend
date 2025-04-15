import getMessages, { GetMessagesProp, MessageProp, SockedReceivedMessageProp } from "@/actions/api-actions/chatActions/getMessages";
import Message from "@/components/myComponents/chat/message";
import { CurrentUserType } from "@/components/myComponents/utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { cn } from "@/lib/utils";
import { socket } from "@/socket/socket";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type ChatViewPortProp = {
  className?: string,
  selections: string[],
  recepientId: string, // This is actually used as the conversationId
  profileId: string,
  currentUserId: string
  conversationId: string
}

const ChatViewPort = ({ selections, currentUserId, conversationId, profileId, className, recepientId }: ChatViewPortProp) => {
  // For clarity in the implementation

  const queryClient = useQueryClient()  
  const [messages, setMessages] = useState<GetMessagesProp["Messages"][] | null>(null);
  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem();
  const userProfile = currentUser?.profile.id;
  
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef(0);
  const isAtBottomRef = useRef(true);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching
  } = useInfiniteQuery({
    queryKey: ["get-messages", { recepientId }],
    queryFn: ({ pageParam: cursor = null }) => getMessages(recepientId, cursor, 7),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
  });

  // Join conversation when component mounts

  

  // Store messages after query success
  useEffect(() => {
    if (isSuccess && data) {
      setMessages(
        data.pages
          .flatMap((items) => items.Messages)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
      
      // After loading messages, scroll to bottom on initial load
      setTimeout(() => {
        if (scrollRef.current && isAtBottomRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isSuccess, data]);

  // Maintain scroll position when loading more messages
  useEffect(() => {
    if (!isFetching && scrollRef.current) {
      const newHeight = scrollRef.current.scrollHeight;
      const heightDiff = newHeight - previousHeightRef.current;
      if (heightDiff > 0) {
        scrollRef.current.scrollTop += heightDiff;
      }
    }
  }, [isFetching]);

  // Track if user is at bottom of scroll
  useEffect(() => {
    const checkIfAtBottom = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 50;
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkIfAtBottom);
      return () => scrollElement.removeEventListener('scroll', checkIfAtBottom);
    }
  }, []);

  // Listen for new messages from WebSocket
  useEffect(() => {
    const handleNewMessage = (newMessage: SockedReceivedMessageProp) => {


      setMessages(prevMessages => {
        if (prevMessages?.some(msg => msg.id === newMessage.newMessage.id)) return prevMessages;
        return prevMessages ? [...prevMessages, newMessage.newMessage] : [newMessage.newMessage];
      });

      console.log("New message received:", newMessage);
  
      if (newMessage.newMessage.userId !== currentUserId) {
        socket.emit("message-read", {
          conversationId,
          userId: currentUserId
        });
      }

      

      if (scrollRef.current && isAtBottomRef.current) {
        setTimeout(() => {
          scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
        }, 100);
      }
    };

      
    socket.on("receive-message", handleNewMessage);
    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [conversationId, currentUserId]);
  

  // Fetch more messages when scrolling to top
  useEffect(() => {
    if (inView && hasNextPage) {
      previousHeightRef.current = scrollRef.current?.scrollHeight || 0;
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div 
      ref={scrollRef} 
      className={cn(className, "flex-1 py-4 w-full z-10 overflow-auto h-[200px]")}
    >
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={message.id} ref={index === 0 ? ref : null}>
            <Message 
              className={selections?.includes(message.id) ? "bg-green-200/[20%]" : ""} 
              message={message} 
              recepientId={conversationId} 
              currentProfileId={profileId} 
              currentUserId={currentUserId}
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          No messages yet. Start a new chat!
        </div>
      )}
    </div>
  );
};
 
export default ChatViewPort;