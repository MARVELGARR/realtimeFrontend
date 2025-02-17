import updateUserPrivacy from "@/actions/api-actions/userAction/updateUserPrivacy";
import { AccountFormType } from "@/components/myComponents/AppComponent/profileComponent/accountForm.tsx";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserPrivacy = (currentProfileId: string) => {

    const { mutateAsync: updatingUserPrivacy, isPending:isUpdatingUserPrivacy } = useMutation({
        mutationKey: ['updateUserPrivacy'],
        mutationFn: (data: AccountFormType) => updateUserPrivacy(data, currentProfileId)
    })

    return {updatingUserPrivacy,isUpdatingUserPrivacy};
}
 
export default useUpdateUserPrivacy;