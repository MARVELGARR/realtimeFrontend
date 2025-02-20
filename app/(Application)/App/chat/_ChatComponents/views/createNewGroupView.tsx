import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import { User } from "@/components/myComponents/utilityComponent/types"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"
import { Dispatch, SetStateAction } from "react"

interface CreateNewGroupViewProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  users: User[]
  handleUserSelect: (userId: string) => void
  handleNextInGroupCreation: () => void
  handleClearUsers: (users: User[])=> void
}

export const CreateNewGroupView: React.FC<CreateNewGroupViewProps> = ({
  searchQuery,
  setSearchQuery,
  users,
  handleClearUsers,
  handleUserSelect,
  handleNextInGroupCreation,
}) => {
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <div className="px-2 py-2">
        <div className="flex items-center px-2 rounded-md border">
            <SearchBar
            placeholder="Search users..." value={searchQuery} onChange={(value: string) => setSearchQuery(value)}/>
          
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-2 p-2">
            <Checkbox id={user.id} checked={user.selected} onCheckedChange={() => handleUserSelect(user.id)} />
            <label htmlFor={user.id}>{user.name}</label>
          </div>
        ))}
      </div>
      {users.some((u) => u.selected) && (
        <div className="">

            <Button onClick={handleNextInGroupCreation} className="w-full mt-2">
            Next
            </Button>
            <Button variant={"destructive"} onClick={()=>handleClearUsers(users)}  className="w-full mt-2">
            Cancel
            </Button>
        </div>
      )}
    </>
  )
}

