import React, { useState } from "react"
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MenuItem } from "@/components/myComponents/utilityComponent/types"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"

interface MainViewProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export const MainView: React.FC<MainViewProps> = ({ items, onItemClick }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DropdownMenuGroup>
        <SearchBar placeholder="Search users..." value={searchQuery} onChange={(value: string) => setSearchQuery(value)}/>
      {items.map((item) => (
        <DropdownMenuItem
          key={item.id}
          onSelect={(event) => {
            event.preventDefault()
            onItemClick(item)
          }}
          className="py-3 cursor-pointer"
        >
          {item.icon}
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  )
}

