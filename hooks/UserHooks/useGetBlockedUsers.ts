import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";



type BlockedUserProp = {
    id: string;
    name: string;
    image: string;
    profile: {
      bio: string;
      gender: "MALE" | "FEMALE" | string; // You can make this stricter if needed
      profilePicture: string;
    };
  };
const useGetBlockedUser = () => {
    const {
        data: blockUsers,
        isLoading: isGettingBlockedUsers
    } = useQuery({
        queryKey: ["blocked-users"],
        queryFn: ()=>apiClient<BlockedUserProp[]>("/block-users", {
            method: "GET"
        })
    })
    return {blockUsers, isGettingBlockedUsers }
}
 
export default useGetBlockedUser;