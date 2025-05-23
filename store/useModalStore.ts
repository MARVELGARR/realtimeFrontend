import {create} from 'zustand';

export type ModalType = "singleFileUploader" | "profile-pic" | "profile-cover-picture" | "start-new-chat" | "find-new-friend" | "create-new-group";
export type singleFileUploaderFor = "profile-pic" | "profile-cover-picture" | "group-profile-pic" | null;

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    fileFor?: singleFileUploaderFor | null;
    data?: any;
    onOpen: (type: ModalType, data: any, fileFor: singleFileUploaderFor) => void;
    onClose: (fileFor?: singleFileUploaderFor) => void;
}
export const useModal = create<ModalStore>((set)=>({
    type: null,
    data: null,
    fileFor: null,
    isOpen: false,
    onOpen: (type: ModalType, data?: any, fileFor?: singleFileUploaderFor) => set({isOpen: true, type, data, fileFor}),
    onClose: (fileFor?: singleFileUploaderFor) => set({isOpen: false, type: null, fileFor})
}))