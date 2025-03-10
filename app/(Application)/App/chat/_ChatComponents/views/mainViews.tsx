import React, { useState } from "react"
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MenuItem } from "@/components/myComponents/utilityComponent/types"
import NewChatSearch from "./newChatComponent"
import PhoneAndGroup from "./phoneAndGroup"
import getSearchUsers from "@/actions/api-actions/userAction/getSearchUsers"

interface MainViewProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export const MainView: React.FC<MainViewProps> = async({ items, onItemClick }) => {

  const users = await getSearchUsers("","1", "5")


  return (
    <DropdownMenuGroup>
      <NewChatSearch initialSearch={users}/>

      <PhoneAndGroup items={items} onItemClick={onItemClick}/>
      
    </DropdownMenuGroup>
  )
}

