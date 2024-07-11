"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@components/Button";
import CardComponent from "@components/Card";
import Games from "@components/GameCanvas";

export default function Card() {
  const cardData = [
    {
      title: "Floors built",
      titleColor: "text-[#2496FF]",
      value: "+513",
      iconSrc: "/coin.svg",
    },
    {
      title: "Floors to update",
      titleColor: "text-[#FABB1E]",
      value: "+513",
    },
    {
      title: "Rent in hour",
      titleColor: "text-[#0FD73B]",
      value: "+513",
      iconSrc: "/coin.svg",
      additionalIconSrc: "/i_icon.svg",
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center gap-3 text-center">
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
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
        <h2 className="">513 000</h2>
      </div>
      <div>
        <Games />
      </div>

      <div className="my-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/icon02.svg" alt="icon" width={44} height={44} />
          <h3 className="text-base fw-bolder">513/513</h3>
        </div>
        <div>
          <Button
            label="Сбросить блок"
            className="btn text-base bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary text-white"
          />
        </div>
      </div>
    </>
  );
}
