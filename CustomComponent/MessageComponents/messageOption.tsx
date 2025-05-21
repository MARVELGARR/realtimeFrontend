import MyPopOvers from "../utilityComponent/myPopOvers";
import MessagePopOverContent from "../ApplicationComponents/PopOvers/messagePopOverContent";
import { Conversation } from '../ApplicationComponents/MessagesSidebarComponents/conversations';

type media ={
    picture: string,
    video: string
}
export type MessageOptions = {
    className?: string,
    content?: string,
    media?: media
    id: string
    conversationId?: string
}

const MessageOptions = ({
className, conversationId, id, content
}: MessageOptions) => {
    return (
        <MyPopOvers className={"bg-cyan-900 p-0"} position="end" content={<MessagePopOverContent conversationId={conversationId} content={content} id={id} />}>
            <div className={className}>
                ...
            </div>
        </MyPopOvers>
    );
}
 
export default MessageOptions;