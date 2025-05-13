import ChatSideBar from "@/CustomComponent/ApplicationComponents/MessagesSidebarComponents/chatSideBar";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { ReactNode } from "react";

const ChatPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" h-full flex  w-full">
      <Wrappers className="space-y-4 w-[17rem]  h-full">
        <h1 className="font-bold text-lg">Messages</h1>
        <ChatSideBar />
      </Wrappers>
      <div className="flex w-full flex-col flex-1">

        {children}
      </div>
    </div>
  );
};

export default ChatPageLayout;
