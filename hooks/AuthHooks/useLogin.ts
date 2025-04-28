import { LoginFormType } from "@/CustomComponent/AuthComponents/Login/loginForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {

    const {mutateAsync: Login, isPending: isLoggingIn} = useMutation({
        mutationFn: (body: LoginFormType)=> apiClient(`/v1/login`, {
            method: "POST",
            body
        })
    })
    return {Login, isLoggingIn};
}
 
export default useLogin;