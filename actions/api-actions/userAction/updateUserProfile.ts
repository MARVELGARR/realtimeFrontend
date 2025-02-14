const updateUserProfile = async (data: any) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update-profile`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
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
 
export default updateUserProfile;