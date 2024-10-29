import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BACKEND_URL } from "@/helpers/const";
import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";

import { getColor } from "@/lib/utils";
import { useState } from "react";
import { DeleteChannel } from "@/components/admin/channel/DeleteChannel";

function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  const [openDetail, setOpenDetail] = useState();

  return (
    <div className=" h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className=" flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="flex gap-3 items-center cursor-pointer">
            <div className="w-12 h-12 relative">
              {selectedChatType === "contact" ? (
                <Avatar className="w-12 h-12  rounded-full overflow-hidden">
                  {selectedChatData?.image ? (
                    <AvatarImage
                      src={BACKEND_URL + "/" + selectedChatData.image}
                      alt="Profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase w-12 h-12  flex items-center justify-center text-lg border rounded-full ${getColor()}`}
                    >
                      {selectedChatData.username.split("").shift()}
                    </div>
                  )}
                </Avatar>
              ) : (
                <div className="bg-[#ffffff22] w-12 h-12  flex items-center justify-center text-lg border rounded-full">
                  #
                </div>
              )}
            </div>
            <p>
              {selectedChatType === "channel" && selectedChatData.name}
              {selectedChatType === "contact" && selectedChatData.username}
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center gap-5">
          <DeleteChannel channelId={selectedChatData._id} />
          <button
            onClick={closeChat}
            className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className=" text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
