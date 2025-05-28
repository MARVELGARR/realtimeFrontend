import { ProfileFormValues } from "@/CustomComponent/ApplicationComponents/UserProfile/userProfileForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {

    const queryClient =  useQueryClient()
    
    const {mutateAsync: updateProfile, isPending: isUpdatingProfile} = useMutation({
        mutationFn: (data: ProfileFormValues)=>apiClient("/update-profile",{
            method: "PATCH",
            body: {...data}
        }),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey:["user"]})
        }
    })
    return {isUpdatingProfile, updateProfile}

}
 
export default useUpdateProfile;