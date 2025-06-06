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
  import { useSheet } from "@/store/useSheetStore";
import UsersProfileContent from "../UsersProfile/usersProfileContent";
  


  const UsersProfileSheet = () => {
      const { isOpen, onClose, data, type} = useSheet()
  
      const isSheetOpen = isOpen && type ==="users-profile"
  
      const handleClose = () =>{
          onClose() 
      }
  
    return (
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetTrigger>
        
        </SheetTrigger>
        <SheetContent className={"bg-cyan-800 "}>
  
          <div className="w-full ">
            <UsersProfileContent data={data!} />
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default UsersProfileSheet;
  