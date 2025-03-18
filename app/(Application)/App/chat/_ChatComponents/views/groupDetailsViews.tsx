import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import { useState } from "react"
import { SingleFileUploader } from "@/components/myComponents/utilityComponent/singleFileUploader"

export const GroupDetailsView = ({
  
}) => {
  const [groupName, setGroupName] = useState("")
  const [disappearingMessages, setDisappearingMessages] = useState(false)

  

  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-center">
        <div className="w-20 cursor-pointer h-20 bg-gray-200 rounded-full flex items-center justify-center">
        <SingleFileUploader/>
        </div>
      </div>
      <Input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="disappearing-messages"
          checked={disappearingMessages}
          onCheckedChange={(checked) => setDisappearingMessages(checked as boolean)}
        />
        <label htmlFor="disappearing-messages">Enable disappearing messages</label>
      </div>
      <Button onClick={()=>{}} className="w-full">
        Create Group
      </Button>
    </div>
  )
}

