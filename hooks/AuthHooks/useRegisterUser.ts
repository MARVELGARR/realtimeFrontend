import { RegisterFormType } from "@/CustomComponent/AuthComponents/Register/registerForm";
import { apiClient } from "@/utils/clientApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type RegisterUserResponse = {
  message: string;
  user: {
    name: string;
    email: string;
  };
  sessionId: string;
};

const usRegisterUser = () => {
    const router = useRouter()
  const { mutateAsync: registerUser, isPending: isRegisteringUser } =
    useMutation({
      mutationFn: (body: RegisterFormType) =>
        apiClient<RegisterUserResponse>(`/v1/register`, {
          body,
          method: "POST",
        }),
        onSettled: ()=>{
            router.push('/login')
        }
    });
  return { registerUser, isRegisteringUser };
};

export default usRegisterUser;
