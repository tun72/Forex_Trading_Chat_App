import Auth from "@/pages/auth/Index";
import Chat from "@/pages/chat/Index";
import AppLayout from "@/pages/layout/AppLayout";
import Profile from "@/pages/profile/Index";

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route
          element={
            <ProtectRoute>
              <AppLayout />
            </ProtectRoute>
          }
        >
          <Route index element={<Navigate replace to="chat" />} />
          <Route path="chat" element={<Chat />} />

          <Route path="profile" element={<Profile />} />
        </Route>

       
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
