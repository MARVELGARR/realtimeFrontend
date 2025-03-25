import sendGroupMessage from "@/actions/api-actions/messageActions/sendGroupMessage";
import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import {  useMutation, useQueryClient } from "@tanstack/react-query";



const useGroupMessageHook = (conversationId?: string, reciepientId?:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: sendingGroupMessage, isPending: isSendingGroupMessage} = useMutation({
        mutationFn: (data: MessageFormData)=> sendGroupMessage( data, conversationId as string ),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["group-conversation", { conversationId }] });
        }
    })

    return {sendingGroupMessage, isSendingGroupMessage};
}
 
export default useGroupMessageHook;