'use client'
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
import useChatSocket from "@/hooks/ChatHooks/useChatSocket";
import { useAlertModal } from "@/store/useAlertModalStore";
import { useSelection } from "@/store/useMessageSelector";
import { useParams, usePathname } from "next/navigation";


const DeleteMultipleMessageAlert = () => {

    const {isOpen, type, onClose} = useAlertModal()
    const isAlertModalOpen = isOpen && type === "delete-multiple-message"


    const handleClose = () =>{
        onClose()
    }
    
    const params = useParams();
    const id = params?.id as string;

    const {deleteMultipleMessage} = useChatSocket({conversationId: id as string})
    const {selections} = useSelection()
    return (
        <AlertDialog open={isAlertModalOpen} onOpenChange={handleClose}>

  <AlertDialogContent  className="bg-cyan-900">
    <AlertDialogHeader className="">
      <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription >
        This action cannot be undone. This will permanently delete selected Messages
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="bg-white text-cyan-900 cursor-pointer hover:bg-cyan-500 hover:text-white">Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteMultipleMessage(selections!)} className="bg-red-800 hover:bg-red-500 cursor-pointer">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    );
}
 
export default DeleteMultipleMessageAlert;