const clearAllChat = async (userId: string) => {
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clear-all-message/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        })

        if(res.ok){
            const data = await res.json()
            return data
        }
        else{
            const errorDetails = await res.json()
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        throw new Error(`${error}`)
    }
}
 
export default clearAllChat;