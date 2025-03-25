import axios from "axios";

export interface GroupMessageType {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    conversationId: string;
    user: User;
    StarredMessage:StarredMessage[]
    
}

export interface StarredMessage { 
    id: string,
    profileId: string,
    messageId: string,
    createdAt: string,
    updatedAt: string
}
type UserProfile = {
    id: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    phoneNumber?: string | null;
    gender?: "MALE" | "FEMALE" | "OTHER";
    birthDay?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePicture?: string;
    userId: string;
};

type User = {
    id: string;
    image?: string;
    name: string;
    profile?: UserProfile | null;
};

type Participant = {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    conversationId: string;
    groupId?: string | null;
    user: User;
};

type Group = {
    admin: User;
    creator: User;
    disappearingMessages: string;
    groupImage?: string;
    name: string;
    descriptions: string;
    createdAt: string;
    updatedAt: string;
    id: string;
};

export type GroupConversationProp = {
    id: string;
    createdAt: string;
    updatedAt: string;
    groupId: string;
    messages: GroupMessageType[];
    participants: Participant[];
    group: Group;
};



const getConversationsWithrConversationId = async (conversationId: string):Promise<GroupConversationProp> => {
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groupConversation${conversationId}`, {
           
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
 
export default getConversationsWithrConversationId;