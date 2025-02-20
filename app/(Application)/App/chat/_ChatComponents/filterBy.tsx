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
import { Users, UserPlus, Star, MessageCircle, UsersRound, Filter } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  icon: React.ReactNode
}

const filterOptions: FilterOption[] = [
  { id: "all", label: "All", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "contacts", label: "Contacts", icon: <Users className="mr-2 h-4 w-4" /> },
  { id: "non-contacts", label: "Non-Contacts", icon: <UserPlus className="mr-2 h-4 w-4" /> },
  { id: "favorites", label: "Favorites", icon: <Star className="mr-2 h-4 w-4" /> },
  { id: "unread", label: "Unread", icon: <MessageCircle className="mr-2 h-4 w-4" /> },
  { id: "groups", label: "Groups", icon: <UsersRound className="mr-2 h-4 w-4" /> },
]

interface FilterDropdownProps {
  selectedFilter: string
  onFilterChange: (filterId: string) => void
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedFilter, onFilterChange }) => {
  const selectedOption = filterOptions.find((option) => option.id === selectedFilter) || filterOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Filter className="mr-2 h-4 w-4" />
          {selectedOption.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterOptions.map((option) => (
          <DropdownMenuItem key={option.id} onSelect={() => onFilterChange(option.id)}>
            {option.icon}
            <span>{option.label}</span>
            {selectedFilter === option.id && (
              <span className="absolute right-2 flex h-3 w-3 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

