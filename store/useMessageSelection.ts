import {create} from "zustand"

type useSelectionProp = {
    selections: string[] | null
    setSelections: (selections: string)=>void
}


export const useSelection = create<useSelectionProp>((set)=>({
    selections: null,
    setSelections: (selection) => set(state => ({ selections: Array.from(new Set([...(state.selections || []), selection])) }))
}))