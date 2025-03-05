


import { z } from 'zod';
import {create} from 'zustand'

const filterSchema =z.object({
    id: z.enum(["all", "contact", "non-contact", 'favourites', "groups", "unreads"]),
    label: z.enum(["All", "Contact", "Non-Contact", 'Favourites', "Groups", "Unreads"]) 
}) 


interface FilterOption {
  id: string
  label: string
  icon: React.ReactNode
}

export type zustandFilterProps = z.infer<typeof filterSchema>

type ZustanFilterStoreProps ={
    filters: zustandFilterProps;
    setFilter: (filter: zustandFilterProps) => void
}

const ZustanFilterStore = create<ZustanFilterStoreProps>((set)=>({
    filters: { id: 'all', label: 'All' },
    setFilter: (filter)=> set({filters: filter})
}))
 
export default ZustanFilterStore;