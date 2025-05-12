import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";
export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  sender: User;
}
const useGetFriendRequests = () => {

    const {
        data: friendRequests,
        isLoading: isGettingFriendRequest
    } = useQuery({
        queryKey: ['friend-request'],
        queryFn: ()=>apiClient<Message[]>('/friend-requests')
    })
    return {friendRequests, isGettingFriendRequest};
}
 
export default useGetFriendRequests;