'use client'
import MyToolTips from "@/CustomComponent/utilityComponent/myToolTips";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import Logo from "./logo";
import { MessageCircle, PhoneCall, Settings } from "lucide-react";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";

const AppSideBar = ({ className }: { className?: string }) => {

  const {user} = useUserSession()
  return (
    <div
      className={cn(
        className,
        "fixed left-2 top-0 h-full w-[4rem]   rounded-lg shadow-xl shadow-cyan-300 "
      )}
    >
      <Wrappers className="w-full h-full flex flex-col gap-3 items-center mt-3 justify-start ">
        <MyToolTips tips="Logo">
          <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
            <Logo className="w-8 h-8    relative  cursor-pointer" />
          </div>
        </MyToolTips>

        <Wrappers className="  w-full h-full flex gap-3 flex-col items-center">
          <MyToolTips className="cursor-pointer" tips="Chat">
            <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
              <MessageCircle />
            </div>
          </MyToolTips>
          <MyToolTips className="cursor-pointer" tips="Phone">
            <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
              <PhoneCall />
            </div>
          </MyToolTips>
        </Wrappers>

        <Wrappers className="w-full h-fit mb-4 mt-auto flex flex-col gap-3 items-center   ">
          <MyToolTips className="cursor-pointer" tips="Profile">
            <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
              <Avatar>
                <AvatarImage src={user?.user.image! || user?.profile?.profilePicture!} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </MyToolTips>
          <MyToolTips className="cursor-pointer" tips="Settings">
            <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
              <Settings />
            </div>
          </MyToolTips>
        </Wrappers>
      </Wrappers>
    </div>
  );
};

export default AppSideBar;
