import Auth from "@/pages/auth/Index";
import Chat from "@/pages/chat/Index";
import Profile from "@/pages/profile/Index";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
