import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useUpdateProfilePicture = () => {
    
    const {mutateAsync: updateProfilePic, isPending:isUpdatingProfile} = useMutation({
        mutationFn: (image: string)=> apiClient(`/v1/update-profile`, {
            method: "PATCH",
            body: image,

        })
    })
    return {updateProfilePic, isUpdatingProfile};
}
 
export default useUpdateProfilePicture;