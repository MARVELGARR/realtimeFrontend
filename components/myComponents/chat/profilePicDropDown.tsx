import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProfilePicDropdownProps = {
  className?: string;
  recepientProfilePic?: string;
  recepientName: string;
  recepientId: string
};

export function ProfilePicDropdown({
  recepientName,
  className,
  recepientProfilePic,
  recepientId
}: ProfilePicDropdownProps) {
  const handleClick = (action: string) => {
    switch (action) {
      case "view-pic":
        break;

      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={recepientProfilePic!} className="" />
          <AvatarFallback>{`g${
            recepientName ? recepientName[0] + recepientName[-1] : ""
          } f`}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className, "w-36")}>
        <DropdownMenuItem
          asChild
          className="hover:bg-green-200"
        >
         <DisplaProfilePicDialog recepientProfilePic={recepientProfilePic!} recepientName={recepientName}/>
        </DropdownMenuItem>
        <DropdownMenuItem
          
          className="hover:bg-green-200"
          asChild
        >
          <ProfileCardDialog recepientId={recepientId!} className="" recepientName={recepientName}/>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleClick("un-friend")}
          className="hover:bg-green-200"
        >
          Unfriend
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleClick("block")}
          className="hover:bg-green-200"
        >
          Block user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProfileCardDialog } from "./profileCard";

export function DisplaProfilePicDialog({
  recepientProfilePic,
  recepientName,
}: {
  recepientProfilePic: string;
  recepientName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" w-full flex justify-start pl-2 py-4 align-left border-none  h-5 " variant="outline"> <span className="align-left">view Pic</span> </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px] p-0">
      <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={recepientProfilePic!}
            alt={recepientName!}
            fill
            className="h-full w-full rounded-md object-cover"
          />
       </AspectRatio>
      </DialogContent>
    </Dialog>
  );
}
