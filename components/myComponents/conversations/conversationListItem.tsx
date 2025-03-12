
import { ConversationResponse } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUrlState } from "@/hooks/utilityHooks/use-url-state";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/sessionProvider";
import { useSearchParams } from "next/navigation";


type Conversation = ConversationResponse["directConversations"][0]

interface ConversatonListItemProps{
    conversation:Conversation 
    className?: string
}

const ConversatonListItem = ({conversation, className}:ConversatonListItemProps) => {

    const {currentUser, isGettingCurentUser} = useSession()

    const searchParams = useSearchParams()
    const currentUserId = currentUser?.id

    if(isGettingCurentUser){
        <div className="">fetching..</div>
    }
    const recepientData = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user 
    const newRecepientId = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user.id
    const initialRecepientId = searchParams.get("recepientId")

    const [recepientId, setRecepientId] = useUrlState("recepientId", initialRecepientId)



    return (
        <div className={cn(`cursor-pointer ${recepientId === initialRecepientId ? "border-2 border-black rounded" : ""} `, className)} onClick={()=>setRecepientId(newRecepientId as string)}>
            
            <div className="w-full flex place-items-start gap-3">
                <Avatar className="w-[2.7rem] h-[2.7rem]">
                    <AvatarImage src={recepientData?.image as string} alt={recepientData?.name || "profile picture"} />
                    <AvatarFallback>{recepientData?.name?.slice(0, -1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start -space-y-1">
                    <h3 className="font-bold">{recepientData?.name}</h3>
                    <p className="font-thin text-sm">
                     {conversation.messages[1]?.content || ""}
                    </p>
                </div>
            </div>
        </div>
        
    );
}
 
export default ConversatonListItem;