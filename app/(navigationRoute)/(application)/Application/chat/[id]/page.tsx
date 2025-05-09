import { ChatHeader, ChatView } from "@/CustomComponent/ChatComponent/chatView";

const ChatViewPage = async({params}:{params: {id: string}}) => {



    if(!params?.id){
        return(
            <div className="w-full h-full flex items-center justify-center">
                No User Found
            </div>
        )
    }
    
    return (
        <ChatView  conversationType={"GROUP"} participants={[]}>
            <ChatHeader/>
        </ChatView>
    );
}
 
export default ChatViewPage;