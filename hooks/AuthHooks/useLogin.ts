import { LoginFormType } from "@/CustomComponent/AuthComponents/Login/loginForm";
import { Gender, LastSeen } from "@/types";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ResponseUser = {
    id:string,
    email: string,
    name: string,
    image: string,
    profile: {
        bio: string,
        birthDay: Date,
        nickname: string,
        phoneNumber: string,
        lastSeen: LastSeen
        gender: Gender
        
    }
}

type LoginUserResponse = {

     message: string,
  user: ResponseUser,
  redirectTo: string
}


const useLogin = () => {

    const router = useRouter()

    const {mutateAsync: Login, isPending: isLoggingIn} = useMutation({
        mutationFn: (body: LoginFormType)=> apiClient<LoginUserResponse>(`/login`, {
            method: "POST",
            body
        }),
        
    })
    return {Login, isLoggingIn};
}
 
export default useLogin;