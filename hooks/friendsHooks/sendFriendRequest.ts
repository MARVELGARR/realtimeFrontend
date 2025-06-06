import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";

const useSendFriendRequest = (recieverId?: string) => {
    const {
        data: sendFriendRequestResponse,
        isLoading: isSendFriendRequestLoading,
        isError: isSendFriendRequestError,
        error: sendFriendRequestError
    } = useQuery({
        queryKey: ["send-friend-request", recieverId],
        queryFn: ()=> apiClient(`/send-friend-request/${recieverId}`, {
            method: "GET",
        })
    })

    return {
        sendFriendRequestResponse,
        isSendFriendRequestLoading,
        isSendFriendRequestError,
        sendFriendRequestError
    }
}
 
export default useSendFriendRequest;