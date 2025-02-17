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
import { cn } from "@/lib/utils"

const renderSidebarTrigger = () => {
  const {toggleSidebar} = useSidebar()
  
  const { state } = useSidebar()
  
  const isCollapsed = state === "collapsed"
  return (
    <Button 
      onClick={
        ()=>toggleSidebar()
      }
      className=" w-fit cursor-pointer hover:bg-white bg-inherit"
      
    >
      <MenuIcon color="black" className={`${isCollapsed ? " w-5 h-5" : "w-7 h-7 hover:bg-white" }`}/>
    </Button>
  )
}

const renderMenuItem = (item: any) => {
  const { state } = useSidebar();
  const { currentUserProfilePic, currentProfileId } = useCurrentUser();
  const isCollapsed = state === "collapsed";
  const isAvatarOrSettings = item.isAvatar || item.title === "Settings";

  return (
    <SidebarMenuItem className="w-full flex flex-col items-center" key={item.title}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild className="relative h-16">
              {isAvatarOrSettings ? (
                <div className="flex items-center w-full cursor-pointer h-full px-4">
                  {item.isActive && (
                    <div className="absolute left-0 h-full bottom-0 w-1 bg-green-500" />
                  )}
                  {item.isAvatar ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="-ml-2">
                        <Avatar
                          className={`w-8 h-8 border-2 border-black transition-transform hover:scale-110`}
                        >
                          <AvatarImage src={currentUserProfilePic!} alt="" />
                          <AvatarFallback>YOU</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <ProfileComponent currentProfileId={currentProfileId!} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <IconWithIndicator
                      icon={item.icon}
                      count={isCollapsed ? item.indicator : undefined}
                      color={item.color}
                      className="w-5 h-5"
                    />
                  )}
                  {!isCollapsed && (
                    <>
                      <span className="ml-4 flex-grow">{item.title}</span>
                      {item.indicator !== undefined && (
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs bg-${item.color}-500 text-white`}
                        >
                          {item.indicator}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <a href={item.url} className="flex items-center w-full h-full px-4">
                  {item.isActive && (
                    <div className="absolute left-0 h-full bottom-0 w-1 bg-green-500" />
                  )}
                  <IconWithIndicator
                    icon={item.icon}
                    count={isCollapsed ? item.indicator : undefined}
                    color={item.color}
                    className="w-5 h-5"
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ml-4 flex-grow">{item.title}</span>
                      {item.indicator !== undefined && (
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs bg-${item.color}-500 text-white`}
                        >
                          {item.indicator}
                        </span>
                      )}
                    </>
                  )}
                </a>
              )}
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="z-50">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  );
};




export function AppSidebar() {

  // Mock state for unread counts (you would typically fetch this from an API)
  const [unreadChats ] = React.useState(5)
  const [missedCalls ] = React.useState(2)
  const [hasUnviewedStatus] = React.useState(true)
  
  const pathname = usePathname()


  const BaseUrl = `http://localhost:3001`

  const itemsGroup1 = [
    {
      title: "Chat",
      url: `${BaseUrl}/App/chat`,
      icon: MessageCircleMore,
      indicator: unreadChats,
      color: "green" as const,
      isActive: pathname === `/App/chat`,
    },
    {
      title: "Phone",
      url: `${BaseUrl}/App/phone`,
      icon: Phone,
      indicator: missedCalls,
      color: "red" as const,
      isActive: pathname === "App/phone",
    },
    {
      title: "Status",
      url: `${BaseUrl}/App/status`,
      icon: Binoculars,
      indicator: hasUnviewedStatus ? 0 : undefined,
      color: "green" as const,
      isActive: pathname === "App/status",
    },
  ]

  const itemsGroup2 = [
    {
      title: "Favourite",
      url: `${BaseUrl}/App/favourite`,
      icon: Star,
      isActive: pathname === "App/favourite",
    },
    {
      title: "Archive",
      url: `${BaseUrl}/App/archive`,
      icon: Archive,
      isActive: pathname === "App/archive",
    },
  ]

  const itemsGroup3 = [
    
    {
      title: "Profile",
      url: "#",
      icon: User,
      isActive: pathname === "#",
      isAvatar: true,
    },
  ]

  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"


  return (
    <Sidebar collapsible="icon" className=" bg-gray-400">
      <SidebarContent className={cn(isCollapsed ? " w-fit" : "w-full" , " bg-gray-300 text-primary  h-full flex items-center flex-col justify-between ")}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderSidebarTrigger()}
              {itemsGroup1.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="space-y-4 w-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{itemsGroup2.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu >{itemsGroup3.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

