interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface StarredMessages {
  id: string;
  profileId: string;
  messageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageProp {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: "GROUP" | "DIRECT"; // Adjust as needed
  userId: string;
  conversationId: string;
  editableUntil: string;
  StarredMessage: StarredMessages[]; // Adjust if StarredMessage has a specific structure
  user: User;
}

export interface SockedReceivedMessageProp {
  reciepientId: string,
  newMessage: MessageProp;
}

export interface GetMessagesProp {
  Messages: MessageProp;
  pagination: {
    hasNextPage: boolean;
    nextCursor: string;
    limit: number;
  };
}

const getMessages = async (
  recepientId: string,
  cursor: string | null,
  limit: number
): Promise<GetMessagesProp> => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v1/get-messages/${recepientId}?cursor=${
        cursor ?? ""
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const errorDetails = await res.json();
      throw new Error(`${errorDetails}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getMessages;
