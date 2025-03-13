"use client"

import unStarMessage from "@/actions/api-actions/messageActions/unStarMessage"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useDeleteHook from "@/hooks/messageHooks/useDeleteHooks"
import useStarHook from "@/hooks/messageHooks/useStarHook"
import useUnStarMssage from "@/hooks/messageHooks/useUnStarHooks"
import { toast } from "@/hooks/use-toast"
import { Check, Copy, Edit, Info, Star, Trash } from "lucide-react"
import Link from "next/link"

interface DropdownMenuMessageOptionsProps {
  onOpenChange?: (open: boolean) => void
  messageId: string,
  recepientId: string
  isMyMessage: boolean
  messageContent: string
  currentProfileId: string
  isMessageLiked: boolean
}

/**
 * DropdownMenuMessageOptions component provides a dropdown menu with various options for a chat message.
 * 
 * @param {Object} props - The properties object.
 * @param {function} props.onOpenChange - Callback function to handle the change in dropdown open state.
 * @param {string} props.currentProfileId - The ID of the current user's profile.
 * @param {string} props.messageContent - The content of the message.
 * @param {string} props.messageId - The ID of the message.
 * @param {string} props.recepientId - The ID of the message recipient.
 * @param {boolean} props.isMyMessage - Flag indicating if the message is sent by the current user.
 * 
 * @returns {JSX.Element} The rendered DropdownMenuMessageOptions component.
 */
export function DropdownMenuMessageOptions({ onOpenChange, isMessageLiked,  currentProfileId, messageContent, messageId, recepientId, isMyMessage }: DropdownMenuMessageOptionsProps) {
  
  const {DeleteMessage, isDeletingMessage} = useDeleteHook(recepientId as string)
  const {isStaringMessage, staringMessage} = useStarHook(recepientId as string)
  const {isUnStaringMessage, unStaringMessage} =useUnStarMssage(recepientId as string)

  const staringData = {messageId, currentProfileId}


  const copyText = () =>{
    navigator.clipboard.writeText(messageContent).then(() => {
      toast({
      title: "Text copied to clipboard",
      variant: "success"
      });
    }).catch(() => {
      toast({
      title: "Failed to copy text",
      variant: "destructive"
      });
    });
  }
  
  // Function to handle item clicks
  const handleItemClick = (action: string) => {
    
    switch (action) {
      case "delete":
        DeleteMessage(messageId).then((data)=>{
          toast({
            title: "message deleted",
            variant: "success"
          })
        }).catch(()=>{
          toast({
            title: "message failed to delete",
            variant: "destructive"
          })
        })
        break;
      case "copy":
        copyText()
        break
      case "star":
        staringMessage(staringData).then((data)=>{
          toast({
            title: "message liked",
            variant: "success"
          })
        }).catch(()=>{
          toast({
            title: "message failed to like",
            variant: "destructive"
          })
        })
        break
      case "unStar":
        unStaringMessage(staringData).then((data)=>{
          toast({
            title: "message Unliked",
            variant: "success"
          })
        }).catch(()=>{
          toast({
            title: "message failed to unlike",
            variant: "destructive"
          })
        })
        break
      default:
        break;
    }

  }

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button className="p-3" variant="outline">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col justify-start">
        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("copy")}>
          <Copy className="w-4 h-4" />
          <p className="">Copy</p>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("edit")}>
          <Edit className="w-4 h-4" />
          <p className="">Edit</p>
        </DropdownMenuItem>

       {isMessageLiked ? (<DropdownMenuItem disabled={isStaringMessage} className="flex items-center gap-4" onClick={() => handleItemClick("star")}>
          <Star fill="orange" className={`w-4 h-4`} />
          <p className="">Star</p>
        </DropdownMenuItem>): (<DropdownMenuItem disabled={isUnStaringMessage} className="flex items-center gap-4" onClick={() => handleItemClick("unStar")}>
          <Star fill="white" className={`w-4 h-4`} />
          <p className="">Star</p>
        </DropdownMenuItem>) }

        {isMyMessage && (<DropdownMenuItem disabled={isDeletingMessage} onClick={() => handleItemClick("delete")} className="flex items-center gap-4" >
            <Trash  color="red" className={`w-4 h-4 ${isDeletingMessage ? " ": ""}`} />
            <p className="">Delete</p>
        </DropdownMenuItem>)}

        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("select")}>
          <Check className="w-4 h-4" />
          <p className="">Select</p>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("info")}>
          <Info className="w-4 h-4" />
          <p className="">Info</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

