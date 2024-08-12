"use client";

import React, { useState } from "react";
import Image from "next/image";
import Carousel from "../../components/Carousel";
import Cardlist from "../../components/CardList";
const tabs = ["Соло", "Альянс"];

const carouselData = [
  {
    title: "Подсобник • 1lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_1.svg",
  },
  {
    title: "Подсобник • 2lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_2.svg",
  },
  {
    title: "Подсобник • 3lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_3.svg",
  },
  {
    title: "Подсобник • 4lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_4.svg",
  },
  {
    title: "Подсобник • 5lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_5.svg",
  },
  {
    title: "Подсобник • 6lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_6.svg",
  },
  {
    title: "Подсобник • 7lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_7.svg",
  },
  {
    title: "Подсобник • 8lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_8.svg",
  },
  {
    title: "Подсобник • 9lvl",
    description: "50% лучших застройщиков",
    imageSrc: "/lvlIcons_9.svg",
  },
];

const cardListData = [
  {
    title: "Gleb Vashkevich",
    points: "564 216",
    imageSrc: "/avatar.png",
  },
  {
    title: "Gleb Vashkevich",
    points: "564 216",
    imageSrc: "/avatar.png",
  },
  {
    title: "Gleb Vashkevich",
    points: "564 216",
    imageSrc: "/avatar.png",
  },
  {
    title: "Gleb Vashkevich",
    points: "564 216",
    imageSrc: "/avatar.png",
  },
];

export default function Card() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="mb-10">
      <div className="flex justify-center items-center gap-2 mb-9">
        <p className="m-0">
          <b>Ассоциации застройщиков</b>
        </p>
        <Image src="/refresh.svg" alt="refresh" width={16} height={16} />
      </div>
      <div role="tablist" className="tabs tabs-boxed" id="tab">
        {tabs.map((tab) => (
          <a
            key={tab}
            role="tab"
            className={`tab text-white ${
              activeTab === tab ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <b className="text-white">{tab}</b>
          </a>
        ))}
      </div>

      <Carousel data={carouselData} />

      <Cardlist data={cardListData} />
    </div>
  );
}
