'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { UserWithProfile } from "@/types";
import Image from "next/image"

const UserProfileContent = ({
    className
}:{
    className?: string
}) => {
    const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null)

    return (
        <div className={cn(className)}>
            <Wrappers className="relative  border-cyan-800 border-2">
                <div className="relative  w-full h-[8rem]">
                    <Image className="rounded-lg" src="/images/wallpaper.webp" fill alt="cover paper"/>
                </div>
                <Avatar className="absolute  left-[0.4rem] -bottom-[3rem] border-cyan-800 border-4 w-[6rem] h-[6rem]">
                    {storedValue?.user?.image || storedValue?.profile?.profilePicture ? (
                        <AvatarImage  src={storedValue.user.image || storedValue?.profile?.profilePicture!} alt='avatar' />
                    ) : (
                        <AvatarFallback>YOU</AvatarFallback>
                    )}
                </Avatar>
            </Wrappers>
        </div>
    );
}
 
export default UserProfileContent;