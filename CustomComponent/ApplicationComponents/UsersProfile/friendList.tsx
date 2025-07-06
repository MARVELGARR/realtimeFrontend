'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMyFriendList from "@/hooks/friendsHooks/getMyFriendList";
import { useSocket } from "@/providers/AppProviders/socketProvider";
import { handleIsFriendOnline } from "@/utils/application";

const FriendList = () => {

    const {
        isGettingMyFriendList,
        myFriendList
    } = useMyFriendList()

    


    const {onlineUsers} = useSocket()
    
    return (
        <div className="">
            <h1 className=" text-3xl text-white font-bold">My FriendList</h1>
            <ScrollArea className="mt-[2rem] max-h-[40rem] ">

                {myFriendList?.friends?.map((user)=>{
                    return (
                        <div className="flex hover:bg-cyan-400 cursor-pointer p-2 items-center gap-5">
                            <Avatar className="w-[3rem] h-[3rem] bg-cyan-300 p-1 rounded-full">
                                <AvatarImage className=" rounded-full object-fit " alt={user.name} src={user.image || user.profile.profilePicture}/>
                                <AvatarFallback>{user.name.substring(0, -1)}</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <h4 className=" font-bold text-cyan-600">{user.name}</h4>
                                <p className="truncate italic text-gray-500 ">{user.profile.bio}...</p>
                            </div>
                            {handleIsFriendOnline(onlineUsers as string[], user.id) && (<div className=" w-3 h-3 bg-green-500 rounded-full bottom-0 right-0"></div>)}
                        </div>
                    )
                })}
            </ScrollArea>
        </div>
    );
}
 
export default FriendList;