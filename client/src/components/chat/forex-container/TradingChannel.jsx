import { useAppStore } from "@/store";
import React from "react";

import { RiMoneyCnyCircleFill } from "react-icons/ri";

function TradingChannel() {
  const { setIsTrading, isTrading, closeChat } = useAppStore();
  function handelClick() {
    closeChat();
    setIsTrading(true);
  }
  return (
    <div className="mt-5">
      <div
        className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
          isTrading
            ? "bg-[#8417ff] horver:bg-[#8417ff]"
            : "hover:bg-[#f1f1f111]"
        }`}
        onClick={() => handelClick()}
      >
        <div className="flex gap-5 items-center justify-start text-neutral-300">
          <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
            <RiMoneyCnyCircleFill />
          </div>
          <span>{"Trading"}</span>
        </div>
      </div>
    </div>
  );
}

export default TradingChannel;
