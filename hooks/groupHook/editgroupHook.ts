import editGroupDetails from "@/actions/api-actions/groupActions/editGroupDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditGroup = (groupId:string) => {
    const queryClient = useQueryClient()
    const {mutateAsync: editGroup, isPending:isEdittingGroup} = useMutation({
        mutationFn: (data:FormData)=>editGroupDetails(data, groupId),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey : ["group-profile", {groupId}]})
        }
    })
    return {editGroup, isEdittingGroup};
}
 
export default useEditGroup;