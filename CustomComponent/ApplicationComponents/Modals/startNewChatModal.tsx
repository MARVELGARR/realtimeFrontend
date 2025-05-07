"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage"
import { useModal } from "@/store/useModalStore"
import type { UserWithProfile } from "@/types"
import Image from "next/image"

const StartNewChatModal = () => {
  const { isOpen, data, type, onClose } = useModal()

  const isModalOpen = isOpen && type === "start-new-chat"

  const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null)

  const handleClose = () => {
    onClose()
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" w-[25rem] h-[25rem] p-0 rounded">
            sd s ds
      </DialogContent>
    </Dialog>
  )
}

export default StartNewChatModal
