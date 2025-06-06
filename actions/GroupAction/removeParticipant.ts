import { apiClient } from "@/utils/clientApi";

export const removeParticipant = async(groupId: string,participantId: string) => {
    try {
        const data = await apiClient(`/remove-participant?participantId=${participantId}/${groupId}`, {
            method: "DELETE",
            queryParams: {
                participantId,
            
            }
        })
        if (data) {
            console.log("Participant removed successfully:", data);
            return data;
        }
        else{
            console.error("Failed to remove participant: No data returned");
            return null;
        }
    }
    catch (error) {
        console.error("Error removing participant:", error);
    }

}
 
export default removeParticipant;