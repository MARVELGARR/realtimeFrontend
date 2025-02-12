import getCurrentUser from "@/actions/api-actions/userAction/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
    
    const {data: currentUser, isLoading: isGettingCurentUser, error: errorGettingCurrentUser} = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser
    })
    const currentUserProfilePic = currentUser?.image
    const currentUserId = currentUser?.id
    const currentName = currentUser?.name
    const currentProfile = currentUser?.profile
    const currentUserEmail = currentUser?.email
    return {currentUserProfilePic, currentUserId, currentName, currentProfile, currentUserEmail, isGettingCurentUser, errorGettingCurrentUser };
}
 
export default useCurrentUser;