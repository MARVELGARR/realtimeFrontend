
export type newGroupDetailsProp = {
    name: string,
    participant: string[],
    disappearingMessages: string,
    groupImage: string,
    groupDescription: string
    
}


const createGroup = async(newGroupDetails:newGroupDetailsProp) => {

    try{
        const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/createGroup`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({newGroupDetails}),
            credentials: "include"
        })
        if(res.ok){
            const data =  res.json()
            return data
        }
        else{
            const errorDetails =  res.json()
            console.error(errorDetails)
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        console.error(error)
            throw new Error(`${error}`)
    }
}
 
export default createGroup;