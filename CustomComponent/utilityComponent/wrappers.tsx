import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Wrappers = ({
    className,
    children
}:{
    className?: string,
    children: ReactNode
}) => {
    return (
        <div className={cn("", className)}>{children}</div>
    );
}
 
export default Wrappers;