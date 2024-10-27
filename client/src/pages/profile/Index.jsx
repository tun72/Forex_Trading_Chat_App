import { AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import React, { useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Profile() {
  const { userInfo } = useAppStore();
  const [hovered, setHovered] = useState(false);

  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const fileRef = useRef();

  function handelImageSubmit(e) {
    const fileImg = e.target.files[0];
    if (fileImg) {
      setPreviewImg(URL.createObjectURL(fileImg));
      setImage(fileImg);
    }
  }

  function handelClear() {
    setPreviewImg(null);
    setImage(null);
  }

  function handelSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-10 w-[80vw] md:w-max"
      >
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className=" h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden ">
              {previewImg ? (
                <AvatarImage
                  src={previewImg}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 rounded-full md:h-48 text-5xl border-[1px] flex items-center justify-center ${getColor()}`}
                >
                  {userInfo.username.split("").shift()}
                </div>
              )}
            </Avatar>

            {hovered &&
              (previewImg ? (
                <div className="img-hover">
                  <FaTrash
                    className="text-white text-3xl"
                    onClick={handelClear}
                  />
                </div>
              ) : (
                <label htmlFor="imgUrl" className="img-hover">
                  <FaPlus className="text-white text-3xl" />
                </label>
              ))}

            <input
              id="imgUrl"
              name="imgUrl"
              type="file"
              ref={fileRef}
              className="sr-only"
              onChange={(e) => {
                handelImageSubmit(e);
              }}
            />
          </div>
          <div className=" flex mid-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="UserName"
                type="text"
                disabled
                value={userInfo.username}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Role"
                type="text"
                disabled
                value={"Guest"}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
