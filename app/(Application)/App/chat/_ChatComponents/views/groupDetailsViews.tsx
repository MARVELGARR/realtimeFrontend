import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { useState } from "react"
import { SingleFileUploader } from "@/components/myComponents/utilityComponent/singleFileUploader"
import useCreateGroup from "@/hooks/groupHook/createGroupHook"
import { useUserSelection } from "@/store/useUserSelection"
import { useStoreUploadedUrls } from "@/store/useStoreUploadedImage"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"





export const GroupDetailsView = ({
  
}) => {
  const [groupName, setGroupName] = useState("")
  const [disappearingMessages, setDisappearingMessages] = useState("")
  const [groupDescription, setGroupDescription] = useState("")

  const {userSelections, clearUserSelections: clearUserSelectio} = useUserSelection()

  const {url, clearUserSelections} = useStoreUploadedUrls()
  const DisappearingMessages =[ "OFF", "DAYS90", 'DAYS7', "H24"]

  const newGroupDetails = {
    name: groupName,
    participant: userSelections ? userSelections.map((users) => String(users.id)) : [],
    groupImage:  url,
    groupDescription: groupDescription,
    disappearingMessages: disappearingMessages
  } 

  
  const {CreatGroup, isCreatingGroup} = useCreateGroup()

  const handleGroupCreation = async() =>{
    CreatGroup(newGroupDetails).then((data)=>{
      clearUserSelections()
      clearUserSelectio()
      toast({
        title: "Group created",
        variant: "success"
      })
    }).catch((error)=>{
      toast({
        title: " Group creation failed",
        variant: "destructive"
      })
    })
  }




  return (
<div className="space-y-4 p-2">
      <div className="flex items-center justify-center">
        <div className="w-20 cursor-pointer h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <SingleFileUploader />
        </div>
      </div>
      <Input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      <div className="flex items-center space-x-2">
        <Select defaultValue="OFF" onValueChange={setDisappearingMessages}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Disappearing Messages</SelectLabel>
              {DisappearingMessages.map((key) => (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <label htmlFor="disappearing-messages">Enable disappearing messages</label>
      </div>
      <Input type="text" placeholder="Group Description" value={groupDescription} onChange={(e)=>setGroupDescription(e.target.value)}/>
      <Button onClick={handleGroupCreation} className="w-full" disabled={isCreatingGroup}>
        {isCreatingGroup ? "Creating..." : "Create Group"}
      </Button>
    </div>
  )
}
