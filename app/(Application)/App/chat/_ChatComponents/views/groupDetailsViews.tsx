import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"

interface GroupDetailsViewProps {
  groupName: string
  setGroupName: (value: string) => void
  groupImage: string | null
  setGroupImage: (value: string | null) => void
  disappearingMessages: boolean
  setDisappearingMessages: (value: boolean) => void
  handleCreateGroup: () => void
}

export const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  groupName,
  setGroupName,
  groupImage,
  setGroupImage,
  disappearingMessages,
  setDisappearingMessages,
  handleCreateGroup,
}) => {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          {groupImage ? (
            <img
              src={groupImage || "/placeholder.svg"}
              alt="Group"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Upload className="h-8 w-8 text-gray-400" />
          )}
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
      <Button onClick={handleCreateGroup} className="w-full">
        Create Group
      </Button>
    </div>
  )
}

