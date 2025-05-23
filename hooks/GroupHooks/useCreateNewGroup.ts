import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useCreateNewGroup = () => {


    const {
        mutateAsync: createNewGroup,
        isPending: isCreatingGroup,
    } = useMutation({
        mutationFn: ({groupName, groupImage, groupmembers}: { groupName: string; groupImage: string; groupmembers: string[] }) => 
            apiClient("/createNewGroup", {
                method: "POST",
                body: { groupName, groupImage, groupmembers },
            })
    })
  return{createNewGroup, isCreatingGroup}
}
 
export default useCreateNewGroup;