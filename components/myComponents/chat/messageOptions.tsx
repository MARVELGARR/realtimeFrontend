"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useDeleteHook from "@/hooks/messageHooks/useDeleteHooks"
import { toast } from "@/hooks/use-toast"
import { Check, Copy, Edit, Info, Star, Trash } from "lucide-react"
import Link from "next/link"

interface DropdownMenuMessageOptionsProps {
  onOpenChange?: (open: boolean) => void
  messageId: string,
  recepientId: string
  isMyMessage: boolean
}

export function DropdownMenuMessageOptions({ onOpenChange, messageId, recepientId, isMyMessage }: DropdownMenuMessageOptionsProps) {
  
  const {DeleteMessage, isDeletingMessage} = useDeleteHook(recepientId as string)

  
  
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

        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("star")}>
          <Star className="w-4 h-4" />
          <p className="">Star</p>
        </DropdownMenuItem>

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

