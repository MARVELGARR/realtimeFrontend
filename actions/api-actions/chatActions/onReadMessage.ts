const onReadMessage = async(conversationId: string) => {
    try{
        const readMessage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/read-message/${conversationId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                
            },
            credentials: "include",
        })
        if(readMessage.ok){
            const data = await readMessage.json()
            return data
        }
        else{
            const errorData = await readMessage.json()
            throw new Error(errorData.message || "Failed to fetch read message")
        }
    }
    catch(error){
        console.error("Error fetching read message:", error);
        throw new Error(`${error}`)
    }
}
 
export default onReadMessage;