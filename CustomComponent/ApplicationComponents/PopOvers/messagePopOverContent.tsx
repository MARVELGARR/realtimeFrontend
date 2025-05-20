import { MessageOptions } from "@/CustomComponent/MessageComponents/messageOption";
import { useSelection } from "@/store/useMessageSelector";
import { Check, Copy, Trash } from "lucide-react";
import { toast } from "sonner";




const MessagePopOverContent = ({id, content}: MessageOptions) => {


    async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Text coppied!")
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

    const {setSelections} = useSelection()
    return (
        <div className="bg-cyan-900 p-1 flex flex-col justify-start ">
            <div className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500 gap-3 w-full">
                <Trash className="text-red-400"/>
                <span className="">Delete</span>        
            </div>
            <div onClick={()=>copyTextToClipboard(content || "")} className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500 gap-3 w-full">
                <Copy className="text-white"/>
                <span className="">Copy</span>        
            </div>
            <div onClick={()=>setSelections(id)} className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500yuy gap-3 w-full">
                <Check className="text-white"/>
                <span className="">Select</span>        
            </div>
        </div>
    );
}
 
export default MessagePopOverContent;