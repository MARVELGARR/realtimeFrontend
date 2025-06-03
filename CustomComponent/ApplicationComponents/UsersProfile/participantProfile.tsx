import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  gender: "MALE" | "FEMALE" | string; // Extend as needed
  birthDay: string | null;
  coverPicture: string | null;
  nickname: string | null;
  phoneNumber: string | null;
  profilePicture: string;
  StarredMessage: any[]; // Replace `any` with a proper type if known
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
}

const ParticipantProfile = () => {
  const searchUrl = useSearchParams();
  const id = searchUrl.get("recieverId");

  const userId = id;
  const { data: profile, isLoading } = useQuery({
    queryKey: ["participant-profile", id],
    queryFn: () =>
      apiClient<User>(`/participant-profile/${userId}`, {
        method: "GET",
      }),
  });

  return (
    <div className="h-full w-full space-y-[5rem] ">
      <div className="relative">
        
        <img
          className="w-full h-[9rem] "
          alt="recepient cover image"
          src={profile?.profile.coverPicture! || profile?.image!}
        />

        <div className=" absolute p-2 -bottom-[5rem] left-[30%]  bg-cyan-500 w-fit rounded-full h-fit">
          <Avatar className="w-[9rem] h-[9rem]">
            <AvatarImage
              alt={profile?.name}
              src={profile?.profile.profilePicture}
            />
            <AvatarFallback>
              {profile?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">{profile?.name}</h2>
        <p className="text-gray-600">{profile?.email}</p>
        {profile?.profile.bio && (
          <p className="text-sm text-muted-foreground">{profile.profile.bio}</p>
        )}
        <p className="text-sm text-muted-foreground">
          📞 {profile?.profile.phoneNumber || "--"}
        </p>

        <p className="text-sm text-muted-foreground">
          Gender: {profile?.profile.gender || "--"}
        </p>
        <p className="text-sm text-muted-foreground">
          Birthday: {profile?.profile.birthDay || "--"}
        </p>
      </div>
    </div>
  );
};

export default ParticipantProfile;
