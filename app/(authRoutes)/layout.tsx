import AuthLayoutImage from "@/CustomComponent/AuthComponents/authLayoutImage";
import AuthLayoutWrapper from "@/CustomComponent/AuthComponents/authLayoutWrapper";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-secondary h-full md:h-[95%] w-[1500px] mx-auto   md:p-3 md:rounded-lg">
      <AuthLayoutWrapper className="h-full md: flex flex-col md:flex-row w-full">
        <AuthLayoutImage title="Well come" className="w-full hidden md:block md:w-[40%] h-full p-[0.2rem] " />
        <div className="h-full w-full md:flex-1">{children}</div>
      </AuthLayoutWrapper>
    </div>
  );
};

export default AuthLayout;
