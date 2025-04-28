import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const MyToolTips = ({
  children,
  tips,
}: {
  children: ReactNode;
  tips: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tips}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyToolTips;
