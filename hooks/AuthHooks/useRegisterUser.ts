import {  RegisterFormType } from "@/CustomComponent/AuthComponents/Register/registerForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";

const usRegisterUser = () => {

    const {mutateAsync: registerUser, isPending: isRegisteringUser} = useMutation({
        mutationFn: (body: RegisterFormType)=> apiClient(`/v1/register`, {
            body, 
            method: "POST",    
        })
    })
    return {registerUser, isRegisteringUser};
}
 
export default usRegisterUser;