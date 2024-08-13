"use client";
import Card from "./card";
import Image from "next/image";
import Button from "@components/Button";
import React, { useEffect, useState } from "react";
import { useAppProvider } from "@components/layouts/AppProvider";

const TradersIdPage = () => {
  const [dailyRewards, setDailyRewards] = useState([]);
  const { currentUserId } = useAppProvider();
  const [dailyRewardSuccess, setDailyRewardSuccess] = useState(false);

  useEffect(() => {
    const fetchDailyRewards = async () => {
      try {
        // console.log("current user id", currentUserId)
        const response = await fetch(`/api/dailyRewards?userId=${currentUserId}`);
        const data = await response.json();
        console.log("daily reward info", data);
        setDailyRewards(data.dailyRewards);
      } catch (error) {
        console.error("Error fetching daily rewards:", error);
        setDailyRewards([]);
      }
    };

    fetchDailyRewards();
  }, []);

  const getDailyRewards = async () => {
    console.log(currentUserId);
    if (!currentUserId) {
      console.log("cannot get current user id");
      return;
    }
    try {
      const response = await fetch("/api/dailyRewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  }

  return (
    <>
      <div className="text-white bg-[url(/background2.png)] pb-20">
        <div className="text-center">
          <Image
            src="/calendar.svg"
            alt="calendar"
            height="80"
            width="80"
            className="shadow-2xl shadow-[#2496FF] mx-auto"
          />
          <h1 className="fw-bolder mt-5 mb-2">Ежедневная награда</h1>
          <p className="text-[10px] max-w-64 mx-auto leading-4">
            Забирайте монеты за ежедневный вход в игру без пропусков. Кнопку
            “Забрать” нужно нажимать ежедневно, иначе счётчик дней начнётся
            заново
          </p>
        </div>
        {dailyRewards.length > 0 ? (
          <Card data={dailyRewards} />
        ) : (
          <div className="text-center">
            <p>Загрузка...</p>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <Button
          label="Забрать"
          onClick={getDailyRewards}
          className="btn mt-16 text-base bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary text-white w-full"
        />
      </div>
    </>
  );
};

export default TradersIdPage;
