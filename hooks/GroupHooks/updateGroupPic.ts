import { apiClient } from "@/utils/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateGroupPic = () => {
    const queryClient = useQueryClient();
    
    const {mutateAsync: updateGroupProfilePic, isPending:isupdatingGroupProfile} = useMutation({
        mutationFn: (image: string)=> apiClient(`/v1/update-group-profile`, {
            method: "POST",
            body: {image},

        }),
        onSettled:() =>{
            queryClient.invalidateQueries({queryKey:["user"]});
        }
    })
}
export default useUpdateGroupPic