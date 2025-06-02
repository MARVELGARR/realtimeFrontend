import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  profilePicture: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: Profile;
}

export interface Participant {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  conversationId: string;
  groupId: string | null;
  groupRole: "PARTICIPANT" | "ADMIN"; // extendable if needed
  user: User;
}

export interface Group {
  id: string;
  name: string;
  groupImage: string | null;
  descriptions: string | null;
  adminId: string;

  disappearingMessages: string;
  createdAt: string;
  updatedAt: string;
}

export interface convoDetails {
  id: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
  conversationType: "GROUP" | "DIRECT"; // extendable if needed
  participants: Participant[];
  group: Group;
}

const useGetConvoDetails = (conversationId: string) => {
  const { data: convoDetails, isLoading: isGettingConvoDetails } = useQuery({
    queryKey: ["convo-details", conversationId],
    queryFn: () =>
      apiClient<convoDetails>("/convo-details", {
        method: "GET",
        param: conversationId,
      }),
  });
  return {
    convoDetails,
    isGettingConvoDetails,
  };
};

export default useGetConvoDetails;
