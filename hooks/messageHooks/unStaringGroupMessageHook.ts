
import unStarGroupMessage from "@/actions/api-actions/messageActions/unStarGroupMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUnStarGroupMssage = (conversationId: string) => {

    const queryClient = useQueryClient()

    const {mutateAsync: unStaringGroupMessage, isPending: isUnStaringGroupMessage} = useMutation({
        mutationFn: (staringData: { messageId: string; currentProfileId: string; })=>unStarGroupMessage(staringData),
        onSettled: ()=>{
            queryClient.invalidateQueries({ queryKey: ["group-conversation", { conversationId }] });
        }
    })


    return {isUnStaringGroupMessage, unStaringGroupMessage};
}
 
export default useUnStarGroupMssage;