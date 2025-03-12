
import { zustandFilterProps } from "@/store/useSearchFilter";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Interface for a user
// User Profile
interface UserProfile {
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
}

// Friend
interface Friend {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// User
interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  friends: Friend[];
  profile: UserProfile | null;
}

// Message
interface Message {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'DIRECT' | 'GROUP';
  userId: string;
  conversationId: string;
  editableUntil: Date;
  user: Pick<User, 'id' | 'name'>; // Simplified user view
}

// Participant
interface Participant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  conversationId: string;
  groupId?: string;
  user: User;
}

// Group
interface Group {
  id: string;
  name: string;
  groupImage?: string;
  disappearingMessages: 'OFF' | 'DAYS90' | 'DAYS7' | 'H24';
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  adminId: string;
}

// Starred Conversation
interface StarConversation {
  id: string;
  userId: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Conversation
interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  participants: Participant[];
  groupId?: string;
  group?: Group | null;
  StarConversation: StarConversation[];
}

// Group Conversation
interface GroupConversation {
  id: string;
  name: string;
  groupImage?: string;
  disappearingMessages: 'OFF' | 'DAYS90' | 'DAYS7' | 'H24';
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  adminId: string;
}

// Conversation Response
export interface ConversationResponse {
  directConversations: Conversation[];
  groupConversations: (GroupConversation | null)[];
  friendConvo: Conversation[];
  favouriteConvo: Conversation[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}


const fetchSearchResults = async (searchTerm: string, page = 1, limit = 10): Promise<ConversationResponse> => {
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

export const useSearchQuery = (searchTerm: string, page:number, limit: number, filter: zustandFilterProps ) => {

    const { data, isLoading, isError } = useQuery({
      queryKey: ["search", searchTerm, page, limit],
      queryFn: () => fetchSearchResults(searchTerm, page, limit),
      select: (data) => data,
    });    

    return { data, isLoading, isError };

  };
