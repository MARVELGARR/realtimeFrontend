
import unStarMessage from "@/actions/api-actions/messageActions/unStarMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUnStarMssage = (recepientId: string) => {

    const queryClient = useQueryClient()

    const {mutateAsync: unStaringMessage, isPending: isUnStaringMessage} = useMutation({
        mutationFn: (staringData: { messageId: string; currentProfileId: string; })=>unStarMessage(staringData),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey:["get-messages", { recepientId }]})
        }
    })


    return {isUnStaringMessage, unStaringMessage};
}
 
export default useUnStarMssage;