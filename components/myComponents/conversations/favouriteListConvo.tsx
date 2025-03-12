import { ConversationResponse } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUrlState } from "@/hooks/utilityHooks/use-url-state";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/sessionProvider";
import { useSearchParams } from "next/navigation";


type Conversation = ConversationResponse["favouriteConvo"][0]

interface FavouriteListConvoItemProps{
    conversation:Conversation 
    className?: string
}


const FavouriteListConvo = ({conversation, className}:FavouriteListConvoItemProps) => {

    const queryParams = useSearchParams()
const {currentUser, isGettingCurentUser} = useSession()
const currentUserId = currentUser?.id
    const initialRecepientParams =queryParams.get("recepientId")

    const newRecepientData = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user
    const newRecepient = conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user.id 

    const [recepientId, setRecepientId] = useUrlState("recepientId", initialRecepientParams)

    return (
        <div className={cn(`cursor-pointer ${recepientId === initialRecepientParams ? "border-2 border-black rounded" : ""} `, className)} onClick={()=>setRecepientId(newRecepient as string)}>
            
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
 
export default FavouriteListConvo;