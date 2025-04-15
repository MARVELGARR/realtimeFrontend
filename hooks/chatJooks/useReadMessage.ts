import onReadMessage from "@/actions/api-actions/chatActions/onReadMessage";
import { useQuery } from "@tanstack/react-query";

const useReadMessage = (singleConversationId: string) => {


    const {data: isRead, isLoading} = useQuery({
        queryKey: ["read-message"],
        queryFn: ()=>onReadMessage(singleConversationId as string),
        enabled: !!singleConversationId,
        
    })
    return {isRead, isLoading};
}
 
export default useReadMessage;