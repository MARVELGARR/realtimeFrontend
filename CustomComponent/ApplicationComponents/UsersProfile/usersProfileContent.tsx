"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Mail, Phone, UserPlus, UserX } from "lucide-react";
import { UsersResponse } from "../Modals/findNewFriendModal";
import { useModal } from "@/store/useModalStore";
import Wrappers from "@/CustomComponent/utilityComponent/wrappers";

interface UserProfile {
  profilePicture: string;
  coverPicture: string;
  nickname: string;
  phoneNumber: string;
  bio: string;
  createdAt: Date;
  gender: string;
  blockedBy: string[];
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

// Sample data for demonstration
const data: User = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  emailVerified: null,
  image: "",
  password: "",
  createdAt: "2023-01-01",
  updatedAt: "2023-01-01",
  profile: {
    profilePicture: "/placeholder.svg?height=128&width=128",
    coverPicture: "/placeholder.svg?height=300&width=800",
    nickname: "janedoe",
    phoneNumber: "+1 (555) 123-4567",
    bio: "Digital creator and tech enthusiast. Love exploring new technologies and sharing knowledge.",
    createdAt: new Date("2023-01-01"),
    gender: "Female",
    blockedBy: [],
  },
};

export default function UserProfile({
  data,
}: {
  data?: UsersResponse["users"][0];
}) {
  // Format date to be more readable
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { onOpen } = useModal();

  return (
    <Card className="w-full max-w-3xl bg-cyan-900 p-0 mx-auto overflow-hidden border-0 shadow-lg">
      {/* Cover Photo */}
      <div
        className="h-48 w-full bg-cyan-800 relative"
        style={{
          backgroundImage: `url(${data?.profile.coverPicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <CardContent className="p-0 bg-cyan-900">
        <div className="bg-cyan-900 text-white">
          {/* Profile Info Section */}
          <div className="px-6 pt-6 pb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar - Positioned to overlap with cover photo */}
              <div className="flex justify-center -mt-16 md:-mt-20">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-cyan-900 bg-cyan-800">
                  <AvatarImage
                    src={data?.profile.profilePicture || "/placeholder.svg"}
                    alt={data?.name}
                  />
                  <AvatarFallback className="text-2xl bg-cyan-800">
                    {data?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            {/* User Details */}
            <div className=" mt-[2rem] text-center md:text-left">
              <h1 className="text-2xl font-bold">{data?.name}</h1>
              <h4 className="font-light text-cyan-100">
                @{data?.profile.nickname}
              </h4>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  <span>{data?.email}</span>
                </div>

                {data?.profile.phoneNumber && (
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="h-4 w-4 text-cyan-300" />
                    <span>{data.profile.phoneNumber}</span>
                  </div>
                )}

                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CalendarDays className="h-4 w-4 text-cyan-300" />
                  <span>Joined {formatDate(data!.createdAt!)}</span>
                </div>
              </div>
            </div>

            <Wrappers className="flex items-center gap-3 mt-4 w-full justify-start pr-3">
              <Button
                onClick={() =>
                  onOpen(
                    "profile-pic",
                    data?.profile?.profilePicture,
                    "profile-pic"
                  )
                }
                className=" cursor-pointer text-cyan-900"
                variant={"outline"}
              >
                View Pic
              </Button>
              <Button
                onClick={() =>
                  onOpen(
                    "profile-cover-picture",
                    data?.profile?.coverPicture,
                    "profile-cover-picture"
                  )
                }
                className="cursor-pointer text-cyan-900"
                variant={"outline"}
              >
                View Cover
              </Button>
            </Wrappers>

            {/* Bio */}
            {data?.profile.bio && (
              <div className="mt-6 p-4 bg-cyan-800/50 rounded-lg">
                <p className="text-cyan-50">{data?.profile.bio}</p>
              </div>
            )}

            {/* Gender Badge */}
            <div className="mt-4 flex justify-center md:justify-start">
              <span className="px-3 py-1 bg-cyan-700 text-cyan-100 rounded-full text-sm">
                {data?.profile.gender}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add friend
              </Button>
              <Button
                variant="outline"
                className="border-cyan-600 text-cyan-900 hover:bg-cyan-800"
              >
                <UserX className="mr-2 h-4 w-4" />
                Block
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
