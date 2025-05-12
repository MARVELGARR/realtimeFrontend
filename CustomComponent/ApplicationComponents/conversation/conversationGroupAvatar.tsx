
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Participant } from "../MessagesSidebarComponents/conversations"

interface GroupAvatarsProps {
  participants: Participant[]
}

export function GroupAvatars({ participants }: GroupAvatarsProps) {
  // Only show up to 3 avatars for groups
  const displayParticipants = participants.slice(0, 3)

  return (
    <div className="relative h-12 w-12">
      {displayParticipants?.map((participant, index) => {
        // Calculate position for stacked avatars
        const offsetX = index * 4
        const offsetY = index * 4

        return (
          <div
            key={participant.id}
            className="absolute border-2 border-white rounded-full bg-white"
            style={{
              height: "24px",
              width: "24px",
              top: `${offsetY}px`,
              left: `${offsetX}px`,
              zIndex: participants.length - index,
            }}
          >
            <Avatar className="h-full w-full">
              <AvatarImage src={participant.user.image || "/placeholder.svg"} alt={participant.user.name} />
              <AvatarFallback>{participant.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )
      })}
    </div>
  )
}
