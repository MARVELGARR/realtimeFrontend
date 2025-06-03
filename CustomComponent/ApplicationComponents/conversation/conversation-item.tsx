
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { GroupAvatars } from "./conversationGroupAvatar"
import { Conversation } from "../MessagesSidebarComponents/conversations"
import Link from "next/link"
import { AddRemoveUrlQuery } from "@/lib/add-remove-get-UrlQuery"
interface ConversationItemProps {
  conversation: Conversation
  currentUserId: string
}

export function ConversationItem({ conversation, currentUserId }: ConversationItemProps) {
  if(!conversation){
    return "loading"
  }
  const { messages, participants, unreadStates, groupId } = conversation
  const isGroup = groupId !== null
  const GroupName = conversation.group?.name
  const GroupId = conversation.groupId
  const unreadCount = unreadStates.find((count)=>count.userId == currentUserId)?.unreadCount || 0
  const lastMessage = messages[0]?.content
  const timestamp = messages[0]?.createdAt

  const singleParticipant = participants?.find((one)=>one.user.id !== currentUserId)
  const recieverId = singleParticipant?.userId

  return (
    <Link  href={`/Application/chat/${conversation.id}/?recieverId=${isGroup ? GroupId : recieverId }`}>
      <div className="flex border-cyan-400/30 shadow-md border rounded items-center p-4 hover:bg-cyan-500/70 cursor-pointer transition-colors">
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
            {<h3 className="text-sm font-medium text-gray-900 truncate">{!isGroup ? singleParticipant?.user.name : GroupName}</h3>}
           {timestamp ? formatDistanceToNow(new Date(timestamp), { addSuffix: true }) : ""}
          </div>
          <p className="text-sm  truncate text-white">{lastMessage}</p>
        </div>

        {unreadCount > 0 && (
          <div className="ml-3 flex-shrink-0">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-xs font-medium text-white">
              {unreadCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
