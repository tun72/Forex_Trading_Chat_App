import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "@/helpers/axios";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/helpers/const";
import toast from "react-hot-toast";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

function AuthForm({ isSignup = false }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // global state
  const { setUserInfo } = useAppStore();

  // navigator
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (isSignup && username.trim() === "") {
      newErrors.username = "Username is required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handelSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);

        console.log(password);

        let msg = isSignup ? "Sign Up" : "Login";
        const response = await axios.post(
          isSignup ? SIGNUP_ROUTE : LOGIN_ROUTE,
          {
            username,
            email,
            password,
          }
        );
        if (response.status === 200) {
          const user = response.data;
          setUserInfo(user.userInfo);
          toast.success(msg + "Success");
          navigate("/profile")
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <form onSubmit={handelSubmit} className=" flex flex-col gap-5 mt-10">
      {isSignup && (
        <>
          <Input
            placeholder="Username"
            type="text"
            className="rounded-full p-6"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm pl-2">* {errors.username}</p>
          )}
        </>
      )}
      <Input
        placeholder="Email"
        type="email"
        className="rounded-full p-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <p className="text-red-500 text-sm pl-2">* {errors.email}</p>
      )}

      <Input
        placeholder="Password"
        type="password"
        className="rounded-full p-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <p className="text-red-500 text-sm pl-2">* {errors.password}</p>
      )}

      <Button
        className={`rounded-full p-6 ${isLoading ? "bg-gray-600" : "bg-black"}`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading ..." : isSignup ? "Sign Up" : "Login"}
      </Button>
    </form>
  );
}

export default AuthForm;
