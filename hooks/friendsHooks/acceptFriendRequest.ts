import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useAcceptFriendRequest = () => {

    const {mutateAsync: ConfirmingFriendRequest, isPending: isAcceptingFriendRequest} = useMutation({
        mutationFn: ({requestId, senderId}:{requestId: string, senderId: string})=>apiClient("/confirmFriendRequest", {
            method: "POST",
            body: {requestId, senderId},

        })
    })
    return {ConfirmingFriendRequest, isAcceptingFriendRequest};
}
 
export default useAcceptFriendRequest;