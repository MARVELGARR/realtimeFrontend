const deleteMessages = async (messageIds: string[]) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/delete-messages`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(messageIds),
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
 
export default deleteMessages;