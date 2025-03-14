import deleteMessages from "@/actions/api-actions/messageActions/deleteMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMessages =  (recepientId: string) => {

    const queryClient = useQueryClient()

    const {mutateAsync: DeleteMessages, isPending: isDeletingMessages } = useMutation({
        mutationFn: (messagesIds: string[])=>deleteMessages(messagesIds),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey: ['conversation', {recepientId}]})
        }
    })

    return {DeleteMessages, isDeletingMessages};
}
 
export default useDeleteMessages;