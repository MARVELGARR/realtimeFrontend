
interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  profile?:{
        bio: string,
        profilePicture: string,
    
}
}
interface pagination {

    currentPage: number,
    totalPages: number,
    hasNextPage: boolean,
    totalParticipants: number,
    limit: number

}

export interface GroupParticipant {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  conversationId: string;
  groupId: string;
  groupRole: "ADMIN" | "PARTICIPANT"; // Add other roles if needed
  user: User;
  
}

export type GroupParticipants = {
  participants: GroupParticipant[];
  pagination: pagination;
};




const getGroupParticipant = async (
  searchQuery: string,
  conversationId: string,
  page: number,
  limit: number
): Promise<GroupParticipants> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-group-participants/${conversationId}?search=${searchQuery}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorDetails = await response.json();
      throw new Error(`Failed to fetch users: ${JSON.stringify(errorDetails)}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching users");
  }
};

export default getGroupParticipant;
