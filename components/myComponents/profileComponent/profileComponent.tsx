import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Database, Info, Key, Keyboard, LaptopMinimal, MessagesSquare, PenTool, User } from "lucide-react";
import ProfileBioComponent from "../AppComponent/profileComponent/profileComponent";
import ProfileAccountComponent from "../AppComponent/profileComponent/profileAccountComponent";
import ProfileChatComponent from "../AppComponent/profileComponent/profileChatComponent";
import ProfileNotificationComponent from "../AppComponent/profileComponent/profileNotificationComponent";
import ProfilePersonalizationComponent from "../AppComponent/profileComponent/profilePersonalizationComponent";
import ProfileHelpComponent from "../AppComponent/profileComponent/profileHelpComponent";
import ProfileShortcutsComponent from "../AppComponent/profileComponent/profileShortcutsComponent";
import ProfileStorageComponent from "../AppComponent/profileComponent/profileStorageComponent";

const ProfileComponent = () => {
  return (
    <Tabs defaultValue="profile" className="w-[40rem] h-[35rem] flex gap-4 items-start">
      <TabsList className="flex flex-col h-full justify-between ">
        <div className="flex flex-col h-[1/3]">
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

        <TabsContent value="account">

          <ProfileAccountComponent/>
        </TabsContent>
        <TabsContent value="chats">
            <ProfileChatComponent/>
        </TabsContent>
        <TabsContent value="notification">
          <ProfileNotificationComponent/>
        </TabsContent>
        <TabsContent value="personalization">
          <ProfilePersonalizationComponent/>
        </TabsContent>
        <TabsContent value="storage">
          <ProfileStorageComponent/>
        </TabsContent>
        <TabsContent value="shortcuts">
          <ProfileShortcutsComponent/>
        </TabsContent>
        <TabsContent value="help">
          <ProfileHelpComponent/>
        </TabsContent>
        <TabsContent className="w-full" value="profile">
          <ProfileBioComponent/>
          </TabsContent>
      </div>

    </Tabs>
  );
};

export default ProfileComponent;
