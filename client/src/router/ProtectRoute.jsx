import React, { useEffect, useState, useCallback } from "react";
import axios from "@/helpers/axios";
import { useAppStore } from "@/store";
import { GET_USER_ROUTE } from "@/helpers/const";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectRoute({ children }) {
  const { setUserInfo } = useAppStore();
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(GET_USER_ROUTE);
        if (response.status === 200) {
          setUserInfo(response.data.userInfo);
          setIsAuthenticated(true);
        } else {
          throw new Error("Token expired. Please log in again.");
        }
      } catch (err) {
        console.log(err.message);

        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, [navigate, setUserInfo]);

  if (isLoading) return;

  return isAuthenticated ? children : null;
}

export default ProtectRoute;
