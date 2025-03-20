"use client"

import { useState } from "react"
import { Plus, Search, ExternalLink } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Define the member type for better type safety
type Member = {
  id: number
  name: string
  avatar: string
  status: string
}

export function GroupMembersTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const members: Member[] = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "Admin" },
    { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 3, name: "Taylor Wilson", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 4, name: "Casey Brown", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
    { id: 5, name: "Jordan Lee", avatar: "/placeholder.svg?height=40&width=40", status: "Member" },
  ]

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
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
            <div key={member.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
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
                <ExternalLink className="h-4 w-4" />
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
  )
}

