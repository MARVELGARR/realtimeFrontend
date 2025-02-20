
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface Message {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    conversationId: string;
}

export interface ConversationParticipant {
    id: string;
    userId: string;
    conversationId: string;
    groupId?: string;
}

export interface Conversation {
    id: string;
    type: 'DIRECT' | 'GROUP';
    createdAt: string;
    updatedAt: string;
    messages: Message[];
    participants: ConversationParticipant[];
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

export interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    profile?: UserProfile | null;
}

export interface ApiResponse {
    users: User[];
    conversations: Conversation[];
    groups: Group[];
    totalResults: number;
    currentPage: number;
    totalPages: number;
}

export interface Group {
    id: string;
    name: string;
    groupImage?: string;
    disappearingMessages: 'OFF' | 'DAYS90' | 'DAYS7' | 'H24';
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    adminId: string;
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
