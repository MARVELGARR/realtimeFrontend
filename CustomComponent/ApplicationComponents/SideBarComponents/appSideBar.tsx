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
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/clientApi";
const AppSideBar = ({ className }: { className?: string }) => {
  const { user } = useUserSession();
  const { openDrawer} = useDrawer()

  const {isOnline} = useSocket()

  const pathName = usePathname()

  const {
    data: messageCount,
    isLoading: isGettingMessageCount

  } = useQuery({
    queryKey: ['message-count'],
    queryFn: ()=>apiClient<number>('/message-count',{
      method: "GET"
    })
  })

  
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
          <div className="relative">

            <MyToolTips className="cursor-pointer w-full hfull" tips="Chat">
              <Link href="/Application/chat">
                <div className={`${pathName.includes("chat") ? " bg-green-200 shadow-green-300 shadow-xl" : ""} shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl`}>
                  <MessageCircle className={`${pathName.includes("chat") ? "text-green-500" : ""}`} />
                </div>
              </Link>
            </MyToolTips>
            {messageCount ? (<div className="right-0 top-5 text-white rounded-full h-4 w-4 flex items-center justify-center bg-green-500 absolute z-[999] ">{JSON.stringify(messageCount)}</div>): (<></>)}
          </div>
          {/* <MyToolTips className="cursor-pointer" tips="Phone">
            <Link href="/Application/phone">
              <div className={`${pathName.includes("phone") ? " bg-green-200 shadow-green-300 shadow-xl" : ""} shadow-blue-500 p-2 bg-cyan-600  rounded-full shadow-2xl`}>
                <PhoneCall className={`${pathName.includes("phone") ? "text-green-500" : ""}`} />
              </div>
            </Link>
          </MyToolTips> */}
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
                {isOnline ?(<div className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0"></div>): (<div className="absolute w-3 h-3 bg-gray-500 rounded-full bottom-0 right-0"></div>)}
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
