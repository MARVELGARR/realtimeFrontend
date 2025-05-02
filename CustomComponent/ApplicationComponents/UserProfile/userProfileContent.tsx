"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { useFileUploader } from "@/store/useFileUploader";
import { useModal } from "@/store/useModalStore";
import { UserWithProfile } from "@/types";
import { Edit2Icon, UploadCloud } from "lucide-react";
import Image from "next/image";
import ProfileForm from "./userProfileForm";
import useUpdateProfilePicture from "@/hooks/UserHooks/updateProfilePic";
import { toast } from "sonner";
import useUpdateCoverPicture from "@/hooks/UserHooks/updateCoverPicture";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";

const UserProfileContent = ({ className }: { className?: string }) => {
const { user: storedValue } = useUserSession();

  const { onOpen, type, fileFor } = useModal();
  const { url, setUrl } = useFileUploader();
  const { isUpdatingProfile, updateProfilePic } = useUpdateProfilePicture();
  const { isUpdatingProfileCover, updateCoverPic } = useUpdateCoverPicture();

  const handleUpdateProfilePic = async () => {
    updateProfilePic(url as string)
      .then(() => {
        setUrl(null, null);
        toast("Profile Pic Updated", {
          description: "Your Profile Pic Has been updated",
        });
      })
      .catch((error) => {
        toast("Failed To Update Pic", {
          description: "Your Profile Picture Update Failled",
        });
      });
  };
  const handleUpdateProfileCover = async () => {
    updateCoverPic(url as string)
      .then(() => {
        setUrl(null, null);
        toast("Profile Cover Updated", {
          description: "Your Profile Cover Has been updated",
        });
      })
      .catch((error) => {
        toast("Failed To Update Cover", {
          description: "Your Profile Cover Update Failled",
        });
      });
  };

  return (
    <div className={cn(className, "")}>
      <Wrappers className="relative  border-cyan-800 border-2">
        <div className="relative rounded-lg  w-full h-[8rem]">
          <img
            className=" absolute rounded-lg h-full w-full object-fill"
            src={storedValue?.profile?.coverPicture! || storedValue?.image!}
            
            alt="cover paper"
          />
          {url && fileFor === "profile-cover-picture" ? (
            <div
              onClick={handleUpdateProfileCover}
              className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md"
            >
              <UploadCloud
                className={`${
                  isUpdatingProfileCover ? " animate animate-bounce" : ""
                }w-4 h-4 text-green-900`}
              />
            </div>
          ) : (
            <div
              onClick={() =>
                onOpen("singleFileUploader", null, "profile-cover-picture")
              }
              className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md"
            >
              <Edit2Icon className="w-4 h-4 text-cyan-900" />
            </div>
          )}
        </div>
        <div className="absolute  left-[0.4rem] -bottom-[3rem]">
          <Avatar className="relative z-20 border-cyan-800 border-4 w-[6rem] h-[6rem]">
            {storedValue?.image || storedValue?.profile?.profilePicture ? (
              <AvatarImage
                src={storedValue.image || storedValue?.profile?.profilePicture!}
                alt="avatar"
              />
            ) : (
              <AvatarFallback>YOU</AvatarFallback>
            )}
          </Avatar>
          {url && fileFor == "profile-pic" ? (
            <div className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md">
              <UploadCloud
                onClick={handleUpdateProfilePic}
                className={` ${
                  isUpdatingProfile ? " animate animate-bounce" : ""
                } w-4 h-4 rounded-full text-green-900`}
              />
            </div>
          ) : (
            <div
              onClick={() => onOpen("singleFileUploader", null, "profile-pic")}
              className="absolute cursor-pointer z-30 right-0 bottom-2  bg-white p-1 rounded-full shadow-md"
            >
              <Edit2Icon className="w-4 h-4 rounded-full text-cyan-900" />
            </div>
          )}
        </div>
      </Wrappers>

      <Wrappers className="flex items-center gap-3 mt-4 w-full justify-end pr-3">
        <Button
          onClick={() =>
            onOpen(
              "profile-pic",
              storedValue?.profile?.profilePicture,
              "profile-pic"
            )
          }
          className=" cursor-pointer text-cyan-900"
          variant={"outline"}
        >
          View Pic
        </Button>
        <Button
          onClick={() =>
            onOpen(
              "profile-cover-picture",
              storedValue?.profile?.coverPicture,
              "profile-cover-picture"
            )
          }
          className="cursor-pointer text-cyan-900"
          variant={"outline"}
        >
          View Cover
        </Button>
      </Wrappers>

      <section>
        <Wrappers className="mt-[2rem]  ml-3">
          <ProfileForm />
        </Wrappers>
      </section>
    </div>
  );
};

export default UserProfileContent;
