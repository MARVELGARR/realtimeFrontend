"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/useModalStore";
import { UserWithProfile } from "@/types";
import { Edit, Edit2Icon } from "lucide-react";
import Image from "next/image";

const UserProfileContent = ({ className }: { className?: string }) => {
  const [storedValue] = useLocalStorage<UserWithProfile | null>(
    "user-session",
    null
  );


  const {onOpen} = useModal()

  return (
    <div className={cn(className)}>
      <Wrappers className="relative  border-cyan-800 border-2">
        <div className="relative  w-full h-[8rem]">
          <Image
            className="rounded-lg"
            src="/images/wallpaper.webp"
            fill
            alt="cover paper"
          />
          <button className="absolute cursor-pointer right-0 bottom-2 z-30 bg-white p-1 rounded-full shadow-md">
            <Edit2Icon className="w-4 h-4 text-cyan-800" />
          </button>
        </div>
        <div className="absolute  left-[0.4rem] -bottom-[3rem]">
          <Avatar className="relative z-20 border-cyan-800 border-4 w-[6rem] h-[6rem]">
            {storedValue?.user?.image ||
            storedValue?.profile?.profilePicture ? (
              <AvatarImage
                src={
                  storedValue.user.image ||
                  storedValue?.profile?.profilePicture!
                }
                alt="avatar"
              />
            ) : (
              <AvatarFallback>YOU</AvatarFallback>
            )}

          </Avatar>
            <button onClick={()=>onOpen("singleFileUploader")} className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md">
              <Edit2Icon className="w-4 h-4 text-red-800" />
            </button>
        </div>
      </Wrappers>
    </div>
  );
};

export default UserProfileContent;
