import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";
interface Profile {
  profilePicture: string;
  bio: string;
}

interface Friend {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: Profile;
}

export interface FriendsResponse {
  friends: Friend[];
  totalCount: number;
}

const useMyFriendList = () => {

    const {data: myFriendList, isLoading: isGettingMyFriendList} = useQuery({
        queryKey: ["friend-list"],
        queryFn: ()=>apiClient<FriendsResponse>("/friends",{
            method: "GET",

        })
    })
    return {myFriendList, isGettingMyFriendList};
}
 
export default useMyFriendList;