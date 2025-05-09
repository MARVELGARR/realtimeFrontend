'use client';
import { socket } from "@/configs/socket";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { UserWithProfile } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: typeof socket;
  isOnline: boolean;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(false);
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

  // Listen for online confirmation
  useEffect(() => {
    socket.on("isOnline", (payload: { isOnline: boolean }) => {
      console.log("📩 Received isOnline payload:", payload);
      setIsOnline(payload.isOnline);
    });

    return () => {
      socket.off("isOnline");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
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
