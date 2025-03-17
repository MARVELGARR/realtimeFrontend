import addFriend from "@/actions/api-actions/userAction/addFriend";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFriend = (recepientId:string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: addingMessage, isPending: isAddingMessage} = useMutation({
        mutationFn: (recepientId: string)=> addFriend(recepientId),
        onSettled: () =>{
            queryClient.invalidateQueries({ queryKey: ["recepient-profile", {recepientId}] });
        }
    })
    return {addingMessage, isAddingMessage}
}
 
export default useAddFriend;