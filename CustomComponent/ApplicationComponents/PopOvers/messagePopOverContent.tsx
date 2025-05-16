import { Check, Copy, Trash } from "lucide-react";

const MessagePopOverContent = () => {
    return (
        <div className="">
            <div className="flex items-center gap-3 w-full">
                <Trash className="text-red-400"/>
                <span className="">Delete</span>        
            </div>
            <div className="flex items-center gap-3 w-full">
                <Copy className="text-red-400"/>
                <span className="">Copy</span>        
            </div>
            <div className="flex items-center gap-3 w-full">
                <Check className="text-red-400"/>
                <span className="">Select</span>        
            </div>
        </div>
    );
}
 
export default MessagePopOverContent;