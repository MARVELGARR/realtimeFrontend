import MyAlertModalProviders from "@/providers/AppProviders/alertModalProviders";
import MyDrawerProvider from "@/providers/AppProviders/drawerProvider";
import MyModalProviders from "@/providers/AppProviders/modalProvider";
import MySheetsProviders from "@/providers/AppProviders/sheetProviders";
import { UserSessionProvider } from "@/providers/UserProvider/userSessionProvider";
import { ReactNode } from "react";

const NavigationRoute = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <UserSessionProvider>
        <MySheetsProviders />
        <MyModalProviders />
        <MyDrawerProvider/>
        <MyAlertModalProviders/>
        {children}
      </UserSessionProvider>
    </div>
  );
};

export default NavigationRoute;
