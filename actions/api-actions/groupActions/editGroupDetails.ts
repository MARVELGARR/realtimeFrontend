const editGroupDetails = async(data:FormData, groupId: string) => {
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edit-group-details/${groupId}`,{
            method: "PATCH",
            body: data,
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            return data
        }
        else{
            const errorDetails = await res.json()
            throw new Error(`${errorDetails.error}`)
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }
}
 
export default editGroupDetails;