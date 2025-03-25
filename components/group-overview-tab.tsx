import { Edit, LogOut, Video, Phone, Trash, Pencil } from "lucide-react";

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
import { GroupProfileProps } from "@/actions/api-actions/chatActions/getGroupProfile";
import { LeaveGroupAlert } from "./AlertDialogs/leaveGroupAlert";
import { DeleteGroupAlert } from "./AlertDialogs/deleteGroup";
import { useSession } from "@/providers/sessionProvider";
import { canPerformAction } from "@/lib/RBAC/group";
import { useState } from "react";
import { Input } from "./ui/input";
import { SingleFileUploader } from "./myComponents/utilityComponent/singleFileUploader";
import { DisappearingSelection } from "./myComponents/groupComponent/disapearingMessageSelection";
import useEditGroup from "@/hooks/groupHook/editgroupHook";
import { toast } from "@/hooks/use-toast";
import { useStoreUploadedUrls } from "@/store/useStoreUploadedImage";
type GroupOveGrouprviewTab = {
  data: GroupProfileProps;
  className?: string;
};
export function GroupOverviewTab({ data, className }: GroupOveGrouprviewTab) {
  const [isEditingGroupDescription, setIsEditingGrouDescription] = useState(false);

  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newDisappearingMessages, setNewDisappearingMessages] = useState("");
  const [
    isEditingGroupDisappearingMessage,
    setIsEditingGrouDisappearingMessage,
  ] = useState(false);
  const { currentUser } = useSession();
  const { editGroup, isEdittingGroup}= useEditGroup(data.id)
  const groupImage = data.groupImage;
  const groupName = data.name;
  const groupDescription = data.descriptions;
  const disappearingMessages = data.disappearingMessages;
  const createdAt = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedAt = data.updatedAt;
  const me = data.participants.find(
    (participant) => participant.userId === currentUser?.id
  );

  const hasPermissionToDeleteGroup = canPerformAction(
    me?.groupRole!,
    "DELETE_GROUP"
  );
  const hasPermissionToEditGroup = canPerformAction(
    me?.groupRole!,
    "EDIT_GROUP"
  );
  const isGroupDeleteable =hasPermissionToDeleteGroup && data.participants.length < 2;
  const {url, clearUserSelections} = useStoreUploadedUrls();
 
  const handleEditGroup = async () => {
    const data = new FormData();
    data.append("name", newGroupName);
    data.append("description", newGroupDescription);
    data.append("disappearingMessages", disappearingMessages);
    data.append("groupImage", url);
    editGroup(data).then(()=>{
      clearUserSelections();
      toast({
        title: "Group updated",
        variant: "success",
      })
    }).catch(()=>{
      toast({
        title: "Group update failed",
        variant: "destructive",
      })
    })
  };

  return (
    <div className="flex flex-col h-fit max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={groupImage} alt="Group avatar" />
            <AvatarFallback>BP</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-3 right-0">
            {hasPermissionToEditGroup && <SingleFileUploader usage="group" />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditingGroupName ? (
            <p>{groupName?.toWellFormed()}</p>
          ) : (
            <Input
              value={groupName?.toWellFormed()}
              onChange={(e) => setNewGroupName(e.target.value)}
              type={"text"}
            />
          )}
          {hasPermissionToEditGroup && (
            <div className="">
              {!isEditingGroupName ? (
                <Edit
                  onClick={() => setIsEditingGroupName((prev) => !prev)}
                  className="h-4 w-4 cursor-pointer hover:bg-gray-200"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-fit p-2 hover:bg-gray-200"
                    onClick={() => setIsEditingGroupName(false)}
                  >
                    cancle
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-7 w-fit p-2  hover:brightnes-50 bg-green-300"
                  >
                    update
                  </Button>
                </div>
              )}
            </div>
          )}
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
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            {!isEditingGroupDescription ? (
              <p>{groupDescription?.toWellFormed()}</p>
            ) : (
              <Input
                value={groupDescription?.toWellFormed()}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                type={"text"}
              />
            )}
          </div>
          {hasPermissionToEditGroup && (
            <div className="">
              {!isEditingGroupDescription ? (
                <Edit
                  onClick={() => setIsEditingGrouDescription((prev) => !prev)}
                  className="h-4 w-4 cursor-pointer hover:bg-gray-200"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-fit p-2 hover:bg-gray-200"
                    onClick={() => setIsEditingGrouDescription(false)}
                  >
                    cancle
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-7 w-fit p-2  hover:brightnes-50 bg-green-300"
                  >
                    update
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">
                Disappearing messages
              </p>
            </div>
            {!isEditingGroupDisappearingMessage ? (
              <p>{newDisappearingMessages || disappearingMessages}</p>
            ) : (
              <div className="flex items-center gap-2">
                <DisappearingSelection
                  onValueChange={(value) => setNewDisappearingMessages(value)}
                  defaultValue={disappearingMessages}
                />

                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-fit p-2 hover:bg-gray-200"
                    onClick={() => setIsEditingGrouDisappearingMessage(false)}
                  >
                    cancle
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-7 w-fit p-2  hover:brightnes-50 bg-green-300"
                  >
                    update
                  </Button>
                </div>
              </div>
            )}
          </div>
          {hasPermissionToEditGroup && (
            <Edit
              className="h-4 w-4 cursor-pointer hover:bg-gray-200"
              onClick={() =>
                setIsEditingGrouDisappearingMessage((prev) => !prev)
              }
            />
          )}
        </div>
      </div>
      <div className="mt-auto pt-6">
        <LeaveGroupAlert />
      </div>
      <div className="mt-auto pt-6">
        {isGroupDeleteable && <DeleteGroupAlert />}
      </div>
    </div>
  );
}
