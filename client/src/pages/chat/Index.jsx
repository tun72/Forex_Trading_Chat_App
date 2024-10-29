import ChatContainer from "@/components/chat/chat-container/Index";
import ContactContainer from "@/components/chat/contacts-container/Index";
import EmptyChatContainer from "@/components/chat/empty-chat-container/Index";
import ForexPanel from "@/components/chat/forex-container/Index";
import ChatLayout from "@/components/ui/layout";
import Progress from "@/components/ui/progress";
import { useAppStore } from "@/store";
import React from "react";

function Chat() {
  const {
    selectedChatType,

    fileDownloadProgress,
    isTrading,

    isUploading,
    isDownloading,
    fileUploadProgress,
  } = useAppStore();

  return (
    <>
      {isDownloading && (
        <Progress text={"Downloading"}>{fileDownloadProgress}%</Progress>
      )}
      {isUploading && (
        <Progress text={"Uploading"}>{fileUploadProgress}%</Progress>
      )}
      <ChatLayout>
        {!isTrading ? (
          selectedChatType ? (
            <ChatContainer />
          ) : (
            <EmptyChatContainer />
          )
        ) : (
          <ForexPanel />
        )}
      </ChatLayout>
    </>
  );
}

export default Chat;
