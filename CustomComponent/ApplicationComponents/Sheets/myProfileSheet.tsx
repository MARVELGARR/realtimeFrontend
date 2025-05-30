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

const MyProfileSheet = () => {
    const { isOpen, onClose, onOpen, type} = useSheet()

    const isSheetOpen = isOpen && type ==="my-profile"

    const handleClose = () =>{
        onClose() 
    }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleClose}>
      <SheetTrigger>
      
      </SheetTrigger>
      <SheetContent className={"bg-cyan-800 "}>

        <div className="w-full ">
          <UserProfileContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyProfileSheet;
