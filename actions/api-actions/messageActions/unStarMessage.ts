


const unStarMessage = async (staringData: {messageId: string;
    currentProfileId: string;}) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/unStar-message`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(staringData),
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            return data.message
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
 
export default unStarMessage;