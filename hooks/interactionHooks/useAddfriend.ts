import addFriend from "@/actions/api-actions/userAction/addFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFriend = () => {
    const queryClient = useQueryClient();

    const {mutateAsync: addingMessage, isPending: isAddingMessage} = useMutation({
        mutationFn: (recepientId: string)=> addFriend(recepientId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    })
    return {addingMessage, isAddingMessage}
}
 
export default useAddFriend;