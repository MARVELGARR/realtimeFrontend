import updateUserProfile from "@/actions/api-actions/userAction/updateUserProfile";
import { useMutation } from "@tanstack/react-query";

const useUpdateUser = () => {

    const { mutateAsync: updatingUser, isPending:isUpdatingUser } = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: (data: any) => updateUserProfile(data)
    })

    return {updatingUser,isUpdatingUser};
}
 
export default useUpdateUser;