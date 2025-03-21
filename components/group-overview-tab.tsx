<<<<<<< HEAD
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
=======
import { Edit, LogOut, Video, Phone } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function GroupOverviewTab() {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Group avatar" />
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
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
<<<<<<< HEAD
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
=======
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Video className="h-5 w-5" />
          <span>Video</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2">
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
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
<<<<<<< HEAD
            <p>
              A group for Blood Strike game players to coordinate matches and
              strategies.
            </p>
=======
            <p>A group for Blood Strike game players to coordinate matches and strategies.</p>
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
<<<<<<< HEAD
            <p className="text-sm text-muted-foreground">
              Disappearing messages
            </p>
=======
            <p className="text-sm text-muted-foreground">Disappearing messages</p>
>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
            <Switch id="disappearing" />
          </div>
          <p>Off</p>
        </div>
<<<<<<< HEAD
      </div>

      <LeaveGroup/>
      <DeleteGroup/>
    </div>
  );
}
=======

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Mute notifications</p>
            <Switch id="mute" />
          </div>
          <Select defaultValue="mute">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mute">Mute</SelectItem>
              <SelectItem value="8hours">8 hours</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
              <SelectItem value="always">Always</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Notification tone</p>
          <Select defaultValue="default">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
              <SelectItem value="chime">Chime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Leave Group
        </Button>
      </div>
    </div>
  )
}

>>>>>>> 02ffda6ca45a3476e79fc3afd9a5a61ce4aa0de1
