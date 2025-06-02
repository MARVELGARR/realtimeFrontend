"use client"

import MyProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/myProfileSheet";
import UsersProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/usersProfileSheet";
import { useEffect, useState } from "react";
import MyFriendSheet from "@/CustomComponent/ApplicationComponents/Sheets/myFriendsSheet";
import GroupProfile from "@/CustomComponent/ApplicationComponents/Sheets/groupProfileSheet";

const MySheetsProviders = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
        <MyProfileSheet/>
        <UsersProfileSheet/>
        <MyFriendSheet/>
        <GroupProfile/>
        </>
    );
}
 
export default MySheetsProviders;