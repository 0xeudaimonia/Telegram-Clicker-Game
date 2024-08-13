"use client";
import Card from "./card";
import Image from "next/image";
import Button from "@components/Button";
import React, { useEffect, useState } from "react";
import { useAppProvider } from "@components/layouts/AppProvider";
import { error } from "console";

interface RewardStatus {
  status: 'Error' | 'Success' | 'Progress' | 'Ready'
  message?: string
}

const TradersIdPage = () => {
  const [dailyRewards, setDailyRewards] = useState([]);
  const { currentUserId } = useAppProvider();
  const [dailyRewardStatus, setDailyRewardStatus] = useState<RewardStatus | null>({ status: 'Progress' });
  const [dailyRewardsIndex, setDailyRewardsIndex] = useState(0);
  const [dailyRewardsAmount, setDailyRewardsAmount] = useState(0); 

  useEffect(() => {
    const fetchDailyRewards = async () => {
      try {
        setDailyRewardStatus({ status: 'Progress' })
        const response = await fetch(`/api/dailyRewards?userId=${currentUserId}`);
        const data = await response.json();
        // console.log("daily reward info", data);
        // if (!data?.dailyRewards?.length) throw new Error('Ошибка получения информации о ежедневных вознаграждениях')
        // if (!data?.dailyIndex) throw new Error('Ошибка получения статуса пользователя')
        if(data?.error) throw new Error(data?.error);
        setDailyRewards(data.dailyRewards);
        setDailyRewardsIndex(data.dailyIndex);
        setDailyRewardStatus({ status: 'Ready' })
      } catch (error) {
        setDailyRewards([]);
        setDailyRewardStatus({
          status: 'Error',
          message: error instanceof Error ? error.message : 'неизвестная ошибка'
        })
      }
    };

    fetchDailyRewards();
  }, []);

  const getDailyRewards = async () => {
    try {
      setDailyRewardStatus({
        status: 'Progress'
      })
      // console.log(currentUserId);
      if (!currentUserId) {
        throw new Error("невозможно получить текущий идентификатор пользователя");
      }
      const response = await fetch("/api/dailyRewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId
        }),
      });

      const resJson = await response.json()

      if (resJson.error) {
        throw new Error(resJson.error);
      }

      setDailyRewardsAmount(resJson.data.rewards);

      setDailyRewardStatus({
        status: 'Success'
      })
    } catch (error) {
      setDailyRewardStatus({
        status: 'Error',
        message: error instanceof Error ? error.message : 'неизвестная ошибка'
      })
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
        {
          (dailyRewardStatus?.status !== 'Error' && dailyRewardStatus?.status === 'Ready') && (
            <Card data={dailyRewards} dailyRewardsIndex={dailyRewardsIndex} />
          )
        }
        {
          dailyRewardStatus?.status === 'Progress' ?
            <div className="text-center">
              <p>Загрузка...</p>
              <span className="loading loading-spinner loading-lg"></span>
            </div> :
            dailyRewardStatus?.status === 'Success' ?
              <div className="text-center">Вы получили {dailyRewardsAmount} баллов</div> :
              (
                dailyRewardStatus?.status === 'Error' &&
                <div className="text-center"> {
                  dailyRewardStatus.message
                }</div>
              )
        }
        <Button
          label="Забрать"
          onClick={getDailyRewards}
          className="btn mt-16 text-base bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary text-white w-full"
        />
      </div >
    </>
  );
};

export default TradersIdPage;
