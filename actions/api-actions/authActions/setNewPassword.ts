import { newPasswordType } from "@/app/(auth)/newPassword/_newPasswordComponent/newPasswordForm";

const setNewPassword = async (password :newPasswordType, token?:string) => {

    try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reset-password?token=${token}`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(password),
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            return data
        }
        else{
            const errorDetails = await res.json()
            console.error()
            throw new Error(`${errorDetails}`)
            
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)

    }

}
 
export default setNewPassword;