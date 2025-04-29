'use client'
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { apiClient } from "@/utils/clientApi";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import MyProfileSheet from "../Sheets/myProfileSheet";
import { useSheet } from "@/store/useSheetStore";


export function AvatarPopOverContent(){

    const router = useRouter()

    const {  onOpen} = useSheet()

    const handleLogout = async() =>{
        const data = await apiClient<{message: string}>("/v1/logout", {
            method: "GET"
        })
        if(data){

            localStorage.removeItem('user-session')
            router.push('/login')
        }
    }
    return (
        <div className="w-full p-1 flex flex-col ">
            <AvatarPopOverContentItems onClick={()=>onOpen("my-profile")} className="hover:bg-cyan-500">Profile</AvatarPopOverContentItems>
            <AvatarPopOverContentItems onClick={handleLogout} className="hover:bg-red-600">Logout</AvatarPopOverContentItems>
        </div>
    );
} 

export const AvatarPopOverContentItems = ({className, onClick, children}:{
    className?: string
    children: ReactNode
    onClick?: ()=>void
}) =>{
    return (
        <Button onClick={onClick} className={cn(className, " m-0 border-b-0 bg-inherit justify-start border-none flex  items-center cursor-pointer rounded  w-full")}>
            {children}
        </Button>
    )
}