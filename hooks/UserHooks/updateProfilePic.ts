import { apiClient } from "@/utils/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfilePicture = () => {
    const queryClient = useQueryClient();
    
    const {mutateAsync: updateProfilePic, isPending:isUpdatingProfile} = useMutation({
        mutationFn: (image: string)=> apiClient(`/v1/update-profile`, {
            method: "PATCH",
            body: {image},

        }),
        onSettled:() =>{
            queryClient.invalidateQueries({queryKey:["user"]});
        }
    })
    return {updateProfilePic, isUpdatingProfile};
}
 
export default useUpdateProfilePicture;