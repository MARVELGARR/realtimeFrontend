import ChatSideBar from "@/CustomComponent/ApplicationComponents/MessagesSidebarComponents/chatSideBar";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { ReactNode } from "react";

const ChatPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" h-full flex gap-3  w-full">
      <Wrappers className="space-y-4 w-[17rem]  h-full">
        <h1 className="font-bold text-lg">Messages</h1>
        <ChatSideBar />
      </Wrappers>
      <div className="flex border-2 w-full flex-col flex-1">

        {children}
      </div>
    </div>
  );
};

export default ChatPageLayout;
