import { ConversationResponse } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUrlState } from "@/hooks/utilityHooks/use-url-state";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/sessionProvider";
import { useSearchParams } from "next/navigation";
import { CurrentUserType } from "../utilityComponent/types";


type Conversation = ConversationResponse["friendConvo"][0]

interface FriendListConvoItemProps{
    conversation:Conversation 
    className?: string
}

const FriendListConvo = ({conversation, className}:FriendListConvoItemProps) => {

    const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()
    
    const searchParams = useSearchParams()

    const initialRecepientId = searchParams.get("recepientId") ?? null

    const currentUserId = currentUser?.id
    const newRecepientData = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user
    const newRecepient = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user.id 

    const [recepientId, setRecepientId] = useUrlState("recepientId", initialRecepientId)
        
    return (
        <div className={cn(`cursor-pointer p-2 ${initialRecepientId && recepientId === initialRecepientId ? "bg-slate-400/15 rounded" : ""} `, className)} onClick={()=>setRecepientId(newRecepient as string)}>
            
        <div className="w-full flex place-items-start gap-3">
            <Avatar className="w-[2.7rem] h-[2.7rem]">
                <AvatarImage src={newRecepientData?.image as string} alt={newRecepientData?.name || "profile picture"} />
                <AvatarFallback>{newRecepientData?.name?.slice(0, -1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start -space-y-1">
                <h3 className="font-bold">{newRecepientData?.name}</h3>
                <p className="font-thin text-sm">
                 {conversation.messages[1]?.content || ""}
                </p>
            </div>
        </div>
    </div>
    );
}
 
export default FriendListConvo;