
import { UserProfileSettingFormType } from "@/CustomComponent/ApplicationComponents/UserProfile/userProfileSettingsForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdatePrivacySettings = () => {

    const queryClient =  useQueryClient()
    
    const {mutateAsync: updatePrivacySetting, isPending: isUpdatingPrivacySetting} = useMutation({
        mutationFn: (data: UserProfileSettingFormType)=>apiClient("/v1/update-privacy",{
            method: "PATCH",
            body: {...data}
        }),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey:["user"]})
        }
    })
    return {updatePrivacySetting, isUpdatingPrivacySetting}

}
 
export default useUpdatePrivacySettings;