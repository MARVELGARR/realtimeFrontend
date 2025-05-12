import { Conversation } from "../MessagesSidebarComponents/conversations"
import { ConversationItem } from "./conversation-item"

interface ConversationListProps {
  conversations: Conversation[]
  currentUserId: string
}

export function ConversationList({ conversations, currentUserId }: ConversationListProps) {

    if(!conversations){
        return "loading"
    }
    if(!currentUserId){
      return " djdsdjk"
    }
  return (
    <div className="divide-y">
      {conversations
  .filter((conversation): conversation is Conversation => conversation !== undefined)
  .map((conversation) => (
    <ConversationItem
      key={conversation.id}
      conversation={conversation}
      currentUserId={currentUserId}
    />
))}

    </div>
  )
}
