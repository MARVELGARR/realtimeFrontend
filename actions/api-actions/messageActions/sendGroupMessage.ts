import { MessageFormData } from "@/components/myComponents/chat/groupMessageForm";




const sendGroupMessage = async( message: MessageFormData, conversationId?: string | undefined) => {


    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/send-group-message/${conversationId ? conversationId : undefined}`, {
            
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
 
export default sendGroupMessage;
