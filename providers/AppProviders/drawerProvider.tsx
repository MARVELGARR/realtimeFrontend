"use client"


import GroupSettingDrawer from "@/CustomComponent/ApplicationComponents/Drawers/groupSettingDrawer";
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
        <GroupSettingDrawer/>
        </>
    );
}
 
export default MyDrawerProvider;