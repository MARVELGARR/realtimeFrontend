import sendGroupMessage from "@/actions/api-actions/messageActions/sendGroupMessage";
import sendMessage from "@/actions/api-actions/messageActions/sendMessage";
import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import {  useMutation, useQueryClient } from "@tanstack/react-query";



const useGroupMessageHook = (conversationId?: string, reciepientId?:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: sendingGroupMessage, isPending: isSendingGroupMessage} = useMutation({
        mutationKey: ['send-group-message', { conversationId }],
        mutationFn: (data: MessageFormData)=> sendGroupMessage( data, conversationId as string ),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["conversation", { conversationId }] });
        }
    })

    return {sendingGroupMessage, isSendingGroupMessage};
}
 
export default useGroupMessageHook;