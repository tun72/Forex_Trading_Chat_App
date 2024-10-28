import ChatContainer from "@/components/chat/chat-container/Index";
import ContactContainer from "@/components/chat/contacts-container/Index";
import EmptyChatContainer from "@/components/chat/empty-chat-container/Index";
import Progress from "@/components/ui/progress";
import { useAppStore } from "@/store";
import React from "react";

function Chat() {
  const {
    userInfo,
    selectedChatType,

    fileDownloadProgress,

    isUploading,
    isDownloading,
    fileUploadProgress,
  } = useAppStore();

  return (
    <div className=" flex h-[100vh] text-white  overflow-hidden">
      {isDownloading && (
        <Progress text={"Downloading"}>{fileDownloadProgress}%</Progress>
      )}
      {isUploading && (
        <Progress text={"Uploading"}>{fileUploadProgress}%</Progress>
      )}

      <ContactContainer />
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
}

export default Chat;
