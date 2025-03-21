<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { GroupOverviewTab } from "./group-overview-tab";
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

type GroupProfileProps = {
  groupId: string;
  className?: string;
}
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
export default function GroupProfile({groupId,className}:GroupProfileProps) {
  return (
    <div className={cn(className,"flex h-[40rem] bg-background")}>
      {/* Left sidebar with tab triggers */}
      <Tabs defaultValue="overview" orientation="vertical" className="h-full flex ">
        <div className="w-56 border-r shrink-0">
          <TabsList className="flex flex-col items-start h-full bg-muted/20 p-0 w-full rounded-none">
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
        </div>

        {/* Right content area with tab content */}
        <div className="flex-1 p-6 overflow-auto w-[40rem]">
          <TabsContent value="overview" className="mt-0 h-full">
            <GroupOverviewTab groupId={groupId} />
=======
=======
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"

import { GroupOverviewTab } from "./group-overview-tab"
import { GroupMembersTab } from "./group-members-tab"
import { SidebarTabs } from "./sidebar-tabs"

export default function GroupProfile() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar with tab triggers */}
      <div className="w-64 border-r shrink-0">
        <Tabs defaultValue="overview" orientation="vertical" className="h-full">
          <SidebarTabs />
        </Tabs>
      </div>

      {/* Right content area with tab content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" className="h-full">
          <TabsContent value="overview" className="mt-0 h-full">
            <GroupOverviewTab />
<<<<<<< HEAD
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
=======
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
          </TabsContent>

          <TabsContent value="members" className="mt-0 h-full">
            <GroupMembersTab />
          </TabsContent>
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
      </Tabs>
    </div>
  );
}
=======
=======
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
        </Tabs>
      </div>
    </div>
  )
}

<<<<<<< HEAD
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
=======
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
