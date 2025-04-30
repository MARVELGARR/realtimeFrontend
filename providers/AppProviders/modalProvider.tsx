"use client"

import { SingleFileUploader } from "@/CustomComponent/ApplicationComponents/FileUploaders/singleFileUploader";
import MyProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/myProfileSheet";
import { useEffect, useState } from "react";


const MyModalProviders = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
            <SingleFileUploader/>
        </>
    );
}
 
export default MyModalProviders;