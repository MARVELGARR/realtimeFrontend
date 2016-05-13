import { useSheet } from "@/store/useSheetStore";
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

import FriendList from "../UsersProfile/friendList";

const MyFriendSheet = () => {
  const { isOpen, onClose, type } = useSheet();

  const isSheetOpen = isOpen && type === "my-friends";

  const handleClose = () => {
    onClose();
  };
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleClose}>
      <SheetTrigger></SheetTrigger>
      <SheetContent className={"bg-cyan-800 "}>
        <div className="w-full ">
          <FriendList />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyFriendSheet;
