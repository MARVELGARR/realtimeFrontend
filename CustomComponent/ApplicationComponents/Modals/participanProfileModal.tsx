"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useModal } from "@/store/useModalStore"
import ParticipantProfile from "../UsersProfile/participantProfile"

const ParticipanProfileModel = () => {
  const { isOpen, data, type, onClose } = useModal()
  const isModalOpen = isOpen && type === "participan-profile-modal"

  const handleClose = () => {
    onClose()
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-cyan-950 text-white w-[25rem] h-[25rem] p-0 rounded">
           <ParticipantProfile />
      </DialogContent>
    </Dialog>
  )
}

export default ParticipanProfileModel
