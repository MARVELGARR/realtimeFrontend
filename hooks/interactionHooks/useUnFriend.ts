
import unFriend from "@/actions/api-actions/userAction/unFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUnFriend = (recepientId:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: removingFriend, isPending: isRemovingFriend} = useMutation({
        mutationFn: (recepientId: string)=> unFriend(recepientId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["recepient-profile", {recepientId}] });
            queryClient.invalidateQueries({ queryKey: ["conversation", {recepientId}] });
        }
    })
    return {removingFriend, isRemovingFriend}
}
 
export default useUnFriend;