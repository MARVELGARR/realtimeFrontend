import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Conversations from "./conversations";

const ChatSideBat = () => {
  return (
    <Tabs defaultValue="account" className="w-full bg-cyan-900">
      <TabsList className="w-full bg-cyan-900 border-white border-2">
        <TabsTrigger  value="account">All</TabsTrigger>
        <TabsTrigger value="password">Request</TabsTrigger>
        
      </TabsList>

      <TabsContent value="account">
        <Conversations/>
      </TabsContent>

      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default ChatSideBat;
