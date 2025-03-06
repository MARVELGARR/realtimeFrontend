'use client';
import getCurrentUser, { User } from "@/actions/api-actions/userAction/getCurrentUser";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
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
  const { data: currentUser, isLoading: isGettingCurentUser, isSuccess, error: errorGettingCurrentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser, 
    initialData: window.sessionStorage.getItem("currentUser") ? JSON.parse(window.sessionStorage.getItem("currentUser") as string) : undefined,
  });


  const {setItem} = useSessionStorage("currentUser")

  if(isSuccess){
    setItem(currentUser as User)
  }

  
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