import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { MenuItem } from "@/components/myComponents/utilityComponent/types"
import NewChatSearch from "./newChatComponent"
import PhoneAndGroup from "./phoneAndGroup"
import getSearchUsers from "@/actions/api-actions/userAction/getSearchUsers"

interface MainViewProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
  onUserSelect?: (user: any) => void
}

export const MainView = async ({ items, onItemClick, onUserSelect }: MainViewProps) => {
  // Fetch initial users for server-side rendering
  const initialUsers = await getSearchUsers("", "1", "5")

  return (
    <DropdownMenuGroup>
      <NewChatSearch initialSearch={initialUsers} onUserSelect={onUserSelect} />

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

