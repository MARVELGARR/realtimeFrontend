"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage"
import { useModal } from "@/store/useModalStore"
import type { UserWithProfile } from "@/types"
import Image from "next/image"

const ProfilePicModal = () => {
  const { isOpen, data, type, onClose } = useModal()
  const isModalOpen = isOpen && type === "profile-pic"

  const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null)

  const handleClose = () => {
    onClose()
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" w-[25rem] h-[25rem] p-0 rounded-full">
            <img
              src={data ?? "/images/register-photos.jpg"}
              alt="Profile Picture"
              
              className="object-cover w-full h-full rounded-full"
              
            />
      </DialogContent>
    </Dialog>
  )
}

export default ProfilePicModal
