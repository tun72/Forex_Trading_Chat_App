import { useAppStore } from "@/store";
import axios from "@/helpers/axios";


import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { GET_MESSAGES, BACKEND_URL, CHANNEL_ROUTE } from "@/helpers/const";
import { FaFileArchive } from "react-icons/fa";
import { IoArrowDown, IoCloseSharp } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useSocket } from "@/context/SocketContext";

function MessageContainer() {
  // scrollbar hidden
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,

    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const { onlineUsers } = useSocket();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.post(GET_MESSAGES, {
          id: selectedChatData._id,
        });
        if (response.status === 200 && response.data) {
          setSelectedChatMessages(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getChannelMessages = async () => {
      try {
        const response = await axios.get(
          CHANNEL_ROUTE + "/" + selectedChatData._id
        );
        if (response.status === 200 && response.data) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!selectedChatData._id) {
      return;
    }

    if (selectedChatType === "contact") getMessages();
    else if (selectedChatType === "channel") getChannelMessages();
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;

    if (!selectedChatMessages) return;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className=" text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const handelDownloadFile = async (url) => {
    try {
      setIsDownloading(true);
      setFileDownloadProgress(0);
      const response = await axios.get(`${url}`, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
          const { loaded, total } = progress;
          const percentCompleted = Math.round((loaded * 100) / total);
          setFileDownloadProgress(percentCompleted);
        },
      });

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop(); // Extract the filename from the URL

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log("Failed to download file:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white border-white/20 "
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.message}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white border-white/20 "
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true);
                setImageUrl(message.fileUrl);
              }}
            >
              <img
                src={`${BACKEND_URL}/${message.fileUrl}`}
                alt=""
                height={300}
                width={300}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className=" text-white/8 text-3xl bg-black/20 rounded-full p-3">
                <FaFileArchive />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span
                className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => handelDownloadFile(message.fileUrl)}
              >
                <IoArrowDown />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderChannelMessages = (message) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id !== userInfo._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white border-white/20 "
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words ml-9`}
          >
            {message.message}
          </div>
        )}

        {message.messageType === "file" && (
          <div
            className={`${
              message.sender._id !== userInfo._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white border-white/20 "
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${BACKEND_URL}/${message.fileUrl}`}
                  alt=""
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className=" text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <FaFileArchive />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => handelDownloadFile(message.fileUrl)}
                >
                  <IoArrowDown />
                </span>
              </div>
            )}
          </div>
        )}

        {message.sender._id !== userInfo._id ? (
          <div className="flex items-center justify-start gap-3">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden">
              {message.sender.image ? (
                <img
                  src={`${BACKEND_URL}/${message.sender.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <AvatarFallback
                  className={`uppercase h-8 w-8 text-lg flex items-center justify-center rounded-full ${getColor()}`}
                >
                  {message.sender.username}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex   flex-col">
              <span className="text-sm text-green-400 mr-4">
                {onlineUsers.includes(message.sender?._id) && "online"}
              </span>

              <div>
                <span className="text-sm text-white/60 mr-4">
                  {message.sender.username}
                </span>

                <span className="text-xs text-white/60">
                  {moment(message.timestamp).format("LT")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-white/60 mt-1">
            {moment(message.timestamp).format("LT")}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className=" flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[78vw] xl:w-[80vw]">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImage && (
        <div className="fixed z-[100] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg">
          <div>
            <img
              src={`${BACKEND_URL}/${imageUrl}`}
              alt="some "
              className="h-[80vh] w-full bg-cover"
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              onClick={() => {
                handelDownloadFile(imageUrl);
              }}
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoArrowDown />
            </button>

            <button
              onClick={() => {
                setShowImage(false);
                setImageUrl(null);
              }}
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
