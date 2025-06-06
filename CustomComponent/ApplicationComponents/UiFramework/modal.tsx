import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface StructuredModalProp { 
        trigger: ReactNode ,
    children: ReactNode
    className?: string
}
export function StructuredModal({
    trigger,
    children,
    className

}:StructuredModalProp) {
  return (
    <Dialog>
      <form>
        <DialogTrigger className="cursor-pointer" asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className={cn(className)}>
            {children}
        </DialogContent>
      </form>
    </Dialog>
  )
}
