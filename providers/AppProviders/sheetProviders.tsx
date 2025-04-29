"use client"

import MyProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/myProfileSheet";
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
        </>
    );
}
 
export default MySheetsProviders;