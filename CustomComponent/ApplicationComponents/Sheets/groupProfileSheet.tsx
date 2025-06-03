import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfileContent from "../UserProfile/userProfileContent";
import { AvatarPopOverContentItems } from "../PopOvers/avatarPopOverContent";
import { useSheet } from "@/store/useSheetStore";
import GroupProfileContent from "@/CustomComponent/GroupComponents/groupProfile";

const GroupProfile = () => {
    const { isOpen, onClose, onOpen, type} = useSheet()

    const isSheetOpen = isOpen && type ==="group-profile-sheet"

    const handleClose = () =>{
        onClose() 
    }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleClose}>
      <SheetTrigger>
      
      </SheetTrigger>
      <SheetContent className={"bg-cyan-800 "}>

        <div className="w-full ">
            <GroupProfileContent/>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GroupProfile;
