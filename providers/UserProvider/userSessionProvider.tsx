'use client'
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import useUser from "@/hooks/UserHooks/useUserHook";
import { UserWithProfile } from "@/types";
import { createContext, ReactNode, useContext, useEffect } from "react";


type UserSessionContextType = {
    user: UserWithProfile | null;
    isGettingUser: boolean;
    setUser: (user: UserWithProfile | null) => void;
  };

const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export const UserSessionProvider = ({children}: {
    children: ReactNode
}) => {

    const { user: fetchedUser, isGettingUser } = useUser();
    const [user, setUser] = useLocalStorage<UserWithProfile | null>("user-session", fetchedUser as UserWithProfile);
  
    useEffect(() => {
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    }, [fetchedUser, setUser]);
    return (
        <UserSessionContext.Provider value={{user, isGettingUser, setUser }}>{children}</UserSessionContext.Provider>
    );
}

export function useUserSession() {
    const context = useContext(UserSessionContext);
    if (!context) {
      throw new Error("useUserSession must be used within a UserSessionProvider");
    }
    return context;
  }
  
