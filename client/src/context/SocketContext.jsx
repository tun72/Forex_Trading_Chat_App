import { useAppStore } from "@/store";
import { io } from "socket.io-client";
import { createContext, useRef, useEffect, useContext, useState } from "react";
import { BACKEND_URL } from "@/helpers/const";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const {
    userInfo,
    selectedChatData,
    selectedChatType,
    addMessage,
    addChannelInChannelList,
    addContactsInDM,
  } = useAppStore();

  const { setForexData } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      // Initialize socket connection
      const socket = io(BACKEND_URL, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      setSocket(socket);
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Define the message handler function
      const handleReceiveMessage = (message) => {
        // Check if message is from the selected chat
        if (
          selectedChatType &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        } else {
          console.log("Message not relevant to selected chat.");
        }
        addContactsInDM(message);
      };

      const handleReceiveChannelMessage = (message) => {
        // Check if message is from the selected chat

        if (
          selectedChatType &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.channelId)
        ) {
          addMessage(message);
        } else {
          console.log("Message not relevant to selected chat.");
        }
        addChannelInChannelList(message);
      };

      const handelForexData = (data) => {
        console.log(data);
        
        setForexData(data);
      };
      // Listen for 'receiveMessage' event
      socket.on("receiveMessage", handleReceiveMessage);
      socket.on("recieveChannelMessage", handleReceiveChannelMessage);
      socket.on("forexUpdate", handelForexData);

      return () => {
        if (socket) {
          socket.off("receiveMessage", handleReceiveMessage);
          socket.off("recieveChannelMessage", handleReceiveChannelMessage);
          socket.off("forexUpdate", handelForexData);
          socket.disconnect();
        }
      };
    }
  }, [
    userInfo,
    addMessage,
    selectedChatData?._id,
    selectedChatType,
    addChannelInChannelList,
    addContactsInDM,
    setForexData,
  ]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
