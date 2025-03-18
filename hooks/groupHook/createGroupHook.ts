import createGroup from "@/actions/api-actions/groupActions/createGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGroup = () => {
    const queryClient = useQueryClient()

    const {mutateAsync: CreatGroup, isPending: isCreatingGroup} = useMutation({
        mutationFn: ()=>createGroup(),
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey: ["groups"]})
        }
    })

    return {CreatGroup, isCreatingGroup};
}
 
export default useCreateGroup;