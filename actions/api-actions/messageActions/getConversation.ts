import axios from "axios";

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    conversationId: string;
    user: User;
}

export interface Participant {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    conversationId: string;
    groupId: string | null;
}

export interface Conversation {
    id: string;
    type: "DIRECT" | "GROUP";
    createdAt: string;
    updatedAt: string;
    messages: Message[];
    participants: Participant[];
}


const getConversationsWithrecepientId = async (recepientId: string):Promise<Conversation> => {
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/conversation-recepientId`, {
            params: { recepientId: recepientId },
            withCredentials: true
        })
        if(res.status === 200){

            return res.data;
        }
        else{
            const errorDetails = res.data
            throw new Error(`${errorDetails}`);
        }
    }
    catch(error){
        throw new Error(`${error}`);
    }

}
 
export default getConversationsWithrecepientId;