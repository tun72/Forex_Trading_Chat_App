import ChatContainer from "@/components/chat/chat-container/Index";
import ContactContainer from "@/components/chat/contacts-container/Index";
import EmptyChatContainer from "@/components/chat/empty-chat-container/Index";
import { useAppStore } from "@/store";
import React from "react";

function Chat() {
  const { userInfo, selectedChatType } = useAppStore();

  return (
    <div className=" flex h-[100vh] text-white  overflow-hidden">
      <ContactContainer />
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
}

export default Chat;
