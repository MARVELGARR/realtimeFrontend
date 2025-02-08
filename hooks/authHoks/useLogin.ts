
import login from "@/actions/api-actions/authActions/login";
import { LoginFormData } from "@/app/(auth)/login/page";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {

    const {mutateAsync: loginuser, isPending: isLoggingIn, error: isLoggingInError} = useMutation({
        mutationKey: ["login"],
        mutationFn: ({email, password}: LoginFormData)=>login({email, password})
    })

    return {loginuser, isLoggingIn, isLoggingInError};
}
 
export default useLogin;