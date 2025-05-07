import { Plus } from "lucide-react";

const CreateButton = () => {
    return (
        <div className=" hover:animate-bounce cursor-pointer border rounded-full bg-cyan-900 w-[3rem] h-[3rem]">
            <Plus className="text-white w-full h-full"/>
        </div>
    );
}
 
export default CreateButton;