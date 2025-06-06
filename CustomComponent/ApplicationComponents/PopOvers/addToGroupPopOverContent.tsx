"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, X } from "lucide-react"
import useAddParticipant from "@/hooks/GroupHooks/addParticipants"
import { toast } from "sonner"

export interface UserProfile {
  profilePicture: string
  bio: string
}

export interface UserWithProfile {
  id: string
  name: string
  email: string
  image: string
  profile: UserProfile
}

export interface FriendshipWithUser2 {
  user2: UserWithProfile
}

interface ParticipantSelectorProps {
    groupId: string
  potentialParticipants: FriendshipWithUser2[]
  selectedParticipants: UserWithProfile[]
  onParticipantsChange: (participants: UserWithProfile[]) => void
  maxParticipants?: number
}

export default function ParticipantSelector({
  potentialParticipants,
  groupId,
  selectedParticipants,
  onParticipantsChange,
  maxParticipants,
}: ParticipantSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const {
    addParticipant,
    
  } = useAddParticipant(groupId)

   const members = selectedParticipants.map((items)=>items.id)

  const handelAddParticipant = async () =>{
    
    addParticipant(members).then(()=>{
        toast('added')
    }).catch(()=>{
        toast("failed")
    })
  }

  // Filter out already selected participants
  const availableParticipants = potentialParticipants.filter(
    (friendship) => !selectedParticipants.some((selected) => selected.id === friendship.user2.id),
  )

  // Filter by search query
  const filteredParticipants = availableParticipants.filter(
    (friendship) =>
      friendship.user2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friendship.user2.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleParticipantToggle = (user: UserWithProfile, checked: boolean) => {
    if (checked) {
      if (maxParticipants && selectedParticipants.length >= maxParticipants) {
        return // Don't add if max limit reached
      }
      onParticipantsChange([...selectedParticipants, user])
    } else {
      onParticipantsChange(selectedParticipants.filter((p) => p.id !== user.id))
    }
  }

  const removeParticipant = (userId: string) => {
    onParticipantsChange(selectedParticipants.filter((p) => p.id !== userId))
  }

  const addAllFiltered = () => {
    const usersToAdd = filteredParticipants.map((f) => f.user2)
    const remainingSlots = maxParticipants ? maxParticipants - selectedParticipants.length : usersToAdd.length
    const newParticipants = usersToAdd.slice(0, remainingSlots)
    onParticipantsChange([...selectedParticipants, ...newParticipants])
  }

  return (
    <div className="w-full space-y-4">
      {/* Selected Participants Display */}
      {selectedParticipants.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Selected Participants ({selectedParticipants.length})</h3>
            {maxParticipants && (
              <span className="text-xs text-muted-foreground">
                {selectedParticipants.length}/{maxParticipants}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedParticipants.map((participant) => (
              <Badge key={participant.id} variant="secondary" className="flex items-center gap-2 pr-1">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={participant.image || participant.profile.profilePicture} />
                  <AvatarFallback className="text-xs">{participant.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{participant.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeParticipant(participant.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Add Participants Popover */}

        <div  className="w-80 p-0" >
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search participants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>

          {filteredParticipants.length > 0 && (
            <div className="flex items-center justify-between p-3 border-b">
              <span className="text-sm text-muted-foreground">{filteredParticipants.length} available</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={addAllFiltered}
                disabled={!!maxParticipants && selectedParticipants.length >= (maxParticipants ?? 0)}
              >
                Add All
              </Button>
            </div>
          )}
            <div className="">
                <Button onClick={handelAddParticipant} className="bg-cyan-500 text-white cursor-pointer ">
                    submit
                </Button>
            </div>
          <ScrollArea className="h-[300px]">
            {filteredParticipants.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {searchQuery ? "No participants found" : "No available participants"}
              </div>
            ) : (
              <div className="p-2">
                {filteredParticipants.map((friendship) => {
                  const user = friendship.user2
                  const isSelected = selectedParticipants.some((p) => p.id === user.id)
                  const isDisabled = !!maxParticipants && selectedParticipants.length >= (maxParticipants ?? 0) && !isSelected

                  return (
                    <div onMouseDown={(e)=>e.preventDefault()} key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent">
                      <Checkbox
                        checked={isSelected}
                        disabled={!!isDisabled}
                        onCheckedChange={(checked) => handleParticipantToggle(user, checked as boolean)}
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || user.profile.profilePicture} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        {user.profile.bio && (
                          <p className="text-xs text-muted-foreground truncate mt-1">{user.profile.bio}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </ScrollArea>

          {maxParticipants && selectedParticipants.length >= maxParticipants && (
            <div className="p-3 border-t">
              <p className="text-xs text-muted-foreground text-center">Maximum participants limit reached</p>
            </div>
          )}
        </div>
      
    </div>
  )
}
