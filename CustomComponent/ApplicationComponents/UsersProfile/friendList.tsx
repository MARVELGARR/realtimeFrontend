'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMyFriendList from "@/hooks/friendsHooks/getMyFriendList";

const FriendList = () => {

    const {
        isGettingMyFriendList,
        myFriendList
    } = useMyFriendList()
    
    return (
        <div className="">
            <h1 className=" text-3xl text-white font-bold">My FriendList</h1>
            <div className="mt-[2rem]">

                {myFriendList?.map((user)=>{
                    return (
                        <div className="flex hover:bg-cyan-400 cursor-pointer p-2 items-center gap-5">
                            <Avatar className="w-[3rem] h-[3rem] bg-cyan-300 p-1 rounded-full">
                                <AvatarImage className=" rounded-full object-fit " alt={user.user2.name} src={user.user2.image || user.user2.profile.profilePicture}/>
                                <AvatarFallback>{user.user2.name.substring(0, -1)}</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <h4 className="">{user.user2.name}</h4>
                                <p className="truncate">{user.user2.profile.bio}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default FriendList;