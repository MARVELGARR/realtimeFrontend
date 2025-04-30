export enum LastSeen {
  EVERYONE,
  MYCONTACTS,
  NOBODY,
}

export enum Precense {
  EVERYONE,
  NOBODY,
}

export enum Gender {
  MALE,
  FEMALE,
  OTHERS,
}

export enum ChatType {
  DIRECT,
  GROUP,
}

export enum GroupRole {
  PARTICIPANT,
  ADMIN,
}


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

export type UserWithProfile = {
  name: string | null;
  id: string;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile: profileType
};