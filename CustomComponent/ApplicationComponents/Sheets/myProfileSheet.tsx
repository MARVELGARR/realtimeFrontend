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
      <SheetContent className={"bg-cyan-800"}>
        <SheetHeader>
          <SheetTitle className="text-white">Edit Profile</SheetTitle>
          <SheetDescription className="text-white">
          Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full">
          <UserProfileContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyProfileSheet;
