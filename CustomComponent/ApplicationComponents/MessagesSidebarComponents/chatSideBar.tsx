import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Conversations from "./conversations";
import FriendRequest from "../friendRequest";

const ChatSideBat = () => {
  return (
    <Tabs defaultValue="account" className="w-full bg-cyan-900">
      <TabsList defaultValue={"Request"} className="w-full bg-cyan-900 border-white border-2">
        <TabsTrigger  value="All">All</TabsTrigger>
        <TabsTrigger value="Request">Request</TabsTrigger>
        
      </TabsList>

      <TabsContent value="All">
        <Conversations/>
      </TabsContent>

      <TabsContent  value="Request">
        <FriendRequest/>
      </TabsContent>
    </Tabs>
  );
};

export default ChatSideBat;
