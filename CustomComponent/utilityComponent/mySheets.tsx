import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ReactNode } from "react";

type MySheetProps = {
    className?: string,
    children: ReactNode,
    content?: ReactNode,
     tittle?: string,
     descriptions?: string
     position: "top" | "bottom" | "left" | "right"

}


const MySheet = ({children, position ="right", descriptions, tittle, className, content}:MySheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side={position} className={className}>
        <SheetHeader>
          <SheetTitle className="text-white">{tittle}</SheetTitle>
          <SheetDescription className="text-white">{descriptions}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full">
            {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MySheet;
