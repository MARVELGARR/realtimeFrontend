import sendMessage from "@/actions/api-actions/messageActions/sendMessage";
import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import {  useMutation, useQueryClient } from "@tanstack/react-query";



const useMessageHook = (reciepientId?:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: sendingMessage, isPending: isSendingMessage} = useMutation({
        mutationKey: ['send-message', { reciepientId }],
        mutationFn: (data: MessageFormData)=> sendMessage( data, reciepientId as string),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["get-messages", { reciepientId: reciepientId }] });
        }
    })

    return {sendingMessage, isSendingMessage};
}
 
export default useMessageHook;