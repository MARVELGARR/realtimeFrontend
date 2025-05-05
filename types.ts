export type LastSeen = "EVERYONE"|"MYCONTACTS"|"NOBODY"


export type Precense =
  "EVERYONE"|
  "NOBODY"

export type DisappearingMessages = 
  "OFF"|
  "DAYS90"|
  "DAYS7"|
  "H24"

export type Gender = "MALE"| "FEMALE"| "OTHERS"


export type ChatType = "DIRECT"|"GROUP"


export type GroupRole = "PARTICIPANT" |  "ADMIN"



export type profileType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  bio: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  phoneNumber: string | null;
  gender: Gender;
  birthDay: Date | null;
  profilePicture: string | null;
  coverPicture: string | null;
} | null;

export type Privacy={
  readReciept: boolean | null;
  lastSeen: LastSeen | null;
  precense: Precense | null;
  disappearingMessages: DisappearingMessages | null;
}

export type UserWithProfile = {
  name: string | null;
  id: string;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    bio: string | null;
    firstName: string | null;
    lastName: string | null;
    nickname: string | null;
    phoneNumber: string | null;
    gender: Gender;
    birthDay: Date | null;
    profilePicture: string | null;
    coverPicture: string | null;
    privacy: Privacy | null;
  }

};