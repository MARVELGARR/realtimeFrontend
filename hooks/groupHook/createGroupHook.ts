import createGroup, { newGroupDetailsProp } from "@/actions/api-actions/groupActions/createGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGroup = () => {
    const queryClient = useQueryClient()

    const {mutateAsync: CreatGroup, isPending: isCreatingGroup} = useMutation({
        mutationFn: (newGroupDetails: newGroupDetailsProp)=>createGroup(newGroupDetails),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey: ["groups"]})
            queryClient.invalidateQueries({queryKey: ["search"]})
        }
    })

    return {CreatGroup, isCreatingGroup};
}
 
export default useCreateGroup;