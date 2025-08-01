import { UsersResponse } from '@/CustomComponent/ApplicationComponents/Modals/findNewFriendModal';
import {create} from 'zustand';

export type SheetType = "my-profile" | "users-profile" | "my-friends" | "group-profile-sheet" | "blocked-users";


interface SheetStore {
    type: SheetType | null;
    isOpen: boolean;
    data?: string | UsersResponse["users"][0] | null;
    onOpen: (type: SheetType, data?: string | UsersResponse["users"][0]) => void;
    onClose: () => void;
}
export const useSheet  = create<SheetStore>((set)=>({
    type: null,
    isOpen: false,
    data: null,
    onOpen: (type: SheetType, data?: string | UsersResponse["users"][0]) => set({isOpen: true, type, data }),
    onClose: () => set({isOpen: false, type: null})
}))