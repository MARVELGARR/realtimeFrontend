import { GroupSettingFormProp } from "@/CustomComponent/GroupComponents/groupSettingsComponent";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";




const useUpdateGroupSetting = (groupId: string) => {

    const {
        
        isPending: isUpdatingGroupSetting,
        mutateAsync: updateGroupSetting, // This is the function to call to trigger the mutation
    } = useMutation({
        mutationFn: (data: GroupSettingFormProp)=>apiClient(`/update-group-settings/${groupId}`, {
            method: "POST",
            body: {...data}
        })
    })
    return {updateGroupSetting, isUpdatingGroupSetting};
}
 
export default useUpdateGroupSetting;