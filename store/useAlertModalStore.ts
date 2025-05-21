import {create} from 'zustand';

export type AlertModalType = "delete-multiple-message";

interface AlertModalStore {
    type: AlertModalType | null;
    isOpen: boolean;
    onOpen: (type: AlertModalType, ) => void;
    onClose: () => void;
}
export const useAlertModal = create<AlertModalStore>((set)=>({
    type: null,
    isOpen: false,
    onOpen: (type: AlertModalType, ) => set({isOpen: true, type, }),
    onClose: () => set({isOpen: false, type: null})
}))