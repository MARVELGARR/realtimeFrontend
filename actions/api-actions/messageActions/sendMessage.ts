import { MessageFormData } from "@/components/myComponents/chat/messageForm";

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

export interface GroupMessageProp {

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

export type sendMessageProp = {
    newMessage: GroupMessageProp,
}



const sendMessage = async( message: MessageFormData, recepientId: string, conversationId?: string | undefined): Promise<sendMessageProp> => {


    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/send-message${recepientId}`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
            credentials: "include",
        })
        if(res.ok){
            
            const data = await res.json();
            
            return data;
        }
        else{
            const errorDetails = await res.json();
            throw new Error(`${errorDetails.error}`);
        }
    }
    catch(error){
        console.error(error);
        throw new Error(`${error}`) ;
    }
}
 
export default sendMessage;
