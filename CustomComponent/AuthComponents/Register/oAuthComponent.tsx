import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImGoogle3 } from "react-icons/im";

const OauthSelect = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, "")}>
      <Link href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`} className="h-[3rem] hover:bg-gray-300 px-3 justify-center border border-black w-full rounded-lg gap-2 flex items-center">
        <ImGoogle3 /> Google
      </Link>
      <Link href={""} className="h-[3rem] px-3 justify-center border border-black w-full hover:bg-gray-300 rounded-lg gap-2 flex items-center">
        <Github /> Github
      </Link>
    </div>
  );
};

export default OauthSelect;
