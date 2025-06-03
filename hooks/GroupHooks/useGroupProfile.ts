import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";

interface GroupParticipant {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

interface Group {
  id: string;
  name: string;
  groupImage: string;
  adminId: string;
  creatorId: string;
  descriptions: string;
  disappearingMessages: 'DAYS90' | 'DAYS30' | 'HOURS24' | string; // extend if needed
  participants: GroupParticipant[];
  createdAt: string;
  updatedAt: string;
}


const useGroupProfile = (groupId: string) => {
    const {
        data: groupProfile,
        isLoading: isGroupProfileLoading,
        isError: isGroupProfileError,
        error: groupProfileError
    } = useQuery({
        queryKey:["group-profile", groupId],
        queryFn: () =>apiClient<Group>(`/group-profile/${groupId}`, {
            method: "GET",
        })
    })
    return {
        groupProfile,
        isGroupProfileLoading,
        isGroupProfileError,
        groupProfileError
    };
}
 
export default useGroupProfile;