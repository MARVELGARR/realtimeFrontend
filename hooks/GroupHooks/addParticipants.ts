import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useAddParticipant = (groupId: string) => {
    const {
        mutateAsync: addParticipant,
        isPending: isAddingParticipant
    } = useMutation({
        mutationFn: (participantIds: string[])=>apiClient(`/add-participant/${groupId}`,
            {
                method: "POST",
                body: {participantIds}
            }
        )
    })
    return {addParticipant, isAddingParticipant}
}
 
export default useAddParticipant;