import { AccountFormType } from "@/components/myComponents/AppComponent/profileComponent/accountForm.tsx"

const updateUserPrivacy = async(data: AccountFormType, currentProfileId: string) => {

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update-user-privacy${currentProfileId}`, {
            method: "PATCH",
            headers:{
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


    return {};
}
 
export default updateUserPrivacy;