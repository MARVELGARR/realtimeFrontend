const logout = async () => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`,{
            method: "GET",
            headers:{
                "Content-type": "application/json",
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
        }
    }
    catch(error){
        throw new Error(`${error}`)
    }

  
}
 
export default logout;