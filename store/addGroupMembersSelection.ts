import { create } from "zustand";

type useAddGroupMembersSelectionProps = {
        selections: string[] | null;
    setSelections: (selection: string) => void;
    removeSelections: (selection: string) => void;
    clearSelections: ()=> void
}

export const useAddGroupMembersSelection = create<useAddGroupMembersSelectionProps>((set)=> ({
    selections: null,
    setSelections: (selection) =>
        set((state) => ({
            selections: Array.from(new Set([...(state.selections || []), selection])),
        })),
    removeSelections: (selection) =>
        set((state) => ({
            selections: state.selections?.filter((s) => s !== selection) || null,
        })),
        clearSelections: ()=> set((state)=>({
            selections: []
        }))
}))