import { AccountFormType } from "@/components/myComponents/AppComponent/profileComponent/accountForm.tsx";

type PrivacyProp = {

    id: string
    profileId: string,
    disappearingMessages: AccountFormType["disappearing"],
    lastSeen: AccountFormType["lastSeen"]
    precense: AccountFormType['online'],
    readReciept: boolean
        
}

type UserProfile = {
    id: string;
    bio: string;
    firstName: string;
    lastName: string;
    nickname: string | null;
    phoneNumber: string | null;
    gender: "MALE" | "FEMALE" | "OTHER"; // Adjust if there are more options
    birthDay: string | null;
    createdAt: string;
    updatedAt: string;
    profilePicture: string;
    userId: string;
    privacy: PrivacyProp
  };
  
  export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
    profile: UserProfile;
  };
  
  

const getCurrentUser: () => Promise<User> = async () => {

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