"use client"

import DeleteMultipleMessageAlert from "@/CustomComponent/ApplicationComponents/AlertModals/deleteMultipleMessageAlert";
import { SingleFileUploader } from "@/CustomComponent/ApplicationComponents/FileUploaders/singleFileUploader";
import ProfileCoverPicModal from "@/CustomComponent/ApplicationComponents/Modals/coverPicModal";
import FindNewFriendModalCommand from "@/CustomComponent/ApplicationComponents/Modals/findNewFriendModal";
import ProfilePicModal from "@/CustomComponent/ApplicationComponents/Modals/profilePicModals";
import StartNewChatModal from "@/CustomComponent/ApplicationComponents/Modals/startNewChatModal";
import MyProfileSheet from "@/CustomComponent/ApplicationComponents/Sheets/myProfileSheet";
import { useEffect, useState } from "react";


const MyAlertModalProviders = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
          <DeleteMultipleMessageAlert/>  
        </>
    );
}
 
export default MyAlertModalProviders;