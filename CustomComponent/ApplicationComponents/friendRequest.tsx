"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import useGetFriendRequests from "@/hooks/friendsHooks/friendRequest"
import { Check } from "lucide-react";
import useAcceptFriendRequest from "@/hooks/friendsHooks/acceptFriendRequest"
import { toast } from "sonner";


const FriendRequest =  () => {
    const {friendRequests, isGettingFriendRequest}= useGetFriendRequests()


    const {ConfirmingFriendRequest, isAcceptingFriendRequest} = useAcceptFriendRequest()

    if(isGettingFriendRequest){
        return (
            <div className="">No friend requests</div>
        )
    }

    const handleConfirmRequest = async(requestId: string, senderId: string) =>{
        ConfirmingFriendRequest({requestId, senderId}).then(()=>{
            toast("Request accepted",{
                description: "You are noe friend"
            })
        }).catch((error)=>{
              toast("Friend Request not")
        })
    }
    return (
        <div className="">
           {friendRequests?.map((requests) => {
                return (
                    <div className="flex items-center  gap-1" key={requests.sender.email}>
                        <Avatar>
                            <AvatarImage src={requests.sender.image} alt={requests.sender.name} />
                            <AvatarFallback>{requests.sender.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <h1 className=" font-bold text-sm truncate">{requests.sender?.name || "Unknown Name"}</h1>
                            <p className=" truncate max-w-[10rem] text-sm">{requests.sender?.email || "Unknown Email"}</p>
                        </div>
                        <div className="">
                            <Button onClick={()=>handleConfirmRequest(requests.id, requests.senderId)} className="bg-green-500 w-5 h-5 rounded hover:bg-cyan-900 cursor-pointer"> <Check className="cursor-pointer"/></Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FriendRequest;
