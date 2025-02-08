import { EmailFormType } from "@/app/(auth)/reset-password/_resetPasswordComponent/restPasswordForm"

const resetPassword = async (email: EmailFormType) => {


    try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password-reset`, {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(email),
            credentials:"include"
        })
        if(res.ok){
            const data = await res.json()
            return data.message
        }
        else{
            const errorDetails =await res.json()
            throw new Error(`${errorDetails.error}`) 
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`) 

    }

}
 
export default resetPassword;