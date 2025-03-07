"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Copy, Edit, Info, Star, Trash } from "lucide-react"

interface DropdownMenuMessageOptionsProps {
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenuMessageOptions({ onOpenChange }: DropdownMenuMessageOptionsProps) {
  // Function to handle item clicks
  const handleItemClick = (action: string) => {
    console.log(`Action clicked: ${action}`)
    // Implement your action logic here
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

        <DropdownMenuItem className="flex items-center gap-4" onClick={() => handleItemClick("delete")}>
          <Trash className="w-4 h-4" />
          <p className="">Delete</p>
        </DropdownMenuItem>

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

