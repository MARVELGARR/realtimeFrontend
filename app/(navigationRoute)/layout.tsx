
import MySheetsProviders from "@/providers/AppProviders/sheetProviders";
import { UserSessionProvider } from "@/providers/UserProvider/userSessionProvider";
import { ReactNode } from "react";

const NavigationRoute = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <UserSessionProvider>
                 <MySheetsProviders/>
        {children}</UserSessionProvider>
    </div>
  );
};

export default NavigationRoute;
