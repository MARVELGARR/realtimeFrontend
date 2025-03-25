import deleteGroupMessage from "@/actions/api-actions/messageActions/deleteGroupMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useDeleteGroupMessage = (conversationId: string) => {
    const queryClient = useQueryClient()

    const {mutateAsync: DeleteGroupMessage, isPending: isDeletingGroupMessage} = useMutation({
        mutationFn: (messageId: string)=> deleteGroupMessage(messageId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["group-conversation", { conversationId }] });
        }
    })
    return {DeleteGroupMessage, isDeletingGroupMessage};
}
 
export default useDeleteGroupMessage;