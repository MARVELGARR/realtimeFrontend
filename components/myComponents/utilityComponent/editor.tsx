"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SmileIcon } from "lucide-react";
import { Dispatch, KeyboardEventHandler, SetStateAction, useState } from "react";
import { EmojiPicker } from "./emojiPicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUpdateUser from "@/hooks/userHooks/useUpdatedUser";
import { toast } from "@/hooks/use-toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export type editorUseType = "ProfilePic" | "Bio" | "Nickname" | " PhoneNumber"

export type EditorType = {
  initialValue: string;
  className?: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  setSelectedState: Dispatch<SetStateAction<string>>
  editorUse: editorUseType
};




const Editor = ({ className, initialValue, placeholder, editorUse, type, setSelectedState }: EditorType) => {
  const [newValue, setNewValue] = useState<string>(initialValue);
  const {updatingUser} = useUpdateUser()

  const queryClient = useQueryClient()
  const handleEmojiSelect = (emoji: string) => {
    setNewValue((prev) => prev + emoji);
  };

  const handleKeyboardDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      updatingUser( editorUse === "Bio" ? {bio:newValue} : editorUse === "Nickname" ?  { nickname: newValue } : {phoneNumber: newValue}).then((data)=>{
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        toast({
          title: `profile updated`,
          description: `updated user ${editorUse === "Bio" ? "bio" : editorUse === "Nickname" ? "Nickname" : editorUse ==="ProfilePic" ? "ProfilePic" : "PhoneNumber" }`,
          variant: "success",
          duration: 5000,
        })
        
      })
      .catch((error)=>{
        toast({
          title: `profile update error`,
          description: `${error}`,
          variant: "destructive",
          duration: 5000,
        })
      })
      setSelectedState('')

    }
  };

  return (
    <div className={cn(className, "")}>
      <Input
        placeholder={placeholder}
        className="w-full placeholder:pl-2"
        type={type}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onKeyDown={handleKeyboardDown}
      />

      <p className="text-gray-500 text-sm mt-1 w-full flex items-center justify-end">
        <Emoji onEmojiSelect={handleEmojiSelect} />
        <div className="bg-green-700 rounded-lg p-1 text-white">
          {newValue.length} / {initialValue.length}
        </div>
      </p>
    </div>
  );
};

export default Editor;


const Emoji: React.FC<{ onEmojiSelect: (emoji: string) => void }> = ({
  onEmojiSelect,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SmileIcon className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none p-0">
        <EmojiPicker onEmojiClick={(string)=>onEmojiSelect(string.emoji)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
