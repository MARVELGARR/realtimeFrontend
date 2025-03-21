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
  groupName: string;
  groupId: string
};

export function GroupProfilePicDropdown({
  groupName,
  className,
  recepientProfilePic,
  groupId,
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
            groupName ? groupName[0] + groupName[-1] : ""
          } f`}</AvatarFallback>
        </Avatar>

    </PopoverTrigger>
    <PopoverContent className="w-fit h-fit">
      <GroupProfile groupId={groupId}/>
    </PopoverContent>
  </Popover>
  );
}


