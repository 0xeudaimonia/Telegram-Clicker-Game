"use client";
import React, { useState, useEffect } from "react";
import CardList from "./cardList";
import TabelList from "./tabelList";
import CopyToClipboard from "@/components/copyToClipboard";
import { getUserData } from "@/utils/webAppUtils";
import LayoutHome from "@/components/layouts/index";

const user = getUserData();

const cardListData = [
  {
    title: "Пригласить друга",
    points: "+7 000 для вас и вашего друга",
    imageSrc: "/gift.svg",
  },
  {
    title: "Пригласить друга с Telegram Premium",
    points: "+21 000 для вас и вашего друга",
    imageSrc: "/gift-2.svg",
  },
];

const tabelListData = [
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
];

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  Username: string;
  languageCode: string;
}

export default function ReferalPage() {
  const [tgUserId, setTgUserId] = useState<string>("");

  const userId = user?.id;

  useEffect(() => {
    const fetchUserId = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `/api/current_user?telegramUserId=${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setTgUserId(data.userId || "Guest");
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

    fetchUserId();
  }, [userId]);

  return (
    <LayoutHome>
      <div className="text-white bg-[url(/background2.png)] pb-20">
        <div className="text-center">
          <h5>Пригласите друзей!</h5>
          <p className="text-[10px]">Вы и ваш друг получите бонусы</p>
        </div>
        <CardList data={cardListData} />

        <h5 className="text-center">Бонус за повышение уровня</h5>
        <TabelList data={tabelListData} />

        <CopyToClipboard userId={tgUserId} />
      </div>
    </LayoutHome>
  );
}
