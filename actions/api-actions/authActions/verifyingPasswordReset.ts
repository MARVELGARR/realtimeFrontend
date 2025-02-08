const verifyingPasswordReset = async(token: string, userId: string) => {
    try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/verifying-reset-password?token=${token}&userId=${userId}`, {
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
            console.error(errorDetails)
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }
}
 
export default verifyingPasswordReset;