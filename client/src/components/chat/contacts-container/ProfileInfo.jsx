import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BACKEND_URL, LOGOUT_ROUTE } from "@/helpers/const";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import axios from "@/helpers/axios";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProfileInfo() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handelLogout() {
    try {
      setLoading(true);
      const response = await axios.post(LOGOUT_ROUTE);

      if (response.status === 200) {
        setUserInfo(null);
        toast.success("logout success");
        return navigate("/auth");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" absolute bottom-0 h-20 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="relative w-12 h-12">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                src={`${BACKEND_URL}/${userInfo.image}`}
                alt="Profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 flex items-center justify-center text-lg border rounded-full ${getColor()}`}
              >
                insert photo
              </div>
            )}
          </Avatar>
        </div>
        <div>
          <p className="text-[16px]">{userInfo?.username}</p>
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                navigate("/profile");
              }}
            >
              {/* <button
                className="outline-none border-none text-purple-500"
                
              > */}
              <FaEdit className="text-purple-500 text-xl font-medium" />
              {/* </button> */}
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handelLogout} disabled={loading}>
              <IoPowerSharp className="text-xl text-red-500 font-medium" />
              {/* </button> */}
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
