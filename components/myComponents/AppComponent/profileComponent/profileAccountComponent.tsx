"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AccountForm } from "./accountForm.tsx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

const renderBlockedUser = () => {
  const users = [
    { name: "wale", isBlocked: true },
    { name: "tunde", isBlocked: true },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Blocked Users</DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {users.map((user, index) => {
          return (
            <DropdownMenuItem
              className="w-full flex flex-row justify-between p-3 border shadow-sm"
              key={index}
            >
              <div className="flex items-center space-1">
                  <Avatar className="w-5 h-5 relative">
                      <AvatarImage src="" alt={user.name} className="" />
                      <AvatarFallback>{user.name.slice(0,1)}</AvatarFallback>
                      
                  </Avatar>
                  <span className="">{user.name}</span>
              </div>
              <Button
                variant={user.isBlocked ? "outline" : "destructive"}
                className=""
              >
                {user.isBlocked ? "unblock" : "block"}
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const ProfileAccountComponent = ({currentProfileId}: {currentProfileId: string}) => {

  return (
    <div className="">
      <ScrollArea className="w-full h-full">
        <h1 className="font-bold">Account</h1>
        <p className="text-lg">Privacy</p>

        <AccountForm currentProfileId={currentProfileId} />

        <div className="mt-5 border w-fit p-3 rounded">{renderBlockedUser()}</div>
      </ScrollArea>
    </div>
  );
};

export default ProfileAccountComponent;
