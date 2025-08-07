"use client";
import { socket } from "@/configs/socket";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { UserWithProfile } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: typeof socket;
  isOnline: boolean;
  onlineUsers: string[];
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null);

  // Handle user connection
  useEffect(() => {
    if (storedValue?.id) {
      if (socket.connected) {
        socket.emit("user-connected", storedValue.id);
        setIsOnline(true); // ✅ immediately mark as online
      }
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      if (storedValue?.id) {
        socket.emit("user-connected", storedValue.id);
        setIsOnline(true); // ✅ mark as online on connect
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsOnline(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [storedValue]);

  // Listen for online users list
  useEffect(() => {
    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUsers(userIds);
      if (storedValue?.id) {
        const amIOnline = userIds.includes(storedValue.id);
        setIsOnline(amIOnline);
      }
    };

    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [storedValue]);

  // Heartbeat to maintain presence
  useEffect(() => {
    let heartbeatInterval: NodeJS.Timeout | null = null;

    if (storedValue?.id) {
      heartbeatInterval = setInterval(() => {
        if (socket.connected) {
          socket.emit("heartbeat", storedValue.id);
          socket.emit("check-my-status", storedValue.id); // <-- this was missing
        }
      }, 10000); // every 10 seconds
    }
    const handleIsOnline = ({ isOnline }: { isOnline: boolean }) => {
    setIsOnline(isOnline);
  };

  socket.on("isOnline", handleIsOnline);

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
       socket.off("isOnline", handleIsOnline);
    };
  }, [storedValue]);

  return (
    <SocketContext.Provider value={{ socket, isOnline, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
