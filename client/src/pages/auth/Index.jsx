import React, { useState } from "react";
import Victory from "@/assets/victory.svg";
import Background from "@/assets/background.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async () => {};

  const handelSignup = async () => {};

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
                <TabsTrigger
                  value="login"
                  className=" data-[state=active]:bg-transparent
                   text-black text-opacity-90 border-b-2 rounded-none w-1/2
                   data-[state=active]:text-black 
                   data-[state=active]:font-semibold 
                   data-[state=active]:border-b-purple-500
                    p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent
                   text-black text-opacity-90 border-b-2 rounded-none w-1/2
                   data-[state=active]:text-black 
                   data-[state=active]:font-semibold 
                   data-[state=active]:border-b-purple-500
                    p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className=" rounded-full p-6" onClick={handelLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Username"
                  type="text"
                  className="rounded-full p-6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button className=" rounded-full p-6" onClick={handelSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className=" hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" className="h-[700px]" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
