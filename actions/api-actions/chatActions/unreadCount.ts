const unReadCount = async () => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/api/v1/unread-count`, {
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
        console.error(error)
        throw new Error(`${error}`)
    }
}
 
export default unReadCount;