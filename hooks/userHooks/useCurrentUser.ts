import getCurrentUser from "@/actions/api-actions/userAction/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
    
    const {data: currentUser, isLoading: isGettingCurentUser, error: errorGettingCurrentUser} = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser
    })
    const currentUserProfilePic = currentUser?.image
    const currentUserId = currentUser?.id
    const currentUserName = currentUser?.name
    const currentUserProfile = currentUser?.profile
    const currentUserBio = currentUserProfile?.bio
    const currentUserPhoneNumber = currentUserProfile?.phoneNumber
    const currentUserNickname = currentUserProfile?.nickname
    const currentUserEmail = currentUser?.email



    return {currentUserProfilePic, currentUserPhoneNumber, currentUserNickname, currentUserId, currentUserBio, currentUserName, currentUserProfile, currentUserEmail, isGettingCurentUser, errorGettingCurrentUser };
}
 
export default useCurrentUser;