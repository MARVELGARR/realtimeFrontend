type getRecepientProfileProps ={
    id: string,
    name: string,
    email: string,
    image: string
    createdAt:string,
    updatedAt: string
    Friends: Friend[]
    profile: ProfileRecepient
}
type Friend={
    
    friendId: string,
    userId:string
    
}

type ProfileRecepient = {
    bio: string,
    birthDay: Date,
    firstName: string,
    lastName: string,
    gender: "MALE" | "FEMALE",
    nickname: string,
    phoneNumber: string,
    profilePicture: string,
}

const getRecepientProfile = async(recepientId: string): Promise<getRecepientProfileProps> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-recepient-profile/${recepientId}`,{
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
            throw new Error(`${errorDetails.error}`)
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }

    
}
 
export default getRecepientProfile;