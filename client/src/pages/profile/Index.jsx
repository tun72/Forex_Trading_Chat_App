import { AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
function Profile() {
  const { userInfo } = useAppStore();
  const image = undefined;
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 relative flex items-center justify-center">
            <Avatar className=" h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={""}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div className=" uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center">
                  {userInfo.username.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
