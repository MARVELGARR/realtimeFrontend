"use client"

import { useState } from "react"
import { Edit, Info, LogOut, Plus, Search, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GroupProfile() {
  const [searchQuery, setSearchQuery] = useState("")

  const members = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "Admin" },
    { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 3, name: "Taylor Wilson", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 4, name: "Casey Brown", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 5, name: "Jordan Lee", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
  ]

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar with tabs */}
      <div className="w-64 border-r flex">
        <Tabs defaultValue="overview" orientation="vertical" className="h-full">
          <TabsList className="flex flex-col bg-gray-200 items-start h-full bg-muted/20 p-0 w-full rounded-none">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            >
              <Info className="h-5 w-5" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            >
              <Users className="h-5 w-5" />
              <span>Members</span>
            </TabsTrigger>
            {/* Additional tabs shown in the image but not implemented as requested */}
            <TabsTrigger
              value="media"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
              disabled
            >
              <Video className="h-5 w-5" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Files</span>
            </TabsTrigger>
            <TabsTrigger
              value="links"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0684 9.05889 10.3533 9.00768C9.63816 8.95646 8.92037 9.05964 8.24861 9.31023C7.57685 9.56082 6.96684 9.95294 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Links</span>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="encryption"
              className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Encryption</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab content */}
          <div className="flex-1 p-6 bg-background">
            <TabsContent value="overview" className="mt-0 h-full">
              <div className="flex flex-col h-full">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Group avatar" />
                    <AvatarFallback>BP</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">Blood strike players</h2>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Video className="h-5 w-5" />
                    <span>Video</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 16.92V19.92C22 20.4704 21.7893 20.9991 21.4142 21.3742C21.0391 21.7493 20.5104 21.96 19.96 21.96C18.4536 21.9544 16.9675 21.6302 15.59 21.01C14.2017 20.3775 12.9452 19.4551 11.9 18.3C10.8513 17.2615 10.0198 16.0152 9.38 14.64C8.75721 13.2552 8.43321 11.7618 8.43 10.25C8.43 9.69956 8.64071 9.17086 8.01579 8.79579C9.39086 8.42071 9.90957 8.21 10.46 8.21H13.46C13.9438 8.20955 14.4108 8.3825 14.7823 8.69896C15.1538 9.01542 15.407 9.45431 15.5 9.93L16.1 12.93C16.1834 13.3542 16.136 13.7958 15.9588 14.1879C15.7839 14.5799 15.4934 14.9029 15.13 15.11L13.85 15.95C14.4559 17.3793 15.416 18.6361 16.64 19.61L17.48 18.33C17.6871 17.9666 18.0101 17.6761 18.4022 17.5012C18.7942 17.3264 19.2358 17.2766 19.66 17.36L22.66 17.96C23.1357 18.053 23.5746 18.3062 23.8911 18.6777C24.2075 19.0492 24.3805 19.5162 24.38 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Voice</span>
                  </Button>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p>2/22/2025 10:21 PM</p>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p>A group for Blood Strike game players to coordinate matches and strategies.</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">Disappearing messages</p>
                      <Switch id="disappearing" />
                    </div>
                    <p>Off</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">Mute notifications</p>
                      <Switch id="mute" />
                    </div>
                    <Select defaultValue="mute">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mute">Mute</SelectItem>
                        <SelectItem value="8hours">8 hours</SelectItem>
                        <SelectItem value="1week">1 week</SelectItem>
                        <SelectItem value="always">Always</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Notification tone</p>
                    <Select defaultValue="default">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="chime">Chime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Group
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="mt-0 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Members ({members.length})</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add new member</DialogTitle>
                        <DialogDescription>
                          Enter the contact details of the person you want to add to this group.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input id="phone" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add to group</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search members"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-4 flex-1 overflow-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                              {member.name.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.status}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 3H21V9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 14L21 3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No members found</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

