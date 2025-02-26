'use client';
import getCurrentUser, { User } from "@/actions/api-actions/userAction/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

type SessionProviderProps = {
  children: ReactNode;
};

export type SessionContextProp = {
  currentUser: User | null | undefined;
  isGettingCurentUser: boolean;
  errorGettingCurrentUser: Error | null;
};

const SessionContext = createContext<SessionContextProp | null>(null);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data: currentUser, isLoading: isGettingCurentUser, error: errorGettingCurrentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    
  });

  console.log("Current User:", currentUser);
  console.log("Is Loading:", isGettingCurentUser);
  console.log("Error:", errorGettingCurrentUser);

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        isGettingCurentUser,
        errorGettingCurrentUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context || context === undefined) {
    throw new Error("Session context must be used within a SessionProvider");
  }
  return context;
};