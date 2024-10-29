import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import axios from "@/helpers/axios";
import React, { useState } from "react";
import { JOIN_CHANNEL_ROUTE, LEAVE_CHANNEL_ROUTE } from "@/helpers/const";
import toast from "react-hot-toast";
import { useSocket } from "@/context/SocketContext";

function ChannelOption() {
  const { selectedChatData, userInfo, setSelectedChatData } = useAppStore();
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);

  async function handelChannel(option = "") {
    try {
      setLoading(true);
      const response = await axios.post(
        option === "join" ? JOIN_CHANNEL_ROUTE : LEAVE_CHANNEL_ROUTE,
        { channelId: selectedChatData._id }
      );

      if (response.status === 200) {
        toast.success("successfully " + option);

        if (option === "join") {
          selectedChatData.members.push(userInfo._id);
          socket.emit("joinAndLeaveChannel", {
            message: userInfo.username + " join the channel",
            channelId: selectedChatData._id,
          });
        } else {
          selectedChatData.members = selectedChatData.members.filter(
            (member) => member !== userInfo._id
          );
          socket.emit("joinAndLeaveChannel", {
            message: userInfo.username + " leave the channel",
            channelId: selectedChatData._id,
          });
        }

        setSelectedChatData(selectedChatData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (selectedChatData.created_by === userInfo._id) {
    return <></>;
  }

  return (
    <>
      {selectedChatData.members.includes(userInfo._id) ? (
        <Button
          className="bg-red-500 text-red-50 hover:bg-red-600 cursor-pointer"
          disabled={loading}
          onClick={() => handelChannel("leave")}
        >
          Leave Group
        </Button>
      ) : (
        <Button
          className="bg-purple-500 text-purple-50 hover:bg-purple-600 cursor-pointer"
          disabled={loading}
          onClick={() => handelChannel("join")}
        >
          Join Group
        </Button>
      )}
    </>
  );
}

export default ChannelOption;
