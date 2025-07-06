'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetBlockedUser from "@/hooks/UserHooks/useGetBlockedUsers";
import { apiClient } from "@/utils/clientApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const BlockedUsersContent = () => {

    const queryClient =  useQueryClient()

    const {
        blockUsers,isGettingBlockedUsers
    } = useGetBlockedUser()

    const handleUnblockedUser = async(recieverId: string) => {

        try{
            await  apiClient(`/un-block-user/${recieverId}`, {
                method: "DELETE"
            }).then((data)=>{
                toast("user unblocked")
                queryClient.invalidateQueries({queryKey: ["blocked-users"]})
            }).catch((error)=>{
                toast("failed to unblock")
            })
        }
        catch(error){
            toast(`${JSON.stringify(error)}`)
        }
    }

    if(isGettingBlockedUsers){
        return "Loading..."
    }


    return (
        <ul className="h-full p-2 mt-5">
           {blockUsers?.map((users)=>{
            return (
                <li className="flex items-center w-full gap-3 rounded-md bg-cyan-300 p-4 hover:bg-cyan-500">
                    <Avatar className="w-[3rem] h-[3rem]">
                        <AvatarImage  src={users.image || users.profile.profilePicture} alt={users.name}/>
                        <AvatarFallback>{users.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <div className="truncate">{users.name}</div>
                        <div className="">{users.profile.bio}</div>
                    </div>
                    <Button onClick={()=>handleUnblockedUser(users.id)} className=" ml-auto cursor-pointer">un-block</Button>
                </li>
            )
           })}
        </ul>
    );
}
 
export default BlockedUsersContent;