"use client"

import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { MenuItem } from "@/components/myComponents/utilityComponent/types"
import NewChatSearch from "./newChatComponent"

interface MainViewProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
  onUserSelect?: (user: any) => void
}

export const MainView = ({ items, onItemClick, onUserSelect }: MainViewProps) => {
  return (
    <DropdownMenuGroup>
      <NewChatSearch onUserSelect={onUserSelect} />

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

