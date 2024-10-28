import React from "react";

function Progress({ children, text }) {
  return (
    <div
      className="h-[100vh] w-[100vw] fixed top-0 left-0 bg-black/80 
flex items-center justify-center flex-col gap-5 backdrop-blur-lg z-[1000]"
    >
      <h5 className="text-5xl animate-pulse">{text}</h5>
      {children}
    </div>
  );
}

export default Progress;
