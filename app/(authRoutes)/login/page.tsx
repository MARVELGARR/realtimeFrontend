import LoginForm from "@/CustomComponent/AuthComponents/Login/loginForm";
import OauthSelect from "@/CustomComponent/AuthComponents/Register/oAuthComponent";

const LoginPage = () => {
  return (
    <div className="px-[3rem] space-y-4 flex flex-col justify-center h-full">
      <div className="flex flex-col items-center space-y-3">
        <h1 className=" font-bold text-2xl ">Login</h1>
        <p className="">Enter your personal data</p>
      </div>
      <OauthSelect className="flex gap-5" />
      <div className="flex items-center w-full gap-2 justify-center">
        <div className="bg-black h-[0.03rem] w-[9rem]"></div>or
        <div className="bg-black h-[0.03rem] w-[9rem]"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
