
import { UserSessionProvider } from "@/providers/UserProvider/userSessionProvider";
import { ReactNode } from "react";

const NavigationRoute = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <UserSessionProvider>{children}</UserSessionProvider>
    </div>
  );
};

export default NavigationRoute;
