"use client"

import { useState, useEffect, type JSX } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, ChevronLeft } from "lucide-react"
import type { MenuItem, User } from "@/components/myComponents/utilityComponent/types"
import { SearchPhoneView } from "@/components/myComponents/chat/searchPhoneViews"
import { CreateNewGroupView } from "./views/createNewGroupView"
import { GroupDetailsView } from "./views/groupDetailsViews"
import { MainView } from "./views/mainViews"
import { views } from "@/components/myComponents/utilityComponent/views"

export function CreateNewChat(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>("main")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

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



  const handleUserSelectFromSearch = (user: any): void => {
    // Check if user is already in selectedUsers
    const userExists = selectedUsers.some((u) => u.id === user.id)

    if (!userExists) {
      // Add the user to selectedUsers with selected=true
      const newUser: User = {
        id: user.id,
        name: user.name,
        image: user.profile?.profilePicture || user.image,
      }
      setSelectedUsers([...selectedUsers, newUser])
    }

    // If we're in the main view and this is a direct chat, close the dropdown
    // If we're creating a group, switch to the group creation view
    if (currentView === "main") {
      const item = views[currentView].items.find((i: any) => i.label === "New Group")
      if (item && item.view === "createnewgroup") {
        setCurrentView("createnewgroup")
      } else {
        // Handle direct chat creation
        console.log("Starting chat with:", user.name)
        setOpen(false)
      }
    }
  }

  const handleClearUsers = () => {
    setSelectedUsers([])
  }

  const handleNextInGroupCreation = (): void => {
    setCurrentView("groupdetails")
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
            handleNextInGroupCreation={handleNextInGroupCreation}
          />
        )
      case "groupdetails":
        return (
          <GroupDetailsView/>
        )
      default:
        return (
          <MainView
            items={views[currentView].items}
            onItemClick={handleItemClick}
            onUserSelect={handleUserSelectFromSearch}
          />
        )
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
        <div className="w-full">{renderContent()}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CreateNewChat

