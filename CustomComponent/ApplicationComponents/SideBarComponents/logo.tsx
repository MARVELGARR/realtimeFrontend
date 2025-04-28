import { cn } from "@/lib/utils";
import Image from "next/image";
const Logo = ({
    className
}:{
    className?: string
}) => {
    return (
        <div className={cn('', className)}>
            <Image className="" src="/svgs/chat-svg.svg" fill alt="logo"/>
        </div>
    );
}
 
export default Logo;