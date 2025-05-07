"use client"

import MyProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/myProfileSheet";
import UsersProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/usersProfileSheet";
import { useEffect, useState } from "react";


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
        </>
    );
}
 
export default MySheetsProviders;