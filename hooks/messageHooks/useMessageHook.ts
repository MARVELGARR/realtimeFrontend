import sendMessage from "@/actions/api-actions/messageActions/sendMessage";
import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import { useMutation, useQuery } from "@tanstack/react-query";


const useMessageHook = (messageId?:string, conversationId?: string) => {

    const {mutateAsync: sendingMessage, isPending: isSendingMessage} = useMutation({
        mutationKey: ['send-message'],
        mutationFn: (data: MessageFormData)=> sendMessage(messageId as string, data ),
    })
    const {mutateAsync: updatingMessage, isPending: isUpdatingMessage} = useMutation({
        mutationKey: ['updat-message'],
        mutationFn: (message: MessageFormData)=> sendMessage(messageId as string, message ),
    })
    const {} = useQuery({
        queryKey: ['delete-message'],
        queryFn: ()=>{},
    })


    return {sendingMessage, isSendingMessage};
}
 
export default useMessageHook;