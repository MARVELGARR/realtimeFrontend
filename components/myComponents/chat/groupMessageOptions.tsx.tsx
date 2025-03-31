"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { useSelection } from "@/store/useMessageSelection"
import { Check, Copy, Edit, Info, Star, Trash } from "lucide-react"
import { Message } from "@/actions/api-actions/messageActions/getConversation"
import { GroupMessageType } from "@/actions/api-actions/messageActions/getConversationWithConversationId"
import { GroupPopoverDemo } from "../utilityComponent/groupMessageInfo"
import useDeleteGroupMessage from "@/hooks/messageHooks/useDeleteGroupMessage"
import useStarGroupMessageHook from "@/hooks/messageHooks/useStaringGroupMessageHook"
import useUnStarGroupMssage from "@/hooks/messageHooks/unStaringGroupMessageHook"



export type MessageType = Message


interface DropdownMenuMessageOptionsProps {
  onOpenChange?: (open: boolean) => void
  // messageId: string,
  conversationId: string
  isMyMessage: boolean
  // messageContent: string
  currentProfileId: string
  messages: GroupMessageType 
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



export function DropdownMenuGroupMessageOptions({ onOpenChange, messages,   currentProfileId, conversationId, isMyMessage }: DropdownMenuMessageOptionsProps) {
  
  const {DeleteGroupMessage, isDeletingGroupMessage} = useDeleteGroupMessage(conversationId as string)
  const {isStaringGroupMessage, staringGroupMessage} = useStarGroupMessageHook(conversationId as string)
  const { isUnStaringGroupMessage,unStaringGroupMessage} =useUnStarGroupMssage(conversationId as string)
  
    const messageContent = messages.content
    const messageId = messages.id

  const staringData = {messageId, currentProfileId}

  const {setSelections, selections, removeSelections} = useSelection()

  const isMessageLiked = Array.isArray(messages.StarredMessage) &&
  messages.StarredMessage.some((msg) => msg.messageId === messageId);


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
  
  console.log(isMessageLiked)
  // Function to handle item clicks
  const handleItemClick = (action: string) => {
    
    switch (action) {
      case "delete":
        DeleteGroupMessage(messageId).then((data)=>{
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
        staringGroupMessage(staringData).then((data)=>{
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
      case "un-Star":
        unStaringGroupMessage(staringData).then((data)=>{
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
        case "select":
          setSelections(messageId)
          break
        case "un-select":
          removeSelections(messageId)
          break
      default:
        break;
    }

  }

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button className="px-2  py-0 " variant="outline">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col justify-start">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-4" onClick={() => handleItemClick("copy")}>
          <Copy className="w-4 h-4" />
          <p className="">Copy</p>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center gap-4" onClick={() => handleItemClick("edit")}>
          <Edit className="w-4 h-4" />
          <p className="">Edit</p>
        </DropdownMenuItem>
      {isMessageLiked ? (
        <DropdownMenuItem disabled={isUnStaringGroupMessage} className="flex cursor-pointer items-center gap-4" onClick={() => handleItemClick("un-Star")}>
          <Star fill="orange" className={`w-4 h-4 text-orange`} />
          <p className="">Unstar</p>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem disabled={isStaringGroupMessage} className="flex cursor-pointer items-center gap-4" onClick={() => handleItemClick("star")}>
          <Star fill="white" className={`w-4 h-4`} />
          <p className="">Star</p>
          {isMessageLiked}
        </DropdownMenuItem>
      )}

        {isMyMessage && (<DropdownMenuItem disabled={isDeletingGroupMessage} onClick={() => handleItemClick("delete")} className="flex items-center gap-4" >
            <Trash  color="red" className={`w-4 h-4 ${isDeletingGroupMessage ? " ": ""}`} />
            <p className="">Delete</p>
        </DropdownMenuItem>)}

        {!selections?.includes(messageId) ? (<DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("select")}>
          <Check className={`w-4 h-4  `} />
          <p className="">Select</p>
        </DropdownMenuItem>) : (
          <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("un-select")}>
          <Check className={`w-4 h-4 text-green-400 }`} />
          <p className="">un-select</p>
        </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild className="flex items-center gap-4" >
          <GroupPopoverDemo messages={messages}  />
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

