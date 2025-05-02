import { apiClient } from "@/utils/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCoverPicture = () => {

    const queryClient = useQueryClient()
    
    const {mutateAsync: updateCoverPic, isPending:isUpdatingProfileCover} = useMutation({
        mutationFn: (coverPicture: string)=> apiClient(`/v1/update-profile`, {
            method: "PATCH",
            body: {coverPicture},

        }),
        onSettled:() =>{
            queryClient.invalidateQueries({queryKey:["user"]});
        }
    })
    return {updateCoverPic, isUpdatingProfileCover};
}
 
export default useUpdateCoverPicture;