import { ProfileFormValues } from "@/CustomComponent/ApplicationComponents/UserProfile/userProfileForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useUpdateProfile = () => {
    
    const {mutateAsync: updateProfile, isPending: isUpdatingProfile} = useMutation({
        mutationFn: (data: ProfileFormValues)=>apiClient("/v1/update-profile",{
            method: "POST",
            body: data
        })
    })
    return {isUpdatingProfile, updateProfile}

}
 
export default useUpdateProfile;