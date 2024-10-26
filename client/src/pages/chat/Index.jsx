import { useAppStore } from "@/store";
import React from "react";


function Chat() {
  const { userInfo } = useAppStore();
;
  return <div>chat</div>;
}

export default Chat;
