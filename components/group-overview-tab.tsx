"use client";
import { Edit, LogOut, Video, Phone } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useGetGroupProfile from "@/hooks/groupHook/useGetGroupProfileHook";
import { LeaveGroup } from "./myComponents/groupComponent/leaveGroupDialog";
import { DeleteGroup } from "./myComponents/groupComponent/deleteGroupAlert";

type GroupOverviewTabProp = {
  groupId: string;
};

export function GroupOverviewTab({ groupId }: GroupOverviewTabProp) {
  const { data, isGettinggroupProfile } = useGetGroupProfile(groupId);
  return (
    <div className="flex flex-col h-full  mx-auto">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="Group avatar"
          />
          <AvatarFallback>BP</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Blood strike players</h2>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <Video className="h-5 w-5" />
          <span>Video</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <Phone className="h-5 w-5" />
          <span>Voice</span>
        </Button>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <p className="text-sm text-muted-foreground">Created</p>
          <p>2/22/2025 10:21 PM</p>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p>
              A group for Blood Strike game players to coordinate matches and
              strategies.
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">
              Disappearing messages
            </p>
            <Switch id="disappearing" />
          </div>
          <p>Off</p>
        </div>
      </div>

      <LeaveGroup/>
      <DeleteGroup/>
    </div>
  );
}
