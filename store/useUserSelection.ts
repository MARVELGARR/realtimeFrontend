import { create } from "zustand";
export type userSelectionType ={

    id: string | number
    name: string
    email: string
    image: string | null
    profile: {
        phoneNumber: string | null
        profilePicture: string | null
        gender: string | null
        bio: string | null
        blockedBy: any[]
    } | null
}

type useUserSelectionProp = {
    userSelections: userSelectionType[] | [];
    setUserSelections: (selection: userSelectionType) => void;
    removeUserSelections: (selection: userSelectionType) => void;
    clearUserSelections: ()=> void
};

export const useUserSelection = create<useUserSelectionProp>((set) => ({
    userSelections: [],
    setUserSelections: (selection) =>
        set((state) => ({
            userSelections: Array.from(new Set([...(state.userSelections || []), selection])),
        })),
        removeUserSelections: (selection) =>
        set((state) => ({
            userSelections: state.userSelections?.filter((s) => s !== selection) || [],
        })),
        clearUserSelections: () => set(() => ({ userSelections: [] })),
}));