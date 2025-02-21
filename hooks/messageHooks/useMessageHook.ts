import sendMessage from "@/actions/api-actions/messageActions/sendMessage";
import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import { useMutation, useQuery } from "@tanstack/react-query";


const useMessageHook = (conversationId?: string) => {

    const {mutateAsync: sendingMessage, isPending: isSendingMessage} = useMutation({
        mutationKey: ['send-message'],
        mutationFn: (data: MessageFormData)=> sendMessage( data, conversationId as string ),
    })




    return {sendingMessage, isSendingMessage};
}
 
export default useMessageHook;