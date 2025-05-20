import MyPopOvers from "../utilityComponent/myPopOvers";
import MessagePopOverContent from "../ApplicationComponents/PopOvers/messagePopOverContent";

type media ={
    picture: string,
    video: string
}
export type MessageOptions = {
    className?: string,
    content?: string,
    media?: media
    id: string
}

const MessageOptions = ({
className, id, content
}: MessageOptions) => {
    return (
        <MyPopOvers className={"bg-cyan-900 p-0"} position="end" content={<MessagePopOverContent content={content} id={id} />}>
            <div className={className}>
                ...
            </div>
        </MyPopOvers>
    );
}
 
export default MessageOptions;