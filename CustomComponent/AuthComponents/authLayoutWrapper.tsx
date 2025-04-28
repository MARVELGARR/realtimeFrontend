import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const AuthLayoutWrapper = ({children, className}:{
    children: ReactNode,
    className?: string
}) => {
    return (
        <div className={cn(className, '')}>
            {children}
        </div>
    );
}
 
export default AuthLayoutWrapper;