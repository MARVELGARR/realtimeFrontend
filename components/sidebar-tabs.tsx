import { FileText, Info, Link, Lock, Calendar, Users, Video } from "lucide-react"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SidebarTabs() {
  return (
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
  )
}

