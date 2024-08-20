"use client";
import Image from "next/image";
import Button from "@components/Button";
import CardComponent from "@components/Card";
import cardData from "@data/cardData.json"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/webAppUtils";
import { useAppProvider } from "@components/layouts/AppProvider";
import { fetchPoints } from "@utils/gameStatus";

const user = getUserData();

const GameCanvas = dynamic(() => import("../components/GameCanvas"), {
  ssr: false,
});

export default function Card() {
  const { userPoints, setUserPoints, currentUserId, setCurrentUserId } = useAppProvider();
  // const [tgUserId, setTgUserId] = useState<string>("");
  const [dropFlag, setDropFlag] = useState(-1);

  const userId = user?.id;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `/api/current_user?telegramUserId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCurrentUserId(data.userId || "Guest");
          // setTgUserId(data.userId || "Guest");
        } else {
          const errorData = await response.json();
          console.error("Error fetching user name:", errorData.error);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserId();
  }, [userId]);

  // const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    if (currentUserId) {
      const fetchGamePoints = async () => {
        const result = await fetchPoints(currentUserId);
        setUserPoints(result.points);
      };

      fetchGamePoints();
    }
  }, [currentUserId]);

  return (
    <>
      <div className="flex justify-center items-center gap-3 text-center">
        {cardData.map((card) => (
          <CardComponent
            key={card.id}
            title={card.title}
            titleColor={card.titleColor}
            value={card.value}
            iconSrc={card.iconSrc}
            additionalIconSrc={card.additionalIconSrc}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 my-5">
        <Image src="/coin_60.svg" alt="building" width={60} height={60} />
        <h2 className="">{userPoints}</h2>
      </div>
      <div>
        <GameCanvas userId={currentUserId} dropFlag={dropFlag} />
      </div>

      <div className="my-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/icon02.svg" alt="icon" width={44} height={44} />
          <h3 className="text-base fw-bolder">10/10</h3>
        </div>
        <div>
          <Button
            label="Сбросить блок"
            className="btn text-base bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary text-white"
            onClick={() => { setDropFlag((perviousDropFlag) => -perviousDropFlag) }}
          />
        </div>
      </div>
    </>
  )
}
