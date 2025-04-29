import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MyPopOverProp = {
    className?: string;
    children: ReactNode;
    content?: ReactNode;
    position: "end" | "center" | "start"
}

const MyPopOvers = ({
  className,
  children,
  content,
  position
}: MyPopOverProp) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align={position} className={cn("", className)}>{content}</PopoverContent>
    </Popover>
  );
};

export default MyPopOvers;
