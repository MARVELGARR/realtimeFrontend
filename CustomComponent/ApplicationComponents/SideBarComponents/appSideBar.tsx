"use client";
import MyToolTips from "@/CustomComponent/utilityComponent/myToolTips";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import Logo from "./logo";
import { MessageCircle, PhoneCall, Settings } from "lucide-react";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import Link from "next/link";
import MyPopOvers from "@/CustomComponent/utilityComponent/myPopOvers";
import Image from "next/image";
import { AvatarPopOverContent } from "../PopOvers/avatarPopOverContent";
import { useDrawer } from "@/store/useDrawer";
import CreateButton from "./createButton";
import CreatePopOverContent from "../PopOvers/createPopOverContent";
import { useSocket } from "@/providers/AppProviders/socketProvider";
const AppSideBar = ({ className }: { className?: string }) => {
  const { user } = useUserSession();
  const { openDrawer} = useDrawer()

  const {isOnline} = useSocket()
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
            <Link href="/Application">
              <Logo className="w-8 h-8    relative  cursor-pointer" />
            </Link>
          </div>
        </MyToolTips>

        <Wrappers className="  w-full h-full flex gap-3 flex-col items-center">
          <MyToolTips className="cursor-pointer" tips="Chat">
            <Link href="/Application/chat">
              <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
                <MessageCircle />
              </div>
            </Link>
          </MyToolTips>
          <MyToolTips className="cursor-pointer" tips="Phone">
            <Link href="/Application/phone">
              <div className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
                <PhoneCall />
              </div>
            </Link>
          </MyToolTips>
        </Wrappers>

        <Wrappers className="w-full h-fit mb-4 mt-auto flex flex-col gap-3 items-center   ">
          <MyToolTips tips="create">
            <MyPopOvers className="p-2" content={<CreatePopOverContent/>} position={"center"}>
              <CreateButton/>
            </MyPopOvers>
          </MyToolTips>
          <MyToolTips className="cursor-pointer" tips="Profile">
            <MyPopOvers
              className=" p-0 bg-cyan-900"
              content={<AvatarPopOverContent />}
              position="center"
            >
              <div className="shadow-blue-500 relative p-2 bg-cyan-600  rounded-full shadow-2xl">
                <Avatar>
                  {(user?.image || user?.profile?.profilePicture) && (
                    <AvatarImage
                      src={
                        user.image! ||
                        user?.profile?.profilePicture! ||
                        ""
                      }
                    />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {isOnline && (<div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0"></div>)}
              </div>
            </MyPopOvers>
          </MyToolTips>
          <MyToolTips className="cursor-pointer" tips="Settings">
            <div onClick={()=>openDrawer("settings")} className="shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl">
              <Settings />
            </div>
          </MyToolTips>
        </Wrappers>
      </Wrappers>
    </div>
  );
};

export default AppSideBar;
