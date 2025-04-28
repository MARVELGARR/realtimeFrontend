import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { AuthlayoutImage } from "@/public";
import Image from "next/image";

const AuthLayoutImage = ({ className, title }: { className?: string, title?: string }) => {
  return (
    <div className={cn(" relative", className)}>
      <Image
        src={AuthlayoutImage}
        alt="Image"
        fill
        className={cn(className, "rounded-lg object-cover ")}
      />
      <h1 className=" font-bold text-3xl text-amber-50 top-[50%] absolute left-[40%] ">{title}</h1>
    </div>
  );
};

export default AuthLayoutImage;
