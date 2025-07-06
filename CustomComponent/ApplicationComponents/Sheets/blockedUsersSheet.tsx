"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { useSheet } from "@/store/useSheetStore";
import BlockedUsersContent from "../UserProfile/blockedUsersContent";

const BlockedUsersSheet = () => {

    const { isOpen, onClose, onOpen, type} = useSheet()

    const isSheetOpen = isOpen && type ==="blocked-users"

    const handleClose = () =>{
        onClose() 
    }
    return (
        <Sheet open={isSheetOpen} onOpenChange={handleClose}>
      <SheetTrigger>
      
      </SheetTrigger>
      <SheetContent className={"bg-cyan-800 "}>

        <div className="w-full ">
            <BlockedUsersContent/>
        </div>
      </SheetContent>
    </Sheet>
    );
}
 
export default BlockedUsersSheet;