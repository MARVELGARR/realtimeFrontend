'use client';
import { socket } from "@/configs/socket";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { UserWithProfile } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: typeof socket;
  isOnline: boolean;
  onlineUsers: string[]
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(false);
  
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null);

  // Emit user connection
  useEffect(() => {
    if (socket.connected && storedValue?.id) {
      socket.emit("user-connected", storedValue.id);
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      if (storedValue?.id) {
        socket.emit("user-connected", storedValue.id);
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [storedValue]);

  const handleIsOnline =(userIds: string[])=>{
    return userIds.includes(storedValue?.id as UserWithProfile["id"])
  }

  useEffect(() => {
    socket.on("online-users", (userIds: string[]) => {
      setOnlineUsers(userIds);
      if (storedValue?.id) {
        const iAmOnline = handleIsOnline(userIds);
        setIsOnline(iAmOnline);
      }
    });

    return () => {
      socket.off("online-users");
    };
  }, [storedValue]);
  
  useEffect(() => {
    socket.on("disconnect", () => {
      setIsOnline(false);
    });
  
    return () => {
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isOnline, onlineUsers  }}>
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
