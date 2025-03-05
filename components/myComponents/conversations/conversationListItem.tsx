import { ApiResponse } from "@/actions/api-actions/userAction/getSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/sessionProvider";
import { QueryClient } from "@tanstack/react-query";


type Conversation = ApiResponse['conversations'][0];

interface ConversatonListItemProps{
    conversation: Conversation
    className?: string
}

const ConversatonListItem = ({conversation, className}:ConversatonListItemProps) => {

    const {currentUser, isGettingCurentUser} = useSession()
    const currentUserId = currentUser?.id

    if(isGettingCurentUser){
        <div className="">fetching..</div>
    }
    const recepientData =conversation.participants.find((recepient)=>recepient.userId !== currentUserId)?.user 
    const initialRecepientId = recepientData?.id


    const handleClick = () => {
        const params = new URLSearchParams(window.location.search);
        params.set("recepientId", initialRecepientId!);
        window.history.replaceState({}, "", `?${params.toString()}`);
    }

    return (
        <div className={cn(' cursor-pointer', className)} onClick={handleClick}>
            
            <div className="w-full flex place-items-start gap-3">
                <Avatar className="w-[2.7rem] h-[2.7rem]">
                    <AvatarImage src={recepientData?.image as string} alt={recepientData?.name} />
                    <AvatarFallback>{recepientData?.name?.slice(0, -1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start -space-y-1">
                    <h3 className="font-bold">{recepientData?.name}</h3>
                    <p className="font-thin text-sm">
                        
                    </p>
                </div>
            </div>
        </div>
        
    );
}
 
export default ConversatonListItem;