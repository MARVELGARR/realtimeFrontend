
import registerNewUser from "@/actions/api-actions/authActions/registerNewUser";
import { RegistrationFormData } from "@/components/myComponents/registrationForm/stepped-sign-up-form";
import { useMutation,  } from "@tanstack/react-query";

const useRegister = () => {

    const { mutateAsync: registerUser, isPending: isRegisteringUser, error:registeringUserError } = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: RegistrationFormData)=>registerNewUser(data)
    });
    return {registerUser, isRegisteringUser, registeringUserError};
}
 
export default useRegister;