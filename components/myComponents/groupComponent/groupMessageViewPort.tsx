import { useInfiniteQuery } from "@tanstack/react-query";
import getGroupMessages, { GetGroupMessagesProp, GroupMessageProp } from "@/actions/api-actions/groupActions/getGroupMessages";
import { useEffect, useRef, useState } from "react";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { CurrentUserType } from "../utilityComponent/types";
import { socket } from "@/socket/socket";
import GroupMessage from "../chat/groupMessage";
import { useInView } from "react-intersection-observer";

interface GroupMessageViewPortProps {
  className?: string;
  conversationId: string;
}

const GroupMessageViewPort = ({ conversationId, className }: GroupMessageViewPortProps) => {
  const [message, setMessages] = useState<GetGroupMessagesProp["GroupMessages"][] | null>(null);
  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem();
  const userProfile = currentUser?.profile.id;

  // Scroll management
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef(0);

  // Fetch messages
  const {
    data: groupMessage,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching
  } = useInfiniteQuery({
    queryKey: ["group-messages", { conversationId }],
    queryFn: ({ pageParam: cursor = null }) => getGroupMessages(conversationId, cursor, 7),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
  });

  // Fetch older messages when scrolling to the top
  useEffect(() => {
    if (inView && hasNextPage) {
      previousHeightRef.current = scrollRef.current?.scrollHeight || 0;
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);



  // Preserve scroll position after fetching older messages
  useEffect(() => {
    if (!isFetching && scrollRef.current) {
      const newHeight = scrollRef.current.scrollHeight;
      const heightDiff = newHeight - previousHeightRef.current;
      scrollRef.current.scrollTop += heightDiff; // Maintain scroll position
    }
  }, [groupMessage]);

  // Store messages after query success
  useEffect(() => {
    if (isSuccess && groupMessage) {
      setMessages(
        groupMessage.pages
          .flatMap((data) => data.GroupMessages)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    }
  }, [isSuccess, groupMessage]);

  // Listen for new messages from WebSocket
  useEffect(() => {
    const handleNewMessage = (newMessage: GroupMessageProp) => {
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

    socket.on("receive-group-message", handleNewMessage);

    return () => {
      socket.off("receive-group-message", handleNewMessage);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`z-50 max-h-[30rem] overflow-auto w-full ${className || ""}`}
      style={{ display: "flex", flexDirection: "column-reverse" }} // Makes new messages appear at the bottom
    >
      {isFetching && <div>Loading previous messages...</div>}

      {message && message.length > 0 ? (
        <div>
          {message.map((msg, index) => (
            <div key={msg.id} ref={index === 0 ? ref : null}>
              <GroupMessage
                className="z-10"
                conversationId={conversationId}
                message={msg}
                currentProfileId={userProfile!}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full">No messages yet, start a new chat!</div>
      )}
    </div>
  );
};

export default GroupMessageViewPort;
