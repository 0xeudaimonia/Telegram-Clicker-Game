"use client";
import { useEffect, useState } from "react";
import { env } from 'process';
const BOT_TOKEN = env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;


console.log("BOT_TOKEN", BOT_TOKEN);
const useBotUsername = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!BOT_TOKEN) return;

    const fetchBotUsername = async () => {
      try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const data = await response.json();
        if (data.ok) {
          setUsername(data.result.id);
        }
      } catch (error) {
        console.error("Error fetching bot username:", error);
      }
    };

    fetchBotUsername();
  }, [BOT_TOKEN]);

  return username;
};

export default useBotUsername;
