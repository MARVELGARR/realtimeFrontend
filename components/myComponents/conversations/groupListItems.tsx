import { ConversationResponse } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/sessionProvider";
import { Conversation } from '../../../actions/api-actions/messageActions/getConversation';
import { useUrlState } from "@/hooks/utilityHooks/use-url-state";
import { useSearchParams } from "next/navigation";


type groupConversation = ConversationResponse["groupConversations"][0]

interface ConversatonListItemProps{
    conversation:groupConversation 
    className?: string
}


const GroupListItem = ({conversation, className}:ConversatonListItemProps) => {

    const groupName = conversation?.group.name
    const groupImage = conversation?.group.groupImage


        const {currentUser, isGettingCurentUser} = useSession()
        
        const searchParams = useSearchParams()
    
        const initialRecepientId = searchParams.get("recepientId") ?? null
        const initialConversationId = searchParams.get("conversationId") ?? null
    
        const currentUserId = currentUser?.id
        const groupData = conversation?.group
        const conversationId = conversation?.id 
    
        const [ConversationId, setConversationId] = useUrlState("conversationId")


    return (
        <div className={cn(className, `cursor-pointer p-2 ${initialConversationId && ConversationId === conversationId ? "bg-gray-400/15 rounded" : ""}`)} onClick={()=>setConversationId(conversationId)}>
            <div className="w-full flex place-items-start gap-3">
                <Avatar className="w-[2.7rem] h-[2.7rem]">
                    <AvatarImage src={groupImage as string} alt={groupName || "profile picture"} />
                    <AvatarFallback>{groupName?.slice(0, -1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start -space-y-1">
                    <h3 className="font-bold">{groupName}</h3>
                    <p className="font-thin text-sm">

                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default GroupListItem;