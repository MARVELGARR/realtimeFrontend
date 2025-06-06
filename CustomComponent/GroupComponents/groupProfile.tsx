"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useMyFriendList, {
  UserWithProfile,
} from "@/hooks/friendsHooks/getMyFriendList";
import useGroupProfile from "@/hooks/GroupHooks/useGroupProfile";
import { cn } from "@/lib/utils";
import { apiClient } from "@/utils/clientApi";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ParticipantSelector from "../ApplicationComponents/PopOvers/addToGroupPopOverContent";
import MyPopOvers from "../utilityComponent/myPopOvers";
import { StructuredModal } from "../ApplicationComponents/UiFramework/modal";
import { CgProfile } from "react-icons/cg";
import { useSheet } from "@/store/useSheetStore";

const GroupProfileContent = ({ className }: { className?: string }) => {
  const searchQuery = useSearchParams();
  const groupId = searchQuery.get("recieverId");
  const { groupProfile } = useGroupProfile(groupId!);

  const [selectedParticipants, setSelectedParticipants] = useState<
    UserWithProfile[]
  >([]);

  const handleSendFriendRequest = async (recieverId: string) => {
    try {
      const data = apiClient(`/send-friend-request/${recieverId}`, {
        method: "GET",
      }).then(() => {
        toast("friend request sent");
      });
    } catch (error) {}
  };

  const {onOpen} = useSheet()

  const { isGettingMyFriendList, myFriendList } = useMyFriendList();

  if (isGettingMyFriendList) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Create Group</h1>
          <p className="text-muted-foreground">
            Select participants to add to your group
          </p>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-18" />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-semibold text-cyan-500">
          {groupProfile.name}
        </h2>
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

      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Participants ({groupProfile.participants.length})
          </h3>

          <StructuredModal
            className=""
            trigger={
                <div>Add</div>
            }
            >
                 <ParticipantSelector
                groupId={groupProfile.id}
                potentialParticipants={myFriendList || []}
                selectedParticipants={selectedParticipants}
                onParticipantsChange={setSelectedParticipants}
                maxParticipants={10} // Optional: set maximum participants
              />
            </StructuredModal>
        </div>
        <div className="text-cyan-500 ">
          {selectedParticipants.length > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">
                Selected Participants ({selectedParticipants.length})
              </h3>
              <div className="space-y-1">
                {selectedParticipants.map((participant) => (
                  <div key={participant.id} className="text-sm">
                    {participant.name} ({participant.email})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <ScrollArea className=" flex flex-col gap-[4rem] h-[25rem] border">
          {groupProfile.participants.map((participant) => (
            <li
              key={participant.user.id}
              className="flex items-center hover:bg-cyan-500 cursor-pointer space-x-3  dark:bg-gray-800 p-2 rounded-md"
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
              <div className="">
                <Plus
                className="hover:text-cyan-900"
                  onClick={() =>
                    handleSendFriendRequest(participant.user.id as string)
                  }
                />
                <CgProfile className="text-cyan-600"
                  onClick={()=>onOpen("users-profile", participant.user.id)}
                />
              </div>
            </li>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default GroupProfileContent;
