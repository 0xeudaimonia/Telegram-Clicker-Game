"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

declare const window: any;

const User = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const loadTelegramScript = () => {
      if (!window.Telegram) {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = () => {
          initializeTelegram();
        };
        document.body.appendChild(script);
      } else {
        initializeTelegram();
      }
    };

    const initializeTelegram = () => {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const data = tg.initDataUnsafe;
      if (data && data.user && data.user.id) {
        if (userId !== data.user.id) {
          setUserId(data.user.id);
        }
      } else {
        console.error("User ID not found in initDataUnsafe:", data);
      }
    };

    loadTelegramScript();
  }, [userId]);

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
          src="/avatar.jpeg"
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
