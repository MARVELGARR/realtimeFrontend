import GroupProfile from "@/components/group-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
   
  <Popover>
    <PopoverTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={recepientProfilePic!} className="" />
          <AvatarFallback>{`g${
            recepientName ? recepientName[0] + recepientName[-1] : ""
          } f`}</AvatarFallback>
        </Avatar>

    </PopoverTrigger>
    <PopoverContent>
      <GroupProfile/>
    </PopoverContent>
  </Popover>
  );
}


