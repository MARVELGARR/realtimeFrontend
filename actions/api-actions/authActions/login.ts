import { LoginFormData } from "@/app/(auth)/login/page"

type loginUserRes = {
    email: string | null;
    password: string | null;
    name: string | null;
    id: string;
    emailVerified: boolean | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date
}

export type loginResponds ={
    message: string,
    user: loginUserRes,
    sessionId: string,
}

const login = async(data: LoginFormData): Promise<loginResponds> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            return data.message
        }
        else{
            const errorDetail = await res.json()
            console.error(errorDetail)
            throw new Error(`${errorDetail.error}`) 
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }


}
 
export default login;