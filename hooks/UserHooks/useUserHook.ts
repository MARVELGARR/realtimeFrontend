import { Gender, UserWithProfile } from "@/types";
import { apiClient } from "@/utils/clientApi";
import { useQuery } from "@tanstack/react-query";

// type userType = {
//     name: string | null;
//     id: string;
//     email: string | null;
//     emailVerified: boolean | null;
//     image: string | null;
//     password: string | null;
//     createdAt: Date;
//     updatedAt: Date;
// }
// type profileType = {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string;
//   bio: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   nickname: string | null;
//   phoneNumber: string | null;
//   gender: Gender;
//   birthDay: Date | null;
//   profilePicture: string | null;
// } | null;

// export type UserWithProfile = {
//     user: userType;
//   profile: profileType
// };

const useUser = () => {
  const {data: user, isLoading: isGettingUser} = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient<UserWithProfile>("/user")
  });
  return {user, isGettingUser};
};

export default useUser;
