"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getUserData } from "@/utils/webAppUtils";

const User = () => {
  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("/avatar.png");

  const userData = getUserData();
  const userId = userData?.id;

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `/api/current_user?telegramUserId=${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserName(data.userName || "Guest");
            if (data.avatar == "") {
              setUserAvatar("/avatar.png");
            } else {
              setUserAvatar(data.avatar);
            }

          } else {
            const errorData = await response.json();
            console.error("Error fetching user name:", errorData.error);
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      } else {
        console.warn("User ID is not set.");
      }
    };

    fetchUserName();
  }, [userId]);

  return (
    <div className="p-4 text-white bg-black">
      <div className="flex justify-start items-center mb-4">
        <Image
          src={userAvatar}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <h2 className="text-lg font-bold ms-4">{userName}</h2>
      </div>
    </div>
  );
};

export default User;
