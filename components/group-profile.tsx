"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";


import { GroupMembersTab } from "./group-members-tab";
import {
  FileText,
  Info,
  Link,
  Lock,
  Calendar,
  Users,
  Video,
} from "lucide-react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetGroupProfile from "@/hooks/chatJooks/useGetGroupProfileHook";
import { GroupOverviewTab } from "./group-overview-tab";

type GroupProfile = {
  className?: string;
  groupId: string;
};

export default function GroupProfile({ groupId, className }: GroupProfile) {

  const {data, isGettinggroupProfile} = useGetGroupProfile(groupId);
  const Participants = data?.participants
  if(isGettinggroupProfile) return <div>Loading...</div>
  if(!data) return <div>Group not found</div>
  return (
    <div className="flex h-[40rem] w-[56rem] p-0 bg-background">
      {/* Left sidebar with tab triggers */}

      <Tabs
        defaultValue="overview"
        orientation="vertical"
        className="h-[50rem] flex  w-full"
      >
        <TabsList className="flex flex-col items-start h-fit bg-muted/20 p-0 w-1/3 rounded-none">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
          >
            <Info className="h-5 w-5" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
          >
            <Users className="h-5 w-5" />
            <span>Members</span>
          </TabsTrigger>

          {/* Additional tabs shown in the image but not implemented as requested */}
          <TabsTrigger
            value="media"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            disabled
          >
            <Video className="h-5 w-5" />
            <span>Media</span>
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            disabled
          >
            <FileText className="h-5 w-5" />
            <span>Files</span>
          </TabsTrigger>
          <TabsTrigger
            value="links"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            disabled
          >
            <Link className="h-5 w-5" />
            <span>Links</span>
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            disabled
          >
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger
            value="encryption"
            className="flex items-center gap-2 w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-muted"
            disabled
          >
            <Lock className="h-5 w-5" />
            <span>Encryption</span>
          </TabsTrigger>
        </TabsList>

        {/* Right content area with tab content */}
        <div className=" w-[50rem] p-6 overflow-auto">
          <TabsContent value="overview" className="mt-0 h-full w-full">
            <GroupOverviewTab data={data!} />
          </TabsContent>

          <TabsContent value="members" className="mt-0 h-full w-full ">
            <GroupMembersTab Participants={Participants!} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
