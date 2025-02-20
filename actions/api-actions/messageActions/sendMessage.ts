import { MessageFormData } from "@/components/myComponents/chat/messageForm";
import axios from "axios";

const sendMessage = async(messageId: string, message: MessageFormData) => {

    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1//send-message`, message, {
            params: { messageId },
            withCredentials: true
        })
        if(res.status === 200){
            const data = res.data;
            return data;
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
}
 
export default sendMessage;
