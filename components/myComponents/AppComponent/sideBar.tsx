"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Archive, MessageCircleMore, Phone, Settings, Star, Binoculars, User,  MenuIcon } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { IconWithIndicator } from "./icons-with-indicators"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import useCurrentUser from "@/hooks/userHooks/useCurrentUser"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProfileComponent from "../profileComponent/profileComponent"

export function AppSidebar() {
  const { state } = useSidebar()
  const {currentUserProfilePic} = useCurrentUser()
  const isCollapsed = state === "collapsed"

  // Mock state for unread counts (you would typically fetch this from an API)
  const [unreadChats ] = React.useState(5)
  const [missedCalls ] = React.useState(2)
  const [hasUnviewedStatus] = React.useState(true)
  const pathname = usePathname()

  const itemsGroup1 = [
    {
      title: "Chat",
      url: "App/chat",
      icon: MessageCircleMore,
      indicator: unreadChats,
      color: "green" as const,
      isActive: pathname === "App/chat",
    },
    {
      title: "Phone",
      url: "App/phone",
      icon: Phone,
      indicator: missedCalls,
      color: "red" as const,
      isActive: pathname === "App/phone",
    },
    {
      title: "Status",
      url: "App/status",
      icon: Binoculars,
      indicator: hasUnviewedStatus ? 0 : undefined,
      color: "green" as const,
      isActive: pathname === "App/status",
    },
  ]

  const itemsGroup2 = [
    {
      title: "Favourite",
      url: "App/favourite",
      icon: Star,
      isActive: pathname === "App/favourite",
    },
    {
      title: "Archive",
      url: "App/archive",
      icon: Archive,
      isActive: pathname === "App/archive",
    },
  ]

  const itemsGroup3 = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: pathname === "/settings",
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
      isActive: pathname === "#",
      isAvatar: true,
    },
  ]

  const renderMenuItem = (item: any) => (
    <SidebarMenuItem className="w-ful flex flexe-col items-center" key={item.title}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild className="relative h-16 ">
              <a href={item.url} className="flex items-center w-full h-full px-4">
                {item.isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />}
                {item.isAvatar ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>

                        <Avatar className="w-8 h-8 border-2 border-black transition-transform hover:scale-110">
                          <AvatarImage src={currentUserProfilePic! } alt="" />
                          <AvatarFallback>YOU</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ProfileComponent/>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <IconWithIndicator
                    icon={item.icon}
                    count={isCollapsed ? item.indicator : undefined}
                    color={item.color}
                    className="w-8 h-8"
                  />
                )}
                {!isCollapsed && (
                  <>
                    <span className="ml-4 flex-grow">{item.title}</span>
                    {item.indicator !== undefined && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs bg-${item.color}-500 text-white`}>
                        {item.indicator}
                      </span>
                    )}
                  </>
                )}
              </a>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="z-50">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  )

  const renderSidebar = () => {
    const {toggleSidebar} = useSidebar()
    return (
      <Button 
        onClick={
          ()=>toggleSidebar()
        }
        className="w-[3.3rem] h-[2.3rem] cursor-pointer hover:bg-white bg-inherit"
        asChild
      >
        <MenuIcon color="black" className={`${isCollapsed ? " w-5 h-5" : "w-7 h-7 hover:bg-white" }`}/>
      </Button>
    )
  }

  return (
    <Sidebar collapsible="icon" className="">
      <SidebarContent className="bg-gray-400 h-full flex flex-col justify-between ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderSidebar()}
              {itemsGroup1.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="space-y-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{itemsGroup2.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{itemsGroup3.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

