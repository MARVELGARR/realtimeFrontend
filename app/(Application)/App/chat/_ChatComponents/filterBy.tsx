import type React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Star, MessageCircle, UsersRound, Filter } from "lucide-react"
import ZustanFilterStore, { zustandFilterProps } from "@/store/useSearchFilter"

interface FilterOption {
  id: zustandFilterProps["id"]
  label: zustandFilterProps["label"]
  icon: React.ReactNode
}

const filterOptions: FilterOption[] = [
  { id: "all", label: "All", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "contact", label: "Following", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "favourites", label: "Favourites", icon: <Star className="mr-2 h-4 w-4" /> },
  { id: "unreads", label: "Unreads", icon: <MessageCircle className="mr-2 h-4 w-4" /> },
  { id: "groups", label: "Groups", icon: <UsersRound className="mr-2 h-4 w-4" /> },
]



export const FilterDropdown: React.FC = () => {
  const {filters, setFilter} = ZustanFilterStore()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Filter className="mr-2 h-4 w-4" />
          {filters.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterOptions.map((option) => (
          <DropdownMenuItem key={option.id} onSelect={()=> setFilter({id: option.id, label: option.label})} >
            {option.icon}
            <span>{option.label}</span>
            
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

