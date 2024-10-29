import React, { useEffect } from "react";
import Victory from "@/assets/victory.svg";
import Background from "@/assets/background.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import AuthForm from "@/components/auth/AuthForm";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (userInfo) navigate("/chat");
  }, [userInfo, navigate]);
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-purple-50">
      <div
        className=" h-[80vh] bg-white border-2 border-white text-opacity-90 
      shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] 
      rounded-3xl grid xl:grid-cols-2"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className=" flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt=" Victory Emoji" className="h-[100px]" />
            </div>
            <p className=" font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className=" w-3/4" defaultValue="login">
              <TabsList className=" bg-transparent rounded-none  w-full">
                <TabsTrigger value="login" className="tab">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="tab">
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AuthForm />
              </TabsContent>
              <TabsContent value="signup">
                <AuthForm isSignup={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className=" hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" className="h-[600px] object-fit" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
