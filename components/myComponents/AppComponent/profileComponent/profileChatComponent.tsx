import { Button } from "@/components/ui/button";

const ProfileChatComponent = () => {
    return (
        <div className=" mt-3 flex  flex-col space-y-4 justify-start">
            <strong className="">Chats</strong>

            <p className=''>Chat history</p>

            <Button variant={"destructive"}>Clear chat history</Button>
        </div>
    );
}
 
export default ProfileChatComponent;