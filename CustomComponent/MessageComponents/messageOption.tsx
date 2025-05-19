import MyPopOvers from "../utilityComponent/myPopOvers";
import MessagePopOverContent from "../ApplicationComponents/PopOvers/messagePopOverContent";
const MessageOptions = () => {
    return (
        <MyPopOvers position="start" content={<MessagePopOverContent/>}>
            <div className="">
                ...
            </div>
        </MyPopOvers>
    );
}
 
export default MessageOptions;