import React from "react";
import Image from "next/image";
import CardList from "./cardList";

const cardListData = [
  {
    title: "Новое видео",
    point: "100 000",
    imageSrc: "/tendersTask_icon.svg",
  },
  {
    title: "Новое видео",
    point: "100 000",
    imageSrc: "/tendersTask_icon.svg",
  },
];
export default function TendersPage() {
  return (
    <div className="text-white pb-10">
      {/* box-shadow: 0px 32px 128px 0px #0040A1; */}

      <Image
        src="/coin_150.svg"
        width={100}
        height={100}
        alt="Tenders"
        className="mx-auto mb-4"
        style={{
          boxShadow: "0px 32px 128px 0px rgba(0, 64, 161, 1)",
          backgroundColor: "transparent",
        }}
      />
      <h1 className="text-center mb-3">Заработай больше монет</h1>
      <p className="text-center font-bold">Заработай больше монет</p>

      <CardList data={cardListData} />

      <p className="text-center font-bold mb-1">Ежедневные задания</p>
      <CardList data={cardListData} />
    </div>
  );
}
