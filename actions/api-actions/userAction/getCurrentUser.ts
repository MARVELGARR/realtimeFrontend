type CurrentUserProp = {
    id: string;
    email: string;
    name: string;
    image: string | null;
    profile: string | null;
};
  

const getCurrentUser = async (): Promise<CurrentUserProp> => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
            method: "GET",
            headers: {
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
            const {error} = errorDetails
            throw new Error(`${error}`)
        }
    }
    catch(error){
        throw new Error(`${error}`)
    }


}
 
export default getCurrentUser;