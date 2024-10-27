import ChatContainer from "@/components/chat/chat-container/Index";
import ContactContainer from "@/components/chat/contacts-container/Index";
import EmptyChatContainer from "@/components/chat/empty-chat-container/Index";
import { useAppStore } from "@/store";
import React from "react";

function Chat() {
  const { userInfo } = useAppStore();
  return (
    <div className=" flex h-[100vh] text-white  overflow-hidden">
      <ContactContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  );
}

export default Chat;
