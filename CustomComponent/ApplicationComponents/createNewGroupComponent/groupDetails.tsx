import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateNewGroup from "@/hooks/GroupHooks/useCreateNewGroup";
import { useAddGroupMembersSelection } from "@/store/addGroupMembersSelection";
import { useFileUploader } from "@/store/useFileUploader";
import { useModal } from "@/store/useModalStore";
import { Edit2Icon, Pencil, PencilIcon, UploadCloud, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddGroupDetails = () => {
  const [groupName, setGroupName] = useState("");
  const { onOpen, type, fileFor } = useModal();
  const { selections, clearSelections } = useAddGroupMembersSelection();
  const { url, setUrl } = useFileUploader();
  const { createNewGroup, isCreatingGroup } = useCreateNewGroup();

  const handleCreateGroup = async () => {
    createNewGroup({ groupImage: url!, groupName, groupmembers: selections! })
      .then(() => {
        setUrl(null, null);
        toast("Group created", {
          description: "Your Group and Group Profile  Has been Created",
        });
      })
      .catch((error) => {
        setUrl(null, null);
      });
  };

  return (
    <div className="w-full flex flex-col items-center gap-[2rem] relative">
      <div className="relative w-fit h-fit  flex flex-col items-center">
        <Avatar className="w-[10rem] bg-cyan-500 p-1 h-[10rem]">
          <AvatarImage src={url!} alt="upload image" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        {url && fileFor == "profile-pic" ? (
          <div className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md">
            <UploadCloud
              className={` ${
                isCreatingGroup ? " animate animate-bounce" : ""
              } w-4 h-4 rounded-full text-green-900`}
            />
          </div>
        ) : (
          <div
            onClick={() => onOpen("singleFileUploader", null, "group-profile-pic")}
            className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md"
          >
            <Edit2Icon className="w-4 h-4 rounded-full text-cyan-900" />
          </div>
        )}
      </div>
      <div className="">
        <fieldset>
          <Label htmlFor="groupName">Group Name</Label>

          <Input
            id="groupName"
            value={groupName}
            className="w-[15rem]"
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </fieldset>
      </div>
        <Button onClick={handleCreateGroup} className="absolute -bottom-[6rem] right-0 bg-cyan-900 cursor-pointer text-white">Create</Button>
    </div>
  );
};

export default AddGroupDetails;
