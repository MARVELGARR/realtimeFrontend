
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { GroupAvatars } from "./conversationGroupAvatar"
import { Conversation } from "../MessagesSidebarComponents/conversations"

interface ConversationItemProps {
  conversation: Conversation
  currentUserId: string
}

export function ConversationItem({ conversation, currentUserId }: ConversationItemProps) {
  const { messages, participants, unreadStates, groupId } = conversation
  const isGroup = groupId !== null
  const unreadCount = unreadStates[0]?.unreadCount
  const lastMessage = messages[0].content
  const timestamp = messages[0].createdAt

  const singleParticipant = participants?.find((one)=>one.user.id !== currentUserId)
  

  return (
    <div className="flex items-center p-4 hover:bg-cyan-500/70 cursor-pointer transition-colors">
      <div className="flex-shrink-0 mr-3">
        {isGroup ? (
          <GroupAvatars participants={participants} />
        ) : (
          <Avatar className="h-12 w-12">
            <AvatarImage src={singleParticipant?.user.image || "/placeholder.svg"} alt={singleParticipant?.user.name} />
            <AvatarFallback>{singleParticipant?.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          {<h3 className="text-sm font-medium text-gray-900 truncate">{singleParticipant?.user.name}</h3>}
          <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
        </div>
        <p className="text-sm  truncate text-white">{lastMessage}</p>
      </div>

      {unreadStates && unreadStates.length > 0 && (
        <div className="ml-3 flex-shrink-0">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-xs font-medium text-white">
            {unreadCount}
          </span>
        </div>
      )}
    </div>
  )
}
