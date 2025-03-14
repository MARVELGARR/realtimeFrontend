import { Message } from "@/actions/api-actions/messageActions/getConversation"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

type PopoverDemoProp = {
    className?: string
    messages: Message
}

export function PopoverDemo({className, messages}:PopoverDemoProp) {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-4">
          <Info className="w-4 h-4" />
          <p className="">Info</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(className,`w-80`)}>
  
        <div className="flex flex-col gap-3">
          <div className="w-full flex items-center justify-between "> <div className="">Sent at:</div> <div className="">{`${messages.createdAt}`}</div>  </div>
          <div className="w-full flex items-center justify-between"> <div className=""> Edited at: </div> <div className="">{`${messages.updatedAt}`}</div> </div>
        </div>

      </PopoverContent>
    </Popover>
  )
}
