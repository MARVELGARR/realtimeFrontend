import starMessage from "@/actions/api-actions/messageActions/starMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useStarGroupMessageHook = (conversationId: string) => {

    const queryClient = useQueryClient()

    const {mutateAsync: staringGroupMessage, isPending: isStaringGroupMessage} = useMutation({
        mutationFn: (staringData: { messageId: string; currentProfileId: string; })=>starMessage(staringData),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey:["conversation", {conversationId}]})
        }
    })


    return {staringGroupMessage, isStaringGroupMessage};
}
 
export default useStarGroupMessageHook;