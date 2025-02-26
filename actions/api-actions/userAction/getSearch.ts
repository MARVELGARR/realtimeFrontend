
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Interface for a user
export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    profile: 
        UserProfile// You can further define blockedBy's type if needed
     | null;
  }
  
  // Interface for a conversation message
  export interface Message {
    id: string;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      name: string;
    };
  }
  
  // Interface for a conversation participant
  export interface ConversationParticipant {
    userId: string;
    conversationId: string;
    user: {
      id: string;
      name: string;
      image: string | null;
      profile: UserProfile | null;
    };
  }
  
  // Interface for a conversation
  export interface Conversation {
    id: string;

    type: 'DIRECT'| 'GROUP',
    participants: ConversationParticipant[];
    messages: Message[];
  }
  
  // Interface for a group participant
  export interface GroupParticipant {
    user: {
      id: string;
      name: string;
      profile: {
        profilePicture: string | null;
      } | null;
    };
  }
  
  // Interface for a group
  export interface Group {
    id: string;
    name: string;
    creator: {
      id: string;
      name: string;
      profile: {
        profilePicture: string | null;
      } | null;
    };
    admin: {
      firstName: string | null;
      lastName: string | null;
      profilePicture: string | null;
    } | null;
    participants: GroupParticipant[];
  }
  
  // Interface for the overall search response
  export interface ApiResponse {
    users: User[];
    conversations: Conversation[];
    groups: Group[];
    totalResults: number;
    currentPage: number;
    totalPages: number;
  }
  

type Block = {
    id: string;
    blockerId: string;
    blockedId: string;
    createdAt: Date;
    updatedAt: Date;
    blocker?: UserProfile;
    blocked?: UserProfile;
  };

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profilePicture?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHERS';
    bio: string,
    nickname: string,
    userId: string,
    blockedBy: Block[],
}





const fetchSearchResults = async (searchTerm: string, page = 1, limit = 10): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search`, {
            params: { searchTerm, page, limit },
            withCredentials: true
        });
        console.log('Search results:', response.data);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useSearchQuery = (searchTerm: string, page:number, limit: number ) => {

    const { data, isLoading } = useQuery({
        queryKey: ["search", searchTerm, page, limit],
        queryFn: () => fetchSearchResults(searchTerm, page, limit),
        enabled: !!searchTerm,
        select: (data) => data,
    });
    return { data, isLoading };
};
