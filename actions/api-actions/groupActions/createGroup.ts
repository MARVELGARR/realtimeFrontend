
export type newGroupDetailsProp = {
    name: string,
    participant: string[],
    disappearingMessages: string,
    groupImage: string,
    groupDescription: string
    
}

interface User {
    id: string;
    name: string;
    email: string;
  }
  
  interface Participant {
    id: string;
    createdAt: string;
    // Add other fields if necessary
  }
  
  interface Group {
    id: string;
    name: string;
    admin: User;
    adminId: string;
    createdAt: string;
    creator: User;
    creatorId: string;
    descriptions: string | null;
    disappearingMessages: 'OFF' | 'DAYS90' | 'DAYS7' | 'H24';
    groupImage: string;
    participants: Participant[];
    updatedAt: string;
  }
  

const createGroup = async(newGroupDetails:newGroupDetailsProp): Promise<Group> => {

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