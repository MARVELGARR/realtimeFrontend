import addFriend from "@/actions/api-actions/userAction/addFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFriend = (recepientId:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: addingFriend, isPending: isAddingFriend} = useMutation({
        mutationFn: (recepientId: string)=> addFriend(recepientId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["recepient-profile", {recepientId}] });
            queryClient.invalidateQueries({ queryKey: ["conversation", {recepientId}] });
        }
    })
    return {addingFriend, isAddingFriend}
}
 
export default useAddFriend;