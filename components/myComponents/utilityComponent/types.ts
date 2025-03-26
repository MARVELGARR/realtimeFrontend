import type { ReactNode } from "react"

export interface MenuItem {
  id: string
  label: string
  view?: string
  icon?: ReactNode
}

export interface View {
  title: string
  items: MenuItem[]
}

export interface Views {
  [key: string]: View
}

export interface User {
  id: string
  name: string
  image: string
}
interface PrivacySettings {
  id: string;
  profileId: string;
  disappearingMessages: string;
  lastSeen: string;
  precense: string;
  readReciept: boolean;
}

interface UserProfile {
  id: string;
  bio: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthDay: string | null;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
  userId: string;
  privacy: PrivacySettings;
}

interface UserPropForCurrentUser {
  id: string;
  email: string;
  name: string;
  image: string;
  profile: UserProfile;
}
export type CurrentUserType = UserPropForCurrentUser
