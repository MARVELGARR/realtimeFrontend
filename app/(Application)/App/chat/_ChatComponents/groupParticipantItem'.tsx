import { GroupParticipant } from "@/actions/api-actions/groupActions/getGroupParticipant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/hooks/utilityHooks/use-url-state";
import { ExternalLink } from "lucide-react";
type GroupParticipantItemProps = {
  member: GroupParticipant;
};
const GroupParticipantItem = ({ member }: GroupParticipantItemProps) => {

    const [recepientId, setRecepientId] = useUrlState("recepientId");

  return (
    <div onClick={()=>setRecepientId(member.user.id)} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.user.image} alt={member.user.name} />
          <AvatarFallback>
            {member.user.name.charAt(0)}
            {member.user.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{member.user.name}</p>
          <p className="text-sm text-muted-foreground">{member.groupRole}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GroupParticipantItem;
