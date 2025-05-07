import AppSideBar from "@/CustomComponent/ApplicationComponents/SideBarComponents/appSideBar";
import { ReactNode } from "react";

const NavigationRoute = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-cyan-900 flex h-screen w-screen">
      <AppSideBar className="" />
      <div className="ml-[5.9rem] w-full">

        {children}
      </div>
    </div> 
  );
};

export default NavigationRoute;
