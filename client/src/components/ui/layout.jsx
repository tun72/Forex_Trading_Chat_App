import React from "react";
import ContactContainer from "../chat/contacts-container/Index";

function ChatLayout({ children }) {
  return (
    <div className=" flex h-[100vh] text-white  overflow-hidden">
      <ContactContainer />
      {children}
    </div>
  );
}

export default ChatLayout;
