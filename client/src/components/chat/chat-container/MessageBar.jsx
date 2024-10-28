import { useSocket } from "@/context/SocketContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useAppStore } from "@/store";
import axios from "@/helpers/axios";
import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { UPLOAD_FILE_ROUTE } from "@/helpers/const";

function MessageBar() {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setIsUploading,

    setFileUploadProgress,
  } = useAppStore();
  const emojiRef = useOutsideClick(() => {
    setIsEmojiOpen(false);
  });

  const fileInputRef = useRef();
  function handelAddEmoji(emoji) {
    setMessage((msg) => msg + emoji.emoji);
  }

  async function handelSendMessage(e) {
    e.preventDefault();

    if (!message) return;

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("sendChannelMessage", {
        sender: userInfo._id,
        message,
        messageType: "text",
        fileUrl: undefined,
        channelId: selectedChatData._id,
      });
    }
    setMessage("");
  }

  function handelAttachmentClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handelAttachmentChange(e) {
    try {
      const file = e.target.files[0];

      if (file) {
        setIsUploading(true);
        setFileUploadProgress(0);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) =>
            setFileUploadProgress(Math.round((100 * data.loaded) / data.total)),
        });

        if (response.status === 200 && response.data.status === "success") {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo._id,
              message: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("sendChannelMessage", {
              sender: userInfo._id,
              message: undefined,
              fileUrl: response.data.filePath,
              messageType: "file",
              channelId: selectedChatData._id,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      className=" h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6"
      onSubmit={handelSendMessage}
    >
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type=" text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
        />
        <button
          type="button"
          onClick={handelAttachmentClick}
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        >
          <GrAttachment className="text-2xl" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handelAttachmentChange}
        />

        <div className="relative">
          <button
            type="button"
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
        type="submit"
        className=" bg-[#8417ff] rounded-md flex items-center justify-center p-5  hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
      >
        <IoSend className="text-2xl" />
      </button>
    </form>
  );
}

export default MessageBar;
