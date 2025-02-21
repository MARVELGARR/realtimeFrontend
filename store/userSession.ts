
import { User } from "@/actions/api-actions/userAction/getCurrentUser";
import {create} from "zustand"

export type UserSessionState = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void
} 
const userSession = create<UserSessionState>((set)=>({
    user: null,
    setUser: (user: User) => set({user}),
    clearUser: () => set({user: null})
})) 

export default userSession;