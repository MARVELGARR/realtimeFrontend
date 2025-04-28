import OauthSelect from "@/CustomComponent/AuthComponents/Register/oAuthComponent";
import { RegisterForm } from "@/CustomComponent/AuthComponents/Register/registerForm";

const RegisterPage = () => {
  return (
    <div className="px-[3rem] h-full md:pt-3   flex flex-col justify-center space-y-4">
        
        <div className="flex flex-col items-center space-y-3">
            <h1 className=" font-bold text-2xl ">Sign Up Account</h1>
            <p className="">Enter your personal data or your create</p>
        </div>
      <OauthSelect className="w-full flex items-center justify-between gap-3" />
      <div className="flex items-center w-full justify-center">
        <div className="bg-black h-[0.03rem] w-[9rem]"></div>or
        <div className="bg-black h-[0.03rem] w-[9rem]"></div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
