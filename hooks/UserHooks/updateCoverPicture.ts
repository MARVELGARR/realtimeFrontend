import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useUpdateCoverPicture = () => {
    
    const {mutateAsync: updateCoverPic, isPending:isUpdatingProfile} = useMutation({
        mutationFn: (image: string)=> apiClient(`/v1/update-profile`, {
            method: "PATCH",
            body: image,

        })
    })
    return {updateCoverPic, isUpdatingProfile};
}
 
export default useUpdateCoverPicture;