interface User {
    id: string;
    name: string;
    email: string;
  }
  
  interface Participant {
    id: string;
    createdAt: string;
    userId: string,
    groupRole: "PARTICIPANT" | "ADMIN";
    // Add other fields if necessary
  }
  
 export interface GroupProfileProps {
    id: string;
    name: string;
    admin: User;
    adminId: string;
    createdAt: string;
    creator: User;
    creatorId: string;
    descriptions: string | null;
    disappearingMessages: string;
    groupImage: string;
    participants: Participant[];
    updatedAt: string;
  }
  

const getGroupProfile = async(groupId: string): Promise<GroupProfileProps> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-group-profile-by-id/${groupId}`,{
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
 
export default getGroupProfile;