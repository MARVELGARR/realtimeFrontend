"use client"

import { SingleFileUploader } from "@/CustomComponent/ApplicationComponents/FileUploaders/singleFileUploader";
import ProfileCoverPicModal from "@/CustomComponent/ApplicationComponents/Modals/coverPicModal";
import CreateNewGroupModal from "@/CustomComponent/ApplicationComponents/Modals/createNewGroupModal";
import FindNewFriendModalCommand from "@/CustomComponent/ApplicationComponents/Modals/findNewFriendModal";
import ParticipanProfileModel from "@/CustomComponent/ApplicationComponents/Modals/participanProfileModal";
import ProfilePicModal from "@/CustomComponent/ApplicationComponents/Modals/profilePicModals";
import StartNewChatModal from "@/CustomComponent/ApplicationComponents/Modals/startNewChatModal";
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
            <ProfilePicModal/>
            <ProfileCoverPicModal/>
            <StartNewChatModal/>
            <FindNewFriendModalCommand/>
            <CreateNewGroupModal/>
            <ParticipanProfileModel/>
        </>
    );
}
 
export default MyModalProviders;