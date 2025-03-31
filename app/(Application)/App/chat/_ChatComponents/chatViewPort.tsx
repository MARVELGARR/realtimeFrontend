import getMessages, { GetMessagesProp, MessageProp } from "@/actions/api-actions/chatActions/getMessages";
import { GetGroupMessagesProp } from "@/actions/api-actions/groupActions/getGroupMessages";
import { Conversation } from "@/actions/api-actions/messageActions/getConversation";
import Message from "@/components/myComponents/chat/message";
import { CurrentUserType } from "@/components/myComponents/utilityComponent/types";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { cn } from "@/lib/utils";
import { socket } from "@/socket/socket";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type ChatViewPortProp = {
    className?: string,
    selections:string[],
    recepientId: string,
    profileId: string,
    currentUserId: string
}

const ChatViewPort = ({ selections, currentUserId, profileId, className, recepientId}:ChatViewPortProp) => {

    const [message, setMessages] = useState<GetMessagesProp["Messages"][] | null>(null);
    const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem();
    const userProfile = currentUser?.profile.id;

    
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef(0);

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

    // Store messages after query success
    useEffect(() => {
        if (isSuccess && data) {
          setMessages(
            data.pages
              .flatMap((items) => items.Messages)
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          );
        }
      }, [isSuccess, data]);

      useEffect(() => {
        if (!isFetching && scrollRef.current) {
          const newHeight = scrollRef.current.scrollHeight;
          const heightDiff = newHeight - previousHeightRef.current;
          scrollRef.current.scrollTop += heightDiff; // Maintain scroll position
        }
      }, [data]);

      // Listen for new messages from WebSocket
  useEffect(() => {
    const handleNewMessage = (newMessage: MessageProp) => {
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, newMessage] : [newMessage]
      );

      // Scroll to bottom if user is near the bottom
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isNearBottom = scrollHeight - scrollTop <= clientHeight + 50; // 50px buffer
        if (isNearBottom) {
          scrollRef.current.scrollTop = scrollHeight;
        }
      }
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      previousHeightRef.current = scrollRef.current?.scrollHeight || 0;
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div ref={scrollRef} className={cn(className,"flex-1 py-4 w-full z-10 overflow-auto h-[200px]")}>
        { message && message?.length > 0 ? (
          message.map((message, index) => (
            <div key={message.id} ref={ index === 0 ? ref : null } className="">

                <Message className={selections?.includes(message.id) ? " bg-green-200/[20%] " : ""} message={message} recepientId={recepientId as string} currentProfileId={profileId as string} currentUserId={currentUserId as string}/>
            </div>
          ))
        ) : (
          <div className="w-full h-full">No messages yet start! new chat</div>
        )}
      </div>
    );
}
 
export default ChatViewPort;