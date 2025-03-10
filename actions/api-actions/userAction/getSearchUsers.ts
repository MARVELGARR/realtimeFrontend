const getSearchUsers = async(search: string, page: string, limit: string) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/searchUsers?search=${search}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            },
            credentials: "include"
        })
        if(res.ok){
            const data = res.json()
            return data
        }
        else{
            const errorDetails = res.json()
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        throw new Error(`${error}`)
    }
}
 
export default getSearchUsers;