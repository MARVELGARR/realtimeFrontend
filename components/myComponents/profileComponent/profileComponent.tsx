import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Database, Info, Key, Keyboard, LaptopMinimal, MessagesSquare, PenTool, User } from "lucide-react";
import ProfileBioComponent from "../AppComponent/profileComponent/profileComponent";
import ProfileAccountComponent from "../AppComponent/profileComponent/profileAccountComponent";

const ProfileComponent = () => {
  return (
    <Tabs defaultValue="profile" className="w-[40rem] h-[35rem] flex gap-4 items-start">
      <TabsList className="flex flex-col h-full justify-between ">
        <div className="flex flex-col h-[1/3]">

            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="general"><LaptopMinimal/>General</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="account"><Key/>Account</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="chats"><MessagesSquare/>Chats</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="notification"><BellRing/>Notification</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3 " value="personalization"><PenTool/>Personalization</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="storage"><Database/>Storage</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="shortcuts"><Keyboard/>Shortcuts</TabsTrigger>
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="help"><Info/>Help</TabsTrigger>
        </div>

        <div className="w-full py-2 flex items-center justify-start text-start gap-3">
            <TabsTrigger className="w-full py-2 flex items-center justify-start text-start gap-3" value="profile"><User/>Profile</TabsTrigger>
        </div>
      </TabsList>


      <div className="w-full px-4">

        <TabsContent value="general">
            Make changes to your account here.
        </TabsContent>
        <TabsContent value="account">

          <ProfileAccountComponent/>
        </TabsContent>
        <TabsContent value="chats"></TabsContent>
        <TabsContent value="notification"></TabsContent>
        <TabsContent value="personalization"></TabsContent>
        <TabsContent value="shortcuts"></TabsContent>
        <TabsContent value="help"></TabsContent>
        <TabsContent className="w-full" value="profile"><ProfileBioComponent/></TabsContent>
      </div>

    </Tabs>
  );
};

export default ProfileComponent;
