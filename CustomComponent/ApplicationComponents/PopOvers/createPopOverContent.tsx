import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/useModalStore";
import { useSheet } from "@/store/useSheetStore";
import { CiCirclePlus } from "react-icons/ci";
import { FaPeopleArrows, FaPeopleGroup } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";


const CreatePopOverContent = ({className}:{className?: string}) => {

    const {onOpen} = useModal()
    const {onOpen: open} = useSheet()

    return (
        <div className={cn(className, "")}>
            <div onClick={()=>onOpen("start-new-chat", null, null)} className="flex bg-white text-cyan-900 w-full justify-start items-center cursor-pointer rounded p-2 gap-2 hover:bg-cyan-600/70">
                <CiCirclePlus className=" text-2xl fill-cyan-900 w-8 h-8" />
                <span className="">Start new chat</span>
            </div>
            <div onClick={()=>onOpen("find-new-friend", null, null)} className="flex bg-white text-cyan-900 w-full justify-start items-center cursor-pointer rounded p-2 gap-2 hover:bg-cyan-600/70">
                <IoPersonAdd className=" text-2xl fill-cyan-900 w-8 h-8" />
                <span className="">Find new Friend</span>
            </div>
            <div onClick={()=>open("my-friends")} className="flex bg-white text-cyan-900 w-full justify-start items-center cursor-pointer rounded p-2 gap-2 hover:bg-cyan-600/70">
                <FaPeopleArrows className=" text-2xl fill-cyan-900 w-8 h-8" />
                <span className="">Friend List</span>
            </div>
            <div onClick={()=>onOpen("create-new-group", null, "group-profile-pic")} className="flex bg-white text-cyan-900 w-full justify-start items-center cursor-pointer rounded p-2 gap-2 hover:bg-cyan-600/70">
                <FaPeopleGroup className=" text-2xl fill-cyan-900 w-8 h-8" />
                <span className="">Create new group</span>
            </div>
        </div>
    );
}
 
export default CreatePopOverContent;