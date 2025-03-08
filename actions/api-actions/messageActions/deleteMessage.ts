const deleteMessage = async (messageId: string) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/delete-message/${encodeURIComponent(messageId)}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json"
            },
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            return data.message
        }
        else{
            const errorDetail = res.json()
            throw new Error(`${errorDetail}`)
        }
    }
    catch(error){
        throw new Error(`${error}`)
    }
}
 
export default deleteMessage;