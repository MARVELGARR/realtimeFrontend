import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2Icon } from "lucide-react"

type DeleteMessagesDemo = {
    className?: string
    handleDeleteSelectedMessages: ()=> void
}
  
export function DeleteMessagesDemo({handleDeleteSelectedMessages, className}:DeleteMessagesDemo) {

    return (
      <AlertDialog>
        <AlertDialogTrigger className=" cursor-pointer" asChild>
            <Trash2Icon className=" text-red-500"/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              selected messages and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white" >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelectedMessages}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  