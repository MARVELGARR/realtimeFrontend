'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGroupProfile from "@/hooks/GroupHooks/useGroupProfile";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const GroupProfileContent = ({ className }: { className?: string }) => {
  const searchQuery = useSearchParams();
  const groupId = searchQuery.get("recieverId");
  const { groupProfile } = useGroupProfile(groupId!);

  if (!groupProfile) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className={cn("space-y-6 text-white", className)}>
      <div className="w-full flex items-center justify-center mt-4">
        <Avatar className="w-[10rem] h-[10rem]">
          <AvatarImage
            alt="group image"
            src={groupProfile.groupImage || undefined}
          />
          <AvatarFallback>
            {groupProfile.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="text-center space-y-1 text-cyan-500">
        <h2 className="text-2xl font-semibold text-cyan-500">{groupProfile.name}</h2>
        <p className="text-sm  text-cyan-500">
          {groupProfile.descriptions || "No description provided."}
        </p>
        <p className="text-xs text-cyan-500 ">
          Disappearing Messages: {groupProfile.disappearingMessages}
        </p>
        <p className="text-xs  text-cyan-500">
          Created At: {new Date(groupProfile.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="px-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Participants ({groupProfile.participants.length})
        </h3>
        <ScrollArea className="space-y-2 h-[25rem] border">
          {groupProfile.participants.map((participant) => (
            <li
              key={participant.user.id}
              className="flex items-center cursor-pointer space-x-3 bg-gray-500 dark:bg-gray-800 p-2 rounded-md"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  alt={participant.user.name}
                  src={participant.user.image}
                />
                <AvatarFallback>
                  {participant.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{participant.user.name}</div>
              <div className=""></div>
            </li>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default GroupProfileContent;
