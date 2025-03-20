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
          </TabsContent>

          <TabsContent value="members" className="mt-0 h-full">
            <GroupMembersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

