import {create} from 'zustand';

export type SheetType = "my-profile";


interface SheetStore {
    type: SheetType | null;
    isOpen: boolean;
    onOpen: (type: SheetType) => void;
    onClose: () => void;
}
export const useSheet  = create<SheetStore>((set)=>({
    type: null,
    isOpen: false,
    onOpen: (type: SheetType) => set({isOpen: true, type}),
    onClose: () => set({isOpen: false, type: null})
}))