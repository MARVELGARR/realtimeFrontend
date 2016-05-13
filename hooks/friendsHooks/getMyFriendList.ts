import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";
export interface UserProfile {
  profilePicture: string;
  bio: string
}

export interface UserWithProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: UserProfile;
}

export interface FriendshipWithUser2 {
  user2: UserWithProfile;
}


const useMyFriendList = () => {

    const {data: myFriendList, isLoading: isGettingMyFriendList} = useQuery({
        queryKey: ["friend-list"],
        queryFn: ()=>apiClient<FriendshipWithUser2[]>("/my-friends",{
            method: "GET",

        })
    })
    return {myFriendList, isGettingMyFriendList};
}
 
export default useMyFriendList;