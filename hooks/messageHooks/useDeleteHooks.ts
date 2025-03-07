import deleteMessage from "@/actions/api-actions/messageActions/deleteMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useDeleteHook = (reciepientId: string) => {
    const queryClient = useQueryClient()

    const {mutateAsync: DeleteMessage, isPending: isDeletingMessage} = useMutation({
        mutationFn: (messageId: string)=> deleteMessage(messageId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["conversation", { recepientId: reciepientId }] });
        }
    })
    return {DeleteMessage, isDeletingMessage};
}
 
export default useDeleteHook;