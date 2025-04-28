import AppSideBar from "@/CustomComponent/ApplicationComponents/SideBarComponents/appSideBar";
import { ReactNode } from "react";

const NavigationRoute = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-cyan-900 h-screen w-screen">
      <AppSideBar className="" />
      {children}
    </div>
  );
};

export default NavigationRoute;
