import { MessageFormData } from "@/components/myComponents/chat/messageForm";



const sendMessage = async( message: MessageFormData, conversationId?: string) => {


    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/send-message/${encodeURIComponent(conversationId!)}`, {
            
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
