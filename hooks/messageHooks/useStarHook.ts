import starMessage from "@/actions/api-actions/messageActions/starMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useStarHook = (recepientId: string) => {

    const queryClient = useQueryClient()

    const {mutateAsync: staringMessage, isPending: isStaringMessage} = useMutation({
        mutationFn: (staringData: { messageId: string; currentProfileId: string; })=>starMessage(staringData),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey:["conversation", {recepientId}]})
        }
    })


    return {staringMessage, isStaringMessage};
}
 
export default useStarHook;