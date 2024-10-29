import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/helpers/axios";
import { BACKEND_URL, UPDATE_USER_ROUTE } from "@/helpers/const";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.image) setPreviewImage(`${BACKEND_URL}/${userInfo.image}`);
  }, [userInfo]);

  const handleImageSubmit = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setImageFile(selectedFile);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile)
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.patch(UPDATE_USER_ROUTE, formData);
        if (response.status === 200) {
          setUserInfo(response.data.user);
          toast.success("Image successfully uploaded!");
          clearImage();
        }
      } catch (err) {
        toast.error(`Error: ${err.response?.data.message || err.message}`);
      } finally {
        setIsUploading(false);
      }

    return navigate("/chat");
  };

  return (
    <div className="bg-[#1b1c24] min-h-screen flex items-center justify-center flex-col gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-4/5 md:w-auto"
      >
        <IoArrowBack
          onClick={() => {
            navigate("/chat");
          }}
          className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
        />
        <div className="grid grid-cols-2 gap-5">
          <div
            className="relative w-32 md:w-48 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {previewImage ? (
                <AvatarImage
                  src={previewImage}
                  alt="Profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:h-48 md:w-48 flex items-center justify-center text-lg border rounded-full ${getColor()}`}
                >
                  insert photo
                </div>
              )}
            </Avatar>

            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full ">
                {previewImage ? (
                  <FaTrash
                    className="text-white text-3xl cursor-pointer"
                    onClick={clearImage}
                  />
                ) : (
                  <>
                    <label
                      htmlFor="imageUpload"
                      className="text-white text-3xl cursor-pointer"
                    >
                      <FaPlus />
                    </label>
                    <input
                      id="imageUpload"
                      name="imageUpload"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageSubmit}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 items-center justify-center text-white">
            <Input
              type="email"
              disabled
              value={userInfo.email}
              className="bg-[#2c2e3b] rounded-lg p-6"
            />
            <Input
              type="text"
              disabled
              value={userInfo.username}
              className="bg-[#2c2e3b] rounded-lg p-6"
            />
            <Input
              type="text"
              disabled
              value={userInfo?.role}
              className="bg-[#2c2e3b] rounded-lg p-6"
            />
          </div>
        </div>
        <Button
          disabled={isUploading}
          className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}

export default Profile;
