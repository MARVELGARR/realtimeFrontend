import { RegistrationFormData } from "@/components/myComponents/registrationForm/stepped-sign-up-form"

type RegistrationResponds = {
    message: string,
    sessionId: string,
    redirectUrl: string
}

const registerNewUser = async(data: RegistrationFormData): Promise<RegistrationResponds> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/register`, {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        if(res.ok){
            const newUser = await res.json()
            return newUser.message
        }
        else{
            const errorDetails =  await res.json()
            throw new Error(`${errorDetails.error}`) 
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }

}
 
export default registerNewUser;



