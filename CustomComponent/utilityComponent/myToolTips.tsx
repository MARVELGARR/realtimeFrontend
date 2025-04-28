import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MyToolTips = ({
  children,
  className,
  tips,
}: {
  children: ReactNode;
  className?: string
  tips: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn(className, "")}>{children}</TooltipTrigger>
        <TooltipContent side="right" >
          <p>{tips}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyToolTips;
