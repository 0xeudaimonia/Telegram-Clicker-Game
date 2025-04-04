"use client";
import React, { useState } from "react";
import Image from "next/image";
import cardData from "@data/cardData.json";
import teamData from "@data/teamData.json";
import CardComponent from "@components/Card";
import Clock from "@app/clock";
import TeamList from "@app/tenders/teamCardList";
import RWA from "@app/tenders/rwa";
import Marketing from "@app/tenders/marketing";
import { useAppProvider } from "@components/layouts/AppProvider";

const blocks: string[] = ["RWA", "Построить", "Финансы", "Маркетинг"];

export default function TendersPage() {
  const [activeBlock, setActiveBlock] = useState<string>("RWA");
  const { userPoints, setUserPoints } = useAppProvider();

  const renderBottomData = () => {
    switch (activeBlock) {
      case "Построить":
        <div>Данные по строительству</div>;
      case "Финансы":
        <div>Данные по финансам</div>;
      case "Маркетинг":
        return <Marketing />;
      default:
        return <RWA />;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3 text-center text-white">
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
      <div className="text-white pb-10">
        <div className="text-center">
          <Image
            src="/coin_150.svg"
            width={50}
            height={50}
            alt="Tenders"
            className="mb-3 mr-7"
            style={{
              boxShadow: "0px 32px 128px 0px rgba(0, 64, 161, 1)",
              backgroundColor: "transparent",
              display: "inline",
            }}
          />
          <h2 style={{ display: "inline" }}>
            {userPoints}
          </h2>
        </div>

        <Clock classname="flex justify-end mb-2" />

        <div className="flex justify-between mx-0.5 bg-stone-800 rounded-md px-2.5 py-2">
          <span className="my-auto">Комбо</span>
          <div className="flex items-center bg-black rounded-md px-3.5 py-1.5">
            <Image
              src="/uparrowicon.png"
              width={16}
              height={16}
              className="h-4"
              alt="uparrow"
            />
            <span>+5 000 000</span>
            <Image src="/greentick.png" className="h-4" width={16} height={16} alt="greentick" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-center text-white">
          {teamData.map((team) => (
            <TeamList
              key={team.title}
              data={[{ title: team.title, imageSrc: team.imageSrc }]}
            />
          ))}
        </div>

        <div className="flex justify-between mx-0.5 bg-stone-800 rounded-md px-2.5 py-2 text-xs">
          {blocks.map((block) => (
            <div
              key={block}
              className={`px-4 py-1 cursor-pointer text-white rounded ${activeBlock === block ? "bg-black" : "bg-stone-800"
                }`}
              onClick={() => setActiveBlock(block)}
            >
              {block}
            </div>
          ))}
        </div>

        <div className="text-white pt-4">{renderBottomData()}</div>
      </div>
    </>
  );
}
