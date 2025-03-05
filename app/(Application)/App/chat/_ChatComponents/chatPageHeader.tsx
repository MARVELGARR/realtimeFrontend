import { CreateNewChat } from "./createNewChat";
import { FilterDropdown } from "./filterBy";

const ChatPageHeader = () => {
    return (
        <div className="w-full flex justify-between items-center px-3">
            <strong className="">Chats</strong>
            <div className=" flex items-center gap-2">
                <CreateNewChat/>
                <FilterDropdown />
            </div>
        </div>
    );
}
 
export default ChatPageHeader;