"use client"


import SettingsDrawer from "@/CustomComponent/ApplicationComponents/Drawers/seetingDrawer";
import { useEffect, useState } from "react";


const MyDrawerProvider = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
        <SettingsDrawer/>
        </>
    );
}
 
export default MyDrawerProvider;