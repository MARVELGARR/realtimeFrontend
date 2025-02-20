"use client"

import { useState, useEffect, JSX } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, ChevronLeft } from "lucide-react"
import { MenuItem, User } from "@/components/myComponents/utilityComponent/types"
import { SearchPhoneView } from "@/components/myComponents/chat/searchPhoneViews"
import { CreateNewGroupView } from "./views/createNewGroupView"
import { GroupDetailsView } from "./views/groupDetailsViews"
import { MainView } from "./views/mainViews"
import { views } from "@/components/myComponents/utilityComponent/views"
import { SearchBar } from "@/components/myComponents/utilityComponent/SearchBar"

const dummyUsers: User[] = [
  { id: "1", name: "Alice Johnson", selected: false },
  { id: "2", name: "Bob Smith", selected: false },
  { id: "3", name: "Charlie Brown", selected: false },
  { id: "4", name: "Diana Ross", selected: false },
  { id: "5", name: "Ethan Hunt", selected: false },
]

export function CreateNewChat(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>("main")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>(dummyUsers)
  const [groupName, setGroupName] = useState<string>("")
  const [groupImage, setGroupImage] = useState<string | null>(null)
  const [disappearingMessages, setDisappearingMessages] = useState<boolean>(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set("view", currentView)
    window.history.replaceState({}, "", `?${params.toString()}`)
  }, [currentView])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const viewParam = params.get("view")
    if (viewParam && views[viewParam]) {
      setCurrentView(viewParam)
    }
  }, [])

  const handleBack = (): void => {
    if (currentView === "groupdetails") {
      setCurrentView("createnewgroup")
    } else if (currentView === "createnewgroup") {
      setCurrentView("main")
      setSearchQuery("")
    } else {
      setCurrentView("main")
      setSearchQuery("")
      setPhoneNumber("")
    }
  }

  const handleItemClick = (item: MenuItem): void => {
    if (item.view) {
      setCurrentView(item.view)
    } else {
      console.log("Selected:", item.label)
      setOpen(false)
    }
  }

  const handleUserSelect = (userId: string): void => {
    setSelectedUsers(selectedUsers.map((user) => (user.id === userId ? { ...user, selected: !user.selected } : user)))
  }

  const handleClearUsers = () =>{
    setSelectedUsers(selectedUsers.map((user) => ({ ...user, selected: false })))
  }

  const handleNextInGroupCreation = (): void => {
    setCurrentView("groupdetails")
  }

  const handleCreateGroup = (): void => {
    console.log("Group created:", {
      groupName,
      groupImage,
      disappearingMessages,
      members: selectedUsers.filter((u) => u.selected),
    })
    setOpen(false)
  }

  const renderContent = () => {
    switch (currentView) {
      case "searchphone":
        return <SearchPhoneView phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      case "createnewgroup":
        return (
          <CreateNewGroupView
          
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            users={selectedUsers}
            handleClearUsers={handleClearUsers}
            handleUserSelect={handleUserSelect}
            handleNextInGroupCreation={handleNextInGroupCreation}
          />
        )
      case "groupdetails":
        return (
          <GroupDetailsView
            groupName={groupName}
            setGroupName={setGroupName}
            groupImage={groupImage}
            setGroupImage={setGroupImage}
            disappearingMessages={disappearingMessages}
            setDisappearingMessages={setDisappearingMessages}
            handleCreateGroup={handleCreateGroup}
          />
        )
      default:
        return <MainView items={views[currentView].items} onItemClick={handleItemClick} />
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
        
      </DropdownMenuTrigger>
        
      <DropdownMenuContent className="w-64">
        <div className="flex items-center justify-between p-2">
          {currentView !== "main" && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenuLabel className="font-bold ">{views[currentView].title}</DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <div className="w-full">

            {renderContent()}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CreateNewChat

