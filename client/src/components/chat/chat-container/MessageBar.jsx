import { useSocket } from "@/context/SocketContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

function MessageBar() {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const emojiRef = useOutsideClick(() => {
    setIsEmojiOpen(false);
  });

  function handelAddEmoji(emoji) {
    setMessage((msg) => msg + emoji.emoji);
  }

  async function handelSendMessage() {
    console.log(selectedChatType);

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
  }
  return (
    <div className=" h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type=" text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setIsEmojiOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={isEmojiOpen}
              onEmojiClick={handelAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handelSendMessage}
        className=" bg-[#8417ff] rounded-md flex items-center justify-center p-5  hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
}

export default MessageBar;
