import getConversationsWithrConversationId from "@/actions/api-actions/messageActions/getConversationWithConversationId";
import { useQuery } from "@tanstack/react-query";

const useGroupConversation = (conversationId: string) => {


    const {data: groupConversation, isLoading: isLoadingGroupConversation} = useQuery({
        queryKey: ["group-conversation", {conversationId}],
        queryFn: ()=> getConversationsWithrConversationId(conversationId),
        enabled: !!conversationId
    })
    return {groupConversation, isLoadingGroupConversation};
}
 
export default useGroupConversation;